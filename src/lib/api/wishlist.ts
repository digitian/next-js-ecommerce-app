import type { WishlistItem } from "@/src/types/wishlist.types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory mock database for wishlists, indexed by userId
const wishlistsStore: Record<string, WishlistItem[]> = {};

export async function getUserWishlist(userId: string): Promise<WishlistItem[]> {
  await delay(200 + Math.random() * 300); // simulate latency
  return wishlistsStore[userId] || [];
}

export async function addToWishlist(userId: string, item: WishlistItem): Promise<WishlistItem[]> {
  await delay(200 + Math.random() * 300);
  if (!wishlistsStore[userId]) {
    wishlistsStore[userId] = [];
  }
  
  const existing = wishlistsStore[userId].find((i) => i.id === item.id);
  if (!existing) {
    wishlistsStore[userId].push(item);
  }
  
  return wishlistsStore[userId];
}

export async function removeFromWishlist(userId: string, itemId: string): Promise<WishlistItem[]> {
  await delay(200 + Math.random() * 300);
  if (!wishlistsStore[userId]) return [];
  
  wishlistsStore[userId] = wishlistsStore[userId].filter((i) => i.id !== itemId);
  return wishlistsStore[userId];
}
