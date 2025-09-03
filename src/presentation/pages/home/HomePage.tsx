import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Upload, Users, UserCheck, FileText } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            PulpoCon Networking
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Conecta con profesionales durante la conferencia. Sube tu CV y descubre 
            personas con intereses similares para maximizar tu experiencia de networking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg">Subir CV</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Comparte tu experiencia y habilidades para conectar mejor
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg">Análisis IA</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Nuestra IA extrae información relevante de tu CV
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-lg">Recomendaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Recibe sugerencias personalizadas de contactos
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-lg">Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Gestiona tu información y conexiones
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <div className="space-x-4">
            <Link href="/upload-cv">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-5 h-5 mr-2" />
                Subir mi CV
              </Button>
            </Link>
            <Link href="/profile">
              <Button size="lg" variant="outline">
                <UserCheck className="w-5 h-5 mr-2" />
                Ver mi perfil
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ¿Ya tienes cuenta? <Link href="/profile" className="text-blue-600 hover:underline">Accede aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
