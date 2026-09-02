import type { ProductSpecification } from "@/src/types/product.types";

export function ProductSpecifications({ specifications }: { specifications?: ProductSpecification[] }) {
    if (!specifications || specifications.length === 0) {
        return <p className="text-muted-foreground">No specifications available.</p>;
    }

    return (
        <div className="flex flex-col max-w-3xl">
            {specifications.map((spec, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-border last:border-0 gap-2 sm:gap-4">
                    <div className="font-medium text-foreground min-w-[200px]">{spec.label}</div>
                    <div className="text-muted-foreground">{spec.value}</div>
                </div>
            ))}
        </div>
    );
}
