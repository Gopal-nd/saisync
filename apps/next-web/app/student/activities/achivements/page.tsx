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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Your Achievements</h1>
        <Link href="/student/activities/achivements/new">
          <Button size="sm">+ New</Button>
        </Link>
      </div>

      {achievements.length === 0 ? (
        <p className="text-center text-muted-foreground">No achievements found.</p>
      ) : (
        <div className=" gap-6">
          {achievements.map((achievement: any) => (
            <Card
              key={achievement.id}
              className="transition-shadow hover:shadow-md border border-muted"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold line-clamp-1">
                  {achievement.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {achievement.description || "No description provided."}
                </p>
              </CardContent>

              <CardFooter className="flex justify-end gap-3">
                <Button variant={"outline"}>

                <Link
                  href={`/student/activities/achivements/${achievement.id}`}
                  className="text-sm font-medium  hover:underline"
                  >
                  View
                </Link>
                  </Button>
                  <Button variant={"secondary"}>

                <Link
                  href={`/student/activities/achivements/${achievement.id}/edit`}
                  className="text-sm font-medium  hover:underline"
                  >
                  Edit
                </Link>
                  </Button>
            
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
