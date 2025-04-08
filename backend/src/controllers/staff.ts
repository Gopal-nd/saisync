import type { Request, Response } from "express";
import asyncHandler from "../utils/async-handler";
import { prisma } from "../lib/db";
import { ApiResponse } from "../utils/api-response";
import { SubjectSchema } from "../types";
import { APIError } from "../utils/api-error";
import type { BranchType, SemesterType } from "@prisma/client";

import { formatDate } from "date-fns";

// ======================= Basic =========================

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.query
    
    
    if (!id || typeof id !== "string") {
      throw new APIError({ message: "Invalid or no Id", status: 400 });
    }
    
      const subject = await prisma.user.findUnique({
        where:{
          id:id
        }
      });
    
      res.status(201).json(
        new ApiResponse({
          statusCode: 201,
          data: subject,
          message: "Subject success",
        })
      );
});


export const editStudent = asyncHandler(async (req: Request, res: Response) => {
  
  const { name,
    id,
    usn,
    collageId,
    section,
    schema,
    branch,
    semester,
    isVerified
     } = req.body;

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or no Id", status: 400 });
  }
  console.log(req.body)
    
  const student = await prisma.user.update({
    where:{id},
    data: {
      name,
      usn,
      collageId,
      section,
      schema,
      branch,
      semester,
      isVerified
    },
    select:{
        password:false,
        collageId:true
    }
  });
  

  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: student,
      message: "Subject Updated Sucessfully ",
    })
  );
});


export const deleteUsers = asyncHandler(async (req: Request, res: Response) => {
 
  const {id} = req.params
  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or no Id", status: 400 });
  }
  console.log(id)
  
await prisma.user.delete({where:{id}})


  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: null,
      message: "Subject Deleted Sucessfully",
    })
  );
});


export const getAllStudents = asyncHandler(async (req: Request, res: Response) => {
    
    const {query,  limit = "10", page = "1"} = req.query
    
    const searchQuery = query ? String(query) : "";
    const currentPage = Number(page);
    const limitNumber = Number(limit);
    const offset = (currentPage - 1) * limitNumber;
    

    let whereClause: any = {};

    if (searchQuery) {
        whereClause.OR = [
            {name: { contains: searchQuery, mode: "insensitive" } }
        ]
    }

   


    
  const students = await prisma.user.findMany({
    where: {
      role: 'STAFF',
      ...whereClause
    },
    take: limitNumber,
    skip: offset,
  });

  const totalCount = await prisma.user.count({
    where: {
      role: 'STUDENT',
      ...whereClause}
  });

   
      res.status(201).json(
        new ApiResponse({
          statusCode: 201,
          data: {
            students,
            totalPages: Math.ceil(totalCount / limitNumber),
            currentPage,
            totalCount,
          },
          message: "student success",
        })
      );
});


// ======================= PERSONAL =========================

export const getPersonalDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or missing ID", status: 400 });
  }

  const data = await prisma.userPersonalDetails.upsert({
    where: { userId: id },
    update: {},
    create: { 
        userId: id
     },
  });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: data, message: "Personal details fetched successfully" }));
});

export const editPersonalDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id,dob, ...rest } = req.body;
  const dateOfBirth= new Date(dob);
  console.log(req.body)
  console.log(dateOfBirth)

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or missing ID", status: 400 });
  }

  const updated = await prisma.userPersonalDetails.upsert({ where: { userId: id }, update: {userId: id,dob:dateOfBirth, ...rest}, create: {userId: id,dob:dateOfBirth, ...rest} });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: updated, message: "Personal details updated successfully" }));
});




// ======================= FAMILY =========================
export const getFamilyDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or missing ID", status: 400 });
  }

  const data = await prisma.userFamilyDetails.upsert({ where: { userId: id }, update: {}, create: { userId: id } });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: data, message: "Family details fetched successfully" }));
});

export const editFamilyDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id, ...rest } = req.body;

  console.log(req.body)
  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or missing ID", status: 400 });
  }

  const updated = await prisma.userFamilyDetails.upsert({ where: { userId: id }, update: {...rest, userId: id}, create: {...rest, userId: id} });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: updated, message: "Family details updated successfully" }));
});

