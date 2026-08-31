export function ProductShippingReturns() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            <div className="flex flex-col gap-4">
                <h4 className="text-lg font-semibold text-foreground">Shipping Information</h4>
                <div className="text-muted-foreground flex flex-col gap-3 leading-relaxed">
                    <p>We offer free standard shipping on all orders over $100.</p>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                        <li><strong>Standard Shipping:</strong> 3-5 business days ($5.99 flat rate)</li>
                        <li><strong>Express Shipping:</strong> 1-2 business days ($14.99 flat rate)</li>
                        <li><strong>International:</strong> 7-14 business days (calculated at checkout)</li>
                    </ul>
                    <p>All items are carefully packaged to ensure they arrive in perfect condition.</p>
                </div>
            </div>
            
            <div className="flex flex-col gap-4">
                <h4 className="text-lg font-semibold text-foreground">Returns & Exchanges</h4>
                <div className="text-muted-foreground flex flex-col gap-3 leading-relaxed">
                    <p>We want you to be completely satisfied with your purchase.</p>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                        <li>Return within 30 days for a full refund.</li>
                        <li>Items must be in original, unused condition with all tags attached.</li>
                        <li>Return shipping label provided (a $5.00 restocking fee applies).</li>
                    </ul>
                    <p>To initiate a return, please visit our returns portal or contact our friendly support team.</p>
                </div>
            </div>
        </div>
    );
}
