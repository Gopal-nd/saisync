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
-- Name: AssignmentType; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."AssignmentType" AS ENUM (
    'ASSIGNMENT',
    'HOMEWORK',
    'PROJECT'
);


ALTER TYPE public."AssignmentType" OWNER TO root;

--
-- Name: AttendanceStatus; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."AttendanceStatus" AS ENUM (
    'PRESENT',
    'ABSENT',
    'NOT_TAKEN',
    'OD'
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
    'MECH',
    'CYBER',
    'DS',
    'IOT',
    'BLOCKCHAIN'
);


ALTER TYPE public."BranchType" OWNER TO root;

--
-- Name: ExamType; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."ExamType" AS ENUM (
    'INTERNAL',
    'EXTERNAL'
);


ALTER TYPE public."ExamType" OWNER TO root;

--
-- Name: LabBatch; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."LabBatch" AS ENUM (
    'B1',
    'B2',
    'B3'
);


ALTER TYPE public."LabBatch" OWNER TO root;

--
-- Name: PlacementType; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."PlacementType" AS ENUM (
    'INTERNSHIP',
    'JOB'
);


ALTER TYPE public."PlacementType" OWNER TO root;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."Role" AS ENUM (
    'STUDENT',
    'ADMIN',
    'STAFF'
);


ALTER TYPE public."Role" OWNER TO root;

--
-- Name: Schema; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."Schema" AS ENUM (
    'Y_2022',
    'Y_2021',
    'Y_2018',
    'Y_2026'
);


ALTER TYPE public."Schema" OWNER TO root;

--
-- Name: SectionType; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."SectionType" AS ENUM (
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L'
);


ALTER TYPE public."SectionType" OWNER TO root;

--
-- Name: SemesterType; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."SemesterType" AS ENUM (
    'S1',
    'S2',
    'S3',
    'S4',
    'S5',
    'S6',
    'S7',
    'S8'
);


ALTER TYPE public."SemesterType" OWNER TO root;

--
-- Name: WrittenType; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."WrittenType" AS ENUM (
    'MCQ',
    'WRITTEN'
);


ALTER TYPE public."WrittenType" OWNER TO root;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Achievements; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Achievements" (
    id text NOT NULL,
    "userId" text NOT NULL,
    semester public."SemesterType" NOT NULL,
    branch public."BranchType" NOT NULL,
    name text,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Achievements" OWNER TO root;

--
-- Name: Activities; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Activities" (
    id text NOT NULL,
    "userId" text NOT NULL,
    semester public."SemesterType" NOT NULL,
    branch public."BranchType" NOT NULL,
    name text,
    "subjectName" text NOT NULL,
    "subjectCode" text NOT NULL,
    "obtainedMarks" integer NOT NULL,
    "totalMarks" integer NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Activities" OWNER TO root;

--
-- Name: Assignment; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Assignment" (
    id text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    type public."AssignmentType" DEFAULT 'ASSIGNMENT'::public."AssignmentType" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "dueDate" timestamp(3) without time zone NOT NULL,
    "createdById" text NOT NULL,
    branch public."BranchType" NOT NULL,
    semester public."SemesterType" NOT NULL,
    section public."SectionType" NOT NULL
);


ALTER TABLE public."Assignment" OWNER TO root;

--
-- Name: AssignmentSubmission; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."AssignmentSubmission" (
    id text NOT NULL,
    "assignmentId" text NOT NULL,
    "submittedById" text NOT NULL,
    "submissionUrl" text NOT NULL,
    "submittedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."AssignmentSubmission" OWNER TO root;

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
    "branchName" public."BranchType" NOT NULL
);


ALTER TABLE public."Branch" OWNER TO root;

--
-- Name: IATests; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."IATests" (
    id text NOT NULL,
    "userId" text NOT NULL,
    semester public."SemesterType" NOT NULL,
    branch public."BranchType" NOT NULL,
    "testNo" integer NOT NULL,
    name text,
    "subjectName" text NOT NULL,
    "subjectCode" text NOT NULL,
    "obtainedMarks" integer NOT NULL,
    "totalMarks" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."IATests" OWNER TO root;

--
-- Name: Notification; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Notification" (
    id text NOT NULL,
    "senderId" text NOT NULL,
    "receiverId" text,
    branch public."BranchType",
    semester public."SemesterType",
    section public."SectionType",
    "isGlobal" boolean DEFAULT false NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Notification" OWNER TO root;

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
-- Name: Placements; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Placements" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "placementDate" timestamp(3) without time zone NOT NULL,
    "placementType" public."PlacementType" NOT NULL,
    year integer NOT NULL,
    "placementName" text NOT NULL,
    company text NOT NULL,
    ctc text,
    location text,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Placements" OWNER TO root;

--
-- Name: Projects; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Projects" (
    id text NOT NULL,
    "userId" text NOT NULL,
    semester public."SemesterType" NOT NULL,
    branch public."BranchType" NOT NULL,
    name text,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Projects" OWNER TO root;

--
-- Name: Section; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Section" (
    id text NOT NULL,
    "sectionName" public."SectionType" NOT NULL,
    "branchName" public."BranchType" NOT NULL,
    "semesterName" public."SemesterType" NOT NULL
);


ALTER TABLE public."Section" OWNER TO root;

--
-- Name: Semester; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Semester" (
    id text NOT NULL,
    "branchName" public."BranchType" NOT NULL,
    "semesterName" public."SemesterType" NOT NULL
);


ALTER TABLE public."Semester" OWNER TO root;

--
-- Name: StudyMaterial; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."StudyMaterial" (
    id text NOT NULL,
    "subjectId" text NOT NULL,
    name text NOT NULL,
    description text,
    url text NOT NULL,
    "uploadedBy" text NOT NULL
);


ALTER TABLE public."StudyMaterial" OWNER TO root;

--
-- Name: Subject; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Subject" (
    id text NOT NULL,
    "subjectName" text NOT NULL,
    "subjectCode" text NOT NULL,
    "noOfCredits" integer NOT NULL,
    "examType" public."ExamType" DEFAULT 'INTERNAL'::public."ExamType" NOT NULL,
    "writtenType" public."WrittenType" DEFAULT 'MCQ'::public."WrittenType" NOT NULL,
    syllabus text,
    "noOfHours" integer,
    "isLab" boolean DEFAULT false NOT NULL,
    year text DEFAULT '2022'::text NOT NULL
);


ALTER TABLE public."Subject" OWNER TO root;

--
-- Name: TimetableOfDay; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."TimetableOfDay" (
    id text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "sectionName" public."SectionType" NOT NULL,
    "branchName" public."BranchType" NOT NULL,
    "semesterName" public."SemesterType" NOT NULL
);


ALTER TABLE public."TimetableOfDay" OWNER TO root;

--
-- Name: TopicCovered; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."TopicCovered" (
    id text NOT NULL,
    "periodId" text NOT NULL,
    "topicTitle" text NOT NULL,
    "topicDescription" text NOT NULL
);


ALTER TABLE public."TopicCovered" OWNER TO root;

--
-- Name: UniversityExams; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."UniversityExams" (
    id text NOT NULL,
    "userId" text NOT NULL,
    semester public."SemesterType" NOT NULL,
    branch public."BranchType" NOT NULL,
    name text,
    "subjectName" text NOT NULL,
    "subjectCode" text NOT NULL,
    "obtainedMarks" integer NOT NULL,
    "totalMarks" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."UniversityExams" OWNER TO root;

--
-- Name: User; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    usn text,
    "collageId" text,
    section public."SectionType" DEFAULT 'A'::public."SectionType" NOT NULL,
    schema public."Schema" DEFAULT 'Y_2022'::public."Schema" NOT NULL,
    branch public."BranchType" DEFAULT 'AIML'::public."BranchType",
    semester public."SemesterType" DEFAULT 'S1'::public."SemesterType",
    role public."Role" DEFAULT 'STUDENT'::public."Role" NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "mentorId" text,
    "labBatch" public."LabBatch" DEFAULT 'B1'::public."LabBatch" NOT NULL,
    "openElectives" text
);


ALTER TABLE public."User" OWNER TO root;

--
-- Name: UserAcademicDetails; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."UserAcademicDetails" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "entranceExamMaxScore" double precision,
    "entranceExamName" text,
    "entranceExamRank" integer,
    "entranceExamScore" double precision,
    "tenthBoard" text,
    "tenthMarks" double precision,
    "tenthMaxMarks" double precision,
    "tenthPercentage" double precision,
    "tenthSchoolName" text,
    "twelfthBoard" text,
    "twelfthMarks" double precision,
    "twelfthMaxMarks" double precision,
    "twelfthPercentage" double precision,
    "twelfthSchoolName" text
);


ALTER TABLE public."UserAcademicDetails" OWNER TO root;

--
-- Name: UserBusDetails; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."UserBusDetails" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "busNumber" text,
    "isUsingBus" boolean DEFAULT false NOT NULL,
    "pickupPoint" text,
    route text
);


ALTER TABLE public."UserBusDetails" OWNER TO root;

--
-- Name: UserDocuments; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."UserDocuments" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "aadharCard" text,
    "entrenceExamCert" text,
    "fatherPhoto" text,
    marksheet10 text,
    marksheet12 text,
    "motherPhoto" text,
    "panCard" text,
    photo text,
    "seblingPhoto" text,
    "transferCert" text
);


ALTER TABLE public."UserDocuments" OWNER TO root;

--
-- Name: UserFamilyDetails; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."UserFamilyDetails" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "fatherIncome" text,
    "fatherName" text,
    "fatherOccupation" text,
    "fatherPhone" text,
    "gardianName" text,
    "guardianPhone" text,
    "motherIncome" text,
    "motherName" text,
    "motherOccupation" text,
    "motherPhone" text,
    "seblingName" text
);


ALTER TABLE public."UserFamilyDetails" OWNER TO root;

--
-- Name: UserHostelDetails; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."UserHostelDetails" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    block text,
    "isStaying" boolean DEFAULT true NOT NULL,
    "roomNumber" text,
    "wardenName" text
);


ALTER TABLE public."UserHostelDetails" OWNER TO root;

--
-- Name: UserPersonalDetails; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."UserPersonalDetails" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "aadharNumber" text,
    "bloodGroup" text,
    "currentAddress" text,
    "currentCity" text,
    "currentPincode" text,
    "currentState" text,
    dob timestamp(3) without time zone,
    gender text,
    height text,
    "maritalStatus" text,
    nationality text,
    "panNumber" text,
    "permanentAddress" text,
    "permanentCity" text,
    "permanentPincode" text,
    "permanentState" text,
    phone text,
    weight text
);


ALTER TABLE public."UserPersonalDetails" OWNER TO root;

--
-- Name: UserWorkDetails; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."UserWorkDetails" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "companyName" text,
    "endDate" timestamp(3) without time zone,
    experiance text,
    "isCurrentlyWorking" boolean DEFAULT false NOT NULL,
    "position" text,
    "startDate" timestamp(3) without time zone
);


ALTER TABLE public."UserWorkDetails" OWNER TO root;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO root;

--
-- Name: Period periodNumber; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Period" ALTER COLUMN "periodNumber" SET DEFAULT nextval('public."Period_periodNumber_seq"'::regclass);


