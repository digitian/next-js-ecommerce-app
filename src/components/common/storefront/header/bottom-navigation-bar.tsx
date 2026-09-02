import { DesktopMegaMenu } from "./desktop-mega-menu";
import { getSubCategories } from "@/src/lib/api/products";
import type { Category } from "@/src/types/product.types";

interface BottomNavigationBarProps {
  categories: Category[];
}

export async function BottomNavigationBar({ categories }: BottomNavigationBarProps) {
  const subcategories = await getSubCategories();

  return (
    <div className="hidden lg:block w-full border-b border-border bg-background py-2">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <DesktopMegaMenu categories={categories} subcategories={subcategories} />
      </div>
    </div>
  );
}
