export const metadata = {
  title: "Privacy Policy | Storefront",
  description: "Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Privacy Policy</h1>
                <p className="text-muted-foreground">Last updated: August 31, 2026</p>
            </div>

            <div className="flex flex-col gap-10 text-foreground/90 leading-relaxed">
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">1. Introduction</h2>
                    <p>
                        At Storefront, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                        when you visit our website and use our services. Please read this privacy policy carefully.
                    </p>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">2. Information We Collect</h2>
                    <p>
                        We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                    </p>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                        <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register or make a purchase.</li>
                        <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services.</li>
                        <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, and your access times.</li>
                    </ul>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">3. Use of Your Information</h2>
                    <p>
                        Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                    </p>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                        <li>Create and manage your account.</li>
                        <li>Process your transactions and send you related information, including purchase confirmations and invoices.</li>
                        <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions to you.</li>
                        <li>Improve our website and services.</li>
                    </ul>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">4. Disclosure of Your Information</h2>
                    <p>
                        We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                    </p>
                    <p>
                        <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                    </p>
                    <p>
                        <strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                    </p>
                </section>
                
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-foreground">5. Contact Us</h2>
                    <p>
                        If you have questions or comments about this Privacy Policy, please contact us at: 
                        <a href="mailto:privacy@example.com" className="text-primary hover:underline ml-1">privacy@example.com</a>.
                    </p>
                </section>
            </div>
        </div>
    )
}
