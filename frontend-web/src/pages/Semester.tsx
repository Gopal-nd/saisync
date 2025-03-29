import { useParams, Link, Links } from 'react-router-dom';
import CustomCalendar from './Calendar';

function Semester() {
const { branch, semester } = useParams<{ branch: string; semester: string }>();
const scheme = ['2023','2022','2021','2019','2017','2014']
  return (
    <div>

      <h1 className='text-2xl font-bold'>Choose the schema</h1>
      <p className='bg-blue-500 rounded-2xl p-2 gap-2'  >
      scheme {scheme.map((sem) => (
        <Link key={sem} to={`/subjects/${branch}/${semester}/${sem}`} className='bg-blue-500 gap-3 text-white p-2 rounded-md m-2'>
          {sem}
      </Link>
      ))}
          </p>
      <CustomCalendar />
  
    </div>
  );
}

export default Semester;
