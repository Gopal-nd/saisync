import React from 'react';

export const ScheduleSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
    {/* Header skeleton */}
    <div className="flex justify-between items-center">
      <div className="w-48 h-8 bg-gray-600 animate-pulse rounded-md"></div>
      <div className="w-32 h-10 bg-gray-600 animate-pulse rounded-md"></div>
    </div>
    
    {/* Periods skeleton */}
    {[1, 2, 3].map((i) => (
      <div key={i} className="rounded-lg border p-4 space-y-4">
        <div className="flex justify-between">
          <div className="w-24 h-6 bg-gray-600 animate-pulse rounded"></div>
          <div className="w-32 h-6 bg-gray-600 animate-pulse rounded"></div>
        </div>
        <div className="h-20 bg-gray-600 animate-pulse rounded-md"></div>
        <div className="flex gap-4">
          <div className="w-20 h-6 bg-gray-600 animate-pulse rounded"></div>
          <div className="w-24 h-6 bg-gray-600 animate-pulse rounded"></div>
        </div>
      </div>
    ))}
  </div>
  );
};