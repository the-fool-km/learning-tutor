import { Badge } from "@/components/ui/badge"
import type { User } from "firebase/auth"

interface WelcomeSectionProps {
  user: User
}

export function WelcomeSection({ user }: WelcomeSectionProps) {
  const displayName = user.isAnonymous
    ? "Guest"
    : user.displayName ?? user.email?.split("@")[0] ?? "Learner"

  return (
    <div className="space-y-4 mb-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
          Welcome back, <span className="text-gradient">{displayName}</span> 👋
        </h1>
        <p className="text-muted-foreground">Keep up the momentum with your learning goals</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-card rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl">🔥</div>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-[10px]">+2 days</Badge>
          </div>
          <div className="text-2xl font-bold text-foreground">7</div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl">💬</div>
            <Badge className="bg-neon-blue/20 text-neon-cyan border-neon-blue/30 text-[10px]">+12</Badge>
          </div>
          <div className="text-2xl font-bold text-foreground">142</div>
          <div className="text-xs text-muted-foreground">Questions</div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl">📝</div>
            <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 text-[10px]">+8</Badge>
          </div>
          <div className="text-2xl font-bold text-foreground">38</div>
          <div className="text-xs text-muted-foreground">Notes</div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl">⭐</div>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-[10px]">98%</Badge>
          </div>
          <div className="text-2xl font-bold text-foreground">24</div>
          <div className="text-xs text-muted-foreground">Quizzes</div>
        </div>
      </div>

      {/* Motivation banner */}
      <div className="glass-card rounded-xl p-4 border border-neon-blue/20 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10">
        <div className="flex items-center gap-3">
          <div className="text-2xl">✨</div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">You're on fire!</p>
            <p className="text-xs text-muted-foreground">7-day streak is your best. Keep it up! 🚀</p>
          </div>
          <div className="hidden sm:block">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/20 flex items-center justify-center text-2xl">
              🎯
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
