'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

export default function FamilyDetails({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['family', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/students/family`, { params: { id } });
      return res.data.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 shadow-xl border rounded-2xl bg-white dark:bg-zinc-900">
      <h2 className="text-2xl text-center font-semibold mb-6">👨‍👩‍👧 Family Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Father's Name" value={data.fatherName} />
        <Field label="Father's Phone" value={data.fatherPhone} />
        <Field label="Father's Occupation" value={data.fatherOccupation} />
        <Field label="Father's Income" value={data.fatherIncome} />

        <Field label="Mother's Name" value={data.motherName} />
        <Field label="Mother's Phone" value={data.motherPhone} />
        <Field label="Mother's Occupation" value={data.motherOccupation} />
        <Field label="Mother's Income" value={data.motherIncome} />

        <Field label="Guardian's Name" value={data.gardianName} />
        <Field label="Guardian's Phone" value={data.guardianPhone} />
        <Field label="Sibling Name" value={data.seblingName} />
      </div>

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>Created: {new Date(data.createdAt).toLocaleString()}</p>
        <p>Last updated: {new Date(data.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}

const Field = ({ label, value }: { label: string; value: string | null }) => (
  <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg shadow-sm">
    <p className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">{label}</p>
    <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
      {value || 'N/A'}
    </p>
  </div>
);
