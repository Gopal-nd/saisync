import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
const SemAcadamics = () => {
  const { branch, semester,schema } = useParams<{ branch: string; semester: string;schema:string }>();
  const [formData, setFormData] = useState({
    noOfCredits: '',
    subjectName: '',
    staffName: '',
    subjectCode: '',
    isLab: false,
  });
  const day =1
const {data} = useQuery({
  queryKey: ['staff'],
  queryFn: async () => {
    const response = await axios.get('http://localhost:3000/staff');
    return response.data;
  },
});

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const payload = {
      ...formData,
    
      noOfCredits: Number(formData.noOfCredits),
      branchName: branch,
      semesterNumber: semester,
    };

    try {
      const response = await axios('http://localhost:3000/api/subjects/create', {data:payload ,method:'POST',headers:{'Content-Type':'application/json'}});
        console.log(response.data);
        if(response.status === 201) {
          setSuccess(' Subject created successfully');
          
        }
      setFormData({
        noOfCredits: '',
        subjectName: '',
        staffName: '',
        subjectCode: '',
        isLab: false,
      });
     
    } catch (err) {
      if(axios.isAxiosError(err)) {
      console.error(err.response?.data + " something went wrong  "|| err);
      setError((err as Error).name||'Failed to create subjects');
    }
  };
}

  return (
    <div>
      <p>{branch} {semester} {schema}</p>

      <div>


        
     
            <div className="p-6 max-w-lg mx-auto  rounded-lg shadow-md">
              <h1 className="text-2xl font-bold mb-4">Add subjects name ,code and staff for  {branch} - Semester {semester} -Schema {schema}</h1>
              
              {error && <div className="text-red-500 mb-4">{error}</div>}
              {success && <div className="text-green-500 mb-4">{success}</div>}
        
              <form onSubmit={handleSubmit} className="space-y-4">
        
                {/* //list of all subject name of the branch and semester */}
                <label className="block">
                  Subject Name:
                  <input type="text" name="subjectName" value={formData.subjectName} onChange={handleChange} required className="w-full p-2 border rounded" />
                </label>
        
                {/* // list of all staff */}
                <label className="block">
                  Staff  name:
                  <select name="staffName" required className='w-full p-2 border rounded' id="">
                    <option value="">Select Staff</option>
                    {data?.map((staff:any) => (
                      <option key={staff.id} value={staff.name}>{staff.name}</option>
                    ))}
                  </select>
                    </label>
         
        
                {/* //list of all subject code of the branch and semester */}
                <label className="block">
                  Subject Code:
                  <input type="text" name="subjectCode"  value={formData.subjectCode} onChange={handleChange} required className="w-full p-2 border rounded uppercase" />
                </label>

                <label className="block">
                  No Credits:
                  <input type="number" name="noOfCredits" value={formData.noOfCredits} onChange={handleChange} required className="w-full p-2 border rounded" />
                </label>
        
                <label className="block flex items-center">
                  <input type="checkbox" name="isLab" checked={formData.isLab} onChange={handleChange} />
                  <span className="ml-2">Is Lab?</span>
                </label>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Period</button>
              </form>
            </div>

        
      </div>
    </div>
  )
}

export default SemAcadamics 