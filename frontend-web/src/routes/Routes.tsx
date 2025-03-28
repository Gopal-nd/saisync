import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Branch from '../pages/Branch';
import Semester from '../pages/Semester';

import EditSchedule from '../pages/EditSchedule';
import ExamSchedule from '../pages/ExamSchedule';
import Calendar from '@/pages/Calendar';
import DaySchedule from '@/pages/DaySchedule';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/branch/:branch" element={<Branch />} />
      <Route path="/branch/:branch/:semester" element={<Semester />} />
      <Route path="/branch/:branch/:semester/calendar" element={<Calendar />} />
      <Route path="/branch/:branch/:semester/edit" element={<EditSchedule />} />
      <Route path="/exam/:branch/:semester" element={<ExamSchedule />} />
      <Route path="/branch/:branch/:semester/calendar/:day" element={<DaySchedule />} />
    </Routes>
  );
}
