import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams, useNavigate } from 'react-router-dom';

function CustomCalendar() {
  const { branch, semester } = useParams<{ branch: string; semester: string }>();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [edit, setEdit] = useState(false);

  // Helper function to fix date offset issue
  const formatDate = (selectedDate: Date) => {
    const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
    return adjustedDate.toISOString().split('T')[0];
  };

  const handleDayClick = (selectedDate: Date) => {
    const formattedDate = formatDate(selectedDate);
    navigate(`/branch/${branch}/${semester}/${formattedDate}`);
  };

  const SeeSchedule = (selectedDate: Date) => {
    const formattedDate = formatDate(selectedDate);
    navigate(`/branch/${branch}/${semester}/${formattedDate}/see`);
  };

  return (
    <div className="p-8 space-y-2">
      <h1 className="text-3xl font-bold mb-6">{branch} - Semester {semester} </h1>

      <Button onClick={() => setEdit((edit) => !edit)}>
        {edit ? 'Edit Mode' : 'Normal Mode'}
      </Button>

      {edit ? (
        <Calendar
          onChange={(date) => setDate(date as Date)}
          value={date}
          onClickDay={handleDayClick}
          view={'month'}
          className="border rounded-lg p-4 bg-white shadow-lg"
        />
      ) : (
        <Calendar
          onChange={(date) => setDate(date as Date)}
          value={date}
          onClickDay={SeeSchedule}
          view={'month'}
          className="border rounded-lg p-4 bg-white shadow-lg"
        />
      )}
    </div>
  );
}

export default CustomCalendar;
