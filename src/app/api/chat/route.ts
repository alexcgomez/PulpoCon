import { getUser } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, tool } from 'ai';
import { z } from 'zod';

const createProfileSchema = z.object({
  name: z.string().describe('Nombre completo de la persona'),
  email: z.string().email().describe('Email de contacto'),
  avatar: z.string().url().describe('URL de la foto de perfil'),
  title: z.string().describe('Puesto o cargo actual'),
  company: z.string().describe('Empresa donde trabaja actualmente'),
  experience: z.string().describe('Descripción de la experiencia profesional'),
  interests: z.array(z.string()).describe('Intereses profesionales y áreas de interés'),
  extra: z.string().describe('Información adicional que quiera mencionar (hobbies, actividades, etc.)'),
});

export async function POST(req: Request) {
  const user = await getUser();
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages: convertToModelMessages(messages),
    system: `Eres un asistente especializado en crear perfiles profesionales para networking en conferencias. Ya tienes la información básica del usuario de Google:
- Nombre: ${user?.user_metadata?.full_name || 'Usuario'}
- Email: ${user?.email || 'No disponible'}
- Foto: ${user?.user_metadata?.avatar_url || 'No disponible'}

Tu objetivo es recopilar información adicional para completar su perfil profesional.

PROCESO:
1. Saluda cordialmente usando su nombre (${user?.user_metadata?.full_name?.split(' ')[0] || 'Usuario'}) y explica que vas a hacer algunas preguntas rápidas para completar su perfil profesional
2. Haz preguntas específicas sobre:
   - Puesto o cargo actual
   - Empresa donde trabaja
   - Experiencia profesional (breve resumen)
   - Intereses profesionales y áreas de especialización
   - Algo extra que quiera mencionar (hobbies, actividades, etc.)

3. Haz UNA pregunta a la vez y espera la respuesta
4. Sé conversacional y amigable
5. Cuando tengas suficiente información (puesto, empresa, experiencia, intereses, extra), llama a la tool createProfile

REGLAS:
- Haz máximo 5-6 preguntas (es un proceso rápido)
- Si la persona no quiere responder algo, respeta su decisión
- Mantén un tono profesional pero cercano
- Responde siempre en español
`,
    tools: {
      createProfile: tool({
        description: 'Crear y guardar el perfil profesional completo de la persona',
        inputSchema: createProfileSchema,
        execute: async (profileData) => {
          try {
            // Combinar información de Google con datos recopilados
            const completeProfile = {
              name: user?.user_metadata?.full_name || profileData.name,
              email: user?.email || profileData.email,
              avatar: user?.user_metadata?.avatar_url || profileData.avatar,
              title: profileData.title,
              company: profileData.company,
              experience: profileData.experience,
              interests: profileData.interests,
              extra: profileData.extra,
            };

            // Guardar en la base de datos usando Prisma
            const savedProfile = await prisma.profile.upsert({
              where: { email: completeProfile.email },
              update: {
                name: completeProfile.name,
                avatar: completeProfile.avatar,
                title: completeProfile.title,
                company: completeProfile.company,
                experience: completeProfile.experience,
                interests: completeProfile.interests,
                extra: completeProfile.extra,
              },
              create: {
                name: completeProfile.name,
                email: completeProfile.email,
                avatar: completeProfile.avatar,
                title: completeProfile.title,
                company: completeProfile.company,
                experience: completeProfile.experience,
                interests: completeProfile.interests,
                extra: completeProfile.extra,
              },
            });

            console.log('Perfil guardado en la base de datos:', savedProfile);

            return completeProfile;
          } catch (error) {
            console.error('Error al guardar el perfil:', error);
            throw new Error('No se pudo guardar el perfil en la base de datos');
          }
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}