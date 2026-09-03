"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Category, SubCategory } from "@/src/types/product.types";

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

interface DesktopMegaMenuProps {
  categories?: Category[];
  subcategories?: SubCategory[];
}

export function DesktopMegaMenu({ categories = [], subcategories = [] }: DesktopMegaMenuProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {categories.map((category) => {
          const categorySubcategories = subcategories.filter(
            (sub) => sub.category_id === category.id
          );

          return (
            <NavigationMenuItem key={category.id}>
              <NavigationMenuTrigger className="bg-transparent h-12 text-sm font-medium">
                {category.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3 md:row-span-4 h-full min-h-[200px] relative">
                     <NavigationMenuLink render={<Link className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md relative overflow-hidden group" href={`/${category.slug}`} />}>
                            <div className="absolute inset-0 z-0">
                                <Image src={category.thumb_image} alt={category.title} fill className="object-cover opacity-30 transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 300px" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            </div>
                            <div className="z-10 relative">
                                <div className="mb-2 mt-4 text-lg font-medium">
                                    {category.title}
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground line-clamp-2">
                                    Explore all products in our {category.title.toLowerCase()} collection.
                                </p>
                            </div>
                     </NavigationMenuLink>
                  </li>
                  {categorySubcategories.map((sub) => (
                    <ListItem
                      key={sub.id}
                      title={sub.title}
                      href={`/${category.slug}?subcategory=${sub.slug}`}
                      thumbImage={sub.thumb_image}
                    >
                      Shop {sub.title.toLowerCase()}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
        
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
  React.ComponentPropsWithoutRef<"a"> & { thumbImage?: string }
>(({ className, title, children, thumbImage, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink render={<Link href={props.href || ""} ref={ref as React.Ref<HTMLAnchorElement>} className={cn("block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)} {...props} />}>
          <div className="flex items-center gap-3">
             {thumbImage && (
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                   <Image src={thumbImage} alt={title || ""} fill className="object-cover" sizes="40px" />
                </div>
             )}
             <div className="flex flex-col justify-center">
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-1 text-xs leading-snug text-muted-foreground mt-1">
                  {children}
                </p>
             </div>
          </div>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
