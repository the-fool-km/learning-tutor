import { Home, MessageCircle, Camera, BarChart3, Settings } from "lucide-react"

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
}

const navItems: NavItem[] = [
  { icon: <Home className="w-5 h-5" />, label: "Home", href: "#", active: true },
  { icon: <MessageCircle className="w-5 h-5" />, label: "Chat", href: "#" },
  { icon: <Camera className="w-5 h-5" />, label: "Scanner", href: "#" },
  { icon: <BarChart3 className="w-5 h-5" />, label: "Progress", href: "#" },
  { icon: <Settings className="w-5 h-5" />, label: "More", href: "#" },
]

export function DashboardBottomNav() {
  return (
    <div className="glass border-t border-white/10 bg-gradient-to-t from-background/80 to-transparent">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-16 text-xs transition-all duration-200 group ${
              item.active
                ? "text-neon-blue"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className={`${item.active ? "text-neon-blue neon-glow-blue scale-110" : "group-hover:scale-110 transition-transform"}`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-medium text-center">{item.label}</span>
            {item.active && (
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple mt-1" />
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
