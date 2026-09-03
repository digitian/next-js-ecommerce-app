export const metadata = {
  title: `Returns & Exchanges | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Learn about our return and exchange policies for ${process.env.NEXT_PUBLIC_APP_NAME}.`,
}

export default function ReturnExchangesPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Returns & Exchanges</h1>
                <p className="text-muted-foreground">Last updated: August 31, 2026</p>
            </div>

            <div className="flex flex-col gap-10 text-foreground/90 leading-relaxed">
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">1. Return Policy</h2>
                    <p>
                        We want you to be completely satisfied with your purchase. If for any reason you are not happy, 
                        we gladly accept returns of unworn, unwashed, and undamaged items within 30 days of delivery. 
                        Items must be returned in their original packaging with all tags attached.
                    </p>
                    <p>
                        Please note that final sale items, custom-made products, and gift cards cannot be returned or exchanged.
                    </p>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">2. How to Initiate a Return</h2>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                        <li>Visit our Return Portal and enter your order number and email address.</li>
                        <li>Select the item(s) you wish to return and specify the reason.</li>
                        <li>Print the provided prepaid shipping label.</li>
                        <li>Securely pack the item(s) and attach the shipping label to the outside of the package.</li>
                        <li>Drop off the package at any authorized shipping location.</li>
                    </ul>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">3. Exchanges</h2>
                    <p>
                        If you need a different size, color, or style, we recommend initiating a return for the unwanted item 
                        and placing a new order for the replacement. This ensures the fastest processing time and guarantees 
                        the new item is in stock.
                    </p>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">4. Refunds</h2>
                    <p>
                        Once we receive and inspect your returned item(s), we will notify you of the approval or rejection of your refund. 
                        If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment 
                        within 5-10 business days. Shipping costs are non-refundable.
                    </p>
                </section>
                
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">5. Damaged or Defective Items</h2>
                    <p>
                        If you receive a damaged or defective item, please contact our customer support team immediately at 
                        <a href="mailto:support@example.com" className="text-primary hover:underline ml-1">support@example.com</a>. 
                        Include your order number and clear photos of the damage. We will expedite a replacement or issue a full refund at no additional cost.
                    </p>
                </section>
            </div>
        </div>
    )
}