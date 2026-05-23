import { Gift, Copy, Share2, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ReferralWidget() {
  const referrals = 5
  const totalDaysEarned = 150
  const nextMilestone = 10

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">Referral Rewards</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main referral card */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-neon-blue/20 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
                <Gift className="w-5 h-5 text-neon-blue" />
                Invite Friends
              </h3>
              <p className="text-sm text-muted-foreground">
                Earn premium time for every friend who joins
              </p>
            </div>
            <Badge className="bg-gradient-to-r from-neon-blue to-neon-purple text-white border-0">
              Active
            </Badge>
          </div>

          {/* Referral info */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="glass rounded-lg p-3 border border-white/10">
              <div className="text-2xl font-bold text-neon-blue mb-1">
                {referrals}
              </div>
              <div className="text-xs text-muted-foreground">
                Friends invited
              </div>
            </div>
            <div className="glass rounded-lg p-3 border border-white/10">
              <div className="text-2xl font-bold text-neon-cyan mb-1">
                {totalDaysEarned}
              </div>
              <div className="text-xs text-muted-foreground">
                Days earned
              </div>
            </div>
          </div>

          {/* Referral link copy section */}
          <div className="mb-4">
            <label className="text-xs text-muted-foreground block mb-2">
              Your referral link
            </label>
            <div className="flex gap-2">
              <div className="flex-1 glass rounded-lg border border-white/10 px-4 py-2.5 text-xs text-muted-foreground truncate">
                lumina.ai/ref/abc123xyz
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 text-white border-0 h-10"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 text-white border-0"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share with friends
            </Button>
          </div>
        </div>

        {/* Next milestone card */}
        <div className="glass-card rounded-2xl p-6 border border-white/10">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-neon-purple" />
            Next Milestone
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {nextMilestone} referrals
                </span>
                <span className="text-xs font-medium text-neon-cyan">
                  {referrals} / {nextMilestone}
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-blue transition-all duration-500"
                  style={{ width: `${(referrals / nextMilestone) * 100}%` }}
                />
              </div>
            </div>

            <div className="glass rounded-lg p-3 border border-neon-purple/20 bg-neon-purple/5">
              <div className="text-xs text-muted-foreground mb-1">Unlock reward</div>
              <div className="text-sm font-semibold text-neon-purple">
                365 days premium
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">
                Just {nextMilestone - referrals} more to go!
              </div>
            </div>

            {/* Friends list preview */}
            <div>
              <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <Users className="w-3 h-3" />
                Recent invites
              </div>
              <div className="space-y-1.5">
                {[
                  { name: "Sarah M.", joined: "3 days ago" },
                  { name: "Alex K.", joined: "1 week ago" },
                  { name: "Jordan P.", joined: "2 weeks ago" },
                ].map((friend, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-foreground">{friend.name}</span>
                    <span className="text-muted-foreground">{friend.joined}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
