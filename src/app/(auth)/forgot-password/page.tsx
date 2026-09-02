import { ForgotPasswordForm } from "@/src/components/features/auth/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Forgot Password | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Reset your password for ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function ForgotPasswordPage() {
    return <ForgotPasswordForm />
}