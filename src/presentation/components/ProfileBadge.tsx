import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { Badge } from './ui/badge';
import Image from 'next/image';

export interface Profile {
  name: string;
  email: string;
  avatar: string;
  title: string;
  company: string;
  experience: string;
  interests: string[];
  extra: string;
}

interface ProfileBadgeProps {
  profile: Profile;
}

export function ProfileBadge({ profile }: ProfileBadgeProps) {
  return (
    <Card className="w-full max-w-md mx-auto border-2 border-primary">
      <CardHeader className="text-center pb-4">
        <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
          {profile.avatar ? (
            <img
              src={profile.avatar} 
              alt={profile.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-primary flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
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
          <h4 className="font-semibold text-sm mb-2">Intereses</h4>
          <div className="flex flex-wrap gap-1">
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

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            ✉️ {profile.email}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