--
-- Data for Name: Achievements; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Achievements" (id, "userId", semester, branch, name, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Activities; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Activities" (id, "userId", semester, branch, name, "subjectName", "subjectCode", "obtainedMarks", "totalMarks", description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Assignment; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Assignment" (id, title, content, type, "createdAt", "dueDate", "createdById", branch, semester, section) FROM stdin;
\.


--
-- Data for Name: AssignmentSubmission; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."AssignmentSubmission" (id, "assignmentId", "submittedById", "submissionUrl", "submittedAt") FROM stdin;
\.


--
-- Data for Name: Attendance; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Attendance" (id, "userId", "periodId", date, name, usn, status) FROM stdin;
\.


--
-- Data for Name: Branch; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Branch" ("branchName") FROM stdin;
AIML
ECE
EEE
CSE
BLOCKCHAIN
DS
MECH
CYBER
IOT
ISE
\.


--
-- Data for Name: IATests; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."IATests" (id, "userId", semester, branch, "testNo", name, "subjectName", "subjectCode", "obtainedMarks", "totalMarks", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Notification" (id, "senderId", "receiverId", branch, semester, section, "isGlobal", message, "createdAt") FROM stdin;
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
-- Data for Name: Placements; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Placements" (id, "userId", "placementDate", "placementType", year, "placementName", company, ctc, location, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Projects; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Projects" (id, "userId", semester, branch, name, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Section; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Section" (id, "sectionName", "branchName", "semesterName") FROM stdin;
311cb4ad-cffa-465e-9195-3c49dbff17c5	C	AIML	S1
39f7464c-6a0e-4ea3-9f7e-207fda71bf41	B	AIML	S1
36579ca8-cdb7-4b51-9652-896548c69652	G	AIML	S1
893f944e-e3dc-47d0-8709-76d75510cce2	D	AIML	S1
cc91c005-5de7-401e-aa09-ca68e0ef3888	A	AIML	S1
078c6dc6-2875-4654-a155-b3f1b8e5b247	F	AIML	S2
61efc642-a4d0-4eec-850e-ba79a531453a	K	AIML	S2
c55adfba-a005-42e7-8b81-e1a71da9ff8f	G	AIML	S2
7adf1815-d30e-43d5-9b4a-f18149f148b6	I	AIML	S2
a073cf3d-0660-4b1e-bdef-d4716df31388	L	AIML	S2
bef9aef3-b60c-4afe-97b8-273592a9bece	E	AIML	S3
1f836034-7f74-4ebc-97d9-8d372ca7c457	C	AIML	S3
3064c78d-28e8-43d4-adbf-8a37a169d826	F	AIML	S3
ce043671-6f7d-4174-8d4d-1eb4a8e7cb21	B	AIML	S3
77fcdcd1-80f7-4013-a34c-2997b293f82c	J	AIML	S3
ea08c0fa-9cb8-4f68-b5a0-29c90c226f47	C	AIML	S4
01d97eba-54b8-45d4-90d5-93e43d7efe0e	J	AIML	S4
da688e50-0b61-447f-98f4-7df3c4627ef5	K	AIML	S4
3ca8e384-e67c-493c-b681-230e432fae1b	E	AIML	S4
42f014e3-c0d3-4626-a905-dd8223a4dc75	D	AIML	S4
20b9be2f-86df-470a-a4e5-f96010302d0c	A	AIML	S5
6f20cf5e-56b8-49ae-a58c-3e318c9e3b2a	J	AIML	S5
da12d9db-4b3b-4949-b964-f2468993840e	H	AIML	S5
56e99b90-d460-459f-8caf-f00921638167	I	AIML	S5
d51c7ee6-77c3-4dd8-a293-3d1a86ef1376	C	AIML	S5
cbb06418-0b36-480d-a931-c9baa58d65aa	C	AIML	S6
c12febfe-6fdd-484f-b78a-a969d64cab72	F	AIML	S6
6b35f3b7-f833-4844-9b9f-990973108919	A	AIML	S6
de6e81e9-55aa-4c20-918e-ff7e1b26d5b8	G	AIML	S6
2dc30ede-d978-4da8-af1c-de20ecd735cd	J	AIML	S6
e76ba423-bb9d-43e8-8fa3-eebd835218e6	E	AIML	S7
eb129bd8-222d-4fa9-8ca0-b5013270e6ee	B	AIML	S7
86c94fb0-e32e-41f9-bdb2-d766c371e061	D	AIML	S7
b2b0f3b4-ead4-4f15-b7ef-03de638ab9f1	H	AIML	S7
2a0ed8f4-68b3-4385-8e4f-b5a4211bcd63	G	AIML	S7
753364db-3dbf-4429-8ccb-011604159500	E	AIML	S8
a3c3ba0d-7c61-4cd1-a38b-12ef27bc1edb	I	AIML	S8
9fbd4672-4992-4a93-955c-61c0e78d9a37	H	AIML	S8
6545f01a-0b34-41ef-9ce4-f8f99740393f	L	AIML	S8
b6dd909e-f38a-47de-8ab4-ae266b48dd8e	J	AIML	S8
dcd24e13-ec2c-4815-94e6-cf6e8cdb7cb7	E	ECE	S1
4fefba33-77e9-4c1c-bbc2-0747fa09dcfb	B	ECE	S1
752b144c-3ea3-4a09-98d8-8c1210a305b7	A	ECE	S1
b9799970-d3bb-433f-a368-07bc34cc4efc	L	ECE	S1
55f202b9-382d-424e-ac44-ee7e2917206b	D	ECE	S1
542376dd-5338-4725-bff9-735caeeb4166	F	ECE	S2
fb1542f7-e306-4d9d-acb0-ed276d9ae2d6	H	ECE	S2
a607827b-5a0f-47ff-be40-d3f9e2a583dc	J	ECE	S2
74946c10-7418-40e0-93be-a7429d386e80	E	ECE	S2
1dd5873a-4377-4101-8c47-ce0e715e7c32	D	ECE	S2
e75e9ad4-2d5b-4743-87d2-7a48330d584c	D	ECE	S3
a35820fd-7bfc-47d0-93bb-4576eaaf0fa3	I	ECE	S3
a4e10b5f-d83e-4b06-b69e-c2741e44db85	C	ECE	S3
894adf8d-281c-4b1e-bde0-12aa725bdaf0	H	ECE	S3
bd8315b1-d20f-4fd0-bf41-b5b5f096aac5	J	ECE	S3
c769b24e-8e84-4b5e-93aa-55cebbe0f89e	I	ECE	S4
a8c98182-f823-497c-833c-6ddca17def8c	K	ECE	S4
ca3f4981-f96f-4fec-948a-892ee94e31eb	L	ECE	S4
b4bbcfcd-9e51-4f59-9b3a-a82abf73411f	E	ECE	S4
4469d080-dc21-4af1-97d3-8d67be40e000	J	ECE	S4
c5b231fe-d480-4711-a020-d680e5658366	B	ECE	S5
abc28536-5c81-4e8f-985d-10a559b9ad0e	E	ECE	S5
77fe6c6e-2c60-46e6-8b53-15b9d7274f6f	G	ECE	S5
dd2876b9-fdc2-41db-97cd-12da6e06f9f5	D	ECE	S5
38aae39a-731b-4906-9e65-a3bc32b9967a	J	ECE	S5
381662ee-f88f-4fae-b750-275de6537b12	C	ECE	S6
f23331e2-ccdd-489d-b1e1-1fed91f8969d	B	ECE	S6
3459ae3a-f78f-4209-a11d-7e14fa2e39df	H	ECE	S6
7a390058-fdd1-4d32-a7eb-8047d2f05e4c	L	ECE	S6
ca88b070-7421-4e51-afab-1d21c2673083	D	ECE	S6
5f1d0819-5151-4c3e-ab9e-ef7a286a34e7	K	ECE	S7
941b211e-4977-4182-a697-29d01c8116b4	L	ECE	S7
0ac0e7b2-fb34-4667-b533-9232956549e1	F	ECE	S7
4be03633-f7f2-4bbc-a1f1-71fe3bb10489	E	ECE	S7
93aa404d-61b5-4988-a662-303759ddd964	C	ECE	S7
6f56a65b-266b-4313-95c6-acfd0e9d87cd	F	ECE	S8
e04db088-b32e-4121-9de8-c41aca8f7ac9	B	ECE	S8
350a1493-4f7c-44c7-b739-5c0f6e0a12a2	H	ECE	S8
46e36c99-0e47-4a6b-b4e8-0eddf137303e	K	ECE	S8
4f12c445-efb6-4ce8-ba4d-e302d8bd81eb	A	ECE	S8
64a66613-9b4c-4d94-b947-6432ac7076b6	I	CSE	S1
9593d55b-3a2b-44b0-b3cc-1ee5b213f46c	A	CSE	S1
6e4d4fa5-7e59-42a5-be84-9b3c1d6ec955	G	CSE	S1
688ae42f-492e-4bdf-8d34-3d2d0a69181c	K	CSE	S1
332a0ba3-2d18-440c-9cc6-a97180b929f8	C	CSE	S1
d7aa60d3-8417-48ef-972b-5d7617eab378	H	CSE	S2
c5304ff5-3365-4b27-9dd0-10ffa821a16a	J	CSE	S2
e19140c5-741d-46fe-8258-2530d5c8b4cf	F	CSE	S2
3ef79871-e58b-4888-8611-b6aadf178ead	L	CSE	S2
f6382975-364e-49c4-928f-49cb9d0f27a9	K	CSE	S2
6e93496b-ed7f-4ced-8cc3-af770f83ba03	A	CSE	S3
568bf1d8-9a72-4c97-a1a6-9a268ed8320c	F	CSE	S3
ea1bbbd9-cd63-48f9-b501-772190bda6c1	E	CSE	S3
bd57e27c-abcd-4fb6-898a-7eb1fa373b0d	G	CSE	S3
875a2ec4-165b-4de2-b447-deda5758a3b0	C	CSE	S3
2094ecee-18c9-4660-a995-a860ea8ea3e3	B	CSE	S4
7a820da5-ce1f-4de0-888c-2eeca99d841d	G	CSE	S4
72461bfe-1248-44e4-ad6a-161d8eecbdd7	E	AIML	S1
3176c786-c534-4750-a718-8d9c3cdc88c2	J	AIML	S2
a13b223d-be9f-4025-9ec3-d771cd979257	L	AIML	S3
92610053-8a2a-43b7-ab50-2ec9f90d5a0d	A	AIML	S4
a42db449-2fee-49e1-8c66-61cffbb7cc37	L	AIML	S5
412d2701-115f-4039-abf9-82b9687ca455	H	AIML	S6
e59bb15f-77a0-43a4-8659-d68c3a1e3e25	J	AIML	S7
b787f88b-79d3-4824-a386-269d16ac35c4	A	AIML	S8
42f3b32c-5fa7-4f4e-9eb7-a61876df3518	K	ECE	S1
3740c239-b0e8-40e6-b239-14625207de2f	I	ECE	S2
fc776772-1fed-4e1c-85c8-ee3083152b4e	A	ECE	S3
186ee7d6-baef-40a0-be8e-4dc549bd7e8d	F	ECE	S4
c53ac962-b615-42d9-b996-5638095e9dec	A	ECE	S5
6c7d5821-55b9-4ac0-9a52-a27b48d76044	G	ECE	S6
3d68ed1b-fbf4-48e6-bf59-94da0a4ea8af	G	ECE	S7
48adda41-bb2c-417e-b595-58a4213df4b6	G	ECE	S8
033991a9-e9dc-4503-a1d4-b12fb0a171da	F	CSE	S1
abe7e35f-2d7c-4ff9-aed0-12501e47781a	G	CSE	S2
cbb4add3-eef7-4fdb-81f4-d9e88d0a3bd9	L	CSE	S3
75b2396b-d7c1-4c29-9644-cf31f83093d8	F	CSE	S4
eb66142d-fb99-440a-b74b-28d39f4e3317	I	CSE	S5
64975b11-394c-4120-878c-47ff45bb01ec	H	CSE	S6
7a32ce0c-0836-4e89-9280-b9a4681a9663	F	CSE	S7
f5e13d4b-313c-4c99-bae2-e3ba6eb1423c	A	CSE	S8
a8ece05e-c503-4c49-901c-6ffe4bcfb689	K	EEE	S1
dca1fb37-2fac-4395-8a91-f52cf5778139	C	EEE	S2
d4b25d8c-229f-491f-bc99-1d4b917f0a4c	J	EEE	S3
9fe90cf7-d5e5-4772-a3a6-28e0f5e5871d	A	EEE	S4
b5757ff3-0bc6-4496-9044-b48b88cf1156	E	EEE	S5
ae52c65e-3788-49c5-b10b-9a7f8cebe94a	J	EEE	S6
e67faa1b-6c65-479e-bf2f-bd00a260989e	D	EEE	S7
ccc221c5-61f2-41ab-b1e5-334335d30b21	B	EEE	S8
daf34f13-6d14-4668-a9d1-014fecc698e3	I	ISE	S1
60000ee8-63f7-47e6-8228-ddff1aeb5f41	B	ISE	S2
1532bc4b-63ef-4fed-9789-3a586eae1e47	L	ISE	S3
4dc8c902-768e-44db-9a64-f8108d38f194	C	ISE	S4
25dc67f2-a51a-48c7-a7da-69dd85b1931b	G	ISE	S5
e7147cff-35a6-4935-aca4-e9395e206388	I	ISE	S6
eb7af24d-9281-4de9-97ec-2bb9c564ac9b	C	ISE	S7
2a57c4fe-283e-49da-8422-e9419a369e87	G	ISE	S8
932c9551-b109-45be-b517-7caa5f2c45a5	H	MECH	S1
b0d67b9e-cc72-4a1e-bf17-226a1034b111	B	MECH	S2
ac4037f6-2154-4f44-8e2c-1d90ccb17a42	B	MECH	S3
61cb0706-c242-494c-a53f-ed5cd1704237	A	MECH	S4
0bcca285-a093-4ab2-b008-7933a4469b43	J	MECH	S5
d93ae114-b775-41a7-9eb2-1011d226d651	C	MECH	S6
f2eaa064-e037-4ff9-a0af-176b215505ef	L	MECH	S7
2d06ae50-9cf7-4092-a5bf-2f2cf9d4d5aa	K	MECH	S8
8809f686-f859-49c7-aeaf-2735685ba351	E	CYBER	S1
84805bf6-ecb8-4ed2-b6cb-67e215743ba7	H	CYBER	S2
5ecdbe6a-8885-4e27-a9fa-a948538c7738	K	CYBER	S3
a7956153-6972-4d3f-a65b-6c7764b2c7ce	G	CYBER	S4
90485578-7aeb-459f-8c1a-718bdf8618cd	H	CYBER	S5
f87a7eba-663d-4ad2-8f6e-f70d00c2d0c1	A	CYBER	S6
426f88b7-f813-4d79-8291-81c727e5e851	E	CYBER	S7
c3732064-6d7e-49a8-b7c9-6ac59f49461d	J	CYBER	S8
ef9edc89-4d86-4abe-8fd2-a40fcd497ae7	A	DS	S1
59179910-f3ea-4c7d-8a5d-b803a51f6626	J	DS	S2
f6bca74c-ce40-40cf-b15c-54520eb0c9fb	J	DS	S3
cad32bbf-ea03-4bd5-adb5-ea4caf7675a1	B	DS	S4
e9ce3247-0142-4993-a9ec-1ac7d3937d91	H	DS	S5
4f1c2323-b501-414c-92f1-07a385714553	B	DS	S6
669c542c-045d-4153-a137-1800a5622330	I	DS	S7
873efd3d-28a8-4d93-addc-f894379f0c75	E	DS	S8
765bd3fb-4176-4696-9114-08dc3c2edaeb	D	IOT	S1
42116c8d-145a-4733-b403-07587e54f286	I	IOT	S2
128f96e4-96b8-4dd1-8873-d67f48803ecc	J	IOT	S3
2966f3db-81dd-4eea-82ca-dd823e52482d	I	IOT	S4
eff67ce9-e111-4e59-aa8c-a521628e7dd4	D	IOT	S5
292b598f-1280-4509-b331-c6c20c156799	J	IOT	S6
6a360299-cc55-49ae-8e13-c3a6a7beedd6	I	IOT	S7
a126be10-0906-4626-9cdf-89742b8819ba	B	IOT	S8
4a8e89ab-0444-41e9-a589-48eb832a7437	H	BLOCKCHAIN	S1
0bdecafd-9931-499b-9802-5e4062a88032	J	BLOCKCHAIN	S2
6ca045d8-f59b-4b4b-830a-a0bc522e290c	D	BLOCKCHAIN	S3
65bcfffc-2290-488d-8a41-d957a79adeb8	F	BLOCKCHAIN	S4
5283ccfb-5278-41bf-8952-50fdadbc1399	H	BLOCKCHAIN	S5
24bc200f-0d40-4ef4-afaa-eef37cf97dfb	E	BLOCKCHAIN	S6
e2183f22-3df3-47b3-90d1-f4484af93bce	H	BLOCKCHAIN	S7
9d5a3754-c4e0-4328-b8ab-535dcb03b8c6	A	BLOCKCHAIN	S8
74ca0d1d-a395-4eb3-be11-a10cb80e8a03	L	CSE	S4
e0a0f8f7-2fac-4108-a331-eb1ec8a123ca	F	CSE	S5
19d4d9b2-c643-4a08-94ba-f2f7b0d91aca	L	CSE	S5
9b3f009d-2a63-4cf6-9014-9a19b1806611	K	CSE	S6
45996566-2027-4d04-b606-d49204178627	A	CSE	S6
2ca17494-9818-4752-8846-be08cd802601	E	CSE	S7
eb4dabf5-1788-4168-8f9e-1ac5d80c88e2	A	CSE	S7
41dde4f1-e19f-4ff3-8aee-65952c2837bf	I	CSE	S8
67d771d3-bfeb-4fbe-8b23-67bc106ad81d	L	CSE	S8
d0261050-e94a-4720-a2d6-51762a8a9bf1	J	EEE	S1
112e8555-b3f3-49af-8f28-b4abc89a447e	C	EEE	S1
5b9a5f81-7bc9-4fcf-8d80-f681d6b4d126	J	EEE	S2
812a7237-3c13-45e1-a726-61ee029906f5	I	EEE	S2
8c2dc0c1-6b1a-4128-815f-e6e325928db5	B	EEE	S3
8c23477a-5712-4461-8181-952e72edcccb	L	EEE	S3
801ea95e-522d-4cc2-abd1-36650de73a0b	C	EEE	S4
37446891-83bc-4453-908f-87436f97750b	L	EEE	S4
d4060985-6aa0-42fe-8b35-c14bda1ef791	H	EEE	S5
9f57c14b-505b-4925-860e-137c7bb3ec7a	G	EEE	S5
9757233b-a89e-474f-b6dd-72e48c564ad6	F	EEE	S6
a09afeba-3c4b-4ab9-9a94-95a4d9df1cfa	K	EEE	S6
8ee416b2-fc01-47db-ae82-636fe848d0be	B	EEE	S7
9dbde579-3ecd-494a-ad7f-1d4f59593875	J	EEE	S7
ba0c7974-b928-4925-bfe7-cc821a23cd4a	L	EEE	S8
3f86fe71-1cd3-422f-91ef-280346eee6d5	G	EEE	S8
ef7e0208-db0c-40b8-a7d6-ecb95db9bd74	B	ISE	S1
5761f595-f944-4638-bc6c-1869b5513f19	E	ISE	S1
005a0c6e-9e08-4dad-9ac1-e60eacf8c476	L	ISE	S2
97dbf373-e253-4f1b-9d27-645f9a268796	F	ISE	S2
c138b9bd-bfeb-434a-b2f0-744137086382	D	ISE	S3
661a16c5-cf8a-4225-810c-b7194cc5092d	K	ISE	S3
16b84ba2-ce97-4380-ad77-5fee2d077e83	B	ISE	S4
4eb7549c-5672-46fe-b1a0-f2a7b2b50201	G	ISE	S4
c54999d3-81be-455e-b04e-5770cf9388ae	H	ISE	S5
ca6983ec-0b1a-4001-adc1-68790db2c483	L	ISE	S5
de3f6045-3970-436f-84d8-114ec07a6263	D	ISE	S6
6cda9f4c-d721-4fd6-a56c-978263c66161	K	ISE	S6
4f77dc6e-d858-4edf-99ed-29e9b158b85e	E	ISE	S7
8f6d3498-6c14-4987-8c11-87bedf11d2c1	J	ISE	S7
dd1eeb28-e8bb-4318-a989-fa58abef638f	K	ISE	S7
1feb0a17-14d1-44a3-ade4-3dbccb014e63	C	ISE	S8
d0cebe20-28d2-41b6-b491-d80b4b272063	B	ISE	S8
6a3f24fa-a5b6-4cad-9a28-9f913f1b2a01	L	ISE	S8
2ecb7bf6-74ba-426e-b2fc-35ce2fa3e5bb	F	ISE	S8
6a2dd684-f37b-4f3a-8100-e093e79b9cf4	D	MECH	S1
d20c8034-850d-43fc-8396-ca5b2dc208cb	J	MECH	S1
75511182-4f0d-4a7e-b7db-a12440451e4c	B	MECH	S1
07922e61-bc4f-470b-a90f-3dbd0ea96e96	C	MECH	S1
415b5bd5-6a44-47a8-ba85-48cc299d8834	E	MECH	S2
57cf1bd5-3c4e-4245-9602-5674ba166182	K	MECH	S2
a1772883-e90b-487b-838d-d23faecb3b56	L	MECH	S2
3c0ac99b-7d3a-4d1c-aa52-f170ed54384d	H	MECH	S2
f6d07cd9-737c-43f6-9e7d-5f9b40934946	C	MECH	S3
7e70a3ea-dec8-4484-bdc1-6f2d2e00e2eb	E	MECH	S3
bc3a665c-650e-4c01-97b8-c71312e90c8b	A	MECH	S3
3cd7e04e-3a87-47d7-8d21-8d19d6c85288	L	MECH	S3
65c1423c-c709-4c5c-be17-7da161e843de	C	MECH	S4
6d32f86e-b0bc-4abe-976c-de9280f868a7	H	MECH	S4
49c35b37-ea1d-4bcc-a3d1-e44bf7d1f1c4	K	MECH	S4
9d5da557-990d-4829-bed6-f3f7a1326ad3	I	MECH	S4
fa4c9320-3052-46ef-863e-8ae787e99cf0	J	MECH	S4
ce68371d-28e9-4f83-ac78-b5c2afdee738	A	MECH	S5
991790f8-83b9-4a94-849f-a987bc979eef	H	MECH	S5
4550c923-e2af-49bf-908f-cb4baf9b3e40	C	MECH	S5
b7e6815c-88fd-45f0-98ec-8e4bb078098f	D	MECH	S5
c2c15f30-aef5-45c0-9edd-ac107ac6a122	K	MECH	S5
fb3cdd11-e6ab-44f4-ba4d-11d39336a38e	L	MECH	S5
384513eb-d54f-4141-a93f-270d3fe0a9ca	G	MECH	S5
7ca51b3b-b1b9-48e0-b6a9-6cc6d49023dc	I	MECH	S5
5928c78b-43e0-46ff-9604-931560e2afc1	B	MECH	S6
19530551-1b72-4b0f-b1d8-9a3387ddf7e6	H	MECH	S6
48573614-86ab-4a1b-a6fa-73a33e1d0fe9	G	MECH	S6
f6a09d9b-9a7a-4c9f-a8bf-e8ffbd1651a5	D	MECH	S6
75a4cc29-0528-4c16-9884-2745a7b7d7b9	E	MECH	S6
44ff550b-7818-49b9-aaab-da1d1cd33583	A	MECH	S6
5b74ff26-ef2e-4764-a114-3b8247dada25	F	MECH	S6
95fc728f-491a-42fb-90e9-3bcbcb59aea3	K	MECH	S6
3999ef6a-e600-4249-b625-ae3085b5410e	E	MECH	S7
135c4dbc-d572-403f-bc41-30e4eb0e8740	J	MECH	S7
167736bd-12e0-4006-8680-1c9a3d917953	B	MECH	S7
21080d4c-cda0-4d9d-a976-660357f3cd79	D	MECH	S7
e57ca707-a370-4feb-b122-065cc122af1b	H	MECH	S7
cd72aaa9-e470-44c0-8510-3df2a6cd31ab	G	MECH	S7
a471f9bc-25af-4291-ab76-5258115d3b37	C	MECH	S7
695f8e99-f797-4ef5-8fee-573446ba03c4	K	MECH	S7
1f5f80ab-0ea8-4fd8-951e-f132090925bd	I	MECH	S8
f7cb3533-474d-4c72-adec-c23c8b7d8ddd	A	MECH	S8
e615c05b-38e8-447a-ae64-eb64c47ec0cb	D	MECH	S8
08cec45c-585a-49f8-a192-2a70d2ea3ba0	E	MECH	S8
9c34d1d5-b002-4a44-9a95-fc782ba86335	H	MECH	S8
b651c068-3fb4-4c0e-a1ae-4533c0448c3d	F	MECH	S8
6bafef5e-475b-4f53-ab0b-c2b8fc912981	J	MECH	S8
a8c2eb44-e943-4137-a17a-58ffd53a46bb	L	MECH	S8
1ff8e723-5e86-4d94-9664-7c86550736dd	A	CYBER	S1
d1d8f2b2-9a1e-41df-987d-5550592647b0	D	CYBER	S1
bbba48f5-ec19-4bf0-a681-a1f6208b8377	H	CYBER	S1
9a6b6f89-c311-46e6-a625-40d1cad9df9b	G	CYBER	S1
84120674-46bc-4c2a-88c9-7334046f2e37	H	AIML	S1
1f45250c-5d70-43cb-be11-4ee901860c82	J	AIML	S1
a718e6f4-43c8-423f-90c7-6ba3dd3748ec	C	AIML	S2
8a0f1119-13de-49b0-a905-c96de8894c5a	H	AIML	S2
f17e7ed6-045e-4279-bcfb-9fca6cb70eb0	A	AIML	S3
0b22f127-93dd-49ef-916d-4474b5ffec46	D	AIML	S3
db38ec18-7f5e-4e05-b4a0-82c8537f58c9	H	AIML	S4
45305ea5-161f-499d-8bbc-88a00fd799bb	G	AIML	S4
b44eca33-d61d-49c3-8d63-15def1c9eb46	F	AIML	S5
74d4773b-7c7e-4f7e-b611-56b14f432ede	G	AIML	S5
88693238-b22f-4c9f-9ce2-e409a38ff75e	E	AIML	S6
34508b6b-32b7-460f-9d55-0b246eada711	L	AIML	S6
c9f1a7ad-b08d-44cf-b860-ffd64c1a410f	C	AIML	S7
11aca580-aa29-49f2-978e-b7e5f00bd657	F	AIML	S7
4ff99ffc-9878-4289-9b7a-7c760769a4ac	G	AIML	S8
a5059510-c49a-418e-b33a-354671cccc44	F	AIML	S8
9ffdf29a-9c1e-4143-9136-2a232310d204	H	ECE	S1
02ae0925-a378-498f-af9f-a8b1fac7429a	F	ECE	S1
1f1aa722-af69-4bdd-86b4-2132cfbe2f01	A	ECE	S2
a86fc34d-3e59-4014-bc77-c00d9a2c70c9	B	ECE	S2
2b653a48-b530-490d-9807-03aefeddf5c5	F	ECE	S3
613ce664-9000-4b7a-b0bf-2fe096e288fc	B	ECE	S3
3c5582a2-0872-45fc-b7f5-92e62db92202	A	ECE	S4
d5c08911-d60b-4f4d-b858-62c71f02cb69	H	ECE	S4
081c0b51-8b07-46e6-b1b4-065658e0b4da	I	ECE	S5
2d1f23b5-1191-480f-9527-d02cab8cba0b	K	ECE	S5
f3d96990-40fb-4821-abaa-e26c965e53c6	A	ECE	S6
93b5907e-b1b9-43f3-8f9b-1084fc68ad16	K	ECE	S6
917084c6-b022-43cc-88db-96b019cc2ea9	I	ECE	S7
18e30d0b-be92-4ad1-8ba2-67c6fc62a04f	D	ECE	S7
39553ce8-d85a-42e4-839c-10c81bd47a8e	I	ECE	S8
e14e83fc-d866-4a8b-a9b2-9939c01af35f	J	ECE	S8
a4e81b7a-531e-4f12-a15b-8792acaee64b	H	CSE	S1
9a451941-6a98-41a4-aff9-419794f630a0	B	CSE	S1
caed5d06-4d1e-418c-a733-d7d1554b03d9	C	CSE	S2
a2af45b7-2c2b-4ec2-b3f2-5d2b0664a059	D	CSE	S2
7c68ecc0-23c0-477a-b3f2-ffc065ce1b49	J	CSE	S3
1a542ede-ba60-4c16-9714-4e9a22259eb6	D	CSE	S3
ce8b352d-e755-4402-849f-5e4dff10410a	D	CSE	S4
cb57c614-60c1-4aa5-a263-113fdf7b709a	E	CSE	S4
23e16522-3ec8-4ee2-87a9-acc8837e8c41	G	CSE	S5
8bf754f0-7d26-4569-a63d-c4d45e91bf66	A	CSE	S5
85dc8ef1-de7d-49c3-9f6b-4cb9a83dbceb	E	CSE	S6
44e8e036-f0bc-4ab6-b16a-c6fa7a0d797c	D	CSE	S6
5d116902-7810-4fb3-a225-1badd9c7cf8c	B	CSE	S7
c9fa327f-c526-44cc-bc16-d345836451a8	K	CSE	S7
fe05b7a2-0f6a-4d33-b07d-cb366127cba6	F	CSE	S8
d4cb7cc3-f90b-4ba4-a573-83b57820cd92	J	CSE	S8
c8df5162-fecf-4b01-9745-b3576034f7c9	E	EEE	S1
ddda8603-0a39-4e63-aec3-3457543259a2	B	EEE	S1
c54e5a55-1027-405e-a84f-380a5740beab	B	EEE	S2
cc933200-0a06-4c89-bf05-958b213c089c	E	EEE	S2
ad3cf001-3986-44ad-8134-175763957859	D	EEE	S3
1c672992-f26e-44e6-8bad-e5e8bfc0f774	H	EEE	S3
741fe10e-9478-4a13-b9d4-38bc15dc1bf2	I	EEE	S4
54040950-a256-4836-a947-64df47dab80e	F	EEE	S4
b10ffa93-0c3b-44f9-959c-047ee11551df	C	EEE	S5
6afeabdc-ff3f-4267-868c-ed1549cfd1de	F	EEE	S5
a57d712c-53f4-4905-9f59-b3ef5751da34	B	EEE	S6
608d54db-9a4f-47bb-94bf-6a944f8d97bd	H	EEE	S6
64b9c53e-4a97-4944-a242-dd24c4fd24ab	L	EEE	S7
45097070-2f91-43df-b20b-81d89570394c	F	EEE	S7
6b1b34fd-2b3f-49e7-8446-15f77c0a8fd7	C	EEE	S8
942a5093-1ffe-4476-837b-1515d81ed8cf	I	EEE	S8
c0239bad-27b3-4c5f-bb81-cff92a0e35c1	G	ISE	S1
dab10e6e-429b-42c2-b9fc-79e288e72ee8	K	ISE	S1
1e332bda-b6f5-47c8-991c-de61530e3c6b	G	ISE	S2
35e45bd4-7b92-4373-888e-ef73cc86b5ff	I	ISE	S2
7808b07c-7230-474f-965e-5d5182eb7d59	E	ISE	S3
8ab39c57-d71c-4eb0-b39e-c81f7bf43b88	F	ISE	S3
ab442659-52bd-490c-8b6c-b2c9e7b27868	J	ISE	S4
7798df44-9ec7-408c-93f0-9bbc2a8e5139	F	ISE	S4
4d3e4ab8-5153-4964-8e3c-63b374db6220	F	ISE	S5
cf4153d8-6053-4949-a944-c8575455dca8	C	ISE	S5
e19ff345-b2e5-4f53-acd5-5a0fbd69a34e	C	ISE	S6
59cd2f10-d326-40bf-95c5-ed0d806f847f	F	ISE	S6
544d7322-7f99-4886-a7b0-a5729f00d4a1	F	ISE	S7
269f0266-39bd-46b2-baf2-8306eb38eebd	D	ISE	S7
a00c7c0e-cb27-4cd4-b666-b930c92fbf6d	A	ISE	S8
22fa5d7e-3338-47d8-9759-bc06a3168f98	H	ISE	S8
e08fd675-c006-4c25-a6a0-82ef166017c8	K	MECH	S1
410bd23c-7c36-4ef2-ab18-9f78f3cbcfaa	L	MECH	S1
50d76a6a-8a2a-4b8c-8ed1-8f41be0bf114	D	MECH	S2
247041a8-43a2-4c72-a57b-70e295168bfc	I	MECH	S2
599d40f3-a6c9-4a4d-b85b-b30defad1a16	J	MECH	S3
19b8e657-0809-49b6-b44a-e34e98526835	K	MECH	S3
4527cb44-8460-4107-8cc1-f01a413daa38	D	MECH	S4
3423f914-f842-4c19-b85b-bc3509e100a2	G	MECH	S4
7982ee85-3c05-453d-9dbc-1acc805cbdd8	B	MECH	S5
4b5d1d36-32d9-4690-9105-a71e6be9beb6	F	MECH	S5
8f636419-50a9-4149-8147-38b39b9a906b	L	MECH	S6
a4a33619-f5cc-4db8-9704-9a144bda5d93	I	MECH	S6
693992da-eff8-4dd6-ac51-098f281f51cf	A	MECH	S7
3e96391c-23a8-498a-8114-34d80daf3bf3	F	MECH	S7
4f9e2c30-5e15-4cc3-bf73-111ca537a5b4	G	MECH	S8
ef54bcf6-9411-4f6a-a6cd-9f799704850d	B	MECH	S8
f4da9ee9-913c-4936-8d6d-26d7138d6270	B	CYBER	S1
893f46ff-25f2-4b26-b52d-1edaefe6e27b	L	AIML	S1
2ad266fe-1de5-481b-ac50-acacebee5416	D	AIML	S2
e8d7e064-6a34-4f72-8332-52651ed435a1	K	AIML	S3
400ae557-14e4-4dd3-90dd-a5a3a6e27131	L	AIML	S4
0310b01d-004d-4a85-92da-3860a070789e	K	AIML	S5
cd1459fd-78c7-45e2-ac82-73cb5fc61884	I	AIML	S6
96cb8d6d-423f-4548-803c-5ffc952474d7	I	AIML	S7
562adcf0-c23a-4814-bdae-6b6fbf7343af	K	AIML	S8
b8a9497b-8766-43e3-8ec3-abeed2229a12	C	ECE	S1
05ac68e3-368c-4d02-8ad4-a01d6f068317	L	ECE	S2
79a68791-cc34-45fe-9494-ec319e773cae	L	ECE	S3
02605463-1898-40a1-b714-425cfa04546a	D	ECE	S4
2f497aeb-ebcf-4851-83e8-8c219716ee2c	F	ECE	S5
9fe56888-c63c-41b2-a1fa-525c83f6aede	E	ECE	S6
cf608262-aa70-4dc7-8567-e6b966643a49	A	ECE	S7
84f6f5bc-68d9-443c-870f-47eef5e329bb	D	ECE	S8
aafef19a-b72d-4e0e-b243-2b7f9f83a531	E	CSE	S1
3e00e3d0-3fc6-4f09-a7e9-dfe52ccc5fe9	B	CSE	S2
120b72ed-c88e-4794-b7af-a92de6eb7927	K	CSE	S3
62e2eb6a-403b-41b0-9a9a-781dc72f646c	C	CSE	S4
8fb684f8-95bd-4463-be2a-e580ee293691	K	CSE	S4
cac03458-1b8a-463f-b278-5556e90235a4	C	CSE	S5
0987d5ea-4ed2-4002-9473-ab76bfe54a5c	K	CSE	S5
186b8487-fae8-412a-95b1-192d65b27153	D	CSE	S5
0f2c4b08-ff98-4544-8d55-70f9824d22c4	F	CSE	S6
23e9ad78-81a3-47bd-b66a-86abf4aec595	J	CSE	S6
18ac8931-3e4f-4d76-ae59-bb861cf2dcdf	L	CSE	S6
8d3db6fb-e5e8-478e-a5e6-5f104787a108	D	CSE	S7
9432f3d5-40d1-4fda-bf91-3da6ee2f1a61	G	CSE	S7
4b9cf933-c4f7-481f-b8b7-3b1e250908a7	L	CSE	S7
4a3b9f35-db52-4c86-9b1f-0a9ed839acdb	D	CSE	S8
cf1bec6a-5046-43b1-a380-52c4e706ca4e	K	CSE	S8
2f3be4d0-dbf7-42c0-8edb-e8c86c86a1fa	G	CSE	S8
5e616a3d-75aa-4b3f-8df6-ff8c347ae9c7	D	EEE	S1
f4d61b6c-8c85-475b-ad98-2e7afc936dd6	H	EEE	S1
05ed789c-5ea4-4f17-a4f0-9337c506cd32	F	EEE	S1
71f4e731-50c8-4611-b5de-13384c2e8f5d	H	EEE	S2
d4c8b6b5-93a9-41d8-9e1c-867c38f48431	A	EEE	S2
bbe1b8ec-c03d-4a04-9e69-b81184fd7bb7	K	EEE	S2
b957438a-d50b-4f6b-a5b4-d34d4dc8a33a	I	EEE	S3
f528a189-6491-4b08-ada1-b45457444974	A	EEE	S3
4797bace-0211-44f1-a58a-b9b8f727263f	K	EEE	S3
e7b22245-20f7-4603-ba62-e0e046882ad0	B	EEE	S4
453b9466-119a-4cf3-86f4-d63d0f105377	K	EEE	S4
9f2a34e6-7f52-494b-8c55-d9dfd987265d	J	EEE	S4
a1dec72a-978c-4723-a324-e583f0755207	D	EEE	S5
5549de7f-f7f2-4c3d-8184-1d48f4583bc0	A	EEE	S5
e671de2b-a2fb-4a7b-8838-fdef5177e300	I	EEE	S5
7d3df932-4665-4f33-bed3-78d48db2e2c0	I	EEE	S6
ee375545-0436-463f-8632-5cf5310589df	E	EEE	S6
3d81c30a-e3bb-46cb-b49b-8b1ce578814f	A	EEE	S6
36a66ecf-598c-4314-8ac9-b4597ee8c681	K	EEE	S7
e49ed205-f80b-4b28-972c-07585ad0ddda	C	EEE	S7
6189204b-87cd-47df-b57c-41a5f27f0aeb	H	EEE	S7
ce96500c-a18c-4f9a-9bcd-f496529228e0	F	EEE	S8
04a51fab-c1d9-40b2-9dd5-0d8c93ccb4d7	K	EEE	S8
d523841a-9494-46f1-86dd-878c06a599c3	J	EEE	S8
16dfed42-6eb4-474f-9424-9049db972501	C	ISE	S1
8c08deed-8331-406b-93cf-dc46a60ff116	H	ISE	S1
7de3b153-6ad5-4c07-b4da-0d92ce462916	D	ISE	S1
5af94898-c4a6-4dd2-8bf4-4b6005278998	K	ISE	S2
14e136aa-e78b-4911-95ba-cc1710a83691	A	ISE	S2
f96be244-4989-4437-870f-3442e517cd11	C	ISE	S2
e416a3e3-ca52-4fbd-aa33-72aae928eaa8	B	ISE	S3
897cf58a-c75c-41b4-b7d1-947828a88fed	I	ISE	S3
e437995a-72dc-4688-b3a0-0322b9e2ebba	G	ISE	S3
64f9562e-f47b-4512-896b-1a2fc8748d01	I	ISE	S4
db316837-75e4-47bd-a19c-ea28cea6b268	E	ISE	S4
8f156f91-db76-46ac-94a1-cd44569d656c	H	ISE	S4
dd6b252b-80b3-4ee4-8301-eb531e8c9059	A	ISE	S5
476f8391-abf1-468b-a3fc-08e0ad330ab4	K	ISE	S5
a11ecd6a-b7a0-40fd-a46e-f16012687000	B	ISE	S5
ed775c6b-120b-486e-a676-fab32b2c7cb1	A	ISE	S6
d6b68591-c839-4304-816a-bddd69a804ed	B	ISE	S6
46395086-b677-4e06-9bf1-ec38ca6a1f83	G	ISE	S6
089ddde2-3d8a-451e-be2d-f35a1d750b3a	L	ISE	S7
5d052357-90bc-40b7-b0b1-2ae4ea48f442	G	ISE	S7
965be342-2328-4817-8821-b495faf9475c	H	ISE	S7
7c139dec-4253-48d8-8f3c-ee66d89a7cb1	D	ISE	S8
5a13fbb0-3db7-4c7f-ad57-2fafb0f5c861	E	ISE	S8
403644a5-e711-4065-9ae3-8fc3b90970e1	J	ISE	S8
3fb720bc-663b-4a6d-8738-3c64f710efc4	I	ISE	S8
bbc5dff3-e2b8-49f0-ba85-ec1a1b2faf8e	A	MECH	S1
7040ba73-c396-474b-af41-12a13b160604	F	MECH	S1
d7ec4acf-715c-4df8-b9a8-db1d490a37e2	E	MECH	S1
6e11729f-1eec-435a-a2f4-89a9676462fe	G	MECH	S1
a1ff1a53-181e-4ba3-afb9-ce1026770b1d	F	MECH	S2
ceb0012e-d1e2-49a6-8358-8064480ddc80	J	MECH	S2
d9221670-8032-452e-a99c-9bd95fc34d2a	G	MECH	S2
04024314-b6b8-4351-a7b0-f24400d1674d	C	MECH	S2
79304a6a-94dd-4125-a84e-8c13af0aefe8	D	MECH	S3
5ee39f9f-7ca1-4c75-84e2-5a377f3c1983	G	MECH	S3
f3217c7d-6c38-4677-bd20-af74864a36cf	I	MECH	S3
dc2012ac-dbfa-4627-92db-4e5a3553f475	H	MECH	S3
8538f2fa-6f46-471a-9cb6-c434795c8cad	B	MECH	S4
9e60f4f0-208e-48ed-a2d5-0bf97d2b27f6	L	MECH	S4
d7ea9dde-ab1d-4552-bc40-7c2a78064d74	E	MECH	S4
bb3b4cd4-3695-45c9-ac89-107f95006d85	F	AIML	S1
d8fb04fc-588d-46a9-a4e7-bda704904623	E	AIML	S2
1b6a8add-4d0c-443d-bc66-6c8e27ec2e52	I	AIML	S3
ccff6b15-d4e8-4353-bd08-9e13495423c9	F	AIML	S4
21980c0f-6fbe-45d3-b979-0d46f028439b	B	AIML	S5
3181559a-99ff-491e-b925-4962b9cee128	K	AIML	S6
76e5c248-6112-4807-aadd-5a5c255398cc	A	AIML	S7
ae494b03-bdf0-40c0-8677-ece3baf92aff	B	AIML	S8
e54aee0b-2fdd-4d01-bae3-aef9b7456cf8	G	ECE	S1
9477c829-a722-4e00-a824-df22ccee51ee	C	ECE	S2
80663778-a53b-4a04-b151-57d7ce758870	G	ECE	S3
d330fe34-e7ea-4a5c-9006-5847469e9296	C	ECE	S4
abacc323-6151-46f0-b609-306d40472d92	C	ECE	S5
c70c4544-8354-46b2-a32c-366743e09f4e	I	ECE	S6
041197a0-8af9-456f-a9b2-0355966676e6	J	ECE	S7
ddde21ac-707c-44aa-b7bf-513e338a7525	C	ECE	S8
0aa94bf5-d4d9-4040-9335-79d13c7b38de	L	CSE	S1
030ce5b1-546c-4a69-8c26-479d945cde3f	E	CSE	S2
572c53df-6b2e-4da3-8801-703ef329cd9c	B	CSE	S3
fb02735d-9973-48fc-8679-6ea982be8535	I	CSE	S4
0d59110d-9dab-4405-91c6-fa896ae652d5	B	CSE	S5
d16488ad-cf54-4cd1-ad3b-7abad8edf6ee	G	CSE	S6
149a9f9b-4b52-4e7d-b91b-54aeb04e5316	C	CSE	S7
7cb55e92-d349-4817-91d1-7480cc0deaa4	H	CSE	S8
ef20beb9-9568-4acc-8206-e33498b3e74f	L	EEE	S1
752926e0-e498-4b67-94ae-fdac0242ee7a	L	EEE	S2
d3796c01-fff9-4af7-a712-228dd9e2b685	C	EEE	S3
76ec332f-bf3c-4c01-b86c-a2c1a12ac017	G	EEE	S4
c3f19463-a218-483f-a423-df4f404e4330	B	EEE	S5
2f28548d-7d5a-45fa-bd10-2c3b738d6b7d	L	EEE	S6
6f9f0838-a6bc-46ac-8aa8-4f5d6d2d7577	I	EEE	S7
c2c705b2-1eb9-44db-9aa8-868af39172c2	E	EEE	S8
68d7464c-9b1f-423e-96a0-7cd7bd391061	L	ISE	S1
7235e9bc-5a63-4f19-b3c8-750ce1e18a53	H	ISE	S2
03dac0e2-2815-4b71-b48f-0e91695ee78b	J	ISE	S3
3b48971f-98e6-40b4-9fe1-5fbc21335ec5	D	ISE	S4
221e9d90-ad50-4076-9ba6-f6f8b171b373	E	ISE	S5
ad5df7cb-1228-4fad-95fb-e435b5a7ffa0	H	ISE	S6
a2b75ae6-bdc0-40fa-8c78-3e6982da81d5	A	ISE	S7
e25dc61c-e4d1-4fa4-938a-1e4237bfdb3e	K	ISE	S8
e08c5a1f-aa24-4f1d-bdf7-f00ef6e3a3d3	I	MECH	S1
462f2e4e-8cf6-4d3b-b843-477e2c44b4ec	A	MECH	S2
5cfd79d1-8837-4fdf-b923-241b8a5e6707	F	MECH	S3
2aa38d05-02fd-4fbf-91e1-00062dab99e3	F	MECH	S4
bd403ba0-7153-4195-9f09-633ea3b5081c	E	MECH	S5
e1e4472a-7a76-49ea-8463-ac9f5cc2a42f	J	MECH	S6
dbbfaf8b-af64-430b-bf9d-822464d22675	I	MECH	S7
94e21334-0e4f-497b-8cef-6a8fe7642b67	C	MECH	S8
4720e234-2f06-4646-80d1-c0a29d091100	I	CYBER	S1
591c7edd-162f-4ea7-aa17-21baf110b0ce	B	CYBER	S2
4cb7e4ef-c87e-473e-9335-5d8ce43bf8c4	F	CYBER	S3
c19cf728-888b-4775-afe7-725bd68cac6a	F	CYBER	S4
52aabde4-f55f-4936-82d2-51798e8ba752	B	CYBER	S5
dcede516-ce80-4b7a-a962-4d4b9771bec2	I	CYBER	S6
353644d0-fdcf-42ca-8c63-5bfbf6f8b3b8	A	CYBER	S7
734254aa-5565-4d6a-ad0c-7b251fb93d8b	C	CYBER	S8
2d02fbc2-a645-44cf-a56c-26c2fee3e228	I	DS	S1
78ce2b18-372a-4f96-9f68-41c5debd682f	F	DS	S2
fb680e7f-4ccb-46bf-8012-38d1afa39c4a	B	DS	S3
ab00e3c6-4e7f-4bef-87f6-6227ff14d344	C	DS	S4
b10e8ca8-d28a-4ca5-9dd4-ecabadbfab96	D	DS	S5
5ffb9904-47b1-40e4-b85a-562809601558	A	DS	S6
500e7cb5-ae78-46c1-bf59-46409fda48b0	C	DS	S7
c923ade7-ebd3-4261-a71d-85db3d9adcb9	J	DS	S8
6edd844c-b14c-49a8-b010-28f7f5dd342e	A	IOT	S1
83c99a9b-ca1d-46d6-a539-78e05c7806e0	L	IOT	S2
1223ea6d-ed9b-4c31-b130-582511f577c1	A	IOT	S3
6e9b81cc-c0e3-4a36-bb19-8001600f185f	H	IOT	S4
c9ce312a-9b77-403e-9fa6-1dda5cbfa141	I	IOT	S5
9a660cb2-731a-4b61-9706-a1b0eadaba4f	G	IOT	S6
a3bbb4c2-1e9e-4729-954d-d1ee02f4bdfc	H	IOT	S7
51c26134-775c-4546-b00b-520f41ce7cad	H	IOT	S8
9162fa74-01e4-4806-8f8e-ab49ac1be784	I	BLOCKCHAIN	S1
7579e623-e1e9-4f00-8e5a-1e9911b68de6	F	BLOCKCHAIN	S2
af57250b-4eae-49bd-ba70-2749e9c15e6b	I	BLOCKCHAIN	S3
2ddfffc5-b508-4773-89f6-e6af8eed0c21	A	BLOCKCHAIN	S4
530e8004-9b68-49ac-a26c-bdb4c2d1c294	I	BLOCKCHAIN	S5
b7796b6e-d80d-4552-9211-523dbd0e0bac	K	BLOCKCHAIN	S6
71841fd3-d3a6-4e06-b502-a49d6183c3a5	I	BLOCKCHAIN	S7
e8b51bba-f47c-41ff-9c3e-0d50e4f91ccb	H	BLOCKCHAIN	S8
df8bb27e-ee79-4382-ab3a-4f3e88fe6e1d	I	AIML	S1
7d44982f-2545-414a-b4db-6549276cb395	K	AIML	S1
cbbd6955-d1dc-40e7-a661-2a9dc7c926e2	B	AIML	S2
051d7271-a03d-4412-91b0-4b7fca0a6c92	A	AIML	S2
51ea59f1-fdcb-46f2-8c1e-fc7ed789e1ad	G	AIML	S3
87b0dfbf-86a5-4642-a4e5-e51dd30e961e	H	AIML	S3
8efcded4-66d3-48c6-8a07-126e0ab3124d	B	AIML	S4
b68bfb48-6282-48a5-b403-7e8a99ed9006	I	AIML	S4
3bdf61bc-e0c4-4314-b631-90c4a2db542f	D	AIML	S5
44d230b9-bd71-4ee0-ba7c-ddcb0e35a114	E	AIML	S5
524a24d8-e21c-452b-b909-927b44cb8f5f	B	AIML	S6
a6b8798f-2221-499f-8ce8-920fd22f5de6	D	AIML	S6
42ad14a6-59ad-4a3f-8bf7-c876c02f8f59	K	AIML	S7
f83def7b-0762-49c5-91a0-02835a21c774	L	AIML	S7
a784f024-7c93-4d13-bbac-16ea374a07a3	C	AIML	S8
4deb0f51-208c-4488-912a-3083e7358d43	D	AIML	S8
8f566f5c-d00a-4d9a-bc8f-77f4826b009d	I	ECE	S1
9ef5ddce-9a7f-4fcf-8ce2-adde7fc97166	J	ECE	S1
e3d03e09-fd80-4db0-a018-535c0d3a33f9	K	ECE	S2
38b98416-ab2e-40b2-941a-e0d9c74fa15a	G	ECE	S2
9527a2d8-d2f6-4712-905c-290d74547494	K	ECE	S3
38593b11-a355-425f-b692-9a7158ea9bb1	E	ECE	S3
817e2a3e-f3c8-47c6-9a62-1649049e23d8	B	ECE	S4
22771c6d-b00f-4817-b35b-a7b700f4a858	G	ECE	S4
2387c716-02dc-4cc7-b44d-add65b34d781	L	ECE	S5
6b5f4964-8f46-4203-9e0e-9efad64da310	H	ECE	S5
9a8cb274-f4e2-4c79-b83d-ba8778a7a052	J	ECE	S6
e0180a35-05c8-445a-afe1-46814122d5cd	F	ECE	S6
802a7ed7-00b7-4be6-9b9d-9b43170e3de4	B	ECE	S7
b11124dc-a116-45b9-b5eb-7272760a827f	H	ECE	S7
42849482-56a2-43db-b2f4-96d5796fb6a4	E	ECE	S8
d3f9f651-4ae8-4f3f-814f-52bc2f080687	L	ECE	S8
293b9b04-e8a1-4abc-ad4c-bb4b7d437b70	D	CSE	S1
e8f0ea93-36d2-4ba1-a443-f4a6b25936e2	J	CSE	S1
e971405c-6bea-4127-996c-98f728d89d01	A	CSE	S2
5b9a217e-1129-47d5-93a9-0bab39c8c3ea	I	CSE	S2
635db80f-76ac-4088-806d-54a74ea8f610	I	CSE	S3
55458d5f-a0ee-4a34-b9cc-643e6529ca09	H	CSE	S3
f3d63058-87a7-4677-be7e-3a15ac6c49bf	J	CSE	S4
f11f178e-a754-4b8e-a2f8-30b0f3214d43	H	CSE	S4
1b583bc2-a4b1-4843-9156-72e9c00a129c	A	CSE	S4
914247c8-25cd-44bd-8b4e-5895f8c13857	J	CSE	S5
ad834018-0c9d-43af-89e7-75286feef9e6	E	CSE	S5
52bb29d1-60a5-42c6-9015-61032eeb7da2	H	CSE	S5
89fd81bd-b8f2-4e86-9cc9-dc91fe161255	B	CSE	S6
dd2f9a33-87e8-4015-865e-7f0c3a71f8ba	C	CSE	S6
63e2cb65-c88c-49cb-b949-28ad3e5455fa	I	CSE	S6
9b65e8da-5fb5-4c21-8132-c1359d71245d	J	CSE	S7
8530ac8d-49ef-4aa3-930a-058675616759	I	CSE	S7
9023c8fd-6ec9-4231-a4b6-298e1bb5167e	H	CSE	S7
dfcce86f-d42e-4aa2-bcd5-5cb744fb4369	E	CSE	S8
7eebe2ee-7a10-4c3e-bbe4-5683db2e8ee0	C	CSE	S8
ee265fcd-52c6-4b8e-a87f-8c05b2148311	B	CSE	S8
79b6489c-f415-4dcd-8cbd-00d37f5e0a2d	G	EEE	S1
590ebd3b-b1a0-4de8-a0d8-9d8a8d15f9b4	A	EEE	S1
41b80856-c735-46cd-817d-c85cbc96be1d	I	EEE	S1
a3e07ce9-7b0c-459b-9bed-34339894340b	G	EEE	S2
9028d2f6-1538-431f-9786-16b74eefe03c	D	EEE	S2
3f9cba08-d752-4a91-a41b-9caa78c834aa	F	EEE	S2
53cdcdb5-98df-4014-9489-6c80b7498d74	E	EEE	S3
21ad91b3-4a1d-43e7-adc2-dccb26857186	G	EEE	S3
db5bbad4-104d-46be-b32a-ca81b946c539	F	EEE	S3
c7ba5d4b-137a-44e4-87bb-42cc678b2e69	D	EEE	S4
393dad44-c3e3-4df7-addf-8b0fe6c0a3f1	E	EEE	S4
3da4e6a4-95bd-4e77-b3ef-7963c3be2b86	H	EEE	S4
b38eef37-e626-46f8-a650-02309be4be07	J	EEE	S5
a9906f6a-d746-45eb-93c7-2f23f388aedf	K	EEE	S5
188a82bf-1c4b-4c0e-a4d1-c770ba585280	L	EEE	S5
b1eb4271-dea7-49a9-a1a3-db7fbe05482a	C	EEE	S6
4b098f9f-d1f9-4ac1-ac52-8a358ced7f75	D	EEE	S6
1e5441a1-acb3-4fde-b370-7ad4b8dd0a99	G	EEE	S6
4a41456d-2c0a-432f-ab1f-2a83ea15a1b1	G	EEE	S7
8b6283d2-af36-4f61-b9f9-f62a5e5f9fe7	A	EEE	S7
aec78a3a-a97e-4bee-8a1d-3fbb8bfb93b4	E	EEE	S7
5223aee8-bc62-4595-9d59-83c91645374d	A	EEE	S8
4d47b826-c20a-4c30-9733-1ff19897e010	H	EEE	S8
e3dd241c-7522-4cea-8519-3b83fee78b1a	D	EEE	S8
d0536d1e-bb95-40bb-ba0a-00252e6c5444	A	ISE	S1
ee6d681a-a6b0-4282-8b01-6e4d28160b44	F	ISE	S1
fbcbd07f-a6b3-425d-a1d1-609d5682fb73	J	ISE	S1
103131a0-3cd6-42bf-b1b7-9256b715668d	E	ISE	S2
e798ba8e-2114-4f3e-bbfd-dea7faabdc40	D	ISE	S2
03efe4fa-240d-4018-91fd-1de7db6723e0	J	ISE	S2
9e9fc1ac-fdd8-474f-a978-3921064d1775	C	ISE	S3
81d2b6a1-bd0a-447d-ba9a-3816ad41f7a1	H	ISE	S3
af4003c9-0fb9-42b0-8f5d-c56838fe5b7d	A	ISE	S3
00ceee98-0409-4733-9186-76c8089fba21	A	ISE	S4
3ae7bf9b-bba3-41b2-9933-8367b958e7da	K	ISE	S4
ce3fe4c1-b28c-479c-8922-b379cdd14a7d	L	ISE	S4
e352ec75-907d-427b-8889-dd0a273accd3	J	ISE	S5
d4812717-18a2-49bc-8d35-5f7ef81d7f9a	I	ISE	S5
ba9abe34-6d0a-4bb2-bf65-0f736a2da6f3	D	ISE	S5
09b49556-1d7c-4835-a77c-f99ffefdfdcd	J	ISE	S6
51d19d94-f8ef-4d38-b8e9-628f84be4e51	L	ISE	S6
cfd2d7a7-7400-481c-911a-1ae7f072b85d	E	ISE	S6
88cd2800-2436-4840-b08f-8b4e245ad896	I	ISE	S7
da83b69b-d5e0-4530-a22e-aba85fd76724	B	ISE	S7
5549a847-9a0d-433d-b1f3-9383c9fbe641	C	CYBER	S1
3f5d97f5-8364-48b6-8575-dc97a2e7ba29	I	CYBER	S2
8e436b39-7950-40cb-a7e5-cad4ff115a54	C	CYBER	S3
a2516f02-fae3-41f8-8d0a-ed1c199e37ad	D	CYBER	S4
a3dbb1db-f808-4e02-b592-46de44392918	D	CYBER	S5
229cc00e-5f1f-4e3f-bfbe-6571634feeab	F	CYBER	S6
e0c7d951-e555-498b-a456-84a1a5fb6790	L	CYBER	S7
a15fa778-a3f9-4d32-b771-2b7fa66de930	E	CYBER	S8
eed4a1ad-ac9b-43ee-8311-14bbeed996d5	C	DS	S1
1fd21612-c2cf-49c7-a83f-5d3f8cb8caf0	K	DS	S2
c1b3e142-4d87-48c3-b043-562ba2861a9a	L	DS	S3
a3b66163-49ad-4222-9cfb-ab2fd1516b0c	D	DS	S4
e65e6df4-ccde-44cf-9871-e8f636f9ce25	F	DS	S5
e7024201-0c07-4e28-b3ab-9fe868aaac8c	J	DS	S6
f207c212-d266-4acd-a8fb-e4e7ec813b33	H	DS	S7
e0f19aa7-af51-453d-9bf6-93d03657a71e	K	DS	S8
cd8845f0-a755-445e-bb0e-bbff658ce18a	I	IOT	S1
937fe29f-1dfb-4153-8182-08f646f32696	G	IOT	S2
7f0ba2e2-0770-42fd-91f1-52db778642fa	H	IOT	S3
eb555609-44a0-4261-a492-16f5dd5408bf	K	IOT	S4
ac7d1065-3428-4313-8635-45238f746672	L	IOT	S5
e503ee4d-eadf-4798-a95d-b14bb8564b5a	F	IOT	S6
233ccf77-27a8-48fa-96ce-7de09ceb2cfb	D	IOT	S7
d45b9563-2a9a-4dc1-95d1-96a5c3c36821	I	IOT	S8
37012595-e7bb-4ff2-9ea6-72e244093776	D	BLOCKCHAIN	S1
2ac081f4-7221-460c-9879-e955a644b35b	I	BLOCKCHAIN	S2
0fa86e5f-f0ce-44a8-8773-2d86d44ae86e	B	BLOCKCHAIN	S3
bca1d1c4-1b15-4664-a497-d92df07d2dc6	L	BLOCKCHAIN	S4
2de57f77-0706-42d3-92f9-85cc54c2734f	C	BLOCKCHAIN	S5
ab4b2138-f873-4029-b343-8e2bed69cc3f	I	BLOCKCHAIN	S6
5f998d38-4963-48a7-9f0d-cce64dfff3cd	A	BLOCKCHAIN	S7
314d260e-5d52-407f-997a-630bfd2f7e0e	K	BLOCKCHAIN	S8
dc4ada82-8b59-45c3-a2f0-0c12193a0cb4	L	CYBER	S1
a533a75e-80cb-41bd-8ea2-b1f1558f69ff	F	CYBER	S2
f031c8c8-e0b4-48cc-9fce-6c3990b245b5	B	CYBER	S3
c6136cd1-53e9-46c1-b791-94a5e0838abe	I	CYBER	S4
da6e6932-fc80-4590-8bb1-0dea0225f40e	K	CYBER	S5
e1fd358c-ec1c-4a8e-b66b-af0c18d889f6	C	CYBER	S6
74a85603-aa40-4f8a-aeac-961d6d16aeb1	G	CYBER	S7
10ff7fb1-b036-44c8-b363-17173f6245c1	K	CYBER	S8
a8f0c31d-f9e6-4991-8b6a-615c26afecae	J	DS	S1
6146fa38-7613-4729-8c0a-d015fb168376	L	DS	S2
350b3230-4aab-49cc-a3ad-fecb82be03c0	K	DS	S3
894a80b7-bbad-40ce-848d-4540b3e1ace0	K	DS	S4
10da0ece-8325-4739-ba1c-01002978c1c1	C	DS	S5
0654ee92-d369-4db5-94a6-10cd6d8e3f4e	D	DS	S6
278a9dd6-fff5-4d64-aa16-48640232bba4	J	DS	S7
f478a2f7-7bb5-430f-8ecb-8abfa197c67b	L	DS	S8
f42e878c-42e1-4904-b1b5-81e29aacb445	B	IOT	S1
7f96dc0a-4616-49a2-8c0a-4c8f0346198e	J	IOT	S2
ebec6596-d59c-4425-bd1d-980bf046fe0d	E	IOT	S3
05b1df44-0f50-4167-bfaf-ee689d560f22	C	IOT	S4
15ae9c1c-65dc-44cc-849c-d7809ee26557	B	IOT	S5
54602a4b-f5c3-4337-82a2-0563200b592c	H	IOT	S6
0ff65cb8-77ff-44c7-b6dc-813f5b2d80ea	F	IOT	S7
c93e010f-7d2b-422b-85ed-cf4beccc0d9d	E	IOT	S8
820af23c-e095-4fbb-8bb5-962190f679ab	K	BLOCKCHAIN	S1
31e0e8b4-9d10-4307-aac8-c52669b0251b	B	BLOCKCHAIN	S2
49872270-f2d0-41e1-88a0-90a3712ae23e	A	BLOCKCHAIN	S3
60c6ea11-df27-427e-85dd-0754cf71ec03	E	BLOCKCHAIN	S4
1ef2ff5c-78ed-4c94-856f-524aa4ce5dd6	D	BLOCKCHAIN	S5
7b33ddde-25bf-42f2-af0c-18c22663d0f7	B	BLOCKCHAIN	S6
a84f6f08-4a79-482a-aded-d757e6359cae	L	BLOCKCHAIN	S7
7b5fffdc-3c77-46d7-93e3-d436d1ccd217	B	BLOCKCHAIN	S8
e6836d3d-ca7b-4aa8-9dd9-e737eb1dadd2	J	CYBER	S1
2950329c-86ea-489c-a58a-4898289a416e	G	CYBER	S2
cd009cf3-5027-42c1-a67e-dcc7689c17b8	G	CYBER	S3
5854c966-a9b7-4513-a2d7-fba3e0fb4514	C	CYBER	S4
1c75bfad-1260-43fe-85ac-8f21816a0ab2	I	CYBER	S5
9cda00f6-0773-49bf-9337-02d164b9221b	B	CYBER	S6
0bcbb506-9050-4f3a-af88-b4c8de8e6859	J	CYBER	S7
ecfc16b4-56dd-44c2-a0a9-8531c6ae3700	F	CYBER	S8
6f88c827-a871-4296-924c-a5bbdd46b2e8	F	DS	S1
41f603cc-af20-4b61-8ef2-5eb76cb2c6d4	G	DS	S2
8ef5f2b7-27c6-43e4-b9d9-f958d7bf2950	G	DS	S3
b66f26a2-1928-4924-959c-a07ad875d376	F	DS	S4
e0d462eb-930b-4e58-b846-97d9cd771413	I	DS	S5
7fdc36de-1f3a-42e9-902d-ea2fe498abf9	C	DS	S6
82e38b5e-2354-4b34-b36c-c57b468aa8b8	A	DS	S7
40fdec38-d81e-40f0-a633-20fb0f21a518	B	DS	S8
2abaded7-99e5-4c29-b6b2-0b5e25b76e02	F	IOT	S1
02d71363-3d25-4124-a254-b368eb8cc3ba	B	IOT	S2
2bc792b9-34eb-4c65-b440-bb718963af1f	K	IOT	S3
8b8031d3-7b88-4954-ba01-537a78f564f3	J	IOT	S4
df5914d2-9f41-4317-b41c-b17426b59d27	C	IOT	S5
9e367f0b-45ae-4d4e-b777-a6fca75cb6cf	L	IOT	S6
fe16af94-0ee3-4ea3-a40d-9f263bf2c871	B	IOT	S7
19a2f36b-9b56-474e-a34d-8ab9d958541d	F	IOT	S8
221d1e8c-9845-423a-8484-725c7b627df1	B	BLOCKCHAIN	S1
72970b9b-1ee0-4857-943b-2470eae1af4b	D	BLOCKCHAIN	S2
2a9a40b9-467c-480e-8514-c29a23e3d58c	K	BLOCKCHAIN	S3
2214a750-1293-41d8-aee6-2a5c5d708ed4	K	BLOCKCHAIN	S4
02072590-440a-4fe9-b75b-e84468acb4d9	B	BLOCKCHAIN	S5
59954fc3-45dd-4ac9-8489-cb07f176bb10	J	BLOCKCHAIN	S6
c42ce269-7759-4f76-92e3-04b56018e1cb	D	BLOCKCHAIN	S7
b212ad0d-e7fa-44a5-a5bc-3692bb8e4353	C	BLOCKCHAIN	S8
3fc13a5f-6ccd-4d4e-83d6-d22e93401877	K	CYBER	S1
c5d6d4e9-d8fb-484d-aa9f-550a7e5567bd	J	CYBER	S2
03bcd6db-466f-408b-9b5c-d32d37d1e58f	D	CYBER	S3
661036ca-7178-4c39-8032-93c3297344aa	K	CYBER	S4
d4f22560-3b7f-426a-9b91-f5188a7aba20	A	CYBER	S5
04e829a5-06d3-423b-aa9f-a62bfd4835f2	L	CYBER	S6
fffe2292-88c0-4e70-a2b0-9679612d0d6e	K	CYBER	S7
6d27e662-c91e-4bb4-b52b-0ea0bd3edb86	B	CYBER	S8
41e0d848-17ae-47b8-9687-2074bd18c1e3	L	DS	S1
ac6e9958-b193-4442-9dff-3550b88f4b10	C	DS	S2
a6afe70f-b62b-4c7f-a179-d4bb0dd5d239	H	DS	S3
802ebcb0-b159-4106-84fc-e0c3ed56fedc	I	DS	S4
2d17c0e5-ff4b-43e8-8c46-582a04dc6d90	E	DS	S5
ed8276ec-009b-4ccc-ba09-6c128b05443e	I	DS	S6
759eb30e-e983-49cf-b064-caf3ae36c2b3	B	DS	S7
b7fd1a3e-dfb3-4e92-ac51-a4557b51792e	C	DS	S8
a6281187-28c2-4fa5-9dc7-35b7e3717686	H	IOT	S1
9afcb6c8-4741-42ec-98b1-575f56c208a0	F	IOT	S2
612227dc-b697-4f06-b3bf-08c75db8f6c8	I	IOT	S3
5437dcf0-1160-4487-839b-82be006ce7ba	B	IOT	S4
17570ffb-f467-49b1-8280-1b64438125f7	H	IOT	S5
2d0a89c2-b5c0-4773-a007-bda354a0bda5	D	IOT	S6
18b8d84f-c452-443f-b5b7-a7a611eeccfb	L	IOT	S7
f055e415-1a5b-48dd-8744-d7f7e262632d	C	IOT	S8
1dcb532e-0256-47df-a110-446008ff2bf7	L	BLOCKCHAIN	S1
6bdeab41-0bc0-48bc-a376-6351ee966249	A	BLOCKCHAIN	S2
e8321c3e-c2bc-46ae-a149-2606cfafe895	L	BLOCKCHAIN	S3
63372ce8-717d-46e0-bb75-344bf2a30ff4	H	BLOCKCHAIN	S4
ce012755-b286-47d7-839d-56bd951c628e	G	BLOCKCHAIN	S5
3f502ae9-627e-4de0-a89a-d5a7eeba1a0b	C	BLOCKCHAIN	S6
47295038-e7bb-4cf1-978c-7cc6b9048b6d	B	BLOCKCHAIN	S7
964d2b1b-8a78-422e-aeb2-556fc871ffeb	I	BLOCKCHAIN	S8
f3b0eac8-9e84-486e-94d5-623326b2a4ad	F	CYBER	S1
5331059a-e0c2-40af-9817-d13b1db46144	E	CYBER	S2
8f39a4b5-2289-4fa3-ba1d-d18ba2f80e43	E	CYBER	S3
800b4b35-bc43-4f69-817a-1ddae6f834a2	J	CYBER	S4
11e2fa15-d375-41a9-a9a4-2b0ef5943e3c	C	CYBER	S5
9a73e2ea-789d-4352-931c-965a0009fcdd	D	CYBER	S6
4ef14b44-2a3a-4480-86f8-c593a02017a6	I	CYBER	S7
cd0c8343-3ba7-419c-bb4d-bcd475b2dcf0	D	CYBER	S8
9afcaad6-13a7-43c2-a6a8-3ae7c028fb29	K	DS	S1
3a610b71-1a2c-434d-8c35-29aeb65ed6aa	D	DS	S2
a478d539-2b93-44e0-8de4-5eb8b5d8988a	E	DS	S3
22ed08a6-4004-4468-a750-d0ab61c8b940	E	DS	S4
d0091854-78ae-48a8-a414-256bbda6299f	A	DS	S5
85f9350c-c834-4e65-88df-70de2d95ae34	G	DS	S6
2f5115dd-a70d-4466-b3c6-fa3b839cfe5e	L	DS	S7
960df87e-d0be-4a72-a5eb-17df43ef2e0c	D	DS	S8
6a73a48f-2326-409b-82e3-7605a0681a17	G	IOT	S1
06b263ac-da36-4ce3-92a7-d612e2df9a96	C	IOT	S2
577635f5-efea-47f7-87ee-806896177f45	L	IOT	S3
bb9fb6ce-6f06-41f5-827d-4e80f5968c1e	E	IOT	S4
162424e1-8e05-432d-abcb-c31195b51831	K	IOT	S5
9db05f2a-59ee-4f78-89b7-1e56ab3b048c	A	IOT	S6
48fbcec5-355a-44a3-b884-51496ccb77e3	A	IOT	S7
4f531bd7-56c2-45ca-ae39-0e0da91c0627	G	IOT	S8
761743a8-98cc-42d2-a0d9-bb97f0187911	C	BLOCKCHAIN	S1
33ed4612-5205-4c2e-b354-5098785b59d4	G	BLOCKCHAIN	S2
c4ddcc39-805c-46ba-a22b-667d9f8c7829	C	BLOCKCHAIN	S3
d0787b33-90e5-49e0-ab14-e443b67e7e85	I	BLOCKCHAIN	S4
4a167636-001d-4884-a73d-fb7f8fbfd85b	L	BLOCKCHAIN	S5
3f56aec1-924b-498c-b5f5-9a4c3617203e	H	BLOCKCHAIN	S6
51d837db-8600-440c-9499-4cfbb558fddc	C	BLOCKCHAIN	S7
f4f7c0eb-ee4e-4cdf-b110-12198e4591ff	E	BLOCKCHAIN	S8
42e308b8-e221-4187-87f0-49eacfa82681	A	CYBER	S2
3a377dda-0d4b-4386-9aa4-018892d65302	D	CYBER	S2
18b4122a-e34c-4df8-ae7f-cd9ae0336b19	K	CYBER	S2
bdf1539a-d224-4efc-bb80-b1db5d0fc542	L	CYBER	S2
8e597329-aab1-4745-99ea-9ad0c17bf54a	C	CYBER	S2
0b3ba345-a22a-4d02-a68a-2dfb00190a6e	A	CYBER	S3
1ebb68f4-7ea7-4e9b-83cc-195d973fbbad	H	CYBER	S3
3c88b35e-1547-4c92-aad6-c141208e7efe	I	CYBER	S3
5806f176-2dc0-4957-9912-e9b0023de33c	J	CYBER	S3
3c3e9e2d-ae63-4c42-a911-50270d0b740a	L	CYBER	S3
12aa8eae-c0c5-4f04-bf41-2339db01842c	B	CYBER	S4
854c1809-8e34-4792-ab23-e1ec6ad9e9c9	A	CYBER	S4
18e8d654-91f2-4c25-addf-c17d454aae4f	H	CYBER	S4
f3f0e095-3487-45cc-86fa-4d2cf84e1b6d	L	CYBER	S4
1ce2a608-62c5-4daa-860f-6c28e4f194b2	E	CYBER	S4
fe1bc0db-01da-4187-a6ad-7320468dc361	F	CYBER	S5
30f3d2d6-35e9-48df-87f7-c1279839d46f	G	CYBER	S5
12acf884-3a63-4f3d-b83a-336abb032db9	E	CYBER	S5
928acc12-1e46-4a50-ab9a-c75a3b975749	L	CYBER	S5
eda782ac-e604-4f25-b0f8-479c534fe67e	J	CYBER	S5
d3e7ad2b-d912-46b4-917d-e376f6c909a7	E	CYBER	S6
ac4c0e17-9dbd-4f4b-9955-b7f636613614	K	CYBER	S6
f995c9ea-ee77-47f2-a67a-da8f9ad1a1ba	H	CYBER	S6
50d5a316-d4e5-4686-96e2-e593adb4dbf3	J	CYBER	S6
5c35b517-33a8-4492-9d57-db916ecb10af	G	CYBER	S6
833d80be-5524-402d-948a-798162bd11cb	C	CYBER	S7
996efc19-25db-45a7-8403-4a76b5a8e3fe	D	CYBER	S7
117cf38e-ecc5-44d6-b435-4e596de37639	B	CYBER	S7
21e34f57-3b98-4504-a6d5-81901cd86ce0	H	CYBER	S7
ed7b7a46-2995-428e-b3d4-99a0504a0365	F	CYBER	S7
2ecbe170-906a-48ff-b569-9a556113dc95	G	CYBER	S8
ffd26628-0ecc-48fd-aaa5-e357c480efbc	A	CYBER	S8
2860c6cb-20d0-42f2-809c-56f21e84cf1a	H	CYBER	S8
b7ad1fc9-5f50-4a68-ba1c-38d1a2c32dfe	L	CYBER	S8
95847441-f835-46ca-9ab5-6fcd5bb37acd	I	CYBER	S8
ed9d935a-c2cf-43a5-a12b-645801a4c791	E	DS	S1
af8bbd75-e50d-48e1-a0b4-114bf712ebd3	H	DS	S1
7481054a-a8dc-4b88-8cc1-ef78cb063d3e	G	DS	S1
24f03f86-5304-46be-a806-e28c3c5ad30d	B	DS	S1
96aa83f3-51b9-43c1-993d-3d3fd5937708	D	DS	S1
5174225b-44e6-4d31-994b-9655a773c3c4	E	DS	S2
1de13496-31e2-41da-8173-d5539d0dd479	H	DS	S2
ec6fc100-5299-4efe-897f-f86f7feb51bd	I	DS	S2
37ddc798-b97f-4a88-8843-b7fd8a2b2c9c	A	DS	S2
45e8af0e-ee62-43eb-8f34-562ecd4f69ae	B	DS	S2
02865045-c690-4857-b648-89b5a2f1bb2b	I	DS	S3
56b707d2-fc7f-4f5e-bc8b-3d62ca4f7295	D	DS	S3
94943c5f-b26c-46c9-a4b1-194e24a27ff6	A	DS	S3
663fe44a-558f-4f73-80d2-615f5b763eb7	F	DS	S3
12ccdc71-7b74-4d06-a051-f06b554ec1d6	C	DS	S3
4b31915f-1024-455d-91eb-d633e3c9fcb0	A	DS	S4
3fb3a6db-0d7f-4ff8-9397-e4400fa7104b	J	DS	S4
abee8a0e-f999-4eff-ad75-ea63bb65c9ce	G	DS	S4
01b2f7bb-0875-43f8-9988-d502ed20e06d	L	DS	S4
11968d44-8092-4475-aff2-d4d64e6766ee	H	DS	S4
9e05d4e6-a8e6-42c3-bafc-6e0bea605387	B	DS	S5
16031045-b841-4d6f-bb07-8b8f59b3746a	G	DS	S5
143599dd-a675-45f8-b426-dcbb633522c0	L	DS	S5
eeeac4d2-9e99-4acf-8b36-b485182c193c	J	DS	S5
a06791fb-b4d4-49ed-b5ea-6e1699948b5b	K	DS	S5
772c29b4-812a-4ba7-b6b0-310440fb9cad	E	DS	S6
63ba1e40-c43a-4c7d-9eaa-078668018732	H	DS	S6
e87a8136-4a90-407f-b14d-3b6f544a2e60	L	DS	S6
0676ea72-456b-498d-a042-b6fdbe8b138a	K	DS	S6
d4736518-0807-4120-b3f4-719a072d833a	F	DS	S6
b1b1a79f-3b4e-4930-802e-e77e93f568a6	G	DS	S7
d25e91c3-3c41-414e-8a2d-bb0b2876f825	K	DS	S7
457e7abb-1de2-4dd3-bdf7-48681884e055	E	DS	S7
3b57e809-84ae-40ce-825f-1280cbce821c	F	DS	S7
55a29e98-5c59-4111-9b05-7fcd687c3d3a	D	DS	S7
f73be6e1-5482-4442-a270-e399247472e2	F	DS	S8
9d0735c0-c4dd-45ae-a8d2-c5c804087875	H	DS	S8
38a75cd2-67ca-4c0e-80f6-46d7c828d414	G	DS	S8
9059fc6e-cfb1-49dd-8a49-82c320d93483	I	DS	S8
4e722d55-b33b-4d96-8224-141fb7a542b6	A	DS	S8
37b5d324-ab44-4cec-8fa3-bfc2a1089941	E	IOT	S1
63f243fa-899e-46ba-aaa4-626c0d3527de	C	IOT	S1
b191d0a9-9970-45b5-a80b-6c303b804acc	K	IOT	S1
81ab115e-3be9-47d3-aef2-e2e8a149be56	L	IOT	S1
176e0752-0c09-4add-8d93-21d8b17f1df0	J	IOT	S1
3f32e6ce-2cf7-4749-9cf7-c8eb2de086c4	A	IOT	S2
d1d4aa3c-533b-4a2e-9dc6-14324e080bde	H	IOT	S2
089c1045-788a-4e5a-a4d6-06928b1fb2eb	D	IOT	S2
c5cce763-1ba8-4570-a5ec-35f583821b61	E	IOT	S2
f9aaf8bf-6928-4654-88fd-a5a9f85eccbc	K	IOT	S2
23d93cce-c635-416e-98d2-869b557ab176	F	IOT	S3
1f427b43-74de-46e7-b868-24835f2fe50e	C	IOT	S3
d18e13a5-2229-4484-9b3c-0040694af579	G	IOT	S3
67d8c150-afca-4f7b-a578-fef5a23d8592	B	IOT	S3
1998afef-896d-45ce-ba45-e290d2a79d49	D	IOT	S3
e2f8483a-16c5-45ce-9788-6144406a031d	D	IOT	S4
9bba2f8e-edf1-47a4-8bc3-240d5d2c1a76	F	IOT	S4
59bd6c66-1101-452e-bdb4-08eb15d1299f	A	IOT	S4
13d7345a-4f6d-4ff4-a3ae-4f15eca9364e	G	IOT	S4
1aa87e6a-22a6-4a8c-8d66-07d6471f9eba	L	IOT	S4
ef56f218-ce1e-44fd-8de3-d452421234f8	A	IOT	S5
577f7fcf-175a-4116-b1eb-81f9b27ce776	E	IOT	S5
3391f3fb-fc83-4400-bcb1-154fd416a9e4	J	IOT	S5
8e13253c-7316-41e8-bb9f-2abfb02fbd2f	C	IOT	S6
2b4ecbef-f301-4dad-92ea-b4703e2eb243	C	IOT	S7
403d5dcf-b8fc-4393-8100-1556829d452a	D	IOT	S8
e62b26c3-9207-413d-8dea-55dab3e78dfa	A	BLOCKCHAIN	S1
5c76beb5-1e64-4660-8246-9c90476218ff	K	BLOCKCHAIN	S2
f1caddd1-b6c6-4dd6-86ee-c4bd6ed54cf5	F	BLOCKCHAIN	S3
db8d86dd-9d22-4351-8399-429138bdb2a5	C	BLOCKCHAIN	S4
a18a3afc-47bd-4f7b-b132-f4dfab29c53c	A	BLOCKCHAIN	S5
999fd765-b7a6-4439-8b5f-dfd6d33f1d14	L	BLOCKCHAIN	S6
c5541080-5f32-4089-a8f6-dcc1c7b86e96	K	BLOCKCHAIN	S7
03711836-2898-4293-a657-b1fea9f0705e	L	BLOCKCHAIN	S8
f9fd1769-78dc-40c8-8c24-001448a6bf1e	G	IOT	S5
73f553ef-a835-437a-aac6-704e56d5d741	E	IOT	S6
0c0a5516-242f-441b-823a-072a3807c8b4	E	IOT	S7
d922416a-7e79-4d47-9326-91c71bfc4ee7	K	IOT	S8
44e9fe55-61e0-441a-b899-0a214f03db73	G	BLOCKCHAIN	S1
7cde0fb6-05f0-4b79-a845-9fad73425aa2	E	BLOCKCHAIN	S2
9e5a3e21-8985-4a61-83f6-9437b6a65631	J	BLOCKCHAIN	S3
2efe7e31-e583-4699-86e5-927b586712e1	D	BLOCKCHAIN	S4
1783322d-ecd6-45fa-880e-cc78f5d34cc9	F	BLOCKCHAIN	S5
f11dcaab-8801-4dab-96f9-89c80014a80b	F	BLOCKCHAIN	S6
4b3122c4-28dc-4047-bfeb-f20089591a04	G	BLOCKCHAIN	S7
d3b00906-c795-459a-8f50-9c954ec1ec02	J	BLOCKCHAIN	S8
5d13c54c-f90c-447d-80d0-8b8ff2d07811	F	IOT	S5
7c6a0bae-9c2a-427a-824a-0adcfc575e28	B	IOT	S6
1216c9e3-e5f8-4b74-82c1-f7409f7359a6	J	IOT	S7
97f0ca1f-a96a-4de3-b0e4-318c775c38d8	A	IOT	S8
f09b068c-8787-41c0-afcd-03c881d746b1	J	BLOCKCHAIN	S1
20e08adb-7d3c-455b-baa2-cd9f807000b5	C	BLOCKCHAIN	S2
02a075f2-16bf-486b-bd86-92e2d4cfdff1	E	BLOCKCHAIN	S3
69684f13-cd62-4bde-aead-863a839d734b	G	BLOCKCHAIN	S4
f480aebe-d111-4c8d-bf8d-53b134b8118e	J	BLOCKCHAIN	S5
cb115a0a-6796-43cf-94a6-286308428a1d	A	BLOCKCHAIN	S6
7067992a-be88-46cd-8417-94db52697205	F	BLOCKCHAIN	S7
b170238a-7134-4e8f-8480-2c34029cddc5	D	BLOCKCHAIN	S8
df9a58af-8b52-489a-89b6-1a8624da6c4f	K	IOT	S6
a3c5f9d7-0b17-4ea6-8b17-9a80e8ce44e3	K	IOT	S7
c491930e-94f4-4f5f-b105-90e9a4c52d6d	L	IOT	S8
0f378617-6e78-41da-b9a0-75860f1316c2	E	BLOCKCHAIN	S1
b0b2ea5e-d67b-400d-99d0-ba60468d6941	L	BLOCKCHAIN	S2
97315ca5-16d0-4054-93ec-66dc5e1bb973	G	BLOCKCHAIN	S3
fe4e3160-b4dc-4c24-aaaa-423527ac82c7	J	BLOCKCHAIN	S4
486e5c1e-3b73-47ed-9fed-0b3619639030	K	BLOCKCHAIN	S5
4cd8821d-aba2-4996-be06-a79a9f58f485	G	BLOCKCHAIN	S6
616d1f44-1cce-48c7-af81-018e1b0cd199	J	BLOCKCHAIN	S7
49309676-c094-445f-9c79-bb5d06a8ad2c	G	BLOCKCHAIN	S8
d633b4f8-9712-4d58-b090-32de282b24f0	I	IOT	S6
c8fa9a44-7dbd-4d3b-a6f1-5df129754a4a	G	IOT	S7
248d7c92-9775-47b1-9d1b-ac44c6ac53d6	J	IOT	S8
028887ff-bef9-49ba-a445-9025468b5b3d	F	BLOCKCHAIN	S1
3721827a-0304-4094-8458-6e3cccc4a7b7	H	BLOCKCHAIN	S2
53b43de9-782c-4252-8dec-68118ef306c0	H	BLOCKCHAIN	S3
f18a0e48-dcce-4ea1-8102-0e35c45e0d20	B	BLOCKCHAIN	S4
e3df3b93-44f9-4c4c-a2a4-94da63b58cd9	E	BLOCKCHAIN	S5
1ac29b17-01ad-41cb-b84b-026962919dd5	D	BLOCKCHAIN	S6
5d0a02eb-1cb2-4a52-9fc3-4cf5779fbd89	E	BLOCKCHAIN	S7
099a6d66-b6f2-4cbc-a25d-9b9d6eee8f33	F	BLOCKCHAIN	S8
\.


--
-- Data for Name: Semester; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Semester" (id, "branchName", "semesterName") FROM stdin;
8687e934-71ce-427a-a579-3b9666db7c7d	AIML	S1
9819e2d7-af23-470c-9fb4-9d06b66baff8	AIML	S2
08f30759-7cba-4a35-b9ec-7a970a88c03f	AIML	S3
92426061-8397-4562-92f8-2999f8cd8fe0	AIML	S4
4cd89a7c-2a7d-4233-b042-fb62a110d03f	AIML	S5
43c43011-9885-4710-8e3d-ccc2dfb9f46c	AIML	S6
54d1bec9-ecd6-4e43-928d-c489271a985f	AIML	S7
4ba1626b-0891-416b-b0be-d64c82c7f4bd	AIML	S8
9fa0f4b0-d458-47ed-b4f7-db47d08ebc8b	ECE	S1
8195200c-715f-40e8-a972-9408a4301295	ECE	S2
94b63a4b-589f-4a93-b15e-4f7c72f7adb3	ECE	S3
2d9e26c7-bd6b-492b-8076-1231d7be4ddf	ECE	S4
8e509b40-b41d-4067-93da-01dc9d080398	ECE	S5
7748a009-8195-4919-b7fd-f04d1c67dc74	ECE	S6
dca989ab-af94-419e-8930-2633b7708c42	ECE	S7
a3e2fe7f-d4c8-44d0-bf5d-45d24e1d57cb	ECE	S8
c8e3148d-d651-42d6-96b9-702a9b1cd298	CSE	S1
bd47c03d-c072-43e9-837a-158d4005cd96	CSE	S2
ba193b5e-a657-4844-90ae-3a8fa64d07ec	CSE	S3
37922b29-0817-452a-ae55-97f8f7489d31	CSE	S4
0f3882e5-0c9f-4ca8-8af6-0a6864fc54f4	CSE	S5
83e9e697-da69-4dc3-b90b-377c216af147	CSE	S6
4dfea539-1817-4709-ad34-c35ba9583a18	CSE	S7
4c7487a5-d98c-4570-a8ba-2223f7b213f6	CSE	S8
411b2b1d-2af4-4a75-a748-1846d8fa5b7b	EEE	S1
a0f7e32c-3126-4917-b76c-4045650f5486	EEE	S2
e1a48c46-5745-4370-861c-32df81886ea7	EEE	S3
39ff6c09-d4b6-45b6-b363-6c89b4b6e0e1	EEE	S4
88fb813e-87d0-49a8-a081-258315168f64	EEE	S5
3fd9a9e7-d244-4a35-b817-3f4783221c00	EEE	S6
a8910713-c936-4e0d-9715-0258a885c5a5	EEE	S7
7e0e8ac0-35ae-43d2-99fc-88da0fd4ac0c	EEE	S8
b82327e5-797b-438b-ad7c-acd5cad6645a	ISE	S1
6cb11071-ae7d-4c56-8905-a347be76ea6e	ISE	S2
e15b1ca1-0b82-4f25-a710-2217fa63449a	ISE	S3
e535a9b0-8224-40fc-91f7-2fcaa283e75f	ISE	S4
ffcba358-3093-4bbe-9594-28e1399e0b41	ISE	S5
c9c1762c-3413-41fe-a239-7a07c84727a8	ISE	S6
6dc1dae9-ba0a-43bc-9b5a-00887fb408cb	ISE	S7
07886500-bb96-4c6e-8fe9-bf3ab6beafe1	ISE	S8
9f2c07a3-0ab8-4701-9535-90fcf5eb4138	MECH	S1
f0f4f2ca-0011-494b-b4ff-ca61023ca01c	MECH	S2
60e4f699-89b2-4d1e-bd76-227314893390	MECH	S3
dff92c87-db41-4b68-a14e-ff7829d4c0fa	MECH	S4
8985e270-fe0b-46f9-8014-32a0fcf347b3	MECH	S5
aab37c5a-504d-4f24-88fc-6bd05c5913f7	MECH	S6
9b1b53ba-ee5b-4291-b5b5-53290402d643	MECH	S7
db488957-9180-41c4-ade5-181f1a839841	MECH	S8
6630a7ab-1f24-4173-b0b4-b153c4349aac	CYBER	S1
8efc01c2-6669-4424-b9d8-94fd57128346	CYBER	S2
c896cf51-5849-400c-93c7-6ee351634a8e	CYBER	S3
4c7d8326-24e5-4380-8573-c23dab18b9a8	CYBER	S4
ba17b436-0b38-4983-bd60-a647610795c0	CYBER	S5
14cfc719-6906-473f-bd91-d904b368d499	CYBER	S6
c161a9da-e019-4ed9-b607-bb97591b1940	CYBER	S7
7950f704-d137-42e2-a786-1decefe020cd	CYBER	S8
6d298fe8-4674-44df-b712-041913a3dfbe	DS	S1
a1c10f56-efd1-4bc6-80b7-eb6bfe69ec0e	DS	S2
df5d0159-68c2-41c5-91c3-60112e365289	DS	S3
8fd6d616-532e-464e-963c-8fbf848e99f7	DS	S4
9128fbb4-c711-4953-9421-155a81f5ff80	DS	S5
29c46c55-65f4-46c0-be0e-a3129216431d	DS	S6
eb013d6c-e2bc-4424-9e9b-8d4a00fe23ec	DS	S7
6bfdf647-77a5-445c-b849-b5528c650818	DS	S8
afd4aee6-ad05-4ed0-8419-b4a5de7e2513	IOT	S1
e20fbe94-ed7b-4388-a714-0c5b0ff20227	IOT	S2
74b70684-056d-487c-946a-4a96c21722bf	IOT	S3
ff7644f2-cde0-4d98-a9f3-c0df457e813f	IOT	S4
bc0c115f-c663-4625-985e-f8d8ef00458d	IOT	S5
d5665f9e-b3a6-4b2b-a82d-ee3f500d0b9e	IOT	S6
3241d3a1-7ace-4fc1-8619-d6e4b3223ca6	IOT	S7
d0c6f6b3-901d-44a8-a86b-fb053b19a341	IOT	S8
2ddbf990-c240-4612-8809-5dbeb2fe2bc5	BLOCKCHAIN	S1
0e8c1639-c4a5-4c41-a11b-0c5710dc824a	BLOCKCHAIN	S2
4011fe10-1187-4f12-b319-84046bbdb43d	BLOCKCHAIN	S3
5c685696-b532-446b-8a90-f8bca265da89	BLOCKCHAIN	S4
b8163b47-37a7-4f5e-aaba-b4371d1f15a2	BLOCKCHAIN	S5
8f28b640-09f6-44c5-989a-3d67cbb0a360	BLOCKCHAIN	S6
309803c4-db00-4d60-8710-5bbc31125d31	BLOCKCHAIN	S7
0111fa87-c623-4516-9964-6c9c86d3cc61	BLOCKCHAIN	S8
\.


--
-- Data for Name: StudyMaterial; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."StudyMaterial" (id, "subjectId", name, description, url, "uploadedBy") FROM stdin;
\.


--
-- Data for Name: Subject; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Subject" (id, "subjectName", "subjectCode", "noOfCredits", "examType", "writtenType", syllabus, "noOfHours", "isLab", year) FROM stdin;
dbb6df83-7195-4efe-a965-25f0aa2df799	computer Networks	BCS501	4	EXTERNAL	WRITTEN	computer networks sylabus	40	f	2022
a75911fa-18e8-4a2e-8e90-30c9578aa922	DSA	BCS202	3	INTERNAL	MCQ	dsa	40	f	2022
df888657-75c8-4298-8dc9-1bd0ff46dc38	OS	BCS302	4	INTERNAL	MCQ	operating system	40	t	2022
62818162-33e3-4e99-993d-f244064112e9	Maths	BCS101	4	EXTERNAL	WRITTEN	Maths Syllabus	40	t	2022
\.


--
-- Data for Name: TimetableOfDay; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."TimetableOfDay" (id, date, "sectionName", "branchName", "semesterName") FROM stdin;
\.


--
-- Data for Name: TopicCovered; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."TopicCovered" (id, "periodId", "topicTitle", "topicDescription") FROM stdin;
\.


--
-- Data for Name: UniversityExams; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."UniversityExams" (id, "userId", semester, branch, name, "subjectName", "subjectCode", "obtainedMarks", "totalMarks", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."User" (id, email, password, name, usn, "collageId", section, schema, branch, semester, role, "isVerified", "createdAt", "updatedAt", "mentorId", "labBatch", "openElectives") FROM stdin;
f83e876a-52ca-42c4-977f-dec08b715053	0@0.com	$2b$10$9fFw3SRv5LkEkAop5C5voeaoGu2IoNnKkTt2DjXjyvZdGWu3xzsGy	zero	\N	\N	A	Y_2022	AIML	S1	ADMIN	f	2025-04-05 15:54:23.065	2025-04-05 15:54:23.065	\N	B1	\N
c4d4c83c-bbc3-46c5-ab49-1a418a7e7283	1@1.com	$2b$10$ORTTp2rnuwHbXMNx7yz3pukRZyfgFTcUkt4.FmAMR4P46JKgcSDte	one	1SB22AI001	sce22am001	A	Y_2022	AIML	S6	STUDENT	t	2025-04-05 14:43:41.648	2025-04-06 03:48:46.983	\N	B1	\N
8a7f8909-025a-4d6a-aee9-fb954f7e00a0	gopal@gmail.com	$2b$10$55GiGmDmVcMeIsOeAPWG7usbkYwsk4C5dTkHX6/2rsOgGNdyyDuK.	Gopal ND	1SB22AI023	sce22am039	A	Y_2022	AIML	S6	STUDENT	f	2025-04-05 11:32:19.69	2025-04-06 05:26:19.616	\N	B1	\N
588d969e-21d5-4ac5-af56-ccc768394aa8	2@2.com	$2b$10$Azg0/ZBGvsXhSWUqGY/0jeHVsJKH534hWkfRkdRgvoTth.qOQlLPa	two	1SB22AI002	sce22am002	A	Y_2022	EEE	S1	STUDENT	t	2025-04-05 16:34:29.281	2025-04-06 06:56:18.413	\N	B1	\N
f3a49282-00a0-427a-96d9-5969bda48eb8	s@s.com	$2b$10$vA5Jo3XnOuZDU3pRisVtsOARgeoN1lAv3n7wb5mt7Kf8537lyh.dG	teacher	\N	\N	A	Y_2022	AIML	S1	STAFF	f	2025-04-07 12:08:44.007	2025-04-07 12:08:44.007	\N	B1	\N
\.


--
-- Data for Name: UserAcademicDetails; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."UserAcademicDetails" (id, "userId", "createdAt", "updatedAt", "entranceExamMaxScore", "entranceExamName", "entranceExamRank", "entranceExamScore", "tenthBoard", "tenthMarks", "tenthMaxMarks", "tenthPercentage", "tenthSchoolName", "twelfthBoard", "twelfthMarks", "twelfthMaxMarks", "twelfthPercentage", "twelfthSchoolName") FROM stdin;
57c0f43d-23d1-44c3-acad-fa5475745e65	c4d4c83c-bbc3-46c5-ab49-1a418a7e7283	2025-04-06 08:00:56.775	2025-04-06 08:02:51.822	1000	CET	1234	666	state	579	625	92	sjs	state	510	600	85	cjc
476f29df-8e7b-4e2d-a83c-8e4ad455391f	588d969e-21d5-4ac5-af56-ccc768394aa8	2025-04-06 11:42:09.524	2025-04-06 11:42:09.524	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
338f01a2-ed06-44f1-958f-60b09a4ad098	8a7f8909-025a-4d6a-aee9-fb954f7e00a0	2025-04-07 04:28:58.451	2025-04-07 04:28:58.451	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
cc941e91-f337-4dd5-b45b-78fbaa4b90ea	f3a49282-00a0-427a-96d9-5969bda48eb8	2025-04-07 12:10:08.586	2025-04-07 12:10:08.586	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: UserBusDetails; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."UserBusDetails" (id, "userId", "createdAt", "updatedAt", "busNumber", "isUsingBus", "pickupPoint", route) FROM stdin;
a77f25be-41d2-41d1-9d8e-9c9576b2fa04	c4d4c83c-bbc3-46c5-ab49-1a418a7e7283	2025-04-06 08:11:55.054	2025-04-06 08:12:13.214	123	f	anekal	chandapura
dae6ce5a-a8d6-415f-977e-0a1eb8dd05c5	588d969e-21d5-4ac5-af56-ccc768394aa8	2025-04-06 11:42:09.527	2025-04-06 11:42:09.527	\N	f	\N	\N
6fe0e8ce-8019-4f15-98d3-76b2fd480c64	8a7f8909-025a-4d6a-aee9-fb954f7e00a0	2025-04-07 04:28:58.452	2025-04-07 04:28:58.452	\N	f	\N	\N
768920cd-278b-49fd-a3f8-db2618ba5e58	f3a49282-00a0-427a-96d9-5969bda48eb8	2025-04-07 12:10:08.591	2025-04-07 12:10:08.591	\N	f	\N	\N
\.


--
-- Data for Name: UserDocuments; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."UserDocuments" (id, "userId", "createdAt", "updatedAt", "aadharCard", "entrenceExamCert", "fatherPhoto", marksheet10, marksheet12, "motherPhoto", "panCard", photo, "seblingPhoto", "transferCert") FROM stdin;
e3fc9e01-ea66-493f-a68d-53885ac255b4	c4d4c83c-bbc3-46c5-ab49-1a418a7e7283	2025-04-06 09:13:03.828	2025-04-06 11:40:38.147										
e3a25a0b-610b-4792-b166-56ea31786f25	588d969e-21d5-4ac5-af56-ccc768394aa8	2025-04-06 11:42:09.538	2025-04-06 16:58:44.049	\N	\N	\N	\N	\N	\N	\N	\N	https://6bnz6zzalk.ufs.sh/f/QlWFcqxFrXUtz7eJiWCdrdE907Ci8ObeYWq4XoVpunNcIy3m	\N
cd191544-5d4b-4af4-92c0-cb72245b31a2	8a7f8909-025a-4d6a-aee9-fb954f7e00a0	2025-04-07 04:28:58.461	2025-04-07 04:30:24.713	https://6bnz6zzalk.ufs.sh/f/QlWFcqxFrXUtzxt54RdrdE907Ci8ObeYWq4XoVpunNcIy3ms	\N	\N	\N	\N	\N	\N	\N	\N	\N
ecb1af8b-c6ce-4bbf-8b23-c0b69c54971e	f3a49282-00a0-427a-96d9-5969bda48eb8	2025-04-07 12:10:08.611	2025-04-07 12:10:50.17	https://6bnz6zzalk.ufs.sh/f/QlWFcqxFrXUtXHGyuTJ3paQVgYkK7iqCHcSbdD0EjwJexmGz	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: UserFamilyDetails; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."UserFamilyDetails" (id, "userId", "createdAt", "updatedAt", "fatherIncome", "fatherName", "fatherOccupation", "fatherPhone", "gardianName", "guardianPhone", "motherIncome", "motherName", "motherOccupation", "motherPhone", "seblingName") FROM stdin;
953d5e4a-01e3-4fb4-85b8-58eafbcaa926	c4d4c83c-bbc3-46c5-ab49-1a418a7e7283	2025-04-06 07:27:52.448	2025-04-06 07:54:52.339	981928	father	nothing	1222222	wjhdhh	91713779	12669	hjwhh	something	3817837717	jqwqwsjjeq
3479e4dc-b134-407b-a18f-3d04097521b5	588d969e-21d5-4ac5-af56-ccc768394aa8	2025-04-06 11:42:09.519	2025-04-06 11:42:09.519	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
7b734708-e286-4945-889b-5f270ddef4ff	8a7f8909-025a-4d6a-aee9-fb954f7e00a0	2025-04-07 04:28:58.45	2025-04-07 04:28:58.45	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
e0b21b59-b551-4eab-8e01-572e0c0a01a2	f3a49282-00a0-427a-96d9-5969bda48eb8	2025-04-07 12:10:08.579	2025-04-07 12:10:08.579	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: UserHostelDetails; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."UserHostelDetails" (id, "userId", "createdAt", "updatedAt", block, "isStaying", "roomNumber", "wardenName") FROM stdin;
97eb99be-1491-4f78-a72e-f2845ea6a217	c4d4c83c-bbc3-46c5-ab49-1a418a7e7283	2025-04-06 08:16:09.217	2025-04-06 08:17:09.454	11	t	1w	111jheqh3
403b402e-50d2-4c0b-b08f-134277bf30bb	588d969e-21d5-4ac5-af56-ccc768394aa8	2025-04-06 11:42:09.532	2025-04-06 11:42:09.532	\N	t	\N	\N
6433025d-4eaf-480a-b927-4c13c39552ea	8a7f8909-025a-4d6a-aee9-fb954f7e00a0	2025-04-07 04:28:58.453	2025-04-07 04:28:58.453	\N	t	\N	\N
097be375-efe4-4c4d-853d-4b93d96b37bd	f3a49282-00a0-427a-96d9-5969bda48eb8	2025-04-07 12:10:08.598	2025-04-07 12:10:08.598	\N	t	\N	\N
\.


--
-- Data for Name: UserPersonalDetails; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."UserPersonalDetails" (id, "userId", "createdAt", "updatedAt", "aadharNumber", "bloodGroup", "currentAddress", "currentCity", "currentPincode", "currentState", dob, gender, height, "maritalStatus", nationality, "panNumber", "permanentAddress", "permanentCity", "permanentPincode", "permanentState", phone, weight) FROM stdin;
d265bc07-52a6-4c53-9ed9-b4d032045baa	f3a49282-00a0-427a-96d9-5969bda48eb8	2025-04-07 12:10:08.573	2025-04-07 12:10:19.193							2025-04-17 00:00:00											
7a9ceb75-ad40-492b-9f74-4f94337a542d	8a7f8909-025a-4d6a-aee9-fb954f7e00a0	2025-04-06 05:08:19.019	2025-04-06 06:16:10.606		ok			a		2025-04-15 00:00:00	Male		Unmarried								
9d5ccd38-4298-485d-a241-e65c958711f9	588d969e-21d5-4ac5-af56-ccc768394aa8	2025-04-06 04:45:43.31	2025-04-06 07:06:13.497							2025-04-01 00:00:00	Female		Unmarried								
e4cce597-4360-4cae-981c-0ae9921c6879	c4d4c83c-bbc3-46c5-ab49-1a418a7e7283	2025-04-06 04:18:40.02	2025-04-06 07:44:28.022	whqqwduqu	A+	hqwhfqu	wqhfq	70000000	hqwfhwqy	2025-04-08 00:00:00	Other	12	Widowed	ind	jwduuwudw	Anekal	ankeal	njhhhh	bhca	ohdwudu	11
\.


--
-- Data for Name: UserWorkDetails; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."UserWorkDetails" (id, "userId", "createdAt", "updatedAt", "companyName", "endDate", experiance, "isCurrentlyWorking", "position", "startDate") FROM stdin;
d247aa39-aef0-4744-a9e6-88a36ff3d26b	c4d4c83c-bbc3-46c5-ab49-1a418a7e7283	2025-04-06 09:05:04.305	2025-04-06 09:09:41.811	sai ram school	2023-05-07 00:00:00	5	t	teacher	2021-11-08 00:00:00
5853cdbe-25f2-45b5-a8a5-9b6bb381c8b2	588d969e-21d5-4ac5-af56-ccc768394aa8	2025-04-06 11:42:09.535	2025-04-06 11:42:09.535	\N	\N	\N	f	\N	\N
99bb6576-93ae-4a05-a2ee-fdb2b76267a0	8a7f8909-025a-4d6a-aee9-fb954f7e00a0	2025-04-07 04:28:58.456	2025-04-07 04:28:58.456	\N	\N	\N	f	\N	\N
ee6c02e3-47ce-464e-9ddb-a0985de26be9	f3a49282-00a0-427a-96d9-5969bda48eb8	2025-04-07 12:10:08.607	2025-04-07 12:10:08.607	\N	\N	\N	f	\N	\N
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
20f89f37-3a88-427b-919a-00666cc2433e	07c4329731044f142c54da5037e053d70cc3ee2b749c83931c160b60d3dbfecf	2025-04-05 11:14:56.240115+00	20250405111456_init	\N	\N	2025-04-05 11:14:56.199511+00	1
\.


--
-- Name: Period_periodNumber_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Period_periodNumber_seq"', 1, false);


--
-- Name: Achievements Achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Achievements"
    ADD CONSTRAINT "Achievements_pkey" PRIMARY KEY (id);


--
-- Name: Activities Activities_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Activities"
    ADD CONSTRAINT "Activities_pkey" PRIMARY KEY (id);


--
-- Name: AssignmentSubmission AssignmentSubmission_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."AssignmentSubmission"
    ADD CONSTRAINT "AssignmentSubmission_pkey" PRIMARY KEY (id);


--
-- Name: Assignment Assignment_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Assignment"
    ADD CONSTRAINT "Assignment_pkey" PRIMARY KEY (id);


--
-- Name: Attendance Attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY (id);


--
-- Name: Branch Branch_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Branch"
    ADD CONSTRAINT "Branch_pkey" PRIMARY KEY ("branchName");


--
-- Name: IATests IATests_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."IATests"
    ADD CONSTRAINT "IATests_pkey" PRIMARY KEY (id);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


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
-- Name: Placements Placements_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Placements"
    ADD CONSTRAINT "Placements_pkey" PRIMARY KEY (id);


--
-- Name: Projects Projects_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Projects"
    ADD CONSTRAINT "Projects_pkey" PRIMARY KEY (id);


--
-- Name: Section Section_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Section"
    ADD CONSTRAINT "Section_pkey" PRIMARY KEY (id);


--
-- Name: Semester Semester_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Semester"
    ADD CONSTRAINT "Semester_pkey" PRIMARY KEY (id);


--
-- Name: StudyMaterial StudyMaterial_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."StudyMaterial"
    ADD CONSTRAINT "StudyMaterial_pkey" PRIMARY KEY (id);


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
-- Name: TopicCovered TopicCovered_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."TopicCovered"
    ADD CONSTRAINT "TopicCovered_pkey" PRIMARY KEY (id);


--
-- Name: UniversityExams UniversityExams_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UniversityExams"
    ADD CONSTRAINT "UniversityExams_pkey" PRIMARY KEY (id);


--
-- Name: UserAcademicDetails UserAcademicDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserAcademicDetails"
    ADD CONSTRAINT "UserAcademicDetails_pkey" PRIMARY KEY (id);


--
-- Name: UserBusDetails UserBusDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserBusDetails"
    ADD CONSTRAINT "UserBusDetails_pkey" PRIMARY KEY (id);


--
-- Name: UserDocuments UserDocuments_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserDocuments"
    ADD CONSTRAINT "UserDocuments_pkey" PRIMARY KEY (id);


--
-- Name: UserFamilyDetails UserFamilyDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserFamilyDetails"
    ADD CONSTRAINT "UserFamilyDetails_pkey" PRIMARY KEY (id);


--
-- Name: UserHostelDetails UserHostelDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserHostelDetails"
    ADD CONSTRAINT "UserHostelDetails_pkey" PRIMARY KEY (id);


--
-- Name: UserPersonalDetails UserPersonalDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserPersonalDetails"
    ADD CONSTRAINT "UserPersonalDetails_pkey" PRIMARY KEY (id);


--
-- Name: UserWorkDetails UserWorkDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserWorkDetails"
    ADD CONSTRAINT "UserWorkDetails_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Attendance_userId_periodId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Attendance_userId_periodId_key" ON public."Attendance" USING btree ("userId", "periodId");


--
-- Name: Notification_branch_semester_section_idx; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "Notification_branch_semester_section_idx" ON public."Notification" USING btree (branch, semester, section);


--
-- Name: Notification_isGlobal_idx; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "Notification_isGlobal_idx" ON public."Notification" USING btree ("isGlobal");


--
-- Name: Notification_receiverId_idx; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "Notification_receiverId_idx" ON public."Notification" USING btree ("receiverId");


--
-- Name: OtpVerification_email_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "OtpVerification_email_key" ON public."OtpVerification" USING btree (email);


--
-- Name: Period_periodNumber_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Period_periodNumber_key" ON public."Period" USING btree ("periodNumber");


--
-- Name: Period_timetableId_periodNumber_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Period_timetableId_periodNumber_key" ON public."Period" USING btree ("timetableId", "periodNumber");


--
-- Name: Section_branchName_semesterName_sectionName_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Section_branchName_semesterName_sectionName_key" ON public."Section" USING btree ("branchName", "semesterName", "sectionName");


--
-- Name: Semester_branchName_semesterName_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Semester_branchName_semesterName_key" ON public."Semester" USING btree ("branchName", "semesterName");


--
-- Name: Subject_subjectCode_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Subject_subjectCode_key" ON public."Subject" USING btree ("subjectCode");


--
-- Name: TimetableOfDay_date_branchName_semesterName_sectionName_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "TimetableOfDay_date_branchName_semesterName_sectionName_key" ON public."TimetableOfDay" USING btree (date, "branchName", "semesterName", "sectionName");


--
-- Name: UserAcademicDetails_userId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "UserAcademicDetails_userId_key" ON public."UserAcademicDetails" USING btree ("userId");


--
-- Name: UserBusDetails_userId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "UserBusDetails_userId_key" ON public."UserBusDetails" USING btree ("userId");


--
-- Name: UserDocuments_userId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "UserDocuments_userId_key" ON public."UserDocuments" USING btree ("userId");


--
-- Name: UserFamilyDetails_userId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "UserFamilyDetails_userId_key" ON public."UserFamilyDetails" USING btree ("userId");


--
-- Name: UserHostelDetails_userId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "UserHostelDetails_userId_key" ON public."UserHostelDetails" USING btree ("userId");


--
-- Name: UserPersonalDetails_userId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "UserPersonalDetails_userId_key" ON public."UserPersonalDetails" USING btree ("userId");


--
-- Name: UserWorkDetails_userId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "UserWorkDetails_userId_key" ON public."UserWorkDetails" USING btree ("userId");


--
-- Name: User_branch_semester_section_idx; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "User_branch_semester_section_idx" ON public."User" USING btree (branch, semester, section);


--
-- Name: User_collageId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "User_collageId_key" ON public."User" USING btree ("collageId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_usn_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "User_usn_key" ON public."User" USING btree (usn);


--
-- Name: Achievements Achievements_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Achievements"
    ADD CONSTRAINT "Achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Activities Activities_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Activities"
    ADD CONSTRAINT "Activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AssignmentSubmission AssignmentSubmission_assignmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."AssignmentSubmission"
    ADD CONSTRAINT "AssignmentSubmission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES public."Assignment"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AssignmentSubmission AssignmentSubmission_submittedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."AssignmentSubmission"
    ADD CONSTRAINT "AssignmentSubmission_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Assignment Assignment_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Assignment"
    ADD CONSTRAINT "Assignment_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


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
-- Name: IATests IATests_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."IATests"
    ADD CONSTRAINT "IATests_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Notification Notification_receiverId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Notification Notification_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Period Period_timetableId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Period"
    ADD CONSTRAINT "Period_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES public."TimetableOfDay"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Placements Placements_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Placements"
    ADD CONSTRAINT "Placements_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Projects Projects_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Projects"
    ADD CONSTRAINT "Projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Section Section_branchName_semesterName_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Section"
    ADD CONSTRAINT "Section_branchName_semesterName_fkey" FOREIGN KEY ("branchName", "semesterName") REFERENCES public."Semester"("branchName", "semesterName") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Semester Semester_branchName_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Semester"
    ADD CONSTRAINT "Semester_branchName_fkey" FOREIGN KEY ("branchName") REFERENCES public."Branch"("branchName") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: StudyMaterial StudyMaterial_subjectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."StudyMaterial"
    ADD CONSTRAINT "StudyMaterial_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES public."Subject"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: StudyMaterial StudyMaterial_uploadedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."StudyMaterial"
    ADD CONSTRAINT "StudyMaterial_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TimetableOfDay TimetableOfDay_branchName_semesterName_sectionName_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."TimetableOfDay"
    ADD CONSTRAINT "TimetableOfDay_branchName_semesterName_sectionName_fkey" FOREIGN KEY ("branchName", "semesterName", "sectionName") REFERENCES public."Section"("branchName", "semesterName", "sectionName") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TopicCovered TopicCovered_periodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."TopicCovered"
    ADD CONSTRAINT "TopicCovered_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES public."Period"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UniversityExams UniversityExams_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UniversityExams"
    ADD CONSTRAINT "UniversityExams_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserAcademicDetails UserAcademicDetails_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserAcademicDetails"
    ADD CONSTRAINT "UserAcademicDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserBusDetails UserBusDetails_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserBusDetails"
    ADD CONSTRAINT "UserBusDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserDocuments UserDocuments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserDocuments"
    ADD CONSTRAINT "UserDocuments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserFamilyDetails UserFamilyDetails_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserFamilyDetails"
    ADD CONSTRAINT "UserFamilyDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserHostelDetails UserHostelDetails_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserHostelDetails"
    ADD CONSTRAINT "UserHostelDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserPersonalDetails UserPersonalDetails_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserPersonalDetails"
    ADD CONSTRAINT "UserPersonalDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserWorkDetails UserWorkDetails_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserWorkDetails"
    ADD CONSTRAINT "UserWorkDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: User User_mentorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: root
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

