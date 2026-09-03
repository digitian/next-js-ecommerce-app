"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Printer, ArrowLeft } from "lucide-react";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { useCartStore } from "@/src/hooks/use-cart-store";
import { formatCurrency } from "@/src/lib/helpers/format-currency";
import { useHydrated } from "@/src/hooks/use-hydrated";

export function SuccessView() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-UNKNOWN";
  
  const mounted = useHydrated();
  const lastOrder = useCartStore((state) => state.lastOrder);

  if (!mounted) return null;

  const handlePrint = () => {
    window.print();
  };

  const invoiceDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <style>{`
        @media print {
          header, footer, [data-sonner-toaster] { display: none !important; }
          body, html, main { 
            background-color: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          #invoice-card {
            border: none !important;
            box-shadow: none !important;
          }
          @page { margin: 0.5cm; }
        }
      `}</style>
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-12 print:space-y-0 print:max-w-none print:w-full print:m-0 print:p-0 print:block">
      
      {/* Hide this entire wrapper in print mode */}
      <div className="print:hidden flex flex-col items-center text-center space-y-4">
        <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Order Confirmed!</h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Thank you for your purchase. We&apos;ve received your order and will begin processing it shortly.
        </p>
      </div>

      {lastOrder ? (
        <Card id="invoice-card" className="w-full shadow-md border-muted/60 overflow-hidden print:m-0 print:rounded-none">
          
          <CardHeader className="bg-muted/30 border-b print:bg-transparent print:border-0 print:px-0 print:pt-0 print:pb-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 print:flex-row print:items-center">
              <div>
                <CardTitle className="text-2xl">Invoice</CardTitle>
                <div className="text-sm text-muted-foreground mt-1">
                  Order ID: <span className="font-medium text-foreground">{orderId}</span>
                </div>
              </div>
              <div className="text-left sm:text-right print:text-right">
                <div className="font-medium">Date</div>
                <div className="text-sm text-muted-foreground">{invoiceDate}</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 print:p-0">
            {/* Customer Info Section */}
            {lastOrder.customerInfo && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-6 lg:p-8 border-b bg-background print:border-0 print:px-0 print:py-4 print:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Billed To</h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{lastOrder.customerInfo.firstName} {lastOrder.customerInfo.lastName}</p>
                    {lastOrder.customerInfo.company && <p>{lastOrder.customerInfo.company}</p>}
                    <p>{lastOrder.customerInfo.email}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Shipped To</h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{lastOrder.customerInfo.firstName} {lastOrder.customerInfo.lastName}</p>
                    <p>{lastOrder.customerInfo.address1}</p>
                    {lastOrder.customerInfo.address2 && <p>{lastOrder.customerInfo.address2}</p>}
                    <p>{lastOrder.customerInfo.city}, {lastOrder.customerInfo.state} {lastOrder.customerInfo.zip}</p>
                    <p>{lastOrder.customerInfo.country}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Line Items Table */}
            <div className="p-6 lg:p-8 print:px-0 print:py-2">
              <Table className="print:text-sm">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50%]">Item</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lastOrder.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.product.name}
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(item.product.price)}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(item.product.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Totals Section */}
              <div className="flex justify-end mt-8 print:mt-4">
                <div className="w-full sm:w-1/2 md:w-1/3 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="tabular-nums">{formatCurrency(lastOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="tabular-nums">{formatCurrency(lastOrder.shippingCost || 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Tax (10%)</span>
                    <span className="tabular-nums">{formatCurrency(lastOrder.tax || 0)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-3 border-t">
                    <span>Total Paid</span>
                    <span className="tabular-nums">{formatCurrency(lastOrder.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full print:hidden">
          <CardContent className="pt-6 text-center text-muted-foreground">
            Order details are no longer available in this session.
          </CardContent>
        </Card>
      )}

      {/* Action Buttons (Hidden in print mode) */}
      <div className="print:hidden flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
        <Button variant="outline" size="lg" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print Receipt
        </Button>
        <Link href="/products" className={buttonVariants({size: "lg"})}>
          <ArrowLeft />
          Continue Shopping
        </Link>
      </div>
    </div>
    </>
  );
}
