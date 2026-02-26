'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useCertificates, useDeleteCertificate } from "@/hooks/useCertificates";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function Achivements() {
  const { data: Certificates, isLoading, isError } = useCertificates();
  const deleteMutation = useDeleteCertificate();

  const handleDelete = (id: string) => {
      deleteMutation.mutate(id);
      toast.success('Certificate deleted successfully');
  };

 if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError)
    return (
      <p className="text-center text-red-500 mt-10 text-sm">
        Something went wrong!
      </p>
    );
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Your Certificates</h1>
        <Link href="/student/activities/new">
          <Button>+ New</Button>
        </Link>
      </div>

      {Certificates.length === 0 ? (
        <p className="text-center text-muted-foreground">No Certificates found.</p>
      ) : (
        <div className="gap-6">
          {Certificates.map((achievement: any) => (
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
                <Button variant={'outline'}>

                <Link
                  href={`/student/activities/${achievement.id}`}
                  className="text-sm font-medium  hover:underline"
                  >
                  View
                </Link>
                    </Button>
                <Button variant={'secondary'}>

                <Link
                  href={`/student/activities/${achievement.id}/edit`}
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
