import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { Badge } from './ui/badge';

export interface Profile {
  name: string;
  title: string;
  company: string;
  experience: string;
  skills: string[];
  interests: string[];
  projects: string[];
  goals: string;
  location: string;
  email: string;
}

interface ProfileBadgeProps {
  profile: Profile;
}

export function ProfileBadge({ profile }: ProfileBadgeProps) {
  return (
    <Card className="w-full max-w-md mx-auto border-2 border-primary">
      <CardHeader className="text-center pb-4">
        <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl font-bold text-primary-foreground">
            {profile.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <CardTitle className="text-xl">{profile.name}</CardTitle>
        <p className="text-muted-foreground">{profile.title}</p>
        <p className="text-sm text-muted-foreground">{profile.company}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-2">Experiencia</h4>
          <p className="text-sm text-muted-foreground">{profile.experience}</p>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-2">Habilidades</h4>
          <div className="flex flex-wrap gap-1">
            {profile.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-2">Intereses</h4>
          <div className="flex flex-wrap gap-1">
            {profile.interests.map((interest, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {profile.projects.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-2">Proyectos</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {profile.projects.map((project, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{project}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="font-semibold text-sm mb-2">Objetivos de Networking</h4>
          <p className="text-sm text-muted-foreground">{profile.goals}</p>
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            📍 {profile.location} • ✉️ {profile.email}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
