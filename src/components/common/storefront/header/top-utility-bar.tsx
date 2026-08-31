import Link from "next/link";
import { LocalizationSwitcher } from "./localization-switcher";
import { Phone, HelpCircle } from "lucide-react";

export function TopUtilityBar() {
  return (
    <div className="hidden w-full bg-muted/40 py-1.5 border-b border-border lg:block">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Left side: Contact & Help */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center hover:text-foreground cursor-pointer transition-colors">
            <Phone className="size-3 mr-1.5" />
            <span>+1 (800) 123-4567</span>
          </div>
          <div className="flex items-center hover:text-foreground cursor-pointer transition-colors">
            <HelpCircle className="size-3 mr-1.5" />
            <span>Customer Service</span>
          </div>
        </div>

        {/* Center: Announcement */}
        <div className="flex-1 text-center text-xs font-medium text-foreground">
          Free shipping on all orders over $50. <Link href="/products" className="underline underline-offset-2 hover:text-muted-foreground transition-colors">Shop Now</Link>
        </div>

        {/* Right side: Localization */}
        <div className="flex items-center justify-end">
          <LocalizationSwitcher />
        </div>
      </div>
    </div>
  );
}