// ======================= ACADAMIC =========================
export const getAcadamicDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or missing ID", status: 400 });
  }

  const data = await prisma.userAcademicDetails.upsert({ where: { userId: id },create:{userId:id},update:{} });

  res.status(200).json(new ApiResponse({ statusCode: 200, data:data, message: "Acadamic details fetched successfully" }));
});

export const editAcadamicDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id, ...rest } = req.body;

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or missing ID", status: 400 });
  }
  console.log(req.body)

  const updated = await prisma.userAcademicDetails.upsert({ where: { userId: id }, update: {...rest, userId: id}, create: {...rest, userId: id} });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: updated, message: "Acadamic details updated successfully" }));
});

// ======================= DOCUMENTS =========================
export const getDocumentsDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or missing ID", status: 400 });
  }

  const data = await prisma.userDocuments.upsert({ where: { userId: id },create:{userId:id},update:{} });

  res.status(200).json(new ApiResponse({ statusCode: 200, data, message: "Documents details fetched successfully" }));
});

export const editDocumentsDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id, ...rest } = req.body;

  console.log(req.body)
  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or missing ID", status: 400 });
  }

  const updated = await prisma.userDocuments.upsert({ where: { userId: id }, update: {...rest, userId: id}, create: {...rest, userId: id} });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: updated, message: "Documents details updated successfully" }));
});

// ======================= BUS =========================
export const getBusDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or missing ID", status: 400 });
  }

  const data = await prisma.userBusDetails.upsert({ where: { userId: id },create:{userId:id},update:{} });

  res.status(200).json(new ApiResponse({ statusCode: 200, data, message: "Bus details fetched successfully" }));
});

export const editBusDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id, ...rest } = req.body;

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or missing ID", status: 400 });
  }

  const updated = await prisma.userBusDetails.upsert({ where: { userId: id }, update: {...rest, userId: id}, create: {...rest, userId: id} });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: updated, message: "Bus details updated successfully" }));
});

// ======================= HOSTEL =========================
export const getHostelDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or missing ID", status: 400 });
  }

  const data = await prisma.userHostelDetails.upsert({ where: { userId: id } ,create:{userId:id},update:{} });

  res.status(200).json(new ApiResponse({ statusCode: 200, data:data, message: "Hostel details fetched successfully" }));
});

export const editHostelDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id, ...rest } = req.body;

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or missing ID", status: 400 });
  }

  const updated = await prisma.userHostelDetails.upsert({ where: { userId: id }, update: {...rest, userId: id}, create: {...rest, userId: id} });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: updated, message: "Hostel details updated successfully" }));
});

// ======================= WORK =========================
export const getWorkDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or missing ID", status: 400 });
  }

  const data = await prisma.userWorkDetails.upsert({ where: { userId: id } ,create:{userId:id},update:{} });

  res.status(200).json(new ApiResponse({ statusCode: 200, data:data, message: "Work details fetched successfully" }));
});

export const editWorkDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id,startDate,endDate, ...rest } = req.body;

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or missing ID", status: 400 });
  }

  const updated = await prisma.userWorkDetails.upsert({ where: { userId: id },  update: {...rest,startDate:new Date(startDate),endDate:new Date(endDate), userId: id}, create: {...rest, startDate:new Date(startDate),endDate:new Date(endDate), userId: id} });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: updated, message: "Work details updated successfully" }));
});



export const getAllFaculty = asyncHandler(async (req: Request, res: Response) => {
  const data = await prisma.user.findMany({where:{role:"STAFF"}});
  res.status(200).json(new ApiResponse({ statusCode: 200, data, message: "Faculties fetched successfully" }));
});



export const getFacultyClasses = asyncHandler(async (req: Request, res: Response) => {
  const { day, staff} = req.query; 
console.log(req.query)


  if (!staff || typeof staff !== "string") {
    throw new APIError({ message: "Invalid or missing staff", status: 400 });
  }
  if (!day || typeof day !== "string") {
    throw new APIError({ message: "Invalid or missing date", status: 400 });  
  }


  const data = await prisma.timetableOfDay.findMany({
    where: {
      date: new Date(day),
      Periods: {
        some: {
          staff: {
            equals: staff,
          },
        },
      },
    
    },
    select:{
      Periods:true,
      branchName:true,
      sectionName:true,
      semesterName:true
    }
  })

  console.log(data)
  res.status(200).json(new ApiResponse({ statusCode: 200, data:data, message: "Classes fetched successfully" }));

});