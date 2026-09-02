"use client";

import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { logoutAction } from "@/src/lib/api/actions/auth-actions";
import { useAuthStore } from "@/src/hooks/use-auth-store";

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}

export function LogoutButton({
  variant = "outline",
  className,
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const reset = useAuthStore((state) => state.reset);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      reset();
      toast.success("Logged out successfully");
      await logoutAction();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleLogout}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
      ) : (
        <LogOut className="size-4" data-icon="inline-start" />
      )}
      <span>Log out</span>
    </Button>
  );
}
