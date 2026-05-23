import { useState, useRef } from "react"
import { Send, Mic, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ChatInputProps {
  onSubmit: (message: string) => void
  isLoading: boolean
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSubmit(input.trim())
      setInput("")
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Send on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    setInput(textarea.value)

    // Auto-resize textarea
    textarea.style.height = "auto"
    const newHeight = Math.min(textarea.scrollHeight, 120) // Max 120px
    textarea.style.height = `${newHeight}px`
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="glass-card rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-3 sm:p-4 transition-all duration-200 focus-within:border-neon-blue/30 focus-within:from-neon-blue/10 focus-within:to-white/5">
        <div className="flex gap-2 sm:gap-3">
          {/* Textarea */}
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your studies... (Shift+Enter for new line)"
            className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none text-sm sm:text-base"
            rows={1}
            disabled={isLoading}
          />

          {/* Action buttons */}
          <div className="flex flex-col gap-2 items-center justify-end">
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              size="icon"
              className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full ${
                input.trim() && !isLoading
                  ? "bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 text-white border-0"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              } transition-all duration-200`}
              title="Send message (Enter)"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>

        {/* Quick actions bar */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-white/10 justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-muted-foreground hover:text-foreground hover:bg-white/10 gap-1"
            title="Voice input (coming soon)"
            disabled
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Voice</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-muted-foreground hover:text-foreground hover:bg-white/10 gap-1"
            title="Attach image (coming soon)"
            disabled
          >
            <Paperclip className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Attach</span>
          </Button>
        </div>
      </div>

      {/* Keyboard shortcut info */}
      <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
        Press Enter to send, Shift+Enter for new line
      </p>
    </form>
  )
}
