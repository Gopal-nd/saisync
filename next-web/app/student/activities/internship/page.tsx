"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useInternships, useDeleteInternship } from "@/hooks/useInternshps";

export default function InternShipPage() {
  const { data: internships, isLoading, isError } = useInternships();
  const mutate = useDeleteInternship();

  const handleDelete = (id: string) => {
    mutate.mutate(id);
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Something went wrong!</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Internships</h1>
        <Link href="/student/activities/internship/new">
          <Button className="text-white">+ New</Button>
        </Link>
      </div>

      {internships.length === 0 ? (
        <p className="text-muted-foreground">No internships found.</p>
      ) : (
        <div className="space-y-4">
          {internships.map((internship: any) => (
            <Card key={internship.id}>
              <CardContent className="py-4">
                <h2 className="text-xl font-semibold">{internship.title}</h2>
                <p className="text-muted-foreground mt-1">{internship.description}</p>
                <div className="flex gap-4 mt-4">
                  <Link href={`/student/activities/internship/${internship.id}/edit`}>
                    <Button variant="outline" size="sm">Edit</Button>
                  </Link>
                  <Link href={`/student/activities/internship/${internship.id}`}>
                    <Button variant="secondary" size="sm">View</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(internship.id)}
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
