--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: root
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO root;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: root
--

COMMENT ON SCHEMA public IS '';


--
-- Name: AttendanceStatus; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."AttendanceStatus" AS ENUM (
    'PRESENT',
    'ABSENT',
    'NOT_TAKEN'
);


ALTER TYPE public."AttendanceStatus" OWNER TO root;

--
-- Name: BranchType; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."BranchType" AS ENUM (
    'AIML',
    'ECE',
    'CSE',
    'EEE',
    'ISE',
    'MECH'
);


ALTER TYPE public."BranchType" OWNER TO root;

--
-- Name: ExamType; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."ExamType" AS ENUM (
    'EXTERNAL',
    'INTERNAL'
);


ALTER TYPE public."ExamType" OWNER TO root;

--
-- Name: ExamWritterType; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."ExamWritterType" AS ENUM (
    'MCQ',
    'WRITTEN'
);


ALTER TYPE public."ExamWritterType" OWNER TO root;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."Role" AS ENUM (
    'STUDENT',
    'ADMIN',
    'HOD',
    'SUPERADMIN',
    'STAFF'
);


ALTER TYPE public."Role" OWNER TO root;

--
-- Name: Schema; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."Schema" AS ENUM (
    'YEAR_2018',
    'YEAR_2021',
    'YEAR_2022',
    'YEAR_2024',
    'YEAR_2023'
);


ALTER TYPE public."Schema" OWNER TO root;

--
-- Name: Section; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."Section" AS ENUM (
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H'
);


ALTER TYPE public."Section" OWNER TO root;

--
-- Name: SemesterType; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."SemesterType" AS ENUM (
    'S1',
    'S2',
    'S3SemesterType',
    'S4',
    'S5',
    'S6',
    'S7',
    'S8'
);


ALTER TYPE public."SemesterType" OWNER TO root;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Attendance; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Attendance" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "periodId" text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    name text,
    usn text,
    status public."AttendanceStatus" DEFAULT 'NOT_TAKEN'::public."AttendanceStatus" NOT NULL
);


ALTER TABLE public."Attendance" OWNER TO root;

--
-- Name: Branch; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Branch" (
    name public."BranchType" NOT NULL
);


ALTER TABLE public."Branch" OWNER TO root;

--
-- Name: OtpVerification; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."OtpVerification" (
    id text NOT NULL,
    email text NOT NULL,
    otp integer NOT NULL,
    "otpExpiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."OtpVerification" OWNER TO root;

--
-- Name: Period; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Period" (
    id text NOT NULL,
    "timetableId" text NOT NULL,
    "periodNumber" integer NOT NULL,
    "startTime" timestamp(3) without time zone NOT NULL,
    "endTime" timestamp(3) without time zone NOT NULL,
    subject text NOT NULL,
    staff text NOT NULL,
    "subjectCode" text NOT NULL,
    whatlearned text,
    "isLab" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Period" OWNER TO root;

--
-- Name: Period_periodNumber_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Period_periodNumber_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Period_periodNumber_seq" OWNER TO root;

--
-- Name: Period_periodNumber_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Period_periodNumber_seq" OWNED BY public."Period"."periodNumber";


--
-- Name: Semester; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Semester" (
    id text NOT NULL,
    "branchName" public."BranchType" NOT NULL,
    number public."SemesterType" NOT NULL
);


ALTER TABLE public."Semester" OWNER TO root;

--
-- Name: Subject; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Subject" (
    id text NOT NULL,
    "subjectName" text NOT NULL,
    "subjectCode" text NOT NULL,
    schema public."Schema" DEFAULT 'YEAR_2021'::public."Schema" NOT NULL,
    "noOfCredits" integer NOT NULL,
    "noOfHours" integer,
    "examType" public."ExamType" DEFAULT 'EXTERNAL'::public."ExamType" NOT NULL,
    "examWritter" public."ExamWritterType" DEFAULT 'WRITTEN'::public."ExamWritterType" NOT NULL,
    "staffName" text,
    "isLab" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Subject" OWNER TO root;

