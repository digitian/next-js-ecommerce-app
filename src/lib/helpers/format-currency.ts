export function formatCurrency(amountInCents: number, currency: string = "USD", locale: string = "en-US") {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    }).format(amountInCents / 100);
}
