"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/presentation/components/ui/button";
import { useState } from "react";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error al cerrar sesión:", error);
      }
    } catch (error) {
      console.error("Error inesperado:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant="outline"
      size="sm"
    >
      {isLoading ? "Cerrando sesión..." : "Cerrar sesión"}
    </Button>
  );
}
