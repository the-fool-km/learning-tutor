import { MessageCircle, Camera, FileText, Brain, Gift, Zap, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  badge?: string
  gradient: string
  glowClass: string
  mockContent: React.ReactNode
}

const features: Feature[] = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "AI Chat Tutor",
    description: "Get instant, personalized answers to any academic question. Your 24/7 AI tutor that adapts to your learning style.",
    gradient: "from-neon-blue/20 to-neon-cyan/10",
    glowClass: "neon-glow-blue",
    mockContent: (
      <div className="space-y-2 text-xs">
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">AI</div>
          <div className="glass rounded-lg rounded-tl-none px-3 py-1.5 text-muted-foreground">Explain photosynthesis in simple terms.</div>
        </div>
        <div className="flex gap-2 justify-end">
          <div className="bg-neon-blue/20 border border-neon-blue/20 rounded-lg rounded-tr-none px-3 py-1.5 text-muted-foreground">Can you give an example?</div>
        </div>
      </div>
    ),
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Homework Scanner",
    description: "Snap a photo of any homework problem and get step-by-step solutions with explanations you'll actually understand.",
    badge: "Popular",
    gradient: "from-neon-purple/20 to-neon-blue/10",
    glowClass: "neon-glow-purple",
    mockContent: (
      <div className="text-xs space-y-2">
        <div className="glass rounded-xl p-3 border border-dashed border-white/20 flex flex-col items-center gap-2">
          <Camera className="w-6 h-6 text-neon-purple" />
          <span className="text-muted-foreground text-center">Scan your homework</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue" />
          <span className="text-muted-foreground">Solving...</span>
        </div>
      </div>
    ),
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Notes Summarizer",
    description: "Upload your lecture notes, PDFs, or textbook chapters and get concise, AI-crafted summaries in seconds.",
    gradient: "from-neon-cyan/20 to-neon-blue/10",
    glowClass: "neon-glow-blue",
    mockContent: (
      <div className="text-xs space-y-2">
        <div className="glass rounded-lg p-2 border border-white/10">
          <div className="text-muted-foreground line-through opacity-50 text-[10px] leading-4">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod...
          </div>
        </div>
        <ArrowRight className="w-3 h-3 text-neon-cyan mx-auto" />
        <div className="glass rounded-lg p-2 border border-neon-cyan/20">
          <div className="text-neon-cyan font-medium text-[10px]">✓ Key concepts: 3 points</div>
          <div className="text-muted-foreground text-[10px]">Summary ready in 2s</div>
        </div>
      </div>
    ),
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Quiz Generator",
    description: "Auto-generate personalized quizzes from any topic or uploaded material. Ace your exams with targeted practice.",
    badge: "New",
    gradient: "from-neon-purple/20 to-neon-cyan/10",
    glowClass: "neon-glow-purple",
    mockContent: (
      <div className="text-xs space-y-2">
        <div className="glass rounded-lg p-2 border border-neon-purple/20">
          <div className="text-muted-foreground text-[10px] mb-1.5">Q: What is Newton's 2nd Law?</div>
          {["F = ma", "E = mc²", "v = d/t"].map((opt, i) => (
            <div key={opt} className={`rounded px-2 py-1 text-[10px] mb-1 ${i === 0 ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-white/5 text-muted-foreground"}`}>
              {opt}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: <Gift className="w-6 h-6" />,
    title: "Referral Rewards",
    description: "Invite friends and earn premium credits. The more you share, the more you unlock — unlimited learning for free.",
    gradient: "from-neon-blue/20 to-neon-purple/10",
    glowClass: "neon-glow-blue",
    mockContent: (
      <div className="text-xs space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center">
            <span className="text-[10px]">👤</span>
          </div>
          <div className="flex-1 h-1.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple" />
          <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center">
            <span className="text-[10px]">👤</span>
          </div>
        </div>
        <div className="glass rounded-lg p-2 border border-neon-blue/20 text-center">
          <div className="text-neon-cyan font-bold">+30 days Premium</div>
          <div className="text-muted-foreground text-[10px]">earned from referrals</div>
        </div>
      </div>
    ),
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Results",
    description: "Lightning-fast AI responses powered by the latest models. No waiting — get answers as fast as you can type.",
    gradient: "from-neon-cyan/20 to-neon-purple/10",
    glowClass: "neon-glow-purple",
    mockContent: (
      <div className="text-xs space-y-2">
        {[
          { label: "Response time", value: "0.3s", color: "text-neon-cyan" },
          { label: "Accuracy", value: "99.2%", color: "text-neon-blue" },
          { label: "Uptime", value: "99.9%", color: "text-green-400" },
        ].map((stat) => (
          <div key={stat.label} className="flex justify-between items-center">
            <span className="text-muted-foreground">{stat.label}</span>
            <span className={`font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>
    ),
  },
]

interface FeaturesProps {
  onGetStarted: () => void
}

export function Features({ onGetStarted }: FeaturesProps) {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="glass border-white/20 text-neon-purple px-4 py-1.5 text-sm font-medium mb-4 gap-2"
          >
            <Zap className="w-3.5 h-3.5" />
            Everything you need to excel
          </Badge>
          <h2 className="scroll-m-20 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-balance mb-4">
            Supercharge your{" "}
            <span className="text-gradient">learning journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-7">
            Five powerful AI tools built for students who want to learn faster, retain more, and achieve top grades.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`glass-card rounded-2xl p-6 border border-white/10 bg-gradient-to-br ${feature.gradient} hover:border-white/20 hover:scale-[1.02] transition-all duration-300 group`}
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-white/10 flex items-center justify-center text-neon-blue group-hover:${feature.glowClass} transition-all duration-300`}>
                  {feature.icon}
                </div>
                {feature.badge && (
                  <Badge className="bg-gradient-to-r from-neon-blue to-neon-purple text-white border-0 text-xs">
                    {feature.badge}
                  </Badge>
                )}
              </div>

              {/* Title & description */}
              <h3 className="text-lg font-semibold tracking-tight text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Mock UI preview */}
              <div className="mt-auto">
                {feature.mockContent}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 text-white border-0 neon-glow-blue text-base px-8 py-6 h-auto transition-all duration-300 hover:scale-105"
          >
            Try All Features Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">No credit card needed. Cancel anytime.</p>
        </div>
      </div>
    </section>
  )
}
