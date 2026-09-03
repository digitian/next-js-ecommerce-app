import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Package, Truck, CreditCard, CheckCircle2 } from "lucide-react";

import { getSession } from "@/src/lib/api/auth";
import { getOrderById } from "@/src/lib/api/orders";
import { formatCurrency } from "@/src/lib/helpers/format-currency";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";

export const metadata: Metadata = {
  title: "Order Details | Storefront",
  description: "View the details of your past order.",
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    redirect(`/login?callbackUrl=/account/orders/${id}`);
  }

  const user = await getSession(token);

  if (!user) {
    redirect(`/login?callbackUrl=/account/orders/${id}`);
  }

  const order = await getOrderById(id);

  if (!order || order.userId !== user.id) {
    // Return 404 or a user friendly not found page
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-heading">Order Not Found</h1>
        <p className="text-subheading">
          We couldn't find the order you're looking for, or you don't have permission to view it.
        </p>
        <Button render={<Link href="/account/orders" />} nativeButton={false}>
          Return to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          render={<Link href="/account/orders" />}
          nativeButton={false}
          className="mb-4"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Orders
        </Button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-heading">
                Order {order.id}
              </h1>
              <Badge variant="secondary" className="capitalize self-start md:self-auto">
                {order.status}
              </Badge>
            </div>
            <p className="text-subheading">
              Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {new Date(order.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Items */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="size-4" />
                Products Ordered
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <Link href={`/products/${item.productSlug}`} className="relative size-20 rounded-md overflow-hidden bg-muted flex-shrink-0 block">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                      sizes="80px"
                    />
                  </Link>
                  <div className="flex-1 flex justify-between">
                    <div>
                      <Link href={`/products/${item.productSlug}`} className="hover:underline">
                        <h3 className="font-medium text-foreground">{item.title}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-foreground">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Summary & Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{formatCurrency(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="size-4" />
                Shipping Details
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="size-4" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-green-600" />
                <span>
                  {order.paymentMethod.brand} ending in {order.paymentMethod.last4}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
