import { MessageCircle, Camera, FileText, Brain, BarChart3, Gift, Settings, LogOut, Home, HelpCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { logOut } from "@/lib/firebase"

interface DashboardSidebarProps {
  onNavigate?: () => void
}

const navItems = [
  { icon: <Home className="w-4 h-4" />, label: "Home", href: "#" },
  { icon: <MessageCircle className="w-4 h-4" />, label: "AI Chat", href: "#" },
  { icon: <Camera className="w-4 h-4" />, label: "Scanner", href: "#" },
  { icon: <FileText className="w-4 h-4" />, label: "Notes", href: "#" },
  { icon: <Brain className="w-4 h-4" />, label: "Quiz Gen", href: "#" },
  { icon: <BarChart3 className="w-4 h-4" />, label: "Progress", href: "#" },
  { icon: <Gift className="w-4 h-4" />, label: "Referrals", href: "#" },
]

const bottomItems = [
  { icon: <HelpCircle className="w-4 h-4" />, label: "Help", href: "#" },
  { icon: <Settings className="w-4 h-4" />, label: "Settings", href: "#" },
]

export function DashboardSidebar({ onNavigate }: DashboardSidebarProps) {
  async function handleLogout() {
    await logOut()
  }

  return (
    <div className="glass border-r border-white/10 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center neon-glow-blue">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gradient">Lumina AI</span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <div className="px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                onNavigate?.()
              }}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200 group"
            >
              <span className="text-neon-blue group-hover:text-neon-cyan transition-colors">{item.icon}</span>
              <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
            </a>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Section */}
      <div className="border-t border-white/10 p-4 space-y-2">
        {bottomItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => {
              e.preventDefault()
              onNavigate?.()
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}

        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 mt-2"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Log out
        </Button>
      </div>
    </div>
  )
}
