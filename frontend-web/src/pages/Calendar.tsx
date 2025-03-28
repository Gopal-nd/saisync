import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams, useNavigate } from 'react-router-dom';

type CalendarView = 'month' | 'century' | 'decade' | 'year' | 'week' | 'day';

function CustomCalendar() {
  const { branch, semester } = useParams<{ branch: string; semester: string }>();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('month');

  const handleDayClick = (selectedDate: Date) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    navigate(`/branch/${branch}/${semester}/calendar/${formattedDate}`);
  };

  const handlePrev = () => {
    const newDate = new Date(date);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(date);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setDate(newDate);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{branch} - Semester {semester} Calendar</h1>
      
      

      <Calendar
        onChange={(date) => setDate(date as Date)}
        value={date}
        onClickDay={handleDayClick}
        view={'month'}
        className="border rounded-lg p-4 bg-white shadow-lg"
      />
    </div>
  );
}

export default CustomCalendar;
