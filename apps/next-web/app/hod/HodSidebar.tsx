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
  User,
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

export default function HodSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/hod">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg ">
                  <Home className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">College Management</span>
                  <span className="text-xs text-muted-foreground">HOD Panel</span>
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

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/hod"}>
                  <Link href="/hod">
                    <LayoutDashboard className="size-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Collapsible defaultOpen={pathname?.startsWith("/hod/support-staff")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathname?.startsWith("/hod/support-staff")}>
                      <GraduationCap className="size-4" />
                      <span>Support Staff</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={pathname === "/hod/support-staff"}>
                          <Link href="/hod/support-staff">All Support Staff</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {/* <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/admin/faculty/add"}>
                          <Link href="/admin/faculty/add">Add Faculty</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem> */}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Students with submenu */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={pathname?.startsWith("/hod/students")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathname?.startsWith("/hod/students")}>
                      <Users className="size-4" />
                      <span>Students</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/hod/students"}>
                          <Link href="/hod/students">All Students</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/hod/students/lab"}>
                          <Link href="/hod/students/lab">Lab</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Faculty with submenu */}
              <SidebarMenuItem>
                    <Collapsible defaultOpen={pathname?.startsWith("/hod/faculty")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathname?.startsWith("/hod/faculty")}>
                      <GraduationCap className="size-4" />
                      <span>Faculty</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/hod/faculty"}>
                          <Link href="/hod/faculty">All Faculty</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {/* <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/admin/faculty/add"}>
                          <Link href="/admin/faculty/add">Add Faculty</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem> */}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Courses with submenu */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={pathname?.startsWith("/hod/courses")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathname?.startsWith("/hod/courses")}>
                      <BookOpen className="size-4" />
                      <span>Courses</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/hod/courses"}>
                          <Link href="/hod/courses">All Courses</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/hod/courses/add"}>
                          <Link href="/hod/courses/add">Add Course</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Attendance */}
              

              {/* Timetable */}
              <SidebarMenuItem>
                        <Collapsible defaultOpen={pathname?.startsWith("/hod/timetable")}>
                      <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathname?.startsWith("/hod/timetable")}>
                      <BookOpen className="size-4" />
                      <span>Timetable</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                    <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/hod/timetable"}>
                          <Link href="/hod/timetable">TimeTable</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {/* <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/hod/timetable/define"}>
                          <Link href="/hod/timetable/define">Definition</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/hod/timetable/add"}>
                          <Link href="/hod/timetable/add">Add Schedule</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem> */}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
              
              {/* Mentor */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/hod/mentor")}>
                  <Link href="/hod/mentor">
                    <ClipboardList className="size-4" />
                    <span>Mentor</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Reports */}
              

              {/* Settings */}
              

             

             
              {/* User */}
              

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

    </Sidebar>
  )
}


