'use client';

import { Button } from "@/components/ui/button";
import { useAchivements, useDeleteAchivement } from "@/hooks/useAchivements";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function Achivements() {
  const { data: achievements, isLoading, isError } = useAchivements();
  const deleteMutation = useDeleteAchivement();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading)
    return <p className="text-center mt-10 text-sm text-muted-foreground">Loading achievements...</p>;

  if (isError)
    return <p className="text-center mt-10 text-sm text-red-500">Something went wrong!</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Achievements</h1>
        <Link href="/student/activities/achivements/new">
          <Button variant="default">+ New</Button>
        </Link>
      </div>

      {achievements.length === 0 ? (
        <p className="text-center text-muted-foreground">No achievements found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement: any) => (
            <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{achievement.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </CardContent>

              <CardFooter className="flex justify-end gap-3">
                <Link
                  href={`/student/activities/achivements/${achievement.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  View
                </Link>
                <Link
                  href={`/student/activities/achivements/${achievement.id}/edit`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(achievement.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
