import type { Product } from "@/src/types/product.types";
import ReactMarkdown from 'react-markdown';

export function ProductDescription({ product }: { product: Product }) {
    return (
        <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
            <ReactMarkdown>{product.description || product.brief_description}</ReactMarkdown>
        </div>
    );
}
