import { useParams } from 'react-router-dom';

function DaySchedule() {
  const { branch, semester, day } = useParams<{ branch: string; semester: string; day: string }>();

  return (
    <div>
      <h1>Schedule for {branch} - Semester {semester} - {day}</h1>
      <button>Add Period</button>
    </div>
  );
}

export default DaySchedule;
