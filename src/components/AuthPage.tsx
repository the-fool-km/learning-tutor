import { useState } from "react"
import { Eye, EyeOff, Zap, ArrowLeft, Loader2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { signInWithGoogle, signInWithEmail, signUpWithEmail, signInAsGuest } from "@/lib/firebase"

interface AuthPageProps {
  onBack: () => void
  onAuthSuccess: (mode: "google" | "email" | "guest") => void
}

type AuthMode = "login" | "signup"

export function AuthPage({ onBack, onAuthSuccess }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const clearError = () => setError(null)

  async function handleGoogle() {
    setLoading("google")
    clearError()
    try {
      await signInWithGoogle()
      onAuthSuccess("google")
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google sign-in failed"
      setError(msg.replace("Firebase: ", "").replace(/\(auth\/.*\)/, "").trim())
    } finally {
      setLoading(null)
    }
  }

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError("Please fill in all fields."); return }
    setLoading("email")
    clearError()
    try {
      if (mode === "login") {
        await signInWithEmail(email, password)
      } else {
        await signUpWithEmail(email, password)
      }
      onAuthSuccess("email")
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed"
      if (msg.includes("user-not-found") || msg.includes("wrong-password") || msg.includes("invalid-credential")) {
        setError("Invalid email or password. Please try again.")
      } else if (msg.includes("email-already-in-use")) {
        setError("This email is already registered. Try logging in.")
      } else if (msg.includes("weak-password")) {
        setError("Password should be at least 6 characters.")
      } else {
        setError(msg.replace("Firebase: ", "").replace(/\(auth\/.*\)/, "").trim())
      }
    } finally {
      setLoading(null)
    }
  }

  async function handleGuest() {
    setLoading("guest")
    clearError()
    try {
      await signInAsGuest()
      onAuthSuccess("guest")
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Guest sign-in failed"
      setError(msg.replace("Firebase: ", "").replace(/\(auth\/.*\)/, "").trim())
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-neon-blue/15 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-neon-purple/15 blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="w-full max-w-md">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </button>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 border border-white/15 neon-glow-blue">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center neon-glow-blue">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">Lumina AI</span>
            </div>
          </div>

          {/* Toggle mode tabs */}
          <div className="flex rounded-xl bg-white/5 border border-white/10 p-1 mb-6">
            <button
              onClick={() => { setMode("login"); clearError() }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === "login"
                  ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => { setMode("signup"); clearError() }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === "signup"
                  ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign up
            </button>
          </div>

          <h1 className="text-xl font-bold text-foreground mb-1">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {mode === "login"
              ? "Sign in to continue your learning journey."
              : "Join 50,000+ students learning smarter with AI."}
          </p>

          {/* Error message */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-destructive/15 border border-destructive/25 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Google button */}
          <Button
            type="button"
            variant="outline"
            className="w-full mb-3 border-white/20 hover:bg-white/10 text-foreground h-11 gap-3"
            onClick={handleGoogle}
            disabled={loading !== null}
          >
            {loading === "google" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            Continue with Google
          </Button>

          {/* Guest button */}
          <Button
            type="button"
            variant="outline"
            className="w-full mb-4 border-white/20 hover:bg-white/10 text-foreground h-11 gap-3"
            onClick={handleGuest}
            disabled={loading !== null}
          >
            {loading === "guest" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Users className="w-4 h-4 text-neon-cyan" />
            )}
            Continue as Guest
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <Separator className="flex-1 bg-white/10" />
            <span className="text-xs text-muted-foreground">or with email</span>
            <Separator className="flex-1 bg-white/10" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm text-muted-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError() }}
                className="bg-white/5 border-white/15 focus:border-neon-blue/50 focus:ring-neon-blue/30 placeholder:text-muted-foreground/50 h-11"
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm text-muted-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={mode === "signup" ? "Min. 6 characters" : "Your password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError() }}
                  className="bg-white/5 border-white/15 focus:border-neon-blue/50 focus:ring-neon-blue/30 placeholder:text-muted-foreground/50 h-11 pr-10"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-neon-blue hover:text-neon-cyan transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 text-white border-0 h-11 font-semibold transition-all duration-300 hover:scale-[1.01]"
              disabled={loading !== null}
            >
              {loading === "email" ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {mode === "login" ? "Log in" : "Create account"}
            </Button>
          </form>

          {/* Switch mode */}
          <p className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); clearError() }}
              className="text-neon-blue hover:text-neon-cyan transition-colors font-medium"
            >
              {mode === "login" ? "Sign up free" : "Log in"}
            </button>
          </p>

          <p className="mt-4 text-center text-xs text-muted-foreground/60">
            By continuing, you agree to our{" "}
            <span className="underline cursor-pointer hover:text-muted-foreground">Terms</span>{" "}
            and{" "}
            <span className="underline cursor-pointer hover:text-muted-foreground">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
