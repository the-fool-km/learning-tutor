import { ArrowRight, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeroProps {
  onGetStarted: () => void
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-blue/20 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-purple/20 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-cyan/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <Badge
            variant="secondary"
            className="glass border-white/20 text-neon-cyan px-4 py-1.5 text-sm font-medium gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Education Platform
          </Badge>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance mb-6 leading-[1.1]">
          Learn Smarter with{" "}
          <span className="text-gradient">AI-Powered</span>
          <br />
          Education Tools
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-7">
          Lumina AI transforms how students study — with an AI tutor, homework scanner,
          notes summarizer, and quiz generator all in one premium platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 text-white border-0 neon-glow-blue text-base px-8 py-6 h-auto transition-all duration-300 hover:scale-105"
          >
            Start Learning Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onGetStarted}
            className="border-white/20 hover:bg-white/10 text-foreground text-base px-8 py-6 h-auto transition-all duration-300"
          >
            Watch Demo
          </Button>
        </div>

        {/* Social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-1 font-medium text-foreground">4.9/5</span>
          </div>
          <span className="hidden sm:block opacity-40">•</span>
          <span>Trusted by <strong className="text-foreground">50,000+</strong> students</span>
          <span className="hidden sm:block opacity-40">•</span>
          <span>No credit card required</span>
        </div>

        {/* Hero visual: floating glass cards */}
        <div className="mt-16 relative">
          <div className="relative mx-auto max-w-4xl">
            {/* Main dashboard glass card */}
            <div className="glass-card rounded-2xl p-6 border border-white/15 neon-glow-blue shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 h-6 bg-white/5 rounded-md flex items-center px-3">
                  <span className="text-xs text-muted-foreground">lumina.ai/dashboard</span>
                </div>
              </div>

              {/* Mock dashboard UI */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {[
                  { label: "AI Chat", color: "from-neon-blue/30 to-neon-cyan/20", icon: "💬" },
                  { label: "Scanner", color: "from-neon-purple/30 to-neon-blue/20", icon: "📷" },
                  { label: "Notes AI", color: "from-neon-cyan/30 to-neon-purple/20", icon: "📝" },
                  { label: "Quiz Gen", color: "from-neon-blue/30 to-neon-purple/20", icon: "🧠" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`glass-card bg-gradient-to-br ${item.color} rounded-xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200 cursor-pointer`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-medium text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Mock chat UI */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex-shrink-0 flex items-center justify-center text-xs text-white font-bold">
                    AI
                  </div>
                  <div className="glass rounded-xl rounded-tl-none px-4 py-2 text-sm text-foreground max-w-sm">
                    Hi! I'm your AI tutor. What would you like to learn today?
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-gradient-to-r from-neon-blue/30 to-neon-purple/30 border border-neon-blue/20 rounded-xl rounded-tr-none px-4 py-2 text-sm text-foreground max-w-sm">
                    Can you help me understand quantum entanglement?
                  </div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex-shrink-0 flex items-center justify-center text-xs text-white font-bold">
                    S
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex-shrink-0 flex items-center justify-center text-xs text-white font-bold">
                    AI
                  </div>
                  <div className="glass rounded-xl rounded-tl-none px-4 py-2 text-sm text-foreground max-w-xs">
                    <span className="text-neon-cyan">Great question!</span> Quantum entanglement is when two particles...
                    <span className="inline-block w-2 h-4 bg-neon-blue ml-1 animate-pulse rounded-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent cards */}
            <div className="absolute -left-4 top-8 hidden lg:block animate-float">
              <div className="glass-card rounded-xl px-4 py-3 border border-white/15 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-muted-foreground">Quiz Score</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">98%</div>
                <div className="text-xs text-neon-cyan">↑ 12% this week</div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-12 hidden lg:block animate-float" style={{ animationDelay: "2s" }}>
              <div className="glass-card rounded-xl px-4 py-3 border border-white/15 text-sm">
                <div className="text-muted-foreground text-xs mb-1">Notes Summarized</div>
                <div className="text-2xl font-bold text-gradient">247</div>
                <div className="text-xs text-muted-foreground">pages today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
