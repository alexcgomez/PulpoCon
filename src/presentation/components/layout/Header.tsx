"use client";

import { useAuth } from "@/presentation/hooks/useAuth";
import { LogoutButton } from "@/presentation/components/auth/LogoutButton";
import { Button } from "@/presentation/components/ui/button";
import Link from "next/link";

export function Header() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-foreground">
              PulpoCon
            </Link>
            <div className="animate-pulse bg-muted h-8 w-20 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-foreground">
            PulpoCon
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Hola, {user.user_metadata?.full_name || user.email}
                </span>
                <LogoutButton />
              </>
            ) : (
              <Link href="/auth/login">
                <Button variant="outline">
                  Iniciar sesión
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
