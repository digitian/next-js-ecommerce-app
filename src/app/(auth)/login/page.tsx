import { LoginForm } from "@/src/components/features/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Login | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Login to your ${process.env.NEXT_PUBLIC_APP_NAME} account`,
};

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <div className="flex flex-col gap-2 text-muted-foreground text-sm mt-3">
        <p className="m-0">Test email: <b>customer@example.com</b></p>
        <p>Test password: <b>Password123!</b></p>
      </div>
    </>
  )
}