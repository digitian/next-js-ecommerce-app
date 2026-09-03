import Link from "next/link";
import Image from "next/image";

import { SearchBar } from "./search-bar";
import { CartTrigger } from "@/src/components/features/storefront/cart-trigger";
import { WishlistTrigger } from "@/src/components/features/storefront/wishlist-trigger";
import { ProfileDropdown } from "@/src/components/features/auth/profile-dropdown";

export function MiddleActionBar({ mobileNav }: { mobileNav?: React.ReactNode }) {
  return (
    <div className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            {mobileNav}
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
          
          <ProfileDropdown />
          
          <div className="hidden sm:inline-flex">
            <WishlistTrigger />
          </div>

          <CartTrigger />
        </div>
      </div>
    </div>
  );
}
