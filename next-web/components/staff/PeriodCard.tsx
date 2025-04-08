import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface PeriodCardProps {
  period: {
    id:string,
    subject: string;
    startTime: string;
    endTime: string;
    subjectCode: string;
    isLab: boolean;
  };
  branchName: string;
  semesterNumber: string;
  periodId: string;
  day: string;
  section:string
}

const PeriodCard: React.FC<PeriodCardProps> = ({
  period,
  branchName,
  semesterNumber,
  periodId,
  section,
  day,
}) => {
  const [showStudents, setShowStudents] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['students', periodId],
    queryFn: async () => {
      const response = await axiosInstance.get('/student/class', {
        params: { branch: branchName, semester: semesterNumber,periodId,section },
      });
      console.log(response.data)
      return response.data.data;
    },
    enabled: false, // Disable automatic fetching
  });

  const { data:Absenties, isLoading: AbsentiesLoading, isError: AbsentiesError, refetch: AbsentiesRefetch } = useQuery({
    queryKey: ['students',"absenties" ,periodId],
    queryFn: async () => {
      const response = await axiosInstance.get('/student/attendance/absent', {
        params: { branch: branchName, semester: semesterNumber,periodId, day },
      });
      return response.data;
    },
    enabled: false, // Disable automatic fetching
  });
// console.log(data.subjects.map((student: any) => student.name))
  const handleFetchStudents = async () => {
    if(showStudents){
      setShowStudents(false)
      return
    }
    refetch(); 
    setShowStudents(true);
  };

  const handleAttendance = async (userId: string,periodId:string,status:string) => {
    const response = await axiosInstance.put('/student/attendance', { userId,periodId,status });
    if(response.status === 200){
      toast.success('attendance updated')
    }
    if(status === 'ABSENT'){
      await AbsentiesRefetch();
    }
    await refetch(); 
  };
  const handleAttendanceForAbsenties = async (userId: string,periodId:string,status:string) => {
    const response = await axiosInstance.put('/student/attendance', { userId,periodId,status });
    if(response.status === 200){
      toast.success('attendance updated')
    }
    if(status === 'PRESENT'){
      await AbsentiesRefetch();
    }
    // await refetch(); 
  };


console.log(data)
  return (
    <div className="mb-4 p-4 border rounded-lg shadow-sm ">
      <p className="font-bold">Branch: {branchName}</p>
      <p className="font-bold">Semester: {semesterNumber}</p>
      <p className="font-bold">Section: {section}</p>


      <h2 className="text-xl font-semibold">{period.subject}</h2>
      <p>
        <span className="font-bold">Start Time:</span>{" "}
        {new Date(period.startTime).toLocaleTimeString()}
      </p>
      <p>
        <span className="font-bold">End Time:</span>{" "}
        {new Date(period.endTime).toLocaleTimeString()}
      </p>
      <p>
        <span className="font-bold">Subject Code:</span> {period.subjectCode}
      </p>
      <p>
        <span className="font-bold">Lab:</span> {period.isLab ? "Yes" : "No"}
      </p>

      <Button onClick={handleFetchStudents} disabled={isLoading}>
        {isLoading ? "Loading..." : "Take Attendance"}
      </Button>
      {/* {JSON.stringify(data.subjects)} */}
      {showStudents && (
        
        <div>
          <h3 className="font-bold mt-4">Students List:</h3>
          {isError ? (
            <p className="text-red-500">Error fetching students.</p>
          ) : 
          data?.map((student: any) => (
            <div key={student.id} className="flex items-center justify-around">
              <p >{student.name}</p>
              <Button className="bg-green-500" onClick={() => handleAttendance(student.userId, period.id,"PRESENT")}>Present</Button>
              <Button className="bg-red-500" onClick={() => handleAttendance(student.userId, period.id,"ABSENT")}>Absent</Button>
            </div>
            

          ))}
          {data?.students?.length === 0 && <p>You marked all  Student Attendece.</p>}
          <div>
            <p className="font-bold">Class Absenties</p>
            {Absenties && Absenties.response.map((student: any) => (
              <div key={student.id} className="flex items-center justify-around">
                <p >{student.name}</p>
                <Button className="bg-green-500" onClick={() => handleAttendanceForAbsenties(student.userId, period.id,"PRESENT")}>Present</Button>
              </div>
            ))}
             {Absenties && Absenties.response.length === 0 && <p>No Absenties</p>}
            </div>
        </div>        
      )}
    </div>
  );
};

export default PeriodCard;
