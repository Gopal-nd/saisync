
// import type { Request, Response } from "express";
// import asyncHandler from "../utils/async-handler";
// import { ApiResponse } from "../utils/api-response";
// import { prisma } from "../lib/db";
// import type { BranchType, IATestType, SectionType, SemesterType, User } from "@prisma/client";
// import { APIError } from "../utils/api-error";

// export const getSemExamMarks = asyncHandler(async(req:Request,res:Response)=>{

//     const {branch,section, semester, subjectCode, testNo} = req.query

//     console.log(req.query)

//     const students = await prisma.user.findMany({
//         where:{
//             role:'STUDENT',
//             branch: branch as BranchType,
//             section:section as SectionType,
//             semester:semester as SemesterType,
//         }
//     })
//     const subjectCodeOfSubject = await prisma.subject.findUnique({
//         where:{
//             subjectCode:subjectCode as string
//         }
//     })
//     if(!subjectCodeOfSubject?.id){
//         throw new APIError({message:'invalid subject code',status:400})
//     }
//     console.log(students, subjectCodeOfSubject)

//     const studentsIAMarks = await Promise.all( students.map(async(student:User)=>{
//         const IaExam = await prisma.universityExams.upsert({
//             where:{
               
//                 branch:branch as BranchType,
//                 semester: semester as SemesterType,
//                 section: section as SectionType,
//                 userId_subjectId_testNo:{
//                 userId:student.id,
//                 subjectId:subjectCodeOfSubject?.id,
//                 testNo:testNo as IATestType,
//                 }
            
//             },
//             update:{},
//             create:{
//                 userId:student.id,
//                 subjectId:subjectCodeOfSubject?.id,
//                 branch:branch as BranchType,
//                 section:section as SectionType,
//                 semester:semester as SemesterType,
//                 testNo: testNo as IATestType,
//                 totalMarks:50,
//                 obtainedMarks:0,
//                 name:testNo as string,
//                 subjectCode:subjectCode as string,
//             },select:{
//                 user:{
//                     select:{
//                         usn:true,
//                         name:true,
//                     }
//                 },
//                 totalMarks:true,
//                 obtainedMarks:true,
//                 id:true
//             }
//         })

//         return IaExam
//     }))

//     console.log(studentsIAMarks)


//     res.status(200).json(new ApiResponse({data:studentsIAMarks, message:"success", statusCode:200}))
// })


// export const UpdateSemExamMarks = asyncHandler(async (req: Request, res: Response) => {
//     const {id, marks} = req.body

//     if (!id || typeof id !== "string") {
//         throw new APIError({ message: "Invalid or missing ID", status: 400 });
//       }

//       if (!marks ) {
//         throw new APIError({ message: "Invalid or marks ID", status: 400 });
//       }

//     const data = await prisma.iATests.update({
//         where:{
//             id:id
//         },
//           data:{
//             obtainedMarks:marks
//           }
//     })
//     res.status(200).json(new ApiResponse({ statusCode: 200, data:data, message: "Marks Updated successfully" }));
//   });