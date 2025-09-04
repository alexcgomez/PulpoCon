import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import Link from "next/link";

export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-red-600">
              Error de autenticación
            </CardTitle>
            <CardDescription className="text-center">
              Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/auth/login">
              <Button className="w-full">
                Volver al login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
