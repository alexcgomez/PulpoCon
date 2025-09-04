'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { Button } from '@/presentation/components/ui/button';
import Link from 'next/link';
import { Profile } from '@/presentation/components/ProfileBadge';
import { ProfileToolOutput } from '@/presentation/components/ProfileToolOutput';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageAvatar,
} from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputToolbar,
} from '@/components/ai-elements/prompt-input';
import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolOutput,
} from '@/components/ai-elements/tool';

export default function Chat() {
  const { messages, sendMessage, status, error, regenerate } = useChat();
  const [input, setInput] = useState('');

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

          <div className="h-[600px] border rounded-lg flex flex-col">
            <Conversation className="flex-1 min-h-0">
              <ConversationContent>
                {messages.map((message, index) => (
                  <Message key={index} from={message.role}>
                    <MessageAvatar
                      src={
                        message.role === 'user'
                          ? '/api/placeholder/32/32'
                          : '/api/placeholder/32/32'
                      }
                      name={message.role === 'user' ? 'Tú' : 'IA'}
                    />
                    <MessageContent>
                      {message.parts.map((part, partIndex) => {
                        switch (part.type) {
                          case 'text':
                            return (
                              <Response key={`${index}-${partIndex}`}>
                                {part.text}
                              </Response>
                            );
                          case 'tool-createProfile':
                            return (
                              <Tool key={`${index}-tool-${partIndex}`} defaultOpen>
                                <ToolHeader
                                  type="tool-createProfile"
                                  state="output-available"
                                />
                                <ToolContent>
                                  <ToolOutput
                                    output={
                                      <ProfileToolOutput
                                        profile={part.output as Profile}
                                      />
                                    }
                                    errorText=""
                                  />
                                </ToolContent>
                              </Tool>
                            );
                          default:
                            return null;
                        }
                      })}
                    </MessageContent>
                  </Message>
                ))}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>
          </div>

          {error && (
            <Card className="mt-4 border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Error</CardTitle>
              </CardHeader>
              <CardContent>
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

          <div className="mt-4">
            <PromptInput onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) {
                sendMessage({ text: input });
                setInput('');
              }
            }}>
              <PromptInputTextarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Responde a la pregunta..."
                disabled={status !== 'ready'}
              />
              <PromptInputToolbar>
                <PromptInputSubmit status={status} />
              </PromptInputToolbar>
            </PromptInput>
          </div>
        </div>
      </div>
    </div>
  );
}