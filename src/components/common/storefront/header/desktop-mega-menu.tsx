"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/src/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/src/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Sofas & Sectionals",
    href: "/products?category=sofas",
    description: "Comfortable and stylish seating for your living room.",
  },
  {
    title: "Coffee Tables",
    href: "/products?category=tables",
    description: "Centerpieces that bring your living space together.",
  },
  {
    title: "TV Stands",
    href: "/products?category=entertainment",
    description: "Media storage and entertainment consoles.",
  },
  {
    title: "Accent Chairs",
    href: "/products?category=chairs",
    description: "Add a pop of color and extra seating.",
  },
];

export function DesktopMegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent h-12 text-sm font-medium">Living Room</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent h-12 text-sm font-medium">Bedroom</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink render={<Link className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md" href="/products?category=bedroom" />}>
                  <div className="mb-2 mt-4 text-lg font-medium">
                    Sleep Collection
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    Everything you need for a restful night's sleep. Beds, mattresses, and bedding.
                  </p>
                </NavigationMenuLink>
              </li>
              <ListItem href="/products?category=beds" title="Beds & Frames">
                Sturdy and stylish foundations.
              </ListItem>
              <ListItem href="/products?category=mattresses" title="Mattresses">
                Memory foam, hybrid, and spring options.
              </ListItem>
              <ListItem href="/products?category=nightstands" title="Nightstands">
                Bedside storage solutions.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink render={<Link href="/products?category=new" className={cn(navigationMenuTriggerStyle(), "bg-transparent h-12 text-sm font-medium")} />}>
            New Arrivals
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink render={<Link href="/products?sale=true" className={cn(navigationMenuTriggerStyle(), "bg-transparent h-12 text-sm font-medium text-destructive focus:text-destructive hover:text-destructive")} />}>
            Sale
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink render={<a ref={ref} className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)} {...props} />}>
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
