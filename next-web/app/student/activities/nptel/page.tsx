"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useDeleteNptel, useNptels } from "@/hooks/useNptel";

export default function InternShipPage() {
  const { data: projects, isLoading, isError } = useNptels();
  const mutate = useDeleteNptel();

  const handleDelete = (id: string) => {
    mutate.mutate(id);
  };

  if (isLoading) return <p className="text-center py-8 text-muted-foreground">Loading...</p>;
  if (isError) return <p className="text-center py-8 text-red-500">Something went wrong!</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your NPTEL Courses</h1>
        <Link href="/student/activities/nptel/new">
          <Button className="text-white">+ New</Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No NPTEL courses found.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project: any) => (
            <Card key={project.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">{project.description}</p>
                <div className="flex gap-4">
                  <Link
                    href={`/student/activities/nptel/${project.id}/edit`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/student/activities/nptel/${project.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </Link>
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:underline p-0 h-auto text-sm"
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
