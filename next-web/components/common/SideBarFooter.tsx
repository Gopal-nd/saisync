import React from 'react'
import { SidebarFooter } from '../ui/sidebar'
import useAuthStore from '@/store/useAuthStore'

const SideBarFooter = () => {
    const {user} = useAuthStore()
  return (
    <SidebarFooter>
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-muted">
          <span className="sr-only">User profile</span>
        </div>
        <div className="text-sm">
          <div className="font-medium">{user?.role}</div>
          <div className="text-xs text-muted-foreground">{user?.email}</div>
        </div>
      </div>
    </div>
  </SidebarFooter>
  )
}

export default SideBarFooter