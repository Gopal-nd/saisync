import { useParams, Link } from 'react-router-dom';
import { SemesterType } from '@/utils/enum';
function Branch() {
  const { branch } = useParams<{ branch: string }>();

  return (
    <div>
      <h1>{branch} Branch</h1>
      {Object.values(SemesterType).map(sem => (
        <Link key={sem} to={`/branch/${branch}/${sem}`}>
          <button>Semester {sem}</button>
        </Link>
      ))}
    </div>
  );
}

export default Branch;
