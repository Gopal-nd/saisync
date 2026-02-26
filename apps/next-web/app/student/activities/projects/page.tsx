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
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError)
    return (
      <p className="text-center text-red-500 mt-10 text-sm">
        Something went wrong!
      </p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>
        <Link href="/student/activities/projects/new">
          <Button className="px-5">+ New </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center">
          No projects found.
        </p>
      ) : (
        <div className="grid gap-6">
          {projects.map((project: any) => (
            <Card key={project.id} className="border border-muted rounded-2xl shadow-sm">
              <CardHeader className="pb-1">
                <CardTitle className="text-xl font-semibold text-primary">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex gap-3 justify-end ">
                  <Button variant={"outline"}>

                  <Link
                    href={`/student/activities/projects/${project.id}/edit`}
                    className=" hover:underline"
                    >
                    Edit
                  </Link>
                    </Button>
                    <Button variant={'secondary'}>

                  <Link
                    href={`/student/activities/projects/${project.id}`}
                    className=" hover:underline"
                    >
                    View
                  </Link>
                    </Button>
                  <Button
                  variant={"destructive"}
                    onClick={() => handleDelete(project.id)}
                    className=" hover:underline"
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
