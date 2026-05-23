import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface SuggestionItem {
  text: string
  icon: string
}

const defaultSuggestions: SuggestionItem[] = [
  { text: "Explain quantum mechanics", icon: "⚛️" },
  { text: "Help with calculus", icon: "📐" },
  { text: "Essay writing tips", icon: "✍️" },
  { text: "Science experiment ideas", icon: "🔬" },
]

interface ChatSuggestionsProps {
  onSuggestionClick: (text: string) => void
  suggestions?: SuggestionItem[]
  isLoading?: boolean
}

export function ChatSuggestions({ onSuggestionClick, suggestions = defaultSuggestions, isLoading }: ChatSuggestionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <Sparkles className="w-4 h-4 text-neon-blue" />
        <h3 className="text-sm font-medium">Try asking about...</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            onClick={() => onSuggestionClick(suggestion.text)}
            disabled={isLoading}
            className="glass-card border border-white/10 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 hover:from-neon-blue/20 hover:to-neon-purple/20 hover:border-neon-blue/30 text-foreground justify-start gap-2 h-auto py-3 px-4 text-sm transition-all duration-200 group"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">{suggestion.icon}</span>
            <span className="text-left flex-1">{suggestion.text}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
