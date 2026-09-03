"use client";

import { useEffect, useRef, useState } from "react";

import { MiddleActionBar } from "./middle-action-bar";

interface SiteHeaderProps {
  bottomNav: React.ReactNode;
  mobileNav: React.ReactNode;
}

export function SiteHeader({ bottomNav, mobileNav }: SiteHeaderProps) {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [bottomNavHeight, setBottomNavHeight] = useState(0);
  const lastScrollY = useRef(0);
  const bottomNavRef = useRef<HTMLDivElement>(null);

  // Measure the bottom nav height so we know how far to slide the header up.
  // Using ResizeObserver handles responsive changes (e.g. the bar is hidden on mobile).
  useEffect(() => {
    const el = bottomNavRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      setBottomNavHeight(el.offsetHeight);
    });

    setBottomNavHeight(el.offsetHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Single scroll listener, registered once.
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          setIsScrolledDown(true);  // scrolling down
        } else if (currentScrollY < lastScrollY.current) {
          setIsScrolledDown(false); // scrolling up
        }
      } else {
        setIsScrolledDown(false); // back at top
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slide the header up by the bottom nav height when scrolling down.
  // Because we animate `top` instead of collapsing height, the header's space
  // in the document flow never changes — content below never shifts, eliminating trembling.
  const topOffset = isScrolledDown ? -bottomNavHeight : 0;

  return (
    <>
      <header
        className="sticky w-full z-50 shadow-sm transition-[top] duration-300 ease-in-out"
        style={{ top: `${topOffset}px` }}
      >
        <MiddleActionBar mobileNav={mobileNav} />
        <div ref={bottomNavRef}>
          {bottomNav}
        </div>
      </header>
    </>
  );
}
