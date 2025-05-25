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
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your NPTEL Courses</h1>
        <Link href="/student/activities/nptel/new">
          <Button className="">+ New</Button>
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
                <div className="flex gap-3 justify-end">
                  <Button variant={'outline'}>

                  <Link
                    href={`/student/activities/nptel/${project.id}/edit`}
                    className="hover:underline text-sm"
                    >
                    Edit
                  </Link>
                    </Button>
                    <Button variant={'secondary'}>

                  <Link
                    href={`/student/activities/nptel/${project.id}`}
                    className=" hover:underline text-sm"
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
