export const metadata = {
  title: `Shipping Policy | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Learn about our shipping rates, delivery times, and international shipping options for ${process.env.NEXT_PUBLIC_APP_NAME}.`,
}

export default function ShippingPolicyPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Shipping Policy</h1>
                <p className="text-muted-foreground">Last updated: August 31, 2026</p>
            </div>

            <div className="flex flex-col gap-10 text-foreground/90 leading-relaxed">
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">1. Processing Time</h2>
                    <p>
                        All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. 
                        You will receive another notification when your order has shipped. 
                    </p>
                    <p>
                        During peak seasons or promotional periods, processing times may be slightly extended. We appreciate your patience.
                    </p>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">2. Domestic Shipping Rates and Estimates</h2>
                    <p>
                        Shipping charges for your order will be calculated and displayed at checkout. We offer several shipping options:
                    </p>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                        <li><strong>Standard Shipping:</strong> 3-5 business days (Free for orders over $150)</li>
                        <li><strong>Expedited Shipping:</strong> 2 business days ($15.00)</li>
                        <li><strong>Overnight Shipping:</strong> 1 business day ($25.00)</li>
                    </ul>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">3. International Shipping</h2>
                    <p>
                        We offer international shipping to select countries. Shipping charges for your order will be calculated and displayed at checkout.
                    </p>
                    <p>
                        Your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. 
                        Storefront is not responsible for these charges if they are applied and are your responsibility as the customer.
                    </p>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">4. How do I check the status of my order?</h2>
                    <p>
                        When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. 
                        Please allow 48 hours for the tracking information to become available. 
                    </p>
                </section>
            </div>
        </div>
    )
}
