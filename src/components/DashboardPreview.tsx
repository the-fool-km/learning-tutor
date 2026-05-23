import { DashboardLayout } from "@/components/DashboardLayout"
import { WelcomeSection } from "@/components/WelcomeSection"
import { QuickActionCards } from "@/components/QuickActionCards"
import { RecentActivity } from "@/components/RecentActivity"
import { ProgressTracker } from "@/components/ProgressTracker"
import { ReferralWidget } from "@/components/ReferralWidget"
import type { User as FirebaseUser } from "firebase/auth"

interface MockUser extends Partial<FirebaseUser> {
  isAnonymous: boolean
  displayName?: string | null
  email?: string | null
}

const mockUser: MockUser = {
  isAnonymous: false,
  displayName: "Alex",
  email: "alex@example.com",
} as FirebaseUser

export function DashboardPreview() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WelcomeSection user={mockUser as FirebaseUser} />
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
