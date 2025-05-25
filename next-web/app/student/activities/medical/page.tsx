"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteMedical, useMedicals } from "@/hooks/useMedical";

export default function InternShipPage() {
  const { data: projects, isLoading, isError } = useMedicals();
  const mutate = useDeleteMedical();

  const handleDelete = (id: string) => {
    mutate.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center text-gray-600">
        Loading medical records...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center text-red-600">
        Something went wrong while fetching your data.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Medicals</h1>
        <Link href="/student/activities/medical/new">
          <Button className="">
            + New
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500">No medical entries found.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project: any) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="flex justify-end gap-3">
                  <Link href={`/student/activities/medical/${project.id}/edit`}>
                    <Button variant="outline" size="sm">Edit</Button>
                  </Link>
                  <Link href={`/student/activities/medical/${project.id}`}>
                    <Button variant="secondary" size="sm">View</Button>
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
