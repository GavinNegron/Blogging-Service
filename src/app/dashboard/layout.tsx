import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { NavbarDashboard } from "@/components/navbar/index"
import { SidebarDashboard } from "@/components/sidebar/index"
import { auth } from "@/utils/auth"
import { headers } from "next/headers"
import "./dashboard.sass"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user?.id) {
    redirect("/login")
  }

  return (
    <>
      <NavbarDashboard />
      <main className="main db">
        <SidebarDashboard user={session?.user} />
        <div className="dashboard">{children}</div>
      </main>
    </>
  )
}