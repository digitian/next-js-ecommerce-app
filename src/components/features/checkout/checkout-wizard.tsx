"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { 
  Field, 
  FieldGroup, 
  FieldLabel, 
  FieldError, 
  FieldContent,
  FieldSet,
  FieldLegend
} from "@/src/components/ui/field";
import { useCartStore } from "@/src/hooks/use-cart-store";
import { useAuthStore } from "@/src/hooks/use-auth-store";
import { formatCurrency } from "@/src/lib/helpers/format-currency";
import { OrderSummary } from "./order-summary";
import { checkoutSchema, type CheckoutFormValues } from "./checkout-schemas";

const STEPS = ["Shipping", "Method", "Payment"];

export function CheckoutWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  const { user } = useAuthStore();
  const { clearCart, items, isHydrated } = useCartStore();

  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      company: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      shippingMethod: "standard",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      cardName: "",
    },
    mode: "onTouched",
  });

  const { register, trigger, handleSubmit, watch, formState: { errors }, setValue } = methods;

  const { onChange: onCardNumberChange, ...cardNumberRest } = register("cardNumber");
  const { onChange: onCardExpiryChange, ...cardExpiryRest } = register("cardExpiry");
  const { onChange: onCardCvcChange, ...cardCvcRest } = register("cardCvc");

  const shippingMethod = watch("shippingMethod");
  const shippingCost = shippingMethod === "express" ? 2500 : 1000;

  useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
    }
  }, [user, setValue]);

  useEffect(() => {
    // If cart is hydrated and empty (and not successfully submitted), redirect to cart page
    if (isHydrated && items.length === 0 && !hasSubmitted) {
      router.push("/cart");
    }
  }, [isHydrated, items.length, router, hasSubmitted]);

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    
    if (currentStep === 0) {
      fieldsToValidate = [
        "email", "phone", "firstName", "lastName", "company",
        "address1", "address2", "city", "state", "zip", "country"
      ];
    } else if (currentStep === 1) {
      fieldsToValidate = ["shippingMethod"];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Order placed successfully!");
        
        // Pass the customer info to save in the invoice
        const customerInfo = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
        };

        clearCart(true, shippingCost, customerInfo);
        setHasSubmitted(true);
        router.push(`/checkout/success?orderId=${result.data.orderId}`);
      } else {
        toast.error(result.error || "Failed to place order.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated || (items.length === 0 && !hasSubmitted)) {
    return null; // Don't render checkout if cart is empty or not loaded
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
        
        {/* Wizard Steps indicator */}
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center w-full">
            {STEPS.map((step, index) => (
              <li key={step} className={`relative flex items-center ${index !== STEPS.length - 1 ? "flex-1" : ""}`}>
                <div className="flex items-center">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    index < currentStep ? "bg-primary text-primary-foreground" : 
                    index === currentStep ? "border-2 border-primary bg-background" : "border-2 border-muted bg-background"
                  }`}>
                    {index < currentStep ? <Check className="h-4 w-4" /> : <span className="text-sm">{index + 1}</span>}
                  </div>
                  <span className={`ml-3 text-sm font-medium ${
                    index <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step}
                  </span>
                </div>
                {index !== STEPS.length - 1 && (
                  <div className="h-0.5 w-full bg-muted mx-2 sm:mx-4 flex-1">
                    {index < currentStep && <div className="h-full w-full bg-primary" />}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            
            {currentStep === 0 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <FieldGroup>
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <Field data-invalid={!!errors.email}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" {...register("email")} aria-invalid={!!errors.email} />
                    <FieldError errors={[errors.email]} />
                  </Field>
                  <Field data-invalid={!!errors.phone}>
                    <FieldLabel htmlFor="phone">Phone (Optional)</FieldLabel>
                    <Input id="phone" {...register("phone")} aria-invalid={!!errors.phone} />
                    <FieldError errors={[errors.phone]} />
                  </Field>
                </FieldGroup>

                <FieldGroup>
                  <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Field data-invalid={!!errors.firstName}>
                      <FieldLabel htmlFor="firstName">First name</FieldLabel>
                      <Input id="firstName" {...register("firstName")} aria-invalid={!!errors.firstName} />
                      <FieldError errors={[errors.firstName]} />
                    </Field>
                    <Field data-invalid={!!errors.lastName}>
                      <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                      <Input id="lastName" {...register("lastName")} aria-invalid={!!errors.lastName} />
                      <FieldError errors={[errors.lastName]} />
                    </Field>
                  </div>
                  <Field data-invalid={!!errors.company}>
                    <FieldLabel htmlFor="company">Company (Optional)</FieldLabel>
                    <Input id="company" {...register("company")} aria-invalid={!!errors.company} />
                    <FieldError errors={[errors.company]} />
                  </Field>
                  <Field data-invalid={!!errors.address1}>
                    <FieldLabel htmlFor="address1">Address</FieldLabel>
                    <Input id="address1" {...register("address1")} aria-invalid={!!errors.address1} />
                    <FieldError errors={[errors.address1]} />
                  </Field>
                  <Field data-invalid={!!errors.address2}>
                    <FieldLabel htmlFor="address2">Apartment, suite, etc. (Optional)</FieldLabel>
                    <Input id="address2" {...register("address2")} aria-invalid={!!errors.address2} />
                    <FieldError errors={[errors.address2]} />
                  </Field>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <Field className="sm:col-span-1" data-invalid={!!errors.city}>
                      <FieldLabel htmlFor="city">City</FieldLabel>
                      <Input id="city" {...register("city")} aria-invalid={!!errors.city} />
                      <FieldError errors={[errors.city]} />
                    </Field>
                    <Field className="sm:col-span-1" data-invalid={!!errors.state}>
                      <FieldLabel htmlFor="state">State</FieldLabel>
                      <Input id="state" {...register("state")} aria-invalid={!!errors.state} />
                      <FieldError errors={[errors.state]} />
                    </Field>
                    <Field className="col-span-2 sm:col-span-1" data-invalid={!!errors.zip}>
                      <FieldLabel htmlFor="zip">ZIP code</FieldLabel>
                      <Input id="zip" {...register("zip")} aria-invalid={!!errors.zip} />
                      <FieldError errors={[errors.zip]} />
                    </Field>
                  </div>
                </FieldGroup>
                
                <div className="flex justify-end pt-4">
                  <Button type="button" size="lg" onClick={handleNext}>
                    Continue to shipping
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <FieldSet>
                  <FieldLegend variant="legend">Shipping Method</FieldLegend>
                  <RadioGroup 
                    defaultValue={shippingMethod} 
                    onValueChange={(val) => setValue("shippingMethod", val as any)}
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="standard" id="standard" />
                      <div className="flex flex-1 items-center justify-between ml-2 cursor-pointer" onClick={() => setValue("shippingMethod", "standard")}>
                        <div className="flex flex-col">
                          <span className="font-medium">Standard Shipping</span>
                          <span className="text-sm text-muted-foreground">3-5 business days</span>
                        </div>
                        <span className="font-medium">{formatCurrency(1000)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="express" id="express" />
                      <div className="flex flex-1 items-center justify-between ml-2 cursor-pointer" onClick={() => setValue("shippingMethod", "express")}>
                        <div className="flex flex-col">
                          <span className="font-medium">Express Shipping</span>
                          <span className="text-sm text-muted-foreground">1-2 business days</span>
                        </div>
                        <span className="font-medium">{formatCurrency(2500)}</span>
                      </div>
                    </div>
                  </RadioGroup>
                  <FieldError errors={[errors.shippingMethod]} />
                </FieldSet>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="ghost" onClick={handleBack}>
                    Back to contact
                  </Button>
                  <Button type="button" size="lg" onClick={handleNext}>
                    Continue to payment
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <FieldGroup>
                  <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                  <div className="p-4 bg-muted/50 rounded-md mb-2 text-sm text-muted-foreground">
                    This is a mock checkout. Do not enter real credit card information. You can enter any dummy data to proceed.
                  </div>
                  
                  <Field data-invalid={!!errors.cardNumber}>
                    <FieldLabel htmlFor="cardNumber">Card number</FieldLabel>
                    <Input 
                      id="cardNumber" 
                      placeholder="1234-5678-1234-5678" 
                      {...cardNumberRest} 
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, "");
                        val = val.substring(0, 16);
                        const formatted = val.match(/.{1,4}/g)?.join('-') || val;
                        e.target.value = formatted;
                        onCardNumberChange(e);
                      }}
                      maxLength={19}
                      aria-invalid={!!errors.cardNumber} 
                    />
                    <FieldError errors={[errors.cardNumber]} />
                  </Field>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Field data-invalid={!!errors.cardExpiry}>
                      <FieldLabel htmlFor="cardExpiry">Expiration date (MM/YY)</FieldLabel>
                      <Input 
                        id="cardExpiry" 
                        placeholder="MM/YY" 
                        {...cardExpiryRest} 
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "");
                          if (val.length >= 2) {
                            val = val.substring(0, 2) + "/" + val.substring(2, 4);
                          }
                          e.target.value = val;
                          onCardExpiryChange(e);
                        }}
                        maxLength={5}
                        aria-invalid={!!errors.cardExpiry} 
                      />
                      <FieldError errors={[errors.cardExpiry]} />
                    </Field>
                    <Field data-invalid={!!errors.cardCvc}>
                      <FieldLabel htmlFor="cardCvc">Security code</FieldLabel>
                      <Input 
                        id="cardCvc" 
                        placeholder="CVC" 
                        {...cardCvcRest} 
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "");
                          e.target.value = val.substring(0, 3);
                          onCardCvcChange(e);
                        }}
                        maxLength={3}
                        aria-invalid={!!errors.cardCvc} 
                      />
                      <FieldError errors={[errors.cardCvc]} />
                    </Field>
                  </div>
                  
                  <Field data-invalid={!!errors.cardName}>
                    <FieldLabel htmlFor="cardName">Name on card</FieldLabel>
                    <Input id="cardName" {...register("cardName")} aria-invalid={!!errors.cardName} />
                    <FieldError errors={[errors.cardName]} />
                  </Field>
                </FieldGroup>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="ghost" onClick={handleBack} disabled={isSubmitting}>
                    Back to shipping
                  </Button>
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Pay now"}
                  </Button>
                </div>
              </div>
            )}

          </form>
        </FormProvider>
      </div>

      <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
        <OrderSummary shippingCost={shippingCost} />
      </div>
    </div>
  );
}
