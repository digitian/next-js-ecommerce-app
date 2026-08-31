"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

export function LocalizationSwitcher() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setMounted(true);
    // In a real app, we would parse document.cookie here
    const cookies = document.cookie.split("; ");
    const currencyCookie = cookies.find((row) => row.startsWith("currency="));
    const languageCookie = cookies.find((row) => row.startsWith("language="));
    
    if (currencyCookie) setCurrency(currencyCookie.split("=")[1]);
    if (languageCookie) setLanguage(languageCookie.split("=")[1]);
  }, []);

  const changeCurrency = (code: string) => {
    document.cookie = `currency=${code}; path=/; max-age=31536000`;
    setCurrency(code);
    router.refresh();
  };

  const changeLanguage = (code: string) => {
    document.cookie = `language=${code}; path=/; max-age=31536000`;
    setLanguage(code);
    router.refresh();
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 text-xs opacity-0">
        <div className="w-16 h-4" />
        <div className="w-16 h-4" />
      </div>
    );
  }

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
