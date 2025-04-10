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

export function AdminSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg ">
                  <Home className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">College Management</span>
                  <span className="text-xs text-muted-foreground">Admin Panel</span>
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
                <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard"}>
                  <Link href="/admin/create">
                    <UserPlus className="size-4" />
                    <span>create</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard"}>
                  <Link href="/admin/dashboard">
                    <LayoutDashboard className="size-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Students with submenu */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={pathname?.startsWith("/admin/students")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathname?.startsWith("/admin/students")}>
                      <Users className="size-4" />
                      <span>Students</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/admin/students"}>
                          <Link href="/admin/students">All Students</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/admin/students/add"}>
                          <Link href="/admin/students/add">Add Student</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/admin/students/profile"}>
                          <Link href="/admin/students/profile">Student Profile</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Faculty with submenu */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={pathname?.startsWith("/admin/faculty")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathname?.startsWith("/admin/faculty")}>
                      <GraduationCap className="size-4" />
                      <span>Faculty</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/admin/faculty"}>
                          <Link href="/admin/faculty">All Faculty</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/admin/faculty/add"}>
                          <Link href="/admin/faculty/add">Add Faculty</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Courses with submenu */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={pathname?.startsWith("/admin/courses")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathname?.startsWith("/admin/courses")}>
                      <BookOpen className="size-4" />
                      <span>Courses</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/admin/courses"}>
                          <Link href="/admin/courses">All Courses</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/admin/courses/add"}>
                          <Link href="/admin/courses/add">Add Course</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Attendance */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/admin/attendance")}>
                  <Link href="/admin/attendance">
                    <ClipboardList className="size-4" />
                    <span>Attendance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Timetable */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={pathname?.startsWith("/admin/timetable")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathname?.startsWith("/admin/timetable")}>
                      <BookOpen className="size-4" />
                      <span>Timetable</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                    <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/admin/timetable"}>
                          <Link href="/admin/timetable">TimeTable</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/admin/timetable/define"}>
                          <Link href="/admin/timetable/define">Definition</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/admin/timetable/add"}>
                          <Link href="/admin/timetable/add">Add Schedule</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
              
              {/* Mentor */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/admin/mentor")}>
                  <Link href="/admin/mentor">
                    <ClipboardList className="size-4" />
                    <span>Mentor</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Reports */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/admin/reports")}>
                  <Link href="/admin/reports">
                    <BarChart3 className="size-4" />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Settings */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/admin/settings")}>
                  <Link href="/admin/settings">
                    <Settings className="size-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Help */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/admin/help")}>
                  <Link href="/admin/help">
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


