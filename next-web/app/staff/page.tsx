'use client'
import React, {  useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axiosInstance';
import { ScheduleHeader } from '@/components/student/schedule/ScheduleHeader';
import { ScheduleCalendar } from '@/components/student/schedule/ScheduleCalendar';
import { EmptySchedule } from '@/components/student/schedule/EmptySchedule';
import { ScheduleSkeleton } from '@/components/student/schedule/ScheduleSkeleton';
import useAuthStore from '@/store/useAuthStore';
import PeriodCard from '@/components/staff/PeriodCard';


const StaffPanel = () => {

  const { user } = useAuthStore()
    const [showCalendar, setShowCalendar] = useState(false);
  
  const [day, setDay] = useState<Date>(new Date())
  const { data: subjects, isLoading, isPending, isError } = useQuery({
    queryKey: ['staff',user?.id, day],
    queryFn: async () => {
      const response = await axiosInstance.get('/staff/class', { params: { day: dayjs(day).format("YYYY-M-D"), staff: user?.name } });
      return response.data;
    },
  });
  console.log(subjects)


  const toggleCalendar = () => {
    setShowCalendar(prev => !prev);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDay(date);
    }
  };

  if (isLoading || isPending) {
    return <ScheduleSkeleton />;
  }


  if (isError) {
    return (
      <div className="p-6 rounded-lg border  text-center">
        <p className="text-red-600 font-medium">Unable to load your schedule. Please try again later.</p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline" 
          className="mt-4 hover:bg-red-100 transition-colors"
        >
          Retry
        </Button>
      </div>
    );
  }

  // const { data: scheduleData } = daySchedule || { data: {} };
  // const periods = scheduleData?.Periods || [];
  // const hasPeriods = periods.length > 0;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 animate-fadeIn">
      <ScheduleHeader 
        setDay={setDay}
        day={day} 
        showCalendar={showCalendar} 
        toggleCalendar={toggleCalendar} 
      />
      
      <ScheduleCalendar
        show={showCalendar}
        selectedDay={day}
        onDayChange={handleDateChange}
      />

      {subjects?.data.length>0 ? (
        <div className="space-y-4 mt-6">
          {subjects?.data?.map((subjects: any, index: number) => (
        subjects.Periods?.map((period: any, index: number) => (
          <div key={index}>
            <PeriodCard period={period} periodId={period.id} branchName={subjects.branchName} semesterNumber={subjects.semesterName} section={subjects.sectionName} day={dayjs(day).format("YYYY-M-D")} />
          </div>
        ))
      ))}
        </div>
      ) : (
        <EmptySchedule day={day} />
      )}
    </div>
  );
};

export default StaffPanel;
