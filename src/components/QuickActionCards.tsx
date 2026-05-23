import { MessageCircle, Camera, FileText, Brain, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface QuickAction {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
  badge?: string
  mockContent: React.ReactNode
}

const quickActions: QuickAction[] = [
  {
    id: "chat",
    icon: <MessageCircle className="w-6 h-6" />,
    title: "AI Chat Tutor",
    description: "Ask anything and get instant answers",
    gradient: "from-neon-blue/20 to-neon-cyan/10",
    mockContent: (
      <div className="space-y-2 text-xs mt-3">
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full bg-neon-blue/30 flex-shrink-0" />
          <div className="glass rounded px-2.5 py-1 text-muted-foreground">What's photosynthesis?</div>
        </div>
        <div className="text-neon-cyan text-[10px] font-medium">Answer ready in 0.3s</div>
      </div>
    ),
  },
  {
    id: "scanner",
    icon: <Camera className="w-6 h-6" />,
    title: "Homework Scanner",
    description: "Snap & solve any homework instantly",
    gradient: "from-neon-purple/20 to-neon-blue/10",
    badge: "Popular",
    mockContent: (
      <div className="space-y-2 text-xs mt-3">
        <div className="glass rounded border border-dashed border-white/20 px-2 py-2 text-center">
          <Camera className="w-4 h-4 mx-auto text-neon-purple mb-1" />
          <div className="text-[10px] text-muted-foreground">Ready to scan</div>
        </div>
      </div>
    ),
  },
  {
    id: "notes",
    icon: <FileText className="w-6 h-6" />,
    title: "Notes Summarizer",
    description: "Turn notes into concise summaries",
    gradient: "from-neon-cyan/20 to-neon-purple/10",
    mockContent: (
      <div className="space-y-2 text-xs mt-3">
        <div className="glass rounded px-2.5 py-1.5 text-[10px]">
          <div className="text-muted-foreground line-through opacity-60 mb-1.5">Lorem ipsum dolor sit amet...truncated</div>
          <div className="text-neon-cyan">✓ 3 key points extracted</div>
        </div>
      </div>
    ),
  },
  {
    id: "quiz",
    icon: <Brain className="w-6 h-6" />,
    title: "Quiz Generator",
    description: "Auto-generate practice questions",
    gradient: "from-neon-purple/20 to-neon-cyan/10",
    badge: "New",
    mockContent: (
      <div className="space-y-2 text-xs mt-3">
        <div className="glass rounded px-2.5 py-1.5">
          <div className="text-[10px] text-muted-foreground mb-1">Q: What is photosynthesis?</div>
          <div className="h-1.5 bg-neon-blue/30 rounded" style={{ width: "70%" }} />
        </div>
      </div>
    ),
  },
]

export function QuickActionCards() {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <div
            key={action.id}
            className={`glass-card rounded-2xl p-5 border border-white/10 bg-gradient-to-br ${action.gradient} hover:border-white/20 hover:scale-[1.02] transition-all duration-300 group cursor-pointer`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="text-neon-blue group-hover:text-neon-cyan transition-colors">
                {action.icon}
              </div>
              {action.badge && (
                <Badge className="bg-gradient-to-r from-neon-blue to-neon-purple text-white border-0 text-[10px]">
                  {action.badge}
                </Badge>
              )}
            </div>

            {/* Title & description */}
            <h3 className="font-semibold text-foreground text-sm mb-1">
              {action.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              {action.description}
            </p>

            {/* Mock content */}
            {action.mockContent}

            {/* CTA */}
            <Button
              size="sm"
              className="w-full mt-4 bg-gradient-to-r from-neon-blue/30 to-neon-purple/30 hover:from-neon-blue/40 hover:to-neon-purple/40 text-foreground border border-neon-blue/20 hover:border-neon-blue/40 transition-all duration-200 h-8 text-xs"
            >
              Open
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
