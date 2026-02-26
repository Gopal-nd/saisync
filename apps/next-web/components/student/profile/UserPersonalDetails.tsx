'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { format } from 'date-fns';

export default function UserPersonalDetails({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['studentPersonalDetails', id],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/students/personal', {
        params: { id },
      });
      return res.data.data;
    },
  });

  if (isLoading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto shadow-lg border rounded-2xl mt-10 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-6 text-center">📋 Personal Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Date of Birth" value={format(new Date(data.dob), 'dd MMM yyyy')} />
        <Field label="Gender" value={data.gender || 'N/A'} />
        <Field label="Blood Group" value={data.bloodGroup || 'N/A'} />
        <Field label="Phone Number" value={data.phone || 'N/A'} />
        <Field label="Height" value={data.height || 'N/A'} />
        <Field label="Weight" value={data.weight || 'N/A'} />
        <Field label="Marital Status" value={data.maritalStatus || 'N/A'} />
        <Field label="Nationality" value={data.nationality || 'N/A'} />
        <Field label="Aadhar Number" value={data.aadharNumber || 'N/A'} />
        <Field label="PAN Number" value={data.panNumber || 'N/A'} />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">🏠 Permanent Address</h3>
        <AddressBlock
          address={data.permanentAddress}
          city={data.permanentCity}
          state={data.permanentState}
          pincode={data.permanentPincode}
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">🏡 Current Address</h3>
        <AddressBlock
          address={data.currentAddress}
          city={data.currentCity}
          state={data.currentState}
          pincode={data.currentPincode}
        />
      </div>

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>Created: {new Date(data.createdAt).toLocaleString()}</p>
        <p>Last updated: {new Date(data.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg shadow-sm">
    <p className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">{label}</p>
    <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">{value}</p>
  </div>
);

const AddressBlock = ({
  address,
  city,
  state,
  pincode,
}: {
  address: string;
  city: string;
  state: string;
  pincode: string;
}) => (
  <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg shadow-sm">
    <p className="text-sm text-zinc-900 dark:text-zinc-100">
      {address || 'N/A'}, {city || 'N/A'}, {state || 'N/A'} - {pincode || 'N/A'}
    </p>
  </div>
);
