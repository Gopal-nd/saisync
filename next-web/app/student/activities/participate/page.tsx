"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteParticipate, useParticipates } from "@/hooks/useparticipate";
import Link from "next/link";

export default function ParticipatePage() {
  const { data: projects, isLoading, isError } = useParticipates();
  const mutate = useDeleteParticipate();

  const handleDelete = (id: string) => {
    mutate.mutate(id);
  };

  if (isLoading) return <p className="text-center text-muted-foreground">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Something went wrong!</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Your Participation</h1>
        <Link href="/student/activities/participate/new">
          <Button variant="default" className="">+ New</Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-center text-muted-foreground">No participations found.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((project: any) => (
            <Card key={project.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <div className="flex gap-3 justify-end">
                  <Link href={`/student/activities/participate/${project.id}/edit`}>
                    <Button variant="outline" className="">Edit</Button>
                  </Link>
                  <Link href={`/student/activities/participate/${project.id}`}>
                    <Button variant="outline" className="">View</Button>
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
