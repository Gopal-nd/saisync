'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

export default function AcademicsDetails({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['academics', id],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/students/acadamic', { params: { id } });
      return res.data.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 shadow-xl border rounded-2xl bg-white dark:bg-zinc-900">
      <h2 className="text-2xl text-center font-semibold mb-6">🎓 Academic Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="10th Board" value={data.tenthBoard} />
        <Field label="10th School Name" value={data.tenthSchoolName} />
        <Field label="10th Marks" value={data.tenthMarks} />
        <Field label="10th Max Marks" value={data.tenthMaxMarks} />
        <Field label="10th Percentage" value={data.tenthPercentage} />

        <Field label="12th Board" value={data.twelfthBoard} />
        <Field label="12th School Name" value={data.twelfthSchoolName} />
        <Field label="12th Marks" value={data.twelfthMarks} />
        <Field label="12th Max Marks" value={data.twelfthMaxMarks} />
        <Field label="12th Percentage" value={data.twelfthPercentage} />

        <Field label="Entrance Exam Name" value={data.entranceExamName} />
        <Field label="Exam Score" value={data.entranceExamScore} />
        <Field label="Max Score" value={data.entranceExamMaxScore} />
        <Field label="Exam Rank" value={data.entranceExamRank} />
      </div>

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>Created: {new Date(data.createdAt).toLocaleString()}</p>
        <p>Last updated: {new Date(data.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}

const Field = ({ label, value }: { label: string; value: string | number | null }) => (
  <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg shadow-sm">
    <p className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">{label}</p>
    <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
      {value ?? 'N/A'}
    </p>
  </div>
);
