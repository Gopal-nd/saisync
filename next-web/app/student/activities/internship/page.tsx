"use client";

import { Button } from "@/components/ui/button";
import { useDeleteInternship, useInternships } from "@/hooks/useInternshps";
import Link from "next/link";

export default function InternShipPage() {
  const { data: internships, isLoading, isError } = useInternships();
  const mutate = useDeleteInternship();

  if (isLoading) return <p className="text-center py-6">Loading internships...</p>;
  if (isError) return <p className="text-center text-red-500 py-6">Something went wrong!</p>;

  const handleDelete = (id: string) => {
    mutate.mutate(id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Internships</h1>
        <Link href="/student/activities/internship/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ New</Button>
        </Link>
      </div>

      {internships.length === 0 ? (
        <p className="text-gray-500 text-center">No internships found.</p>
      ) : (
        <ul className="space-y-6">
          {internships.map((internship: any) => (
            <li
              key={internship.id}
              className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{internship.title}</h2>
                  <p className="text-gray-600 mt-1">{internship.description}</p>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <Link
                    href={`/student/activities/exp-trip/${internship.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/student/activities/exp-trip/${internship.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(internship.id)}
                    className="text-red-600 hover:text-red-700 px-0"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
