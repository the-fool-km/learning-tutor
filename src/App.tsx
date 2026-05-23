import { useState, useEffect } from "react"
import type { User } from "firebase/auth"
import { onAuthChange } from "@/lib/firebase"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { AuthPage } from "@/components/AuthPage"
import { Dashboard } from "@/components/Dashboard"
import { DashboardPreview } from "@/components/DashboardPreview"
import { ChatTutor } from "@/components/ChatTutor"

type Page = "home" | "auth" | "dashboard-preview" | "chat"

export function App() {
  const [page, setPage] = useState<Page>("home")
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u)
      setAuthLoading(false)
    })
    return unsubscribe
  }, [])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center animate-pulse neon-glow-blue">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-white" aria-hidden>
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
    )
  }

  // Authenticated: show dashboard
  if (user) {
    return <Dashboard user={user} />
  }

  // Temporary: show dashboard preview for testing
  if (typeof window !== "undefined" && window.location.hash === "#preview-dashboard") {
    return <DashboardPreview />
  }

  // Auth page
  if (page === "auth") {
    return (
      <AuthPage
        onBack={() => setPage("home")}
        onAuthSuccess={() => {
          // Auth state change will update user via onAuthChange
        }}
      />
    )
  }

  // Chat page
  if (page === "chat") {
    return <ChatTutor />
  }

  // Debug: dashboard preview
  if (page === "dashboard-preview") {
    return <DashboardPreview />
  }

  // TEMP: Show dashboard preview for verification (remove after testing)
  const showDashboardPreview = typeof window !== "undefined" && new URL(window.location.href).searchParams.get("dash") === "true"
  if (showDashboardPreview) {
    return <DashboardPreview />
  }

  // TEMP: Show chat preview for testing
  const showChatPreview = typeof window !== "undefined" && new URL(window.location.href).searchParams.get("chat") === "true"
  if (showChatPreview) {
    return <ChatTutor />
  }

  // Landing page
  return (
    <>
      <Navbar onNavigate={setPage} currentPage={page} />
      <main>
        <Hero onGetStarted={() => setPage("auth")} />
        <Features onGetStarted={() => setPage("auth")} />
        <Footer onGetStarted={() => setPage("auth")} />
      </main>
    </>
  )
}

function Footer({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <footer className="relative border-t border-white/10 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white" aria-hidden>
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-gradient">Lumina AI</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © 2026 Lumina AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <button onClick={onGetStarted} className="hover:text-foreground transition-colors">Privacy</button>
            <button onClick={onGetStarted} className="hover:text-foreground transition-colors">Terms</button>
            <button onClick={onGetStarted} className="hover:text-foreground transition-colors">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default App
