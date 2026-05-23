import type { User as FirebaseUser } from "firebase/auth"
import { DashboardLayout } from "@/components/DashboardLayout"
import { WelcomeSection } from "@/components/WelcomeSection"
import { QuickActionCards } from "@/components/QuickActionCards"
import { RecentActivity } from "@/components/RecentActivity"
import { ProgressTracker } from "@/components/ProgressTracker"
import { ReferralWidget } from "@/components/ReferralWidget"

interface DashboardProps {
  user: FirebaseUser
}

export function Dashboard({ user }: DashboardProps) {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WelcomeSection user={user} />
        <QuickActionCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            <ProgressTracker />
          </div>
        </div>
        <ReferralWidget />
      </div>
    </DashboardLayout>
  )
}
