import ReactMarkdown from 'react-markdown';

export function ProductCareInstructions({ careInstructions }: { careInstructions?: string }) {
    if (!careInstructions) {
        return <p className="text-muted-foreground">No care instructions available.</p>;
    }

    return (
        <div className="prose prose-neutral dark:prose-invert max-w-3xl text-muted-foreground">
            <ReactMarkdown>{careInstructions}</ReactMarkdown>
        </div>
    );
}
