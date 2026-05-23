import { useState, useEffect, useRef } from "react"
import { MessageCircle, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "@/components/ChatMessage"
import { ChatInput } from "@/components/ChatInput"
import { ChatSuggestions } from "@/components/ChatSuggestions"
import { sendMessage, generateId } from "@/lib/gemini"
import type { Message } from "@/lib/gemini"

export function ChatTutor() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight
        }, 100)
      }
    }
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    // Add loading message
    const loadingMessage: Message = {
      id: generateId(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    }
    setMessages((prev) => [...prev, loadingMessage])

    try {
      const response = await sendMessage(content)

      // Replace loading message with actual response
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          id: generateId(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
          isLoading: false,
        },
      ])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get response from AI"
      setError(errorMessage)

      // Remove loading message and show error
      setMessages((prev) => prev.slice(0, -1))
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
          timestamp: new Date(),
          isLoading: false,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setError(null)
  }

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      handleNewChat()
    }
  }

  const showSuggestions = messages.length === 0
  const hasMessages = messages.length > 0

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-white/10 sticky top-0 z-40 py-3 sm:py-4 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center neon-glow-blue">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gradient">AI Chat Tutor</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Powered by Gemini</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {hasMessages && (
              <>
                <Button
                  onClick={handleNewChat}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground hover:text-foreground hover:bg-white/10"
                  title="New chat"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                  onClick={handleClearChat}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  title="Clear chat"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Messages area */}
      <ScrollArea ref={scrollRef} className="flex-1 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 sm:py-6 max-w-4xl mx-auto w-full">
          {showSuggestions ? (
            <div className="h-full flex flex-col justify-center items-center space-y-8 py-10 sm:py-20">
              {/* Welcome section */}
              <div className="text-center space-y-3 mb-8">
                <div className="inline-block">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 flex items-center justify-center mb-4">
                    <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-neon-blue" />
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Welcome to AI Chat Tutor</h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                  Ask me anything about your studies. I'm here to help you learn and succeed.
                </p>
              </div>

              {/* Suggestions */}
              <ChatSuggestions onSuggestionClick={handleSendMessage} isLoading={isLoading} />
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="glass border-t border-white/10 sticky bottom-0 z-40 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto w-full">
          {error && (
            <div className="mb-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
              {error}
            </div>
          )}
          <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
