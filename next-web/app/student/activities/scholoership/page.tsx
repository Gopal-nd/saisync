'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useScholoerships, useDeleteScholoership } from "@/hooks/useScholoership";
import Link from "next/link";

export default function Scholerships() {
  const { data: projects, isLoading, isError,isSuccess } = useScholoerships();
  const mutate = useDeleteScholoership();

  const handleDelete = (id: string) => {
    mutate.mutate(id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold tracking-tight">Your Scholarships</h1>
        <Link href="/student/activities/scholoership/new">
          <Button className="px-4 py-2 text-sm">+ New</Button>
        </Link>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-md" />
          ))}
        </div>
      )}

      {isError && <p className="text-red-600">Something went wrong!</p>}

      {!isLoading && projects?.length === 0 && (
        <p className="text-muted-foreground">No scholarships found.</p>
      )}

      <div className="grid gap-4">
        {projects?.map((project: any) => (
          <Card key={project.id} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-3">{project.description}</p>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <Link
                  href={`/student/activities/scholoership/${project.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <Link
                  href={`/student/activities/scholoership/${project.id}`}
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
    </div>
  );
}