--
-- Name: TimetableOfDay; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."TimetableOfDay" (
    id text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "branchName" public."BranchType" NOT NULL,
    "semesterNumber" public."SemesterType" NOT NULL
);


ALTER TABLE public."TimetableOfDay" OWNER TO root;

--
-- Name: User; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text,
    usn text,
    section public."Section" DEFAULT 'A'::public."Section" NOT NULL,
    schema public."Schema",
    branch public."BranchType" DEFAULT 'AIML'::public."BranchType",
    semester public."SemesterType" DEFAULT 'S1'::public."SemesterType",
    role public."Role" DEFAULT 'STUDENT'::public."Role" NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO root;

--
-- Name: UserAccademicDetails; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."UserAccademicDetails" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."UserAccademicDetails" OWNER TO root;

--
-- Name: UserFamilyDetails; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."UserFamilyDetails" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."UserFamilyDetails" OWNER TO root;

--
-- Name: UserPrsonalDetails; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."UserPrsonalDetails" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."UserPrsonalDetails" OWNER TO root;

--
-- Name: userDocuments; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."userDocuments" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."userDocuments" OWNER TO root;

--
-- Name: Period periodNumber; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Period" ALTER COLUMN "periodNumber" SET DEFAULT nextval('public."Period_periodNumber_seq"'::regclass);


--
-- Data for Name: Attendance; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Attendance" (id, "userId", "periodId", date, name, usn, status) FROM stdin;
\.


--
-- Data for Name: Branch; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Branch" (name) FROM stdin;
\.


