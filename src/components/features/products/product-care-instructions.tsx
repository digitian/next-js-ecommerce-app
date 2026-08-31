export function ProductCareInstructions() {
    return (
        <div className="text-muted-foreground leading-relaxed flex flex-col gap-6 max-w-3xl">
            <p>
                Taking proper care of your product ensures it will last for years to come. 
                Follow these simple guidelines to maintain its quality and finish.
            </p>
            
            <div className="flex flex-col gap-2">
                <h5 className="font-medium text-foreground">General Cleaning</h5>
                <p>Wipe clean with a soft, slightly damp cloth. Always wipe in the direction of the grain (if applicable). Avoid using abrasive sponges or scouring pads, as these can scratch the surface.</p>
            </div>

            <div className="flex flex-col gap-2">
                <h5 className="font-medium text-foreground">Stain Removal</h5>
                <p>For tougher spills, use a mild soap diluted in warm water. Immediately dry the area with a clean microfiber cloth to prevent water marks. Do not let liquids sit on the surface for extended periods.</p>
            </div>

            <div className="flex flex-col gap-2">
                <h5 className="font-medium text-foreground">What to Avoid</h5>
                <ul className="list-disc pl-5 flex flex-col gap-1">
                    <li>Harsh chemical cleaners containing bleach, ammonia, or strong solvents.</li>
                    <li>Direct placement of hot items (always use a coaster or trivet).</li>
                    <li>Prolonged exposure to direct sunlight, which may cause fading or discoloration over time.</li>
                </ul>
            </div>
        </div>
    );
}
