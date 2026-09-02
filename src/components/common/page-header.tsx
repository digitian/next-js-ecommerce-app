export default function PageHeaderComponent({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <section className="px-4 py-8 md:py-12 max-w-5xl mx-auto text-center flex flex-col gap-6">
            <h1 className="page-heading">{title}</h1>
            <p className="page-subheading">{description}</p>
        </section>
    );
}