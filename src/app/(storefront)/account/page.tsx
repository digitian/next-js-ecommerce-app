import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, Heart, ShieldCheck, Mail, User as UserIcon } from "lucide-react";

import { getSession } from "@/src/lib/api/auth";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export const metadata: Metadata = {
  title: "My Account | Storefront",
  description: "View and manage your account details and order history.",
};

export default async function AccountPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    redirect("/login?callbackUrl=/account");
  }

  const user = await getSession(token);

  if (!user) {
    redirect("/login?callbackUrl=/account");
  }

  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "U";

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      {/* Account Header */}
      <div className="flex items-center gap-4 border-b border-border pb-8">
        <Avatar size="lg" className="size-16 border-2 border-primary/20">
          <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {user.firstName} {user.lastName}
            </h1>
            <Badge variant="secondary" className="capitalize">
              {user.role}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{user.email}</p>
        </div>
      </div>

      {/* Account Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Profile Details Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserIcon className="size-5 text-muted-foreground" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Your personal account and contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border p-3">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block mb-1">
                  First Name
                </span>
                <p className="text-sm font-semibold text-foreground">{user.firstName}</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block mb-1">
                  Last Name
                </span>
                <p className="text-sm font-semibold text-foreground">{user.lastName}</p>
              </div>
            </div>

            <div className="rounded-lg border border-border p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block mb-1">
                  Email Address
                </span>
                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Mail className="size-4 text-muted-foreground" />
                  {user.email}
                </p>
              </div>
              <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50/50">
                Verified
              </Badge>
            </div>

            <div className="rounded-lg border border-border p-3 flex items-center gap-3 bg-muted/40">
              <ShieldCheck className="size-5 text-primary shrink-0" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium text-foreground">Account Status: Active</p>
                <p>Standard mock customer session with secure cookie authentication.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Shortcuts Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                render={<Link href="/products" />}
                nativeButton={false}
              >
                <Package className="size-4 mr-2" />
                Browse Catalog
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                render={<Link href="/cart" />}
                nativeButton={false}
              >
                <Package className="size-4 mr-2" />
                Shopping Cart
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground"
                disabled
              >
                <Heart className="size-4 mr-2" />
                Wishlist (Coming Soon)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Assistance?</CardTitle>
              <CardDescription>
                Our customer service team is here to help with any inquiries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="secondary"
                className="w-full"
                render={<Link href="/contact" />}
                nativeButton={false}
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
