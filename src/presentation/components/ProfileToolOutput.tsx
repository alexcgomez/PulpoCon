import { Profile, ProfileBadge } from './ProfileBadge';

interface ProfileToolOutputProps {
  profile: Profile;
}

export function ProfileToolOutput({ profile }: ProfileToolOutputProps) {
  return (
    <div className="space-y-2 p-4">
      <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        Perfil Creado
      </h4>
      <div className="overflow-x-auto rounded-md text-xs">
        <ProfileBadge profile={profile} />
      </div>
    </div>
  );
}
