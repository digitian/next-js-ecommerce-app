import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Van, Shield, RefreshCw, Clock } from "lucide-react";

const trustItems = [
    { icon: Van, title: "Free Shipping", description: "On orders over $100" },
    { icon: Shield, title: "Secure Payment", description: "100% Protected" },
    { icon: RefreshCw, title: "Free Returns", description: "Within 30 days" },
    { icon: Clock, title: "24/7 Support", description: "We're here to help" },
];

export default function TrustBar() {
    return (
        <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {trustItems.map(item => (<Card key={item.title} className="flex flex-row items-center gap-0">
                <CardContent>
                    <div className="w-full h-full border border-border bg-muted p-2">
                        <item.icon size={40} strokeWidth={1} />
                    </div>
                </CardContent>
                <CardHeader className="grow">
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                </CardHeader>
            </Card>))}
        </section>
    )
}