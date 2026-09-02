import { RegisterForm } from "@/src/components/features/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Register | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Register to ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function RegisterPage() {
  return <RegisterForm />;
}