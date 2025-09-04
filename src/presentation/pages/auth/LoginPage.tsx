import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { GoogleLoginButton } from "@/presentation/components/auth/GoogleLoginButton";

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">PulpoCon</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Recomendador de networking para conferencias
          </p>
        </div>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Iniciar sesión</CardTitle>
            <CardDescription className="text-center">
              Accede con tu cuenta de Google para comenzar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <GoogleLoginButton />
            <div className="text-center text-sm text-muted-foreground">
              Al continuar, aceptas nuestros términos de servicio y política de privacidad
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
