"use client"

import type React from "react"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { StudentSidebar } from "@/components/student/StudentSidebar"
import { Button } from "@/components/ui/button"
import { BellIcon, PlusIcon } from "lucide-react"
import NavbarProfile from "@/components/common/NavbarProfile"
import { ModeToggle } from "@/components/ModeToggle"

interface DashboardShellProps {
  children: React.ReactNode
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <StudentSidebar />

      <main className="flex-1 overflow-x-hidden bg-background pb-8">
      <div className="flex items-start h-10 p-2 w-full justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="h-9 w-9" />
          <h1 className="text-2xl font-bold tracking-tight">Student</h1>
        </div>
        <div className="flex items-center gap-2">
        <NavbarProfile/>
        <ModeToggle/>
        </div>

      </div>
          <div className="container px-4 py-6 md:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}


