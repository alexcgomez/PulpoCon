import { useState } from "react";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Textarea } from "@/presentation/components/ui/textarea";
import { Upload, FileText, User, Building, Briefcase } from "lucide-react";
import Link from "next/link";

export default function UploadCVPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append('cv', file);
      
      const response = await fetch('/api/upload-cv', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('CV subido exitosamente');
      }
    } catch (error) {
      console.error('Error al subir CV:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sube tu CV
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Comparte tu experiencia profesional para conectar mejor durante la conferencia
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Subir archivo
              </CardTitle>
              <CardDescription>
                Sube tu CV en formato PDF, DOC o DOCX
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <Label htmlFor="cv-upload" className="cursor-pointer">
                  <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Haz clic para seleccionar archivo
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    PDF, DOC, DOCX hasta 10MB
                  </div>
                </Label>
                <Input
                  id="cv-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subiendo...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <Button 
                className="w-full" 
                disabled={isUploading}
                onClick={() => document.getElementById('cv-upload')?.click()}
              >
                {isUploading ? 'Subiendo...' : 'Seleccionar archivo'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Información adicional
              </CardTitle>
              <CardDescription>
                Completa datos adicionales para mejorar las recomendaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" placeholder="Tu nombre" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Cargo actual</Label>
                <Input id="position" placeholder="Desarrollador Senior, etc." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" placeholder="Nombre de la empresa" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Habilidades principales</Label>
                <Textarea 
                  id="skills" 
                  placeholder="React, TypeScript, Node.js, etc."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Intereses profesionales</Label>
                <Textarea 
                  id="interests" 
                  placeholder="IA, desarrollo web, cloud computing, etc."
                  rows={3}
                />
              </div>

              <Button className="w-full">
                Guardar información
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="outline">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
