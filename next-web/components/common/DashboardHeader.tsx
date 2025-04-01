import type React from "react"
import { Button } from "@/components/ui/button"
import { BellIcon, PlusIcon } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="h-9 w-9" />
          <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">New</span>
          </Button>
          {children}
        </div>
      </div>
      {text && <p className="text-muted-foreground">{text}</p>}
    </div>
  )
}


