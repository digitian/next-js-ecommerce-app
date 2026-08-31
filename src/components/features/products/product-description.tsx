import type { Product } from "@/src/types/product.types";

export function ProductDescription({ product }: { product: Product }) {
    return (
        <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
            <p className="text-base leading-relaxed whitespace-pre-line">
                {product.description || product.brief_description}
            </p>
            <p className="text-base leading-relaxed mt-4">
                Whether you're looking to enhance your daily routine or add a statement piece to your home, this is the perfect choice. Our design philosophy focuses on minimalism, ensuring that every detail serves a purpose without unnecessary clutter.
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Timeless minimal design</li>
                <li>Durable, premium materials</li>
                <li>Responsibly sourced and ethically manufactured</li>
                <li>Designed to seamlessly integrate into any environment</li>
            </ul>
        </div>
    );
}
