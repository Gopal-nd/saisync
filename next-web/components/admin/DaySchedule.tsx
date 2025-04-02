import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import axios from 'axios';
import axiosInstance from '@/lib/axiosInstance';

function DaySchedule({ branch, semester, day }:{branch:string, semester:string,day:string} ) {
  

  const [formData, setFormData] = useState({
    periodNumber: '',
    startTime: '',
    endTime: '',
    subject: '',
    staff: '',
    subjectCode: '',
    isLab: false,
  });

  const { data: staffData } = useQuery({
    queryKey: ['staff', branch, semester],
    queryFn: async () => {
      const response = await axiosInstance.get('/staff', { params: { branch, semester } });
      return response.data;
    },
  });

  const { data: subjectData } = useQuery({
    queryKey: ['subjectName', branch, semester],
    queryFn: async () => {
      const response = await axiosInstance.get('/subjects', { params: { branch, semester } });
      return response.data;
    },
  });

  console.log(subjectData)

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const payload = {
      ...formData,
      periodNumber: Number(formData.periodNumber),
      branchName: branch,
      semesterNumber: semester,
      date: day,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/schedule/create', payload);
      setSuccess('Period added successfully!');
    } catch (err) {
      if(axios.isAxiosError(err)) {
      setError(err.response?.data?.error || 'Failed to add period');
    }}
  };

  return (
    <div className="p-6 max-w-lg mx-auto rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Schedule for {branch} - Semester {semester} - {day}</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Period Number:
          <input type="number" name="periodNumber" value={formData.periodNumber} onChange={handleChange} required className="w-full p-2 border rounded" />
        </label>
        <label className="block">
          Start Time:
          <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required className="w-full p-2 border rounded" />
        </label>
        <label className="block">
          End Time:
          <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required className="w-full p-2 border rounded" />
        </label>
        <label className="block">
          Subject:
          <select name="subject" onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Select Subject</option>
            {subjectData?.map((sub: any) => (
              <option key={sub.id} value={sub.subjectName}>{sub.subjectName}</option>
            ))}
          </select>
        </label>
        <label className="block">
          Staff:
          <select name="staff" onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Select Staff</option>
            {staffData?.map((staff: any) => (
              <option key={staff.id} value={staff.name}>{staff.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          Subject Code:
          <select name="subjectCode" onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Select Subject Code</option>
            {subjectData?.map((sub: any) => (
              <option key={sub.id} value={sub.subjectCode}>{sub.subjectCode}</option>
            ))}
          </select>
        </label>
        <label className="block flex items-center">
          <input type="checkbox" name="isLab" checked={formData.isLab} onChange={handleChange} />
          <span className="ml-2">Is this a Lab Period?</span>
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Period</button>
      </form>
    </div>
  );
}

export default DaySchedule;
