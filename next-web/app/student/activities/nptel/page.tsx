
"use client";

import { Button } from "@/components/ui/button";
import { useDeleteExperience, useExperiences } from "@/hooks/useExperianceTrip";
import { useDeleteInternship, useInternships } from "@/hooks/useInternshps";
import { useDeleteNptel, useNptels } from "@/hooks/useNptel";
import { useProjects } from "@/hooks/useProjects";
import Link from "next/link";


export default function InternShipPage() {
  const { data: projects, isLoading, isError } = useNptels();
  console.log(projects)
  const mutate = useDeleteNptel()
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  const handleDelete = (id: string) => {
    mutate.mutate(id)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Nptel Courses</h1>
        <Link href="/student/activities/nptel/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          + New 
        </Link>
      </div>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project: any) => (
            <li key={project.id} className="border p-4 rounded shadow-sm">
              <h2 className="text-lg font-semibold">{project.title}</h2>
              <p className="text-gray-600">{project.description}</p>
              <div className="flex gap-4 mt-2">
                <Link
                  href={`/student/activities/exp-trip/${project.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <Link
                  href={`/student/activities/exp-trip/${project.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
                <Button
                  onClick={()=>handleDelete(project.id)}
                  className="text-red-600 hover:underline"
                >
                 delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
