import { useState } from "react"
import { Menu, X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavbarProps {
  onNavigate: (page: "home" | "auth") => void
  currentPage: string
}

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
]

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center neon-glow-blue">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">Lumina AI</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:text-neon-blue"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("auth")}
              className="text-muted-foreground hover:text-foreground"
            >
              Log in
            </Button>
            <Button
              size="sm"
              onClick={() => onNavigate("auth")}
              className="bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 text-white border-0 neon-glow-blue transition-all duration-300"
            >
              Get Started Free
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="glass border-l border-white/10 w-72"
            >
              <div className="flex flex-col gap-6 pt-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gradient">Lumina AI</span>
                </div>

                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                  <Button
                    variant="outline"
                    onClick={() => { onNavigate("auth"); setMobileOpen(false) }}
                    className="w-full border-white/20 hover:bg-white/10"
                  >
                    Log in
                  </Button>
                  <Button
                    onClick={() => { onNavigate("auth"); setMobileOpen(false) }}
                    className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 text-white border-0"
                  >
                    Get Started Free
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
