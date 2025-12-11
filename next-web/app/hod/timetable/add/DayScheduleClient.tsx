// /app/admin/timetable/add/DayScheduleClient.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { Suspense } from "react"; // not required but ok if unused

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DayScheduleSchema } from "@/schema";
import { z } from "zod";

type DayScheduleFormData = z.infer<typeof DayScheduleSchema>;

export default function DayScheduleClient() {
  const searchParams = useSearchParams();
  const semester = searchParams.get("sem");
  const branch = searchParams.get("branch");
  const day = searchParams.get("day");
  const section = searchParams.get("section");

  const form = useForm<DayScheduleFormData>({
    resolver: zodResolver(DayScheduleSchema),
    defaultValues: {
      periodNumber: undefined,
      startTime: "",
      endTime: "",
      subject: "",
      staff: "",
      subjectCode: "",
      isLab: false,
    },
  });

  const { data: staffData } = useQuery({
    queryKey: ["staff", branch, semester],
    queryFn: async () => {
      const response = await axiosInstance.get("/staff");
      return response.data.data;
    },
  });

  const { data: subjectData } = useQuery({
    queryKey: ["subjectData", branch, semester],
    queryFn: async () => {
      const response = await axiosInstance.get("/subjects");
      return response.data.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post("/api/schedule/create", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      form.resetField("periodNumber", {
        defaultValue: Number(form.getValues("periodNumber") || 0) + 1,
      });
    },
    onError: (err: any) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Failed to add period");
      } else {
        toast.error("An error occurred");
      }
    },
  });

  const onSubmit = async (values: DayScheduleFormData) => {
    const payload = {
      ...values,
      periodNumber: Number(values.periodNumber),
      branchName: branch,
      semesterNumber: semester,
      date: day,
      section: section,
    };

    mutation.mutate(payload);
  };

  return (
    <div className="p-6 max-w-lg mx-auto rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        Schedule for <span className="text-blue-500">{branch}</span> - Semester{" "}
        <span className="text-blue-500">{semester}</span> Section -{" "}
        <span className="text-blue-500">{section}</span> On -{" "}
        <span className="text-blue-500">{day}</span>
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* --- your FormField components --- */}
          <FormField
            control={form.control}
            name="periodNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Period Number</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Period Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* ... rest of fields, button ... */}
          <Button className="w-full" type="submit">
            Add Period
          </Button>
        </form>
      </Form>
    </div>
  );
}

