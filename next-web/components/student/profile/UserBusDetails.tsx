'use client'

import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'

export default function UserBusDetails({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['bus', id],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/students/bus', { params: { id } })
      return res.data.data
    },
  })

  if (isLoading) return <h2 className="text-center mt-10">Loading...</h2>

  return (

    <div className="max-w-xl mx-auto mt-10 shadow-xl p-6 rounded-xl bg-white dark:bg-zinc-900">
      <h2 className="text-xl font-semibold text-center mb-6">🚌 Bus Details</h2>
      {
        data.isUsingBus ? (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Route" value={data.route} />
        <Field label="Bus Number" value={data.busNumber} />
        <Field label="Pickup Point" value={data.pickupPoint} />
        <Field label="Using Bus?" value={data.isUsingBus ? 'Yes' : 'No'} />
      </div>

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>Created: {new Date(data.createdAt).toLocaleString()}</p>
        <p>Last updated: {new Date(data.updatedAt).toLocaleString()}</p>
      </div>
        </>
        ) : (
        <p className='text-card-foreground w-full text-center text-sm'> Not Using Bus</p>
        )
      }
    </div>
  )
}

const Field = ({ label, value }: { label: string; value: string | number | null }) => (
  <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg shadow-sm">
    <p className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">{label}</p>
    <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
      {value ?? 'N/A'}
    </p>
  </div>
)
