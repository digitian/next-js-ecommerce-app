"use client";

import { useEffect, useState } from "react";
import { TopUtilityBar } from "./top-utility-bar";
import { MiddleActionBar } from "./middle-action-bar";
import { BottomNavigationBar } from "./bottom-navigation-bar";
import { cn } from "@/src/lib/utils";

export function SiteHeader() {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If we scroll down past 100px, we hide the nav tier. If we scroll up, we show it.
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setIsScrolledDown(true); // scrolling down
        } else {
          setIsScrolledDown(false); // scrolling up
        }
      } else {
        setIsScrolledDown(false); // Top of page
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="relative w-full z-50">
      {/* Top Utility Bar - Not Sticky */}
      <TopUtilityBar />
      
      {/* Sticky Container for Middle and Bottom Bars */}
      <div className="sticky top-0 w-full z-50 transition-transform duration-300 ease-in-out">
        <MiddleActionBar />
        <div 
          className={cn(
            "w-full transition-all duration-300 ease-in-out transform origin-top",
            isScrolledDown ? "h-0 opacity-0 -translate-y-full overflow-hidden" : "h-auto opacity-100 translate-y-0"
          )}
        >
          <BottomNavigationBar />
        </div>
      </div>
    </header>
  );
}
