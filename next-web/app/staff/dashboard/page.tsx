'use client'
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { toast } from "sonner";
import React, { useState } from 'react';
import useAuthStore from '@/store/useAuthStore';
import axiosInstance from '@/lib/axiosInstance';
import { Calendar } from '@/components/ui/calendar';
import dayjs from 'dayjs';
import PeriodCard from '@/components/staff/PeriodCard';


const StaffSchedule = () => {

  const {user} = useAuthStore()
  const [presentStudents, setPresentStudents] = useState<string[]>([]);
  const [absentStudents, setAbsentStudents] = useState<string[]>([]);
  const [day,setDay] = useState<Date>(new Date())
  const { data: subjects, isLoading, isPending, isError } = useQuery({
    queryKey: ['staff', day],
    queryFn: async () => {
      const response = await axiosInstance.get('/staff/class', { params: { day:dayjs(day).format("YYYY-M-D"), staff: user?.role } });
      return response.data;
    },
  });
console.log(subjects)

  if (isLoading || isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data...</p>;
  }



  return (
    <div>

      <p>{day.toDateString()}</p>
      <Calendar
              mode="single"
              selected={day}
              onSelect={(date) => setDay(date as Date)}
              onDayClick={(date) => setDay(date as Date)}
              
              initialFocus
            />
{subjects?.subjects?.Periods?.map((period: any, index: number) => (
          <div key={index}>

            <PeriodCard period={period} periodId={period.id} branchName={subjects.branchName} semesterNumber={subjects.semesterNumber} day={dayjs(day).format("YYYY-M-D")}  />
        </div>
      ))}

    </div>
  );
};

export default StaffSchedule;
