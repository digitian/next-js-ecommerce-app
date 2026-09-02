export const metadata = {
  title: "Terms of Service | Storefront",
  description: "Read the terms and conditions that govern your use of our website.",
}

export default function TermsOfServicePage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Terms of Service</h1>
                <p className="text-muted-foreground">Last updated: August 31, 2026</p>
            </div>

            <div className="flex flex-col gap-10 text-foreground/90 leading-relaxed">
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">1. Agreement to Terms</h2>
                    <p>
                        These Terms of Service constitute a legally binding agreement made between you and Storefront, concerning your access to and use of our website. 
                        You agree that by accessing the site, you have read, understood, and agreed to be bound by all of these Terms of Service.
                    </p>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">2. Products and Pricing</h2>
                    <p>
                        All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products at any time for any reason. 
                        Prices for all products are subject to change.
                    </p>
                    <p>
                        We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors.
                    </p>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">3. User Accounts</h2>
                    <p>
                        You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. 
                        We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                    </p>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">4. Intellectual Property Rights</h2>
                    <p>
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us.
                    </p>
                </section>
                
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">5. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and defined following the laws of the jurisdiction in which our company is registered. Storefront and yourself irrevocably consent that the courts of that jurisdiction shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                    </p>
                </section>
            </div>
        </div>
    )
}
