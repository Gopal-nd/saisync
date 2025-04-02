"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import EditCoursePage from "@/components/subjects/SubjectsPage";



export default function PeriodEdit() {
  const params = useParams();
  const id = params?.id as string


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["subject", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");
      const res = await axiosInstance.get("/api/schedule/one", { params: { id } });
      return res.data.data;
    },
    enabled: !!id, 
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error)?.message || "Something went wrong"}</div>;
  if (!data) return <div>No subject found</div>;

  return (
    // <EditCoursePage
    // id={id}
    //   branchName={data.branchName}
    //   semesterNumber={data.semesterNumber}
    //   isLab={data.isLab}
    //   noOfCredits={data.noOfCredits}
    //   staffName={data.staffName}
    //   subjectCode={data.subjectCode}
    //   subjectName={data.subjectName}
    // />
    <p>
        ID = {id}
        {JSON.stringify(data)}
    </p>
  );
}
