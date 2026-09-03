import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";

import { getSession } from "@/src/lib/api/auth";
import { getUserOrders } from "@/src/lib/api/orders";
import { formatCurrency } from "@/src/lib/helpers/format-currency";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

export const metadata: Metadata = {
  title: "Order History | Storefront",
  description: "View your full order history.",
};

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    redirect("/login?callbackUrl=/account/orders");
  }

  const user = await getSession(token);

  if (!user) {
    redirect("/login?callbackUrl=/account/orders");
  }

  const orders = await getUserOrders(user.id);

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="mb-8 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          render={<Link href="/account" />}
          nativeButton={false}
          className="rounded-full"
        >
          <ArrowLeft className="size-5" />
          <span className="sr-only">Back to Account</span>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Clock className="size-8 text-muted-foreground" />
            Order History
          </h1>
          <p className="text-muted-foreground mt-1">
            Review your past purchases and their status.
          </p>
        </div>
      </div>

      <div className="border border-border rounded-lg bg-card">
        {orders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <Link href={`/account/orders/${order.id}`} className="text-primary hover:underline">
                      {order.id}
                    </Link>
                  </TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.itemCount} item{order.itemCount !== 1 ? 's' : ''}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(order.total)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-16">
            <Clock className="size-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-6">
              You haven&apos;t placed any orders with us yet.
            </p>
            <Button
              render={<Link href="/products" />}
              nativeButton={false}
            >
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
