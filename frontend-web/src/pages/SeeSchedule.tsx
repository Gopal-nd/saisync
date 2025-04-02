import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import  dayjs from 'dayjs';
interface Period {
  id: string;
  periodNumber: number;
  startTime: string;
  endTime: string;
  subject: string;
  staff: string;
  subjectCode: string;
  isLab: boolean;
}

function SeeDaySchedule({ branch, semester, day } :{branch:string,semester:string,day:string}) {
  
  const [error, setError] = useState<string | null>(null);
  const [editPeriod, setEditPeriod] = useState<Period | null>(null);
  const queryClient = useQueryClient();

  // ✅ Fetch Schedule
  const { data: schedule, isLoading, error: queryError } = useQuery<Period[]>({
    queryKey: ['schedule', branch, semester, day],
    queryFn: async () => {
      console.log('Fetching schedule...');
      const { data } = await axios.get(`http://localhost:3000/api/schedule`, { params: { branch, semester, date:day } });
      console.log('Fetched schedule:', data);
      return data.Periods;
    },
  });

  useEffect(() => {
    if (queryError) {
      setError((queryError as any)?.response?.data?.error || 'Failed to fetch schedule');
      console.error('Error fetching schedule:', queryError);
    }
  }, [queryError]);

  // ✅ Edit Mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedPeriod: Period) => {
      console.log('Updating period:', updatedPeriod);
      await axios.post(`http://localhost:3000/api/schedule/update`, updatedPeriod);
    },
    onSuccess: () => {
      alert('Period updated successfully');
      queryClient.invalidateQueries(['schedule', branch, semester, day]);
      setEditPeriod(null)
    },
    onError: (error) => {
      console.error('Update Error:', error);
      alert('Failed to update period');
    },
  });

  // ✅ Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting period with ID:', id);
      await axios.delete(`http://localhost:3000/api/schedule/delete/${id}`);
    },
    onSuccess: () => {
      alert('Period deleted successfully');
      queryClient.invalidateQueries(['schedule', branch, semester, day]);
    },
    onError: (error) => {
      console.error('Delete Error:', error);
      alert('Failed to delete period');
    },
  });

  const handleEdit = (period: Period) => {
    console.log('Editing period:', period);
    setEditPeriod(period);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this period?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleUpdate = () => {
    if (editPeriod) {
      updateMutation.mutate(editPeriod);
    }
  };

  if (isLoading) return <p>Loading schedule...</p>;
  if (error) return <p className="text-red-500">{error}</p>;


  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Schedule for {branch} - Semester {semester} - {day}</h1>
      
      {/* Edit Form */}
      {editPeriod && (
        <div className="mb-4 p-4 border rounded bg-gray-100">
          <h3 className="font-bold mb-2">Edit Period</h3>
          
          <label>
            Subject:
            <input
              type="text"
              value={editPeriod.subject}
              onChange={(e) => setEditPeriod({ ...editPeriod, subject: e.target.value })}
              className="border p-2 w-full mb-2"
            />
          </label>

          <label>
            Staff:
            <input
              type="text"
              value={editPeriod.staff}
              onChange={(e) => setEditPeriod({ ...editPeriod, staff: e.target.value })}
              className="border p-2 w-full mb-2"
            />
          </label>

          <label>
            Start Time:
            <input
              type="time"
              value={dayjs(editPeriod.startTime).format('HH:mm')}
              onChange={(e) => {
                const newTime = dayjs(editPeriod.endTime)
                .set('hour', parseInt(e.target.value.split(':')[0]))
                .set('minute', parseInt(e.target.value.split(':')[1]))
                setEditPeriod({ ...editPeriod, startTime: newTime.toString() });
              }}
              className="border p-2 w-full mb-2"
            />
          </label>

          <label>
            End Time:
            <input
              type="time"
              value={dayjs(editPeriod.endTime).format('HH:mm')}
              onChange={(e) => {
                const newTime = dayjs(editPeriod.endTime)
                .set('hour', parseInt(e.target.value.split(':')[0]))
                .set('minute', parseInt(e.target.value.split(':')[1]))
                console.log('New End Time:', newTime);
                setEditPeriod({ ...editPeriod, endTime: newTime.toString() });
              }}
              className="border p-2 w-full mb-2"
            />
          </label>

          <button className="p-2 bg-green-500 text-white mr-2" onClick={handleUpdate}>Update</button>
          <button className="p-2 bg-gray-500 text-white" onClick={() => setEditPeriod(null)}>Cancel</button>
        </div>
      )}

      {/* Schedule Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Period</th>
            <th className="border border-gray-300 p-2">Start Time</th>
            <th className="border border-gray-300 p-2">End Time</th>
            <th className="border border-gray-300 p-2">Subject</th>
            <th className="border border-gray-300 p-2">Staff</th>
            <th className="border border-gray-300 p-2">Subject Code</th>
            <th className="border border-gray-300 p-2">Lab</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedule?.map((period) => (
            <tr key={period.id}>
              <td className="border border-gray-300 p-2">{period.periodNumber}</td>
              <td className="border border-gray-300 p-2">{new Date(period.startTime).toLocaleTimeString()}</td>
              <td className="border border-gray-300 p-2">{new Date(period.endTime).toLocaleTimeString()}</td>
              <td className="border border-gray-300 p-2">{period.subject}</td>
              <td className="border border-gray-300 p-2">{period.staff}</td>
              <td className="border border-gray-300 p-2">{period.subjectCode}</td>
              <td className="border border-gray-300 p-2">{period.isLab ? 'Yes' : 'No'}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => handleEdit(period)} className="mr-2 p-2 bg-blue-500 text-white">Edit</button>
                <button onClick={() => handleDelete(period.id)} className="p-2 bg-red-500 text-white">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SeeDaySchedule;
