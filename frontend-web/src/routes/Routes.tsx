import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Branch from '../pages/Branch';
import Semester from '../pages/Semester';


import Calendar from '@/pages/Calendar';
import DaySchedule from '@/pages/DaySchedule';
import SeeSchedule from '@/pages/SeeSchedule';
import SemAcadamics from '@/pages/SemAcadamics';
import Staff from '@/pages/Staff';
import StaffSchedule from '@/pages/StaffSchedule';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/branch/:branch" element={<Branch />} />
      <Route path="/branch/:branch/:semester" element={<Semester />} />
      <Route path="/branch/:branch/:semester/calendar" element={<Calendar />} />
      <Route path="/branch/:branch/:semester/:day" element={<DaySchedule />} />
      <Route path="/branch/:branch/:semester/:day/see" element={<SeeSchedule />} />

      <Route path="/subjects/:branch" element={<Branch />} />
      <Route path="/subjects/:branch/:semester" element={<Semester />} />
      <Route path="/subjects/:branch/:semester/create" element={<Calendar />} />
      <Route path="/subjects/:branch/:semester/:schema" element={<SemAcadamics />} />
      
      <Route path="/staff" element={<Staff />} />
      <Route path="/staff/:day" element={<StaffSchedule />} />
      
    </Routes>
  );
}
