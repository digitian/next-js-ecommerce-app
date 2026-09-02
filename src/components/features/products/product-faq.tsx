import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";
import type { ProductFaq as ProductFaqType } from "@/src/types/product.types";

export function ProductFaq({ faqs }: { faqs?: ProductFaqType[] }) {
    if (!faqs || faqs.length === 0) {
        return <p className="text-muted-foreground">No FAQs available.</p>;
    }

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
