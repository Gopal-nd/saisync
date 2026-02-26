import { prisma } from "../lib/db";
import asyncHandler from "../utils/async-handler";
import type { Request, Response } from "express";
import { ApiResponse } from "../utils/api-response";

export const getAdminDashboardData = asyncHandler(async (req: Request, res: Response) => {
    const totalStudents = prisma.user.count({ where: { role: 'STUDENT' } });
    const totalStaff = prisma.user.count({ where: { role: 'STAFF' } });
    const totalHods = prisma.user.count({ where: { role: 'HOD' } });
    const totalSupportStaff = prisma.user.count({ where: { role: 'SUPPORT_STAFF' } });
    const totalSubjects = prisma.subject.count();

    const studentsByBranch = prisma.user.groupBy({
        by: ['branch'],
        where: { role: 'STUDENT', branch: { not: null } },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } }
    });

    const userVerificationStats = prisma.user.groupBy({
        by: ['isVerified'],
        _count: { id: true },
    });
    
    const recentStudents = prisma.user.findMany({
        where: { role: 'STUDENT' },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, name: true, email: true, createdAt: true }
    });

    const recentStaff = prisma.user.findMany({
        where: { role: 'STAFF' },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, name: true, email: true, createdAt: true }
    });

    const [
        students,
        staff,
        hods,
        supportStaff,
        subjects,
        branchCounts,
        verificationCounts,
        latestStudents,
        latestStaff
    ] = await Promise.all([
        totalStudents,
        totalStaff,
        totalHods,
        totalSupportStaff,
        totalSubjects,
        studentsByBranch,
        userVerificationStats,
        recentStudents,
        recentStaff
    ]);

    const formattedBranchCounts = branchCounts.map(item => ({
        branch: item.branch,
        count: item._count.id,
    }));

    const formattedVerificationStats = {
        verified: verificationCounts.find(item => item.isVerified === true)?._count.id || 0,
        unverified: verificationCounts.find(item => item.isVerified === false)?._count.id || 0,
    };

    const dashboardData = {
        stats: {
            students,
            staff,
            hods,
            supportStaff,
            subjects,
            branches: 10, // from enum
        },
        studentsByBranch: formattedBranchCounts,
        verificationStats: formattedVerificationStats,
        recentStudents: latestStudents,
        recentStaff: latestStaff,
    };

    res.status(200).json(new ApiResponse({
        statusCode: 200,
        data: dashboardData,
        message: "Admin dashboard data fetched successfully"
    }));
});
