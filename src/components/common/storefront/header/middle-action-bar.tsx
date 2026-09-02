import Link from "next/link";
import { SearchBar } from "./search-bar";
import { CartTrigger } from "@/src/components/features/storefront/cart-trigger";
import { Heart, User } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { MobileNavSheet } from "./mobile-nav-sheet"; // We will create this next
import Image from "next/image";

export function MiddleActionBar() {
  return (
    <div className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            {/* Mobile Nav Sheet will be placed here, just a placeholder for now */}
            <MobileNavSheet />
          </div>
          
          <Link href="/">
            {/* Minimalist Logo */}
            <Image
              src="/images/logos/turkuaz-aski-logo.png"
              alt="Logo"
              width={200}
              height={50}
              className="object-contain brightness-80"
            />
          </Link>
        </div>

        {/* Central Search (Desktop) */}
        <div className="flex-1 flex justify-center max-w-2xl hidden md:flex">
          <SearchBar />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search Icon (Mobile) */}
          <div className="md:hidden">
            <SearchBar />
          </div>
          
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
            <User className="size-5" />
            <span className="sr-only">Account</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
            <Heart className="size-5" />
            <span className="sr-only">Wishlist</span>
          </Button>

          <CartTrigger />
        </div>
      </div>
    </div>
  );
}
