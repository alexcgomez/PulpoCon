'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Card, CardContent } from '@/presentation/components/ui/card';
import { Button } from '@/presentation/components/ui/button';
import Link from 'next/link';
import { Profile, ProfileBadge } from '@/presentation/components/ProfileBadge';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, error, regenerate } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Crear tu Perfil Profesional
              </h1>
              <p className="text-muted-foreground">
                Nuestra IA te ayudará a crear un perfil completo para networking
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">
                Volver al inicio
              </Button>
            </Link>
          </div>

          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {messages.map(message => (
              <div key={message.id}>
                {message.role === 'assistant' && message.parts.some(part => part.type === 'tool-createProfile') ? (
                  <Card className="mr-auto max-w-[80%]">
                    <CardContent className="p-4">
                      <div className="font-semibold text-sm mb-2">Asistente IA</div>
                      <div className="whitespace-pre-wrap">
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case 'text':
                              return (
                                <div key={`${message.id}-${i}`} className="text-sm mb-4">
                                  {part.text}
                                </div>
                              );
                            case 'tool-createProfile':
                              if (part.state === 'output-available') {
                                return (
                                  <div key={`${message.id}-profile`} className="mt-4">
                                    <ProfileBadge profile={part.output as Profile} />
                                  </div>
                                );
                              }
                              return null;
                            default:
                              return null;
                          }
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className={`${
                    message.role === 'user' 
                      ? 'ml-auto max-w-[80%] bg-primary text-primary-foreground' 
                      : 'mr-auto max-w-[80%]'
                  }`}>
                    <CardContent className="p-4">
                      <div className="font-semibold text-sm mb-2">
                        {message.role === 'user' ? 'Tú' : 'Asistente IA'}
                      </div>
                      <div className="whitespace-pre-wrap">
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case 'text':
                              return (
                                <div key={`${message.id}-${i}`} className="text-sm">
                                  {part.text}
                                </div>
                              );
                            default:
                              return null;
                          }
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>

          {error && (
            <Card className="mb-6 border-destructive">
              <CardContent className="p-4">
                <div className="text-destructive font-semibold mb-2">
                  Error
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {error.message}
                </div>
                <Button 
                  onClick={() => regenerate()} 
                  variant="outline" 
                  size="sm"
                >
                  Reintentar
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="sticky bottom-4">
            <CardContent className="p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  className="flex-1 p-3 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={input}
                  placeholder="Responde a la pregunta..."
                  onChange={e => setInput(e.target.value)}
                  disabled={status !== 'ready'}
                />
                <Button 
                  type="submit" 
                  disabled={status !== 'ready' || !input.trim()}
                  className="px-6"
                >
                  {status === 'streaming' ? 'Enviando...' : 'Enviar'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
