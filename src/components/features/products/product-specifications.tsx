export function ProductSpecifications() {
    const specs = [
        { label: "Dimensions", value: "Width: 45cm, Depth: 45cm, Height: 85cm" },
        { label: "Weight", value: "4.5 kg" },
        { label: "Materials", value: "Solid oak wood, powder-coated steel" },
        { label: "Color", value: "Red, Blue, Green" },
        { label: "Assembly", value: "No assembly required" },
        { label: "Origin", value: "Designed in Sweden, Made in Italy" },
        { label: "SKU", value: "PRD-2025-X89" },
    ];

    return (
        <div className="flex flex-col max-w-3xl">
            {specs.map((spec, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-border last:border-0 gap-2 sm:gap-4">
                    <div className="font-medium text-foreground min-w-[200px]">{spec.label}</div>
                    <div className="text-muted-foreground">{spec.value}</div>
                </div>
            ))}
        </div>
    );
}
