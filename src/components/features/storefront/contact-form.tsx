"use client";

import { useState, useRef } from "react";
import { Turnstile, TurnstileRef } from "nextjs-turnstile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button as StatefulButton } from "@/src/components/ui/stateful-button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { 
  FieldGroup, 
  Field, 
  FieldLabel, 
  FieldError 
} from "@/src/components/ui/field";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileRef>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit message");
      }

      toast.success("Message sent successfully!");
      reset();
      turnstileRef.current?.reset();
      setToken(null);
    } catch {
      toast.error("Failed to send message. Please try again later.");
      turnstileRef.current?.reset();
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" placeholder="Enter your name" aria-invalid={!!errors.name} {...register("name")} />
          {errors.name?.message && <FieldError>{errors.name.message}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="Enter your email" aria-invalid={!!errors.email} {...register("email")} />
          {errors.email?.message && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.subject}>
          <FieldLabel htmlFor="subject">Subject</FieldLabel>
          <Input id="subject" placeholder="Enter subject" aria-invalid={!!errors.subject} {...register("subject")} />
          {errors.subject?.message && <FieldError>{errors.subject.message}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea id="message" placeholder="Enter your message" rows={5} aria-invalid={!!errors.message} {...register("message")} />
          {errors.message?.message && <FieldError>{errors.message.message}</FieldError>}
        </Field>

        <div className="mb-4 overflow-hidden">
          <Turnstile
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
            size="flexible"
            onSuccess={setToken}
          />
        </div>

        <StatefulButton
          disabled={isLoading || !token}
          className="w-full rounded-md"
          onClick={async () => {
            await handleSubmit(onSubmit)();
          }}
        >
          Send Message
        </StatefulButton>
      </FieldGroup>
    </form>
  );
}
