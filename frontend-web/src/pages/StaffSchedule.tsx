import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from "sonner";
import React, { useState } from 'react';
import PeriodCard from './PeriodCard';

const StaffSchedule = () => {
  const { day } = useParams<{ day: string }>();
  
  const [presentStudents, setPresentStudents] = useState<string[]>([]);
  const [absentStudents, setAbsentStudents] = useState<string[]>([]);

  const { data: subjects, isLoading, isPending, isError } = useQuery({
    queryKey: ['staff', day],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/staff/class', { params: { day, staff: 'babu' } });
      return response.data;
    },
  });
console.log(subjects)
//   const { data } = useQuery({
//     queryKey: ['students', day],
//     queryFn: async () => {
//       const response = await axios.get('http://localhost:3000/student/class', { params: { branch: 'AIML', semester: 'S6', } });
//       return response.data;
//     },
//   });

//   const { data: absenties,refetch } = useQuery({
//     queryKey: ['students', day, 'absenties'],
//     queryFn: async () => {
//       const response = await axios.get('http://localhost:3000/student/attendance/absent', { params: { branch: 'AIML', semester: 'S6' } });
//       return response.data;
//     },
//   });

  // Mutation for marking attendance
//   const attendanceMutation = useMutation({
//     mutationFn: async ({ userId, periodId, status }: { userId: string; periodId: string; status: string }) => {
//       const response = await axios.get('http://localhost:3000/student/attendance', { 
//         params: { userId, periodId, status, date: day } 
//       });
//       return response.data;
//     },
//     onSuccess: (_, { userId, status }) => {
//       if (status === 'PRESENT') {
//         toast.success('Marked Present');
//         setPresentStudents((prev) => [...prev, userId]);
//       } else {
//         toast.info('Marked Absent');
//         refetch()
//         setAbsentStudents((prev) => [...prev, userId]);
//       }
//     },
//   });

//   const handleAttendance = (userId: string, periodId: string, status: string) => {
//     attendanceMutation.mutate({ userId, periodId, status });
//   };

  if (isLoading || isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data...</p>;
  }

//   const filteredStudents = data?.subjects?.filter(
//     (student: any) => !presentStudents.includes(student.id) && !absentStudents.includes(student.id)
//   );

  return (
    <div>
      <p>{day}</p>

      {subjects?.subjects?.Periods?.map((period: any, index: number) => (
          <div key={index}>
            <PeriodCard period={period} periodId={period.id} branchName={subjects.branchName} semesterNumber={subjects.semesterNumber} day={day as string}  />
          {/* Take Attendance Section */}
          {/* <h3 className="text-lg font-semibold mt-4">Take Attendance</h3>
          {filteredStudents?.length > 0 ? (
            filteredStudents.map((student: any) => (
              <div key={student.id} className="flex items-center justify-between mb-2">
                <p>{student.name}</p>
                <p>{student.usn}</p>
                <Button onClick={() => handleAttendance(student.id, period.id, 'PRESENT')} className='bg-green-500'>
                  Present
                </Button>
                <Button onClick={() => handleAttendance(student.id, period.id, 'ABSENT')} className='bg-red-500'>
                  Absent
                </Button>
              </div>
            ))
          ) : (
            <p>All students marked attendance for this period.</p>
          )} */}

          {/* Absenties Section */}
          {/* <h3 className="text-lg font-semibold mt-4">Class Absenties</h3>
          {absenties?.subjects?.length > 0 ? (
            absenties.subjects.map((student: any) => (
              <div key={student.id} className="flex items-center justify-between mb-2">
                <p>{student.name}</p>
                <p>{student.usn}</p>
              </div>
            ))
          ) : (
            <p>No students marked absent yet.</p>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default StaffSchedule;
