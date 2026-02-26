-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADMIN', 'STAFF');

-- CreateEnum
CREATE TYPE "BranchType" AS ENUM ('AIML', 'ECE', 'CSE', 'EEE', 'ISE', 'MECH', 'CYBER', 'DS', 'IOT', 'BLOCKCHAIN');

-- CreateEnum
CREATE TYPE "SemesterType" AS ENUM ('S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8');

-- CreateEnum
CREATE TYPE "SectionType" AS ENUM ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L');

-- CreateEnum
CREATE TYPE "Schema" AS ENUM ('Y_2022', 'Y_2021', 'Y_2018', 'Y_2024');

-- CreateEnum
CREATE TYPE "AssignmentType" AS ENUM ('ASSIGNMENT', 'HOMEWORK', 'PROJECT');

-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('INTERNAL', 'EXTERNAL');

-- CreateEnum
CREATE TYPE "WrittenType" AS ENUM ('MSQ', 'WRITTEN');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'NOT_TAKEN', 'OD');

-- CreateEnum
CREATE TYPE "PlacementType" AS ENUM ('INTERNSHIP', 'JOB');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "usn" TEXT,
    "collageId" TEXT,
    "section" "SectionType" NOT NULL DEFAULT 'A',
    "schema" "Schema" NOT NULL,
    "branch" "BranchType" DEFAULT 'AIML',
    "semester" "SemesterType" DEFAULT 'S1',
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mentorId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT,
    "branch" "BranchType",
    "semester" "SemesterType",
    "section" "SectionType",
    "isGlobal" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "AssignmentType" NOT NULL DEFAULT 'ASSIGNMENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "branch" "BranchType" NOT NULL,
    "semester" "SemesterType" NOT NULL,
    "section" "SectionType" NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentSubmission" (
    "id" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "submittedById" TEXT NOT NULL,
    "submissionUrl" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssignmentSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievements" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "semester" "SemesterType" NOT NULL,
    "branch" "BranchType" NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "semester" "SemesterType" NOT NULL,
    "branch" "BranchType" NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "semester" "SemesterType" NOT NULL,
    "branch" "BranchType" NOT NULL,
    "name" TEXT,
    "subjectName" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "obtainedMarks" INTEGER NOT NULL,
    "totalMarks" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IATests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "semester" "SemesterType" NOT NULL,
    "branch" "BranchType" NOT NULL,
    "testNo" INTEGER NOT NULL,
    "name" TEXT,
    "subjectName" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "obtainedMarks" INTEGER NOT NULL,
    "totalMarks" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IATests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniversityExams" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "semester" "SemesterType" NOT NULL,
    "branch" "BranchType" NOT NULL,
    "name" TEXT,
    "subjectName" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "obtainedMarks" INTEGER NOT NULL,
    "totalMarks" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UniversityExams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBusDetails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserBusDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHostelDetails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserHostelDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPersonalDetails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPersonalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFamilyDetails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFamilyDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAcademicDetails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAcademicDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWorkDetails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserWorkDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDocuments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDocuments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "branchName" "BranchType" NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("branchName")
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" TEXT NOT NULL,
    "branchName" "BranchType" NOT NULL,
    "semesterName" "SemesterType" NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "sectionName" "SectionType" NOT NULL,
    "branchName" "BranchType" NOT NULL,
    "semesterName" "SemesterType" NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "branchName" "BranchType" NOT NULL,
    "noOfCredits" INTEGER NOT NULL,
    "examType" "ExamType" NOT NULL DEFAULT 'INTERNAL',
    "writtenType" "WrittenType" NOT NULL DEFAULT 'MSQ',
    "syllabus" TEXT,
    "noOfHours" INTEGER,
    "staffName" TEXT NOT NULL,
    "isLab" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyMaterial" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,

    CONSTRAINT "StudyMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimetableOfDay" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "sectionName" "SectionType" NOT NULL,
    "branchName" "BranchType" NOT NULL,
    "semesterName" "SemesterType" NOT NULL,

    CONSTRAINT "TimetableOfDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Period" (
    "id" TEXT NOT NULL,
    "timetableId" TEXT NOT NULL,
    "periodNumber" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "subject" TEXT NOT NULL,
    "staff" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "whatlearned" TEXT,
    "isLab" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicCovered" (
    "id" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    "topicTitle" TEXT NOT NULL,
    "topicDescription" TEXT NOT NULL,

    CONSTRAINT "TopicCovered_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "usn" TEXT,
    "status" "AttendanceStatus" NOT NULL DEFAULT 'NOT_TAKEN',

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtpVerification" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "otpExpiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtpVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Placements" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "placementDate" TIMESTAMP(3) NOT NULL,
    "placementType" "PlacementType" NOT NULL,
    "year" INTEGER NOT NULL,
    "placementName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "ctc" TEXT,
    "location" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Placements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_usn_key" ON "User"("usn");

-- CreateIndex
CREATE UNIQUE INDEX "User_collageId_key" ON "User"("collageId");

-- CreateIndex
CREATE INDEX "User_branch_semester_section_idx" ON "User"("branch", "semester", "section");

-- CreateIndex
CREATE INDEX "Notification_receiverId_idx" ON "Notification"("receiverId");

-- CreateIndex
CREATE INDEX "Notification_branch_semester_section_idx" ON "Notification"("branch", "semester", "section");

-- CreateIndex
CREATE INDEX "Notification_isGlobal_idx" ON "Notification"("isGlobal");

-- CreateIndex
CREATE UNIQUE INDEX "UserBusDetails_userId_key" ON "UserBusDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserHostelDetails_userId_key" ON "UserHostelDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPersonalDetails_userId_key" ON "UserPersonalDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFamilyDetails_userId_key" ON "UserFamilyDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAcademicDetails_userId_key" ON "UserAcademicDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserWorkDetails_userId_key" ON "UserWorkDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDocuments_userId_key" ON "UserDocuments"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Semester_branchName_semesterName_key" ON "Semester"("branchName", "semesterName");

-- CreateIndex
CREATE UNIQUE INDEX "Section_branchName_semesterName_sectionName_key" ON "Section"("branchName", "semesterName", "sectionName");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_subjectCode_key" ON "Subject"("subjectCode");

-- CreateIndex
CREATE UNIQUE INDEX "TimetableOfDay_date_branchName_semesterName_sectionName_key" ON "TimetableOfDay"("date", "branchName", "semesterName", "sectionName");

-- CreateIndex
CREATE UNIQUE INDEX "Period_periodNumber_key" ON "Period"("periodNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Period_timetableId_periodNumber_key" ON "Period"("timetableId", "periodNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_userId_periodId_key" ON "Attendance"("userId", "periodId");

-- CreateIndex
CREATE UNIQUE INDEX "OtpVerification_email_key" ON "OtpVerification"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievements" ADD CONSTRAINT "Achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IATests" ADD CONSTRAINT "IATests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversityExams" ADD CONSTRAINT "UniversityExams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBusDetails" ADD CONSTRAINT "UserBusDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHostelDetails" ADD CONSTRAINT "UserHostelDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPersonalDetails" ADD CONSTRAINT "UserPersonalDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFamilyDetails" ADD CONSTRAINT "UserFamilyDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAcademicDetails" ADD CONSTRAINT "UserAcademicDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWorkDetails" ADD CONSTRAINT "UserWorkDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDocuments" ADD CONSTRAINT "UserDocuments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Semester" ADD CONSTRAINT "Semester_branchName_fkey" FOREIGN KEY ("branchName") REFERENCES "Branch"("branchName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_branchName_semesterName_fkey" FOREIGN KEY ("branchName", "semesterName") REFERENCES "Semester"("branchName", "semesterName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyMaterial" ADD CONSTRAINT "StudyMaterial_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyMaterial" ADD CONSTRAINT "StudyMaterial_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimetableOfDay" ADD CONSTRAINT "TimetableOfDay_branchName_semesterName_sectionName_fkey" FOREIGN KEY ("branchName", "semesterName", "sectionName") REFERENCES "Section"("branchName", "semesterName", "sectionName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Period" ADD CONSTRAINT "Period_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES "TimetableOfDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicCovered" ADD CONSTRAINT "TopicCovered_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placements" ADD CONSTRAINT "Placements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
