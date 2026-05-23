import { useEffect, useState } from "react"
import { Sparkles, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Message } from "@/lib/gemini"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"
  const [displayedText, setDisplayedText] = useState("")
  const [, setIsTyping] = useState(!isUser && message.content.length > 0)

  useEffect(() => {
    if (isUser || !message.content || displayedText === message.content) {
      return
    }

    setIsTyping(true)
    let currentIndex = 0
    const speed = 20 // ms per character

    const typingInterval = setInterval(() => {
      if (currentIndex < message.content.length) {
        setDisplayedText(message.content.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
      }
    }, speed)

    return () => clearInterval(typingInterval)
  }, [message.content, isUser, displayedText])

  if (isUser) {
    setDisplayedText(message.content)
  }

  const timeString = message.timestamp.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 animate-fade-in`}>
      <div className={`max-w-[85%] sm:max-w-[70%] lg:max-w-[55%]`}>
        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 sm:px-5 py-3 sm:py-4 break-words ${
            isUser
              ? "bg-gradient-to-br from-neon-blue/40 to-neon-purple/40 border border-neon-blue/30 text-foreground"
              : "glass-card border border-white/10 bg-gradient-to-br from-white/5 to-white/2"
          }`}
        >
          {isUser ? (
            <p className="text-sm sm:text-base leading-relaxed">{displayedText}</p>
          ) : (
            <div className="text-sm sm:text-base leading-relaxed text-foreground whitespace-pre-wrap">
              {message.isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-neon-blue animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-neon-purple animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                  <span className="text-muted-foreground text-xs">AI thinking...</span>
                </div>
              ) : (
                displayedText
              )}
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className={`flex items-center gap-2 mt-2 text-xs text-muted-foreground ${isUser ? "justify-end" : "justify-start"}`}>
          {!isUser && !message.isLoading && displayedText === message.content && (
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500/70" />
          )}
          {isUser && (
            <>
              <Sparkles className="w-3.5 h-3.5 text-neon-blue" />
              <span>You</span>
            </>
          )}
          {!isUser && !message.isLoading && displayedText === message.content && (
            <>
              <Badge className="bg-neon-blue/20 text-neon-cyan border-neon-blue/30 text-[10px] px-1.5 py-0">
                AI
              </Badge>
              <span>{timeString}</span>
            </>
          )}
          {message.isLoading && <span>Generating response...</span>}
        </div>
      </div>
    </div>
  )
}
