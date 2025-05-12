"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteExperience, useExperiences } from "@/hooks/useExperianceTrip";
import Link from "next/link";

export default function ProjectsPage() {
  const { data: projects, isLoading, isError } = useExperiences();
  const mutate = useDeleteExperience();

  const handleDelete = (id: string) => {
    mutate.mutate(id);
  };

  if (isLoading) return <p className="text-center text-muted-foreground">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Something went wrong!</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Experience Trips</h1>
        <Link href="/student/activities/exp-trip/new">
          <Button variant="default">+ New Project</Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects found.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project: any) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex gap-4">
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
                    variant="destructive"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
