import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import dayjs from 'dayjs';

interface ScheduleHeaderProps {
  setDay: (date: Date) => void;
  day: Date;
  showCalendar: boolean;
  toggleCalendar: () => void;
}

export const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ 
  setDay,
  day, 
  showCalendar, 
  toggleCalendar 
}) => {
  const formatDate = (date: Date) => {
    return dayjs(date).format('dddd, MMMM D, YYYY');
  };

  const handlePrevDay = () => {
    const prev = dayjs(day).subtract(1, 'day').toDate();
    setDay(prev);
  };

  const handleNextDay = () => {
    const next = dayjs(day).add(1, 'day').toDate();
    setDay(next);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={handlePrevDay}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="sr-only">Previous day</span>
        </Button>
        
        <h1 className="text-xl font-medium">
          {formatDate(day)}
        </h1>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={handleNextDay}
        >
          <ChevronRightIcon className="h-4 w-4" />
          <span className="sr-only">Next day</span>
        </Button>
      </div>
      
      <Button 
        onClick={toggleCalendar}
        variant="outline"
        className="flex items-center gap-2 transition-colors"
      >
        <CalendarIcon className="h-4 w-4" />
        {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
      </Button>
    </div>
  );
};
