import { useParams, Link } from 'react-router-dom';

function Semester() {
  const { branch, semester } = useParams<{ branch: string; semester: string }>();

  return (
    <div>
      <h1>{branch} - Semester {semester}</h1>
      <Link to={`/branch/${branch}/${semester}/calendar`}>
        <button>View Calendar</button>
      </Link>
      <Link to={`/branch/${branch}/${semester}/edit`}>
        <button>Edit Schedule</button>
      </Link>
      <Link to={`/exam/${branch}/${semester}`}>
        <button>View Exam Schedule</button>
      </Link>
    </div>
  );
}

export default Semester;
