import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import Link from "next/link";

export default function Home() {
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

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Crear mi Perfil</CardTitle>
                <CardDescription>
                  Completa tu perfil profesional para recibir recomendaciones personalizadas de networking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/chat">
                  <Button className="w-full">
                    Crear Perfil con IA
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Ver Recomendaciones</CardTitle>
                <CardDescription>
                  Descubre personas con intereses similares para conectar durante la conferencia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/recommendations">
                  <Button variant="outline" className="w-full">
                    Ver Recomendaciones
                  </Button>
                </Link>
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