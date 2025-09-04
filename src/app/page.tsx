import { redirect } from 'next/navigation';
import { getUser } from '@/lib/supabase/server';
import { getUserProfile } from '@/lib/profile';
import { UserProfile } from '@/presentation/components/UserProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const user = await getUser();
  
  // Si no está logado, redirigir a login
  if (!user) {
    redirect('/auth/login');
  }

  const profile = await getUserProfile();

  // Si tiene perfil, mostrar su perfil completo
  if (profile) {
    return <UserProfile profile={profile} />;
  }

  // Si no tiene perfil, mostrar página vacía con botón para crear perfil
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Bienvenido a PulpoCon
            </h1>
            <p className="text-xl text-muted-foreground">
              Tu recomendador de networking para conferencias
            </p>
          </div>

          <div className="flex justify-center">
            <Card className="max-w-md w-full">
              <CardHeader className="text-center">
                <CardTitle className="text-foreground">Crear mi Perfil</CardTitle>
                <CardDescription>
                  Completa tu perfil profesional para comenzar a hacer networking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/chat">
                  <Button className="w-full" size="lg">
                    Crear Perfil con IA
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Nuestra IA te ayudará a crear un perfil profesional completo
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-foreground">¿Cómo funciona?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">
                      1
                    </div>
                    <p className="text-muted-foreground">
                      Crea tu perfil profesional con nuestra IA
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">
                      2
                    </div>
                    <p className="text-muted-foreground">
                      Recibe recomendaciones personalizadas de networking
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">
                      3
                    </div>
                    <p className="text-muted-foreground">
                      Conecta con personas afines durante la conferencia
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}