"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<div className="relative flex-1 max-w-md hidden md:block" />} nativeButton={false}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm text-muted-foreground ring-offset-background flex items-center pl-10 cursor-pointer hover:bg-background transition-colors">
          Search products, categories...
        </div>
      </DialogTrigger>
      {/* Mobile search icon */}
      <DialogTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </DialogTrigger>

      <DialogContent showCloseButton={false} className="sm:max-w-3xl top-[5%] translate-y-0 flex flex-col p-0 border-0 shadow-2xl gap-0 rounded-2xl overflow-hidden">
        <DialogTitle className="sr-only">Search</DialogTitle>
        <div className="flex items-center border-b border-border p-4 gap-1">
          <Search className="h-5 w-5 text-muted-foreground ml-2 mr-1" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
            className="flex-1 border-0 shadow-none focus-visible:ring-0 text-lg px-0 bg-transparent h-auto"
            autoFocus
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full shrink-0"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            onClick={() => setIsOpen(false)} 
            className="text-muted-foreground hover:text-foreground shrink-0"
          >
            Cancel
          </Button>
        </div>
        
        {/* Search Results Area */}
        <div className="p-6 bg-muted/20 min-h-[400px]">
          {!query ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {["Living Room", "Office Desks", "Lighting", "Sofas", "Storage"].map((term) => (
                    <Button key={term} variant="secondary" size="sm" className="rounded-full" onClick={() => setQuery(term)}>
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Trending Categories</h3>
                <div className="space-y-2">
                  <div className="text-sm cursor-pointer hover:text-primary transition-colors py-1">New Arrivals</div>
                  <div className="text-sm cursor-pointer hover:text-primary transition-colors py-1">Best Sellers</div>
                  <div className="text-sm cursor-pointer hover:text-primary transition-colors py-1">Sale & Offers</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
              <p>Search results for "{query}" will appear here.</p>
              <p className="text-sm mt-2">Connect to real API endpoint later.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
