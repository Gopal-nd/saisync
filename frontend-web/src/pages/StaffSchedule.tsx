import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const StaffSchedule = () => {
    const {day} = useParams<{day:string}>()
    const {data:subjects,isLoading,isPending,isError} = useQuery({
        queryKey:['staff',day],
        queryFn: async()=>{
            const response = await axios.get('http://localhost:3000/staff/class', { params: { day, staff:'babu' } });
            console.log(response.data)
            return response.data
        }
    })

    if(isLoading||isPending){
        return <p>Loading...</p>
    }
if(isError){
    return <p>Error in fetching..</p>

}
  return (
    <div>
        <p>{day}</p>
    <p>{JSON.stringify(subjects.subjects)}</p>
        
            { subjects.subjects.Periods.map((period:any, index:number) => (
                <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-white">
                    <p className='font-bold'>branch: {subjects.subjects.branchName}</p>
                    <p className='font-bold'>sem: {subjects.subjects.semesterNumber}</p>

                  <h2 className="text-xl font-semibold">{period.subject}</h2>
                  <p><span className="font-bold">Start Time:</span> {new Date(period.startTime).toLocaleTimeString()}</p>
                  <p><span className="font-bold">End Time:</span> {new Date(period.endTime).toLocaleTimeString()}</p>
                  <p><span className="font-bold">Subject Code:</span> {period.subjectCode}</p>
                  <p><span className="font-bold">Lab:</span> {period.isLab ? 'Yes' : 'No'}</p>
                </div>
              ))}
        
    </div>
  )
}

export default StaffSchedule