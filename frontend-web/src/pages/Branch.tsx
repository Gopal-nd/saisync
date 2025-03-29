import { useParams, Link } from 'react-router-dom';
import { SemesterType } from '@/utils/enum';
function Branch() {
  const { branch } = useParams<{ branch: string }>();

  return (
    <div className='space-y-4'>
      <h1>{branch} Branch</h1>
      {Object.values(SemesterType).map(sem => (
        <Link key={sem} to={`/branch/${branch}/${sem}`} className='bg-blue-500 gap-3 text-white p-2 rounded-md m-2'>
          <button>Semester {sem}</button>
        </Link>
      ))}
    </div>
  );
}

export default Branch;
