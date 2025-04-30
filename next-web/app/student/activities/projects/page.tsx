// app/(dashboard)/projects/page.tsx
"use client";

import { useProjects } from "@/hooks/useProjects";
import Link from "next/link";

export default function ProjectsPage() {
  const { data: projects, isLoading, isError } = useProjects();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <Link href="/student/activities/projects/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          + New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project: any) => (
            <li key={project.id} className="border p-4 rounded shadow-sm">
              <p>{JSON.stringify(project)}</p>
              <h2 className="text-lg font-semibold">{project.title}</h2>
              <p className="text-gray-600">{project.description}</p>
              <div className="flex gap-4 mt-2">
                <Link
                  href={`/student/activities/projects/edit/${project.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
