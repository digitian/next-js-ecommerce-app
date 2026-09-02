import { LoginForm } from "@/src/components/features/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Login | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Login to your ${process.env.NEXT_PUBLIC_APP_NAME} account`,
};

export default function LoginPage() {
  return <LoginForm />
}