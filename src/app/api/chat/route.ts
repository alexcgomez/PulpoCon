import { getUser } from '@/lib/supabase/server';
import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, tool } from 'ai';
import { z } from 'zod';

const createProfileSchema = z.object({
  name: z.string().describe('Nombre completo de la persona'),
  title: z.string().describe('Título profesional o cargo actual'),
  company: z.string().describe('Empresa donde trabaja actualmente'),
  experience: z.string().describe('Descripción de la experiencia profesional'),
  skills: z.array(z.string()).describe('Lista de habilidades técnicas y profesionales'),
  interests: z.array(z.string()).describe('Intereses profesionales y áreas de interés'),
  projects: z.array(z.string()).describe('Proyectos destacados o trabajos relevantes'),
  goals: z.string().describe('Objetivos de networking y crecimiento profesional'),
  location: z.string().describe('Ubicación geográfica'),
  email: z.string().email().describe('Email de contacto profesional'),
});

export async function POST(req: Request) {
  const user = await getUser();
  const { messages } = await req.json();

  console.log(user);

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages: convertToModelMessages(messages),
    system: `Eres un asistente especializado en crear perfiles profesionales para networking en conferencias. Tu objetivo es recopilar información completa sobre el perfil profesional de la persona para crear un perfil atractivo y útil para networking.

PROCESO:
1. Saluda cordialmente, el usuario es ${user?.user_metadata?.full_name.split(' ')[0]} y explica que vas a hacer algunas preguntas para crear su perfil profesional
2. Haz preguntas específicas sobre:
   - título profesional
   - Empresa actual y experiencia
   - Habilidades técnicas y profesionales
   - Intereses y áreas de especialización
   - Proyectos destacados
   - Objetivos de networking
   - Ubicación y contacto

3. Haz UNA pregunta a la vez y espera la respuesta
4. Sé conversacional y amigable
5. Cuando tengas suficiente información (al menos nombre, título, empresa, experiencia, skills, intereses, objetivos), llama a la tool createProfile

REGLAS:
- Haz máximo 8-10 preguntas
- Si la persona no quiere responder algo, respeta su decisión
- Mantén un tono profesional pero cercano
- Responde siempre en español
- Cuando llames a createProfile, incluye un mensaje de felicitación y explica que su perfil ha sido creado`,

    tools: {
      createProfile: tool({
        description: 'Crear y guardar el perfil profesional completo de la persona',
        inputSchema: createProfileSchema,
        execute: async (profile) => {
          // Aquí guardarías en la base de datos
          // Por ahora solo retornamos el perfil
          console.log('Perfil creado:', profile);

          return profile;
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}