import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";

export function ProductFaq() {
    const faqs = [
        {
            question: "Is this product suitable for outdoor use?",
            answer: "This specific model is designed primarily for indoor use. While it can withstand occasional outdoor exposure, prolonged exposure to moisture and direct sunlight is not recommended as it may damage the finish."
        },
        {
            question: "How do I claim the warranty?",
            answer: "All our products come with a 2-year manufacturer's warranty covering structural defects. Keep your digital receipt and contact our support team to initiate a claim."
        },
        {
            question: "Can I order custom colors or materials?",
            answer: "Currently, we only offer the options listed on the website. We introduce new collections seasonally, so be sure to subscribe to our newsletter for updates on new colorways and materials."
        },
        {
            question: "Do you offer bulk discounts for commercial projects?",
            answer: "Yes! We have a dedicated B2B team. Please reach out via our Contact page and provide details about your project to get a custom quote."
        }
    ];

    return (
        <div className="max-w-3xl">
            <Accordion className="w-full">
                {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                        <AccordionTrigger className="text-left font-medium text-base">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
