import { useState } from 'react';
import Calendar from 'react-calendar';
import { Link, redirect, useNavigate } from 'react-router-dom';

const Staff = () => {
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();
     // Helper function to fix date offset issue
     const formatDate = (selectedDate: Date) => {
       const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
       return adjustedDate.toISOString().split('T')[0];
     };
   
 
    const handleDayClick = (selectedDate: Date) => {
     const formattedDate = formatDate(selectedDate);
     navigate(`/staff/${formattedDate}`);
   };
  return (
    <>
          <hr />
      <Calendar
          onChange={(date) => setDate(date as Date)}
          value={date}
          onClickDay={handleDayClick}
          view={'month'}
          className="border rounded-lg p-4 bg-white shadow-lg"
        />
    </>
  )
}

export default Staff