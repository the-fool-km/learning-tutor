import { Target, Award, BookOpen, Flame } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProgressItem {
  id: string
  title: string
  description: string
  current: number
  target: number
  icon: React.ReactNode
  color: string
  reward?: string
}

const progressItems: ProgressItem[] = [
  {
    id: "streak",
    title: "Daily Streak",
    description: "Keep your momentum going",
    current: 7,
    target: 30,
    icon: <Flame className="w-5 h-5" />,
    color: "from-orange-500/30 to-orange-600/20",
    reward: "30-day badge",
  },
  {
    id: "questions",
    title: "Questions Mastery",
    description: "Ask and learn more",
    current: 142,
    target: 250,
    icon: <Target className="w-5 h-5" />,
    color: "from-neon-blue/30 to-neon-cyan/20",
    reward: "Expert badge",
  },
  {
    id: "notes",
    title: "Notes Summarized",
    description: "Master your learning materials",
    current: 38,
    target: 100,
    icon: <BookOpen className="w-5 h-5" />,
    color: "from-neon-purple/30 to-neon-blue/20",
    reward: "Scholar badge",
  },
  {
    id: "achievement",
    title: "Weekly Goal",
    description: "Meet your study targets",
    current: 4,
    target: 7,
    icon: <Award className="w-5 h-5" />,
    color: "from-yellow-500/30 to-yellow-600/20",
    reward: "500 XP",
  },
]

export function ProgressTracker() {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">Your Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {progressItems.map((item) => {
          const percentage = Math.round((item.current / item.target) * 100)
          const isComplete = percentage >= 100

          return (
            <div
              key={item.id}
              className={`glass-card rounded-xl p-5 border border-white/10 bg-gradient-to-br ${item.color} hover:border-white/20 transition-all duration-200`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-neon-blue">{item.icon}</span>
                    <h3 className="font-semibold text-foreground text-sm">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex items-end justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground">
                    {item.current} / {item.target}
                  </span>
                  <span className={`text-xs font-medium ${isComplete ? "text-green-400" : "text-neon-cyan"}`}>
                    {percentage}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-500"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Reward badge */}
              {item.reward && (
                <div className="flex items-center gap-2">
                  {isComplete ? (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px]">
                      ✓ {item.reward}
                    </Badge>
                  ) : (
                    <Badge className="bg-white/10 text-muted-foreground border-white/15 text-[10px]">
                      {item.reward}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
