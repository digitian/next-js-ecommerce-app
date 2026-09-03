"use client";

import { useMemo, useState } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/src/components/ui/input-group";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, EyeOffIcon, EyeIcon, CheckIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { registerAction } from "@/src/lib/api/actions/auth-actions";

const requirements = [
  { regex: /.{12,}/, text: 'At least 12 characters' },
  { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
  { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
  { regex: /[0-9]/, text: 'At least 1 number' },
  {
    regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/,
    text: 'At least 1 special character'
  }
];

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(12, "Password must be at least 12 characters")
    .regex(/[a-z]/, "Must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Must contain at least 1 number")
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/, "Must contain at least 1 special character"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const toggleVisibility = () => setIsVisible(prevState => !prevState);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const passwordValue = watch("password");

  const strength = useMemo(() => requirements.map(req => ({
    met: req.regex.test(passwordValue || ''),
    text: req.text
  })), [passwordValue]);

  const strengthScore = useMemo(() => {
    return strength.filter(req => req.met).length;
  }, [strength]);

  const getColor = (score: number) => {
    if (score === 0) return 'bg-border';
    if (score <= 1) return 'bg-destructive';
    if (score <= 2) return 'bg-orange-500';
    if (score <= 3) return 'bg-amber-500';
    if (score === 4) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  const getText = (score: number) => {
    if (score === 0) return 'Enter a password';
    if (score <= 2) return 'Weak password';
    if (score <= 3) return 'Medium password';
    if (score === 4) return 'Strong password';
    return 'Very strong password';
  };

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    setServerError(null);

    const result = await registerAction({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });

    setIsLoading(false);

    if (!result.success) {
      const errorMsg = result.error || "Failed to create account.";
      setServerError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    toast.success("Account created successfully", {
      description: "Please sign in with your new credentials."
    });
    router.push("/login");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to register your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {serverError && (
                <div
                  role="alert"
                  className="rounded-md bg-destructive/10 p-3 text-sm text-destructive"
                >
                  {serverError}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <Field data-invalid={!!errors.firstName}>
                  <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                  <Input
                    id="firstName"
                    placeholder="John"
                    aria-invalid={!!errors.firstName}
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <FieldDescription className="text-destructive text-sm">
                      {errors.firstName.message}
                    </FieldDescription>
                  )}
                </Field>
                <Field data-invalid={!!errors.lastName}>
                  <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    aria-invalid={!!errors.lastName}
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <FieldDescription className="text-destructive text-sm">
                      {errors.lastName.message}
                    </FieldDescription>
                  )}
                </Field>
              </div>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <FieldDescription className="text-destructive text-sm">
                    {errors.email.message}
                  </FieldDescription>
                )}
              </Field>
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup className="relative">
                  <InputGroupInput
                    id="password"
                    type={isVisible ? 'text' : 'password'}
                    placeholder="Password"
                    aria-invalid={!!errors.password}
                    {...register("password")}
                  />
                  <InputGroupAddon align="inline-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={toggleVisibility}
                      className="text-muted-foreground hover:bg-transparent"
                    >
                      {isVisible ? (
                        <EyeOffIcon />
                      ) : (
                        <EyeIcon />
                      )}
                      <span className="sr-only">{isVisible ? 'Hide password' : 'Show password'}</span>
                    </Button>
                  </InputGroupAddon>
                </InputGroup>

                <div className="mb-2 mt-3 flex h-1 w-full gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={cn(
                        'h-full flex-1 rounded-full transition-all duration-500 ease-out',
                        index < strengthScore ? getColor(strengthScore) : 'bg-border'
                      )}
                    />
                  ))}
                </div>

                <p className="text-foreground text-sm font-medium">{getText(strengthScore)}. Must contain:</p>

                <ul className="mb-1 space-y-1.5 mt-2">
                  {strength.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                      {req.met ? (
                        <CheckIcon className="size-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <XIcon className="text-muted-foreground size-4" />
                      )}
                      <span className={cn('text-xs', req.met ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground')}>
                        {req.text}
                        <span className="sr-only">{req.met ? ' - Requirement met' : ' - Requirement not met'}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                {errors.password && (
                  <FieldDescription className="text-destructive text-sm mt-2">
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>
              <Field data-invalid={!!errors.confirmPassword}>
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  aria-invalid={!!errors.confirmPassword}
                  {...register("confirmPassword")} 
                />
                {errors.confirmPassword && (
                  <FieldDescription className="text-destructive text-sm">
                    {errors.confirmPassword.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="animate-spin" data-icon="inline-start" />}
                  Register
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                    Login
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
