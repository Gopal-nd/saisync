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

//   const { data: subjects, isLoading, isPending, isError } = useQuery({
//     queryKey: ['staff', day],
//     queryFn: async () => {
//       const response = await axios.get('http://localhost:5000/staff/class', { params: { day, staff: 'babu' } });
//       return response.data;
//     },
//   });
// console.log(subjects)

//   if (isLoading || isPending) {
//     return <p>Loading...</p>;
//   }

//   if (isError) {
//     return <p>Error fetching data...</p>;
//   }



  return (
    <div>
      <p>{day}</p>

      {subjects?.subjects?.Periods?.map((period: any, index: number) => (
          <div key={index}>
            <PeriodCard period={period} periodId={period.id} branchName={subjects.branchName} semesterNumber={subjects.semesterNumber} day={day as string}  />
        </div>
      ))}
    </div>
  );
};

export default StaffSchedule;