--
-- Data for Name: OtpVerification; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."OtpVerification" (id, email, otp, "otpExpiresAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Period; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Period" (id, "timetableId", "periodNumber", "startTime", "endTime", subject, staff, "subjectCode", whatlearned, "isLab") FROM stdin;
\.


--
-- Data for Name: Semester; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Semester" (id, "branchName", number) FROM stdin;
\.


--
-- Data for Name: Subject; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Subject" (id, "subjectName", "subjectCode", schema, "noOfCredits", "noOfHours", "examType", "examWritter", "staffName", "isLab") FROM stdin;
\.


--
-- Data for Name: TimetableOfDay; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."TimetableOfDay" (id, date, "branchName", "semesterNumber") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."User" (id, email, password, name, usn, section, schema, branch, semester, role, "isVerified", "createdAt", "updatedAt") FROM stdin;
9d2998fe-1fb8-42ca-a82d-e8497740b95d	0@0.com	$2b$10$ecdt22Itxh5MrMDWRDLFVeDbmRQfsbzLfj.GoNRCn/6Ps6LX3JI8u		\N	A	\N	AIML	S1	ADMIN	f	2025-04-05 05:57:49.088	2025-04-05 05:57:49.088
\.


--
-- Data for Name: UserAccademicDetails; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."UserAccademicDetails" (id, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: UserFamilyDetails; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."UserFamilyDetails" (id, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: UserPrsonalDetails; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."UserPrsonalDetails" (id, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: userDocuments; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."userDocuments" (id, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: Period_periodNumber_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Period_periodNumber_seq"', 1, false);


--
-- Name: Attendance Attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY (id);


--
-- Name: Branch Branch_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Branch"
    ADD CONSTRAINT "Branch_pkey" PRIMARY KEY (name);


--
-- Name: OtpVerification OtpVerification_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."OtpVerification"
    ADD CONSTRAINT "OtpVerification_pkey" PRIMARY KEY (id);


--
-- Name: Period Period_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Period"
    ADD CONSTRAINT "Period_pkey" PRIMARY KEY (id);


--
-- Name: Semester Semester_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Semester"
    ADD CONSTRAINT "Semester_pkey" PRIMARY KEY (id);


--
-- Name: Subject Subject_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Subject"
    ADD CONSTRAINT "Subject_pkey" PRIMARY KEY (id);


--
-- Name: TimetableOfDay TimetableOfDay_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."TimetableOfDay"
    ADD CONSTRAINT "TimetableOfDay_pkey" PRIMARY KEY (id);


--
-- Name: UserAccademicDetails UserAccademicDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserAccademicDetails"
    ADD CONSTRAINT "UserAccademicDetails_pkey" PRIMARY KEY (id);


--
-- Name: UserFamilyDetails UserFamilyDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserFamilyDetails"
    ADD CONSTRAINT "UserFamilyDetails_pkey" PRIMARY KEY (id);


--
-- Name: UserPrsonalDetails UserPrsonalDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserPrsonalDetails"
    ADD CONSTRAINT "UserPrsonalDetails_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: userDocuments userDocuments_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."userDocuments"
    ADD CONSTRAINT "userDocuments_pkey" PRIMARY KEY (id);


--
-- Name: Attendance_userId_periodId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Attendance_userId_periodId_key" ON public."Attendance" USING btree ("userId", "periodId");


--
-- Name: OtpVerification_email_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "OtpVerification_email_key" ON public."OtpVerification" USING btree (email);


--
-- Name: Period_timetableId_periodNumber_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Period_timetableId_periodNumber_key" ON public."Period" USING btree ("timetableId", "periodNumber");


--
-- Name: Semester_branchName_number_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Semester_branchName_number_key" ON public."Semester" USING btree ("branchName", number);


--
-- Name: Subject_subjectCode_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Subject_subjectCode_key" ON public."Subject" USING btree ("subjectCode");


--
-- Name: TimetableOfDay_date_branchName_semesterNumber_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "TimetableOfDay_date_branchName_semesterNumber_key" ON public."TimetableOfDay" USING btree (date, "branchName", "semesterNumber");


--
-- Name: UserAccademicDetails_userId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "UserAccademicDetails_userId_key" ON public."UserAccademicDetails" USING btree ("userId");


--
-- Name: UserFamilyDetails_userId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "UserFamilyDetails_userId_key" ON public."UserFamilyDetails" USING btree ("userId");


--
-- Name: UserPrsonalDetails_userId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "UserPrsonalDetails_userId_key" ON public."UserPrsonalDetails" USING btree ("userId");


--
-- Name: User_branch_semester_section_idx; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "User_branch_semester_section_idx" ON public."User" USING btree (branch, semester, section);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_usn_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "User_usn_key" ON public."User" USING btree (usn);


--
-- Name: userDocuments_userId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "userDocuments_userId_key" ON public."userDocuments" USING btree ("userId");


--
-- Name: Attendance Attendance_periodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES public."Period"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Attendance Attendance_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Period Period_timetableId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Period"
    ADD CONSTRAINT "Period_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES public."TimetableOfDay"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Semester Semester_branchName_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Semester"
    ADD CONSTRAINT "Semester_branchName_fkey" FOREIGN KEY ("branchName") REFERENCES public."Branch"(name) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TimetableOfDay TimetableOfDay_branchName_semesterNumber_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."TimetableOfDay"
    ADD CONSTRAINT "TimetableOfDay_branchName_semesterNumber_fkey" FOREIGN KEY ("branchName", "semesterNumber") REFERENCES public."Semester"("branchName", number) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserAccademicDetails UserAccademicDetails_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserAccademicDetails"
    ADD CONSTRAINT "UserAccademicDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserFamilyDetails UserFamilyDetails_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserFamilyDetails"
    ADD CONSTRAINT "UserFamilyDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserPrsonalDetails UserPrsonalDetails_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserPrsonalDetails"
    ADD CONSTRAINT "UserPrsonalDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: userDocuments userDocuments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."userDocuments"
    ADD CONSTRAINT "userDocuments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: root
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

