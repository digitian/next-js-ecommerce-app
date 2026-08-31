import type { Product, Review } from "@/src/types/product.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { ProductDescription } from "./product-description";
import { ProductReviews } from "./product-reviews";
import { ProductSpecifications } from "./product-specifications";
import { ProductShippingReturns } from "./product-shipping-returns";
import { ProductFaq } from "./product-faq";
import { ProductCareInstructions } from "./product-care-instructions";

export function ProductTabs({ product, reviews }: { product: Product, reviews: Review[] }) {
    return (
        <div className="mt-16 sm:mt-24 border-t border-border pt-12 sm:pt-16">
            <Tabs defaultValue="description" className="w-full">
                <div className="overflow-x-auto no-scrollbar pb-1 mb-8">
                    <TabsList variant="line" className="w-full justify-start md:gap-4">
                        <TabsTrigger value="description" className="text-base">Description</TabsTrigger>
                        <TabsTrigger value="specifications" className="text-base">Specifications</TabsTrigger>
                        <TabsTrigger value="reviews" className="text-base">Reviews{(product.review_count && product.review_count > 0) ? (' (' + product.review_count + ')') : ''}</TabsTrigger>
                        <TabsTrigger value="shipping" className="text-base">Shipping & Returns</TabsTrigger>
                        <TabsTrigger value="faq" className="text-base">FAQ</TabsTrigger>
                        <TabsTrigger value="care" className="text-base">Care Instructions</TabsTrigger>
                    </TabsList>
                </div>
                
                <div className="min-h-[300px]">
                    <TabsContent value="description" className="focus-visible:outline-none focus-visible:ring-0">
                        <ProductDescription product={product} />
                    </TabsContent>
                    
                    <TabsContent value="specifications" className="focus-visible:outline-none focus-visible:ring-0">
                        <ProductSpecifications />
                    </TabsContent>
                    
                    <TabsContent value="reviews" className="focus-visible:outline-none focus-visible:ring-0">
                        <ProductReviews reviews={reviews} />
                    </TabsContent>

                    <TabsContent value="shipping" className="focus-visible:outline-none focus-visible:ring-0">
                        <ProductShippingReturns />
                    </TabsContent>

                    <TabsContent value="faq" className="focus-visible:outline-none focus-visible:ring-0">
                        <ProductFaq />
                    </TabsContent>

                    <TabsContent value="care" className="focus-visible:outline-none focus-visible:ring-0">
                        <ProductCareInstructions />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
