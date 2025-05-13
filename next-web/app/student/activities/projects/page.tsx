"use client";

import Link from "next/link";
import { useDeleteProject, useProjects } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsPage() {
  const { data: projects, isLoading, isError } = useProjects();
  const mutate = useDeleteProject();

  const handleDelete = (id: string) => {
    mutate.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded" />
        ))}
      </div>
    );
  }

  if (isError) return <p className="text-center text-red-500">Something went wrong!</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Projects</h1>
        <Link href="/student/activities/projects/new">
          <Button className="px-5">+ New Project</Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects found.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((project: any) => (
            <Card key={project.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground text-sm">{project.description}</p>
                <div className="flex gap-4 text-sm">
                  <Link
                    href={`/student/activities/projects/${project.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/student/activities/projects/${project.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:underline px-0"
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
