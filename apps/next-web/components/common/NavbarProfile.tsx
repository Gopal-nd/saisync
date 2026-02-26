"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuthStore from "@/store/useAuthStore"

import Link from "next/link"
import Logout from "../Logout"

export default function NavbarProfile() {
const {user} = useAuthStore()
  
  // Get initials from name or email
  const getInitials = () => {
    
    if (!user?.name) return (
      <Avatar >
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback >CN</AvatarFallback>
</Avatar>
    )
    if (user.name) {
      return user.name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    }
    
    if (user.email) {
      return user.email.substring(0, 2).toUpperCase()
    }
    
    return "??"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.image || ""} alt="Profile" />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="font-medium">{user?.name || "User"}</div>
          <div className="text-xs text-muted-foreground truncate max-w-[200px]">
            {user?.email || ""}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="#">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuItem >
        <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
