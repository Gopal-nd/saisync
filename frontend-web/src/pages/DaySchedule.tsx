import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function DaySchedule() {
  const { branch, semester, day } = useParams<{ branch: string; semester: string; day: string }>();

  const [formData, setFormData] = useState({
    periodNumber: '',
    startTime: '',
    endTime: '',
    subject: '',
    staff: '',
    subjectCode: '',
    isLab: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
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
      periodNumber: Number(formData.periodNumber),
      branchName: branch,
      semesterNumber: semester,
      date: day,
    };

    try {
      const response = await fetch('http://localhost:3000/api/schedule/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        console.log(result);
        setError(result.error.name + ' change the period number' || 'Failed to add period');
        // throw new Error(result.error || 'Failed to add period');
        return
        
      } 

      setSuccess('Period added successfully!');
    } catch (err) {
      console.error(err);
      setError((err as Error).name||'Failed to add period');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto  rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Schedule for {branch} - Semester {semester} - {day}</h1>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Period Number:
          <input type="number" name="periodNumber" value={formData.periodNumber} onChange={handleChange} required className="w-full p-2 border rounded" />
        </label>

        <label className="block">
          Start Time (e.g., 10:00 AM):
          <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required className="w-full p-2 border rounded" />
        </label>

        <label className="block">
          End Time (e.g., 11:30 AM):
          <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required className="w-full p-2 border rounded" />
        </label>

        <label className="block">
          Subject:
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full p-2 border rounded" />
        </label>

        <label className="block">
          Staff:
          <input type="text" name="staff" value={formData.staff} onChange={handleChange} required className="w-full p-2 border rounded" />
        </label>

        <label className="block">
          Subject Code:
          <input type="text" name="subjectCode" value={formData.subjectCode} onChange={handleChange} required className="w-full p-2 border rounded" />
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
