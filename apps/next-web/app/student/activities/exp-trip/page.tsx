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
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Experience Trips</h1>
        <Link href="/student/activities/exp-trip/new">
          <Button variant="default">+ New</Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects found.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project: any) => (

            <Card key={project.id} className="mt-2">
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex gap-3 justify-end">
                  <Button variant={'outline'}>

                  <Link
                    href={`/student/activities/exp-trip/${project.id}/edit`}
                    className=" hover:underline"
                    >
                    Edit
                  </Link>
                    </Button>
                    <Button variant={'secondary'}>

                  <Link
                    href={`/student/activities/exp-trip/${project.id}`}
                    className=" hover:underline"
                    >
                    View
                  </Link>
                    </Button>
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
