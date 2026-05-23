import { Clock, CheckCircle2, Zap, FileText, Brain } from "lucide-react"

interface Activity {
  id: string
  type: "question" | "note" | "quiz"
  title: string
  description: string
  timestamp: string
  icon: React.ReactNode
  color: string
}

const activities: Activity[] = [
  {
    id: "1",
    type: "question",
    title: "Asked about quantum mechanics",
    description: "Got detailed explanation with examples",
    timestamp: "2 hours ago",
    icon: <Zap className="w-4 h-4" />,
    color: "text-neon-blue",
  },
  {
    id: "2",
    type: "note",
    title: "Summarized biology notes",
    description: "12 pages condensed to key concepts",
    timestamp: "5 hours ago",
    icon: <FileText className="w-4 h-4" />,
    color: "text-neon-cyan",
  },
  {
    id: "3",
    type: "quiz",
    title: "Completed math quiz",
    description: "Scored 92% on algebra practice",
    timestamp: "Yesterday",
    icon: <Brain className="w-4 h-4" />,
    color: "text-neon-purple",
  },
  {
    id: "4",
    type: "question",
    title: "Scanned homework problem",
    description: "Step-by-step solution provided",
    timestamp: "2 days ago",
    icon: <Zap className="w-4 h-4" />,
    color: "text-neon-blue",
  },
]

export function RecentActivity() {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="divide-y divide-white/5">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 hover:bg-white/5 transition-all duration-200 hover:translate-x-1 group"
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 mt-1 ${activity.color}`}>
                  {activity.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm group-hover:text-neon-blue transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {activity.description}
                  </p>
                </div>

                {/* Timestamp */}
                <div className="flex-shrink-0 text-right">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{activity.timestamp}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-green-500/70" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/5 text-center">
          <button className="text-xs text-neon-blue hover:text-neon-cyan transition-colors font-medium">
            View all activity →
          </button>
        </div>
      </div>
    </div>
  )
}
