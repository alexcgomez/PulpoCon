import { prisma } from './prisma';
import { getUser } from './supabase/server';

export async function getUserProfile() {
  try {
    const user = await getUser();
    
    if (!user?.email) {
      return null;
    }

    const profile = await prisma.profile.findUnique({
      where: { email: user.email }
    });

    return profile;
  } catch (error) {
    console.error('Error al obtener perfil del usuario:', error);
    return null;
  }
}

export async function hasUserProfile(): Promise<boolean> {
  const profile = await getUserProfile();
  return profile !== null;
}
