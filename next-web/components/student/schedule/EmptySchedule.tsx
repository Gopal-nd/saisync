import React from 'react';
import { CalendarX } from 'lucide-react';
import dayjs from 'dayjs';

interface EmptyScheduleProps {
  day: Date;
}

export const EmptySchedule: React.FC<EmptyScheduleProps> = ({ day }) => {
  const isToday = dayjs(day).isSame(dayjs(), 'day');
  const isWeekend = [0, 6].includes(day.getDay()); // 0 is Sunday, 6 is Saturday
  
  return (
    <div className="flex flex-col items-center justify-center p-8 mt-6 border border-dashed rounded-lg ">
      <CalendarX className="w-12 h-12 mb-2" />
      
      <h3 className="text-xl font-medium mb-2">No Classes Scheduled</h3>
      
      <p className="text-gray-500 text-center max-w-md">
        {isToday ? (
          isWeekend ? 
            "Enjoy your weekend! There are no classes scheduled for today." : 
            "You don't have any classes scheduled for today."
        ) : (
          isWeekend ? 
            "No classes are scheduled for this weekend day." : 
            "There are no classes scheduled for this date."
        )}
      </p>
    </div>
  );
};