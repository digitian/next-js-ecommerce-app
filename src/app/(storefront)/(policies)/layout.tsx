import type { ReactNode } from "react";
import { PolicySidebar } from "./_components/policy-sidebar";
import { PolicyBreadcrumbs } from "./_components/policy-breadcrumbs";

export default function PolicyLayout({ children }: { children: ReactNode }) {
    return (
        <div className="container mx-auto py-10 px-4 md:px-8">
            <div className="mb-8">
                <PolicyBreadcrumbs />
            </div>
            
            <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
                <PolicySidebar />
                <main className="flex-1 max-w-3xl">
                    {children}
                </main>
            </div>
        </div>
    )
}