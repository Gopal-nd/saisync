'use client';

import { Button } from "@/components/ui/button";
import { useDeleteEcosystem, useEcosystems } from "@/hooks/useEcoSystem";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsPage() {
  const { data: projects, isLoading, isError } = useEcosystems();
  const deleteMutation = useDeleteEcosystem();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Ecosystems</h1>
        <Link href="/student/activities/ecosystem/new">
          <Button variant="default">+ New</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-lg" />
          ))}
        </div>
      ) : isError ? (
        <p className="text-red-500 text-center mt-10">Something went wrong!</p>
      ) : projects.length === 0 ? (
        <p className="text-muted-foreground text-center">No projects found.</p>
      ) : (
        <div className="sapce-y-4">
          {projects.map((project: any) => (
            <div className=" space-y-4 mt-4">

            <Card key={project.id} className="transition-shadow hover:shadow-md ">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description || "No description provided."}
                </p>
                <div className="flex gap-3 flex-end">
                  <Button variant={"outline"}>

                  <Link
                    href={`/student/activities/ecosystem/${project.id}`}
                    className=" hover:underline"
                    >
                    View
                  </Link>
                    </Button>
                    <Button variant={"secondary"}>

                  <Link
                    href={`/student/activities/ecosystem/${project.id}/edit`}
                    className=" hover:underline"
                    >
                    Edit
                  </Link>
                    </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                    >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
                    </div>
          ))}
        </div>
      )}
    </div>
  );
}
