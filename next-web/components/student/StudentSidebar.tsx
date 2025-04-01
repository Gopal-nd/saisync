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

export function StudentSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/student/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg ">
                  <Home className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">College Management</span>
                  <span className="text-xs text-muted-foreground">Student Panel</span>
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
                <SidebarMenuButton asChild isActive={pathname === "/student/dashboard"}>
                  <Link href="/student/create">
                    <UserPlus  className="size-4" />
                    <span>create</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/student/dashboard"}>
                  <Link href="/student/dashboard">
                    <LayoutDashboard className="size-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Students with submenu */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={pathname?.startsWith("/student/dashboard/students")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathname?.startsWith("/student/dashboard/students")}>
                      <Users className="size-4" />
                      <span>Students</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/student/dashboard/students"}>
                          <Link href="/student/dashboard/students">All Students</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/student/dashboard/students/add"}>
                          <Link href="/student/dashboard/students/add">Add Student</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/student/dashboard/students/profile"}>
                          <Link href="/student/dashboard/students/profile">Student Profile</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Faculty with submenu */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={pathname?.startsWith("/student/dashboard/faculty")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathname?.startsWith("/student/dashboard/faculty")}>
                      <GraduationCap className="size-4" />
                      <span>Faculty</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/student/dashboard/faculty"}>
                          <Link href="/student/dashboard/faculty">All Faculty</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/student/dashboard/faculty/add"}>
                          <Link href="/student/dashboard/faculty/add">Add Faculty</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Courses with submenu */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={pathname?.startsWith("/student/dashboard/courses")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathname?.startsWith("/student/dashboard/courses")}>
                      <BookOpen className="size-4" />
                      <span>Courses</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/student/dashboard/courses"}>
                          <Link href="/student/dashboard/courses">All Courses</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/student/dashboard/courses/add"}>
                          <Link href="/student/dashboard/courses/add">Add Course</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Attendance */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/student/dashboard/attendance")}>
                  <Link href="/student/dashboard/attendance">
                    <ClipboardList className="size-4" />
                    <span>Attendance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Timetable */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/student/dashboard/timetable")}>
                  <Link href="/student/dashboard/timetable">
                    <Calendar className="size-4" />
                    <span>Timetable</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Reports */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/student/dashboard/reports")}>
                  <Link href="/student/dashboard/reports">
                    <BarChart3 className="size-4" />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Settings */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/student/dashboard/settings")}>
                  <Link href="/student/dashboard/settings">
                    <Settings className="size-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Help */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/student/dashboard/help")}>
                  <Link href="/student/dashboard/help">
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


