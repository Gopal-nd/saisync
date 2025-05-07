'use client';

import { Button } from "@/components/ui/button";
import { useAchivements, useDeleteAchivement } from "@/hooks/useAchivements";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Achivements() {
  const { data: projects, isLoading, isError } = useAchivements();
  const mutate = useDeleteAchivement();

  const handleDelete = (id: string) => {
    mutate.mutate(id);
  };

  if (isLoading) return <p className="text-center mt-10 text-muted-foreground">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Something went wrong!</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Achievements</h1>
        <Link href="/student/activities/achivements/new">
          <Button>+ New</Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground text-center">No achievements found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project: any) => (
            <Card key={project.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <h2 className="text-xl font-semibold">{project.title}</h2>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{project.description}</p>
                <div className="flex gap-4">
                  <Link
                    href={`/student/activities/achivements/${project.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/student/activities/achivements/${project.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
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
          ))}
        </div>
      )}
    </div>
  );
}
