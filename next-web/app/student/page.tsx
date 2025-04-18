'use client'
import React, { use, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import StudentPeriodCard from '@/components/student/StudentPeriodCard';
import axiosInstance from '@/lib/axiosInstance';
import { ScheduleHeader } from '@/components/student/schedule/ScheduleHeader';
import { ScheduleCalendar } from '@/components/student/schedule/ScheduleCalendar';
import { EmptySchedule } from '@/components/student/schedule/EmptySchedule';
import { ScheduleSkeleton } from '@/components/student/schedule/ScheduleSkeleton';


const StudentSchedule = () => {
  const [day, setDay] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const { 
    data: daySchedule, 
    isLoading, 
    isPending, 
    isError ,
  } = useQuery({
    queryKey: ['student-schedule', dayjs(day).format("YYYY-M-D")],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/students/class', { 
        params: { day: dayjs(day).format("YYYY-M-D") }
      });
      return response.data;
    },
  });

  console.log(daySchedule )

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

  const { data: scheduleData } = daySchedule || { data: {} };
  const periods = scheduleData?.Periods || [];
  const hasPeriods = periods.length > 0;

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

      {hasPeriods ? (
        <div className="space-y-4 mt-6">
          {periods.map((period: any, index: number) => (
            <div 
              key={period.id || index} 
              className="transition-all duration-300 hover:translate-y-[-2px]"
            >
              <StudentPeriodCard 
                period={period} 
                periodId={period.id} 
                branchName={scheduleData?.branchName} 
                semesterNumber={scheduleData?.semesterName} 
                section={scheduleData?.sectionName} 
                day={dayjs(day).format("YYYY-M-D")} 
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptySchedule day={day} />
      )}
    </div>
  );
};

export default StudentSchedule;