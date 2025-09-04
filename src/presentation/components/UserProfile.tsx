import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { Button } from '@/presentation/components/ui/button';
import { Badge } from '@/presentation/components/ui/badge';
import { Profile } from './ProfileBadge';
import Link from 'next/link';

interface UserProfileProps {
  profile: Profile;
}

export function UserProfile({ profile }: UserProfileProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Mi Perfil Profesional
            </h1>
            <p className="text-xl text-muted-foreground">
              Aquí tienes tu perfil completo para networking
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-primary">
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary-foreground">
                        {profile.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <CardTitle className="text-2xl">{profile.name}</CardTitle>
                <p className="text-muted-foreground text-lg">{profile.title}</p>
                <p className="text-sm text-muted-foreground">{profile.company}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Experiencia</h4>
                  <p className="text-sm text-muted-foreground">{profile.experience}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Intereses</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {profile.extra && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Algo más sobre mí</h4>
                    <p className="text-sm text-muted-foreground">{profile.extra}</p>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    ✉️ {profile.email}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Acciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/chat">
                    <Button className="w-full" size="lg">
                      Iniciar Chat de Networking
                    </Button>
                  </Link>
                  <p className="text-sm text-muted-foreground text-center">
                    Conecta con otros profesionales y expande tu red
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Estadísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">0</div>
                      <div className="text-sm text-muted-foreground">Conexiones</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">0</div>
                      <div className="text-sm text-muted-foreground">Recomendaciones</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
