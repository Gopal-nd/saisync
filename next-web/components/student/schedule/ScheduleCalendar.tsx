import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { AnimatePresence, motion } from 'framer-motion';

interface ScheduleCalendarProps {
  show: boolean;
  selectedDay: Date;
  onDayChange: (date: Date | undefined) => void;
}

export const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({
  show,
  selectedDay,
  onDayChange
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="border rounded-lg shadow-sm  p-4 flex justify-center my-4">
            <Calendar
              mode="single"
              selected={selectedDay}
              onSelect={onDayChange}
              className="rounded-md"
              initialFocus
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};