"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  BookOpen,
  Calendar,
  ChevronDown,
  ClipboardList,
  GraduationCap,
  Home,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  UserPlus,
  Users,
} from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import SideBarFooter from "../common/SideBarFooter"

export function StaffSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/staff/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg ">
                  <Home className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">College Management</span>
                  <span className="text-xs text-muted-foreground">Staff Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/staff/dashboard"}>
                  <Link href="/staff/create">
                    <UserPlus  className="size-4" />
                    <span>create</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/staff/dashboard"}>
                  <Link href="/staff/dashboard">
                    <LayoutDashboard className="size-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Students with submenu */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={pathname?.startsWith("/staff/dashboard/students")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathname?.startsWith("/staff/dashboard/students")}>
                      <Users className="size-4" />
                      <span>Students</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/staff/dashboard/students"}>
                          <Link href="/staff/dashboard/students">All Students</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/staff/dashboard/students/add"}>
                          <Link href="/staff/dashboard/students/add">Add Student</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/staff/dashboard/students/profile"}>
                          <Link href="/staff/dashboard/students/profile">Student Profile</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Faculty with submenu */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={pathname?.startsWith("/staff/dashboard/faculty")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathname?.startsWith("/staff/dashboard/faculty")}>
                      <GraduationCap className="size-4" />
                      <span>Faculty</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/staff/dashboard/faculty"}>
                          <Link href="/staff/dashboard/faculty">All Faculty</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/staff/dashboard/faculty/add"}>
                          <Link href="/staff/dashboard/faculty/add">Add Faculty</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Courses with submenu */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={pathname?.startsWith("/staff/dashboard/courses")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathname?.startsWith("/staff/dashboard/courses")}>
                      <BookOpen className="size-4" />
                      <span>Courses</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/staff/dashboard/courses"}>
                          <Link href="/staff/dashboard/courses">All Courses</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/staff/dashboard/courses/add"}>
                          <Link href="/staff/dashboard/courses/add">Add Course</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Attendance */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/staff/dashboard/attendance")}>
                  <Link href="/staff/dashboard/attendance">
                    <ClipboardList className="size-4" />
                    <span>Attendance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Timetable */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/staff/dashboard/timetable")}>
                  <Link href="/staff/dashboard/timetable">
                    <Calendar className="size-4" />
                    <span>Timetable</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Reports */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/staff/dashboard/reports")}>
                  <Link href="/staff/dashboard/reports">
                    <BarChart3 className="size-4" />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Settings */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/staff/dashboard/settings")}>
                  <Link href="/staff/dashboard/settings">
                    <Settings className="size-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Help */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/staff/dashboard/help")}>
                  <Link href="/staff/dashboard/help">
                    <LifeBuoy className="size-4" />
                    <span>Help</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SideBarFooter />
      <SidebarRail />
    </Sidebar>
  )
}


