'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Building, GraduationCap, Users, Book, User, ShieldCheck, Briefcase, CheckCircle, XCircle } from "lucide-react";
import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AdminDashboardPage = () => {

    const { data, isLoading } = useQuery({
        queryKey: ["admin-dashboard-stats"],
        queryFn: async () => {
            const response = await axiosInstance.get("/api/dashboard/admin");
            return response.data.data;
        },
    });
    if (isLoading) return <div>Loading...</div>

    const stats = [
        { title: "Total Students", value: data?.stats.students, icon: <GraduationCap className="h-4 w-4 text-muted-foreground" /> },
        { title: "Total Staff", value: data?.stats.staff, icon: <Users className="h-4 w-4 text-muted-foreground" /> },
        { title: "Total HODs", value: data?.stats.hods, icon: <Briefcase className="h-4 w-4 text-muted-foreground" /> },
        { title: "Total Support Staff", value: data?.stats.supportStaff, icon: <ShieldCheck className="h-4 w-4 text-muted-foreground" /> },
        { title: "Total Subjects", value: data?.stats.subjects, icon: <Book className="h-4 w-4 text-muted-foreground" /> },
        { title: "Total Branches", value: data?.stats.branches, icon: <Building className="h-4 w-4 text-muted-foreground" /> },
    ];
 
    if(isLoading) {
        return (
            <div className="p-4 md:p-8">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            {stat.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Student Distribution by Branch</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            width={500}
                            height={300}
                            data={data?.studentsByBranch}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="branch" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>User Verification Status</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex items-center justify-between p-4 bg-green-100 dark:bg-green-900/50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                                <span className="font-medium">Verified Users</span>
                            </div>
                            <span className="text-2xl font-bold">{data?.verificationStats.verified}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-red-100 dark:bg-red-900/50 rounded-lg">
                             <div className="flex items-center gap-2">
                                <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                                <span className="font-medium">Unverified Users</span>
                            </div>
                            <span className="text-2xl font-bold">{data?.verificationStats.unverified}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AdminDashboardPage;


