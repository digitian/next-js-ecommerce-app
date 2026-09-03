"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { ChevronDown, Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
];

const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
];

export function LocalizationSwitcher({
  initialLanguage = "en",
  initialCurrency = "USD",
}: {
  initialLanguage?: string;
  initialCurrency?: string;
}) {
  const router = useRouter();
  const [currency, setCurrency] = useState(initialCurrency);
  const [language, setLanguage] = useState(initialLanguage);
  const isFirstRender = useRef(true);

  // Persist the choice to cookies (and re-fetch server data) as a reaction to
  // state changing, rather than mutating `document` directly inside the click
  // handler — keeps the write out of render/event-handler scope.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document.cookie = `currency=${currency}; path=/; max-age=31536000`;
    document.cookie = `language=${language}; path=/; max-age=31536000`;
    router.refresh();
  }, [currency, language, router]);

  const changeCurrency = (code: string) => setCurrency(code);
  const changeLanguage = (code: string) => setLanguage(code);

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="sm" className="h-7 px-2 text-xs font-medium text-muted-foreground hover:text-foreground" />}>
          <Globe data-icon="inline-start" className="size-3 mr-1" />
          {languages.find((l) => l.code === language)?.name}
          <ChevronDown data-icon="inline-end" className="size-3 ml-1 opacity-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="text-xs"
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="sm" className="h-7 px-2 text-xs font-medium text-muted-foreground hover:text-foreground" />}>
          {currency}
          <ChevronDown data-icon="inline-end" className="size-3 ml-1 opacity-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-24">
          {currencies.map((curr) => (
            <DropdownMenuItem
              key={curr.code}
              onClick={() => changeCurrency(curr.code)}
              className="text-xs"
            >
              {curr.code} ({curr.symbol})
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
