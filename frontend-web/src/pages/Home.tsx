import { Button } from '@/components/ui/button';
import { BranchType } from '@/utils/enum';
import { Link } from 'react-router-dom';

function Home() {

  return (
    <div className='flex flex-col items-center gap-2'>
      <h1>Welcome to College Timetable</h1>
      {Object.values(BranchType).map(branch => (
        <Link key={branch} to={`/branch/${branch}`}>
          <button>{branch} Branch</button>
        </Link>
      ))}

    <h1>Add subjects staff and code</h1>
      {Object.values(BranchType).map(branch => (
        <Link key={branch} to={`/subjects/${branch}`}>
          <button>{branch} Branch</button>
        </Link>
      ))}

      <Link to={'/staff'}>
      <Button>Staff</Button>
      </Link>

    </div>
  );
}

export default Home;
