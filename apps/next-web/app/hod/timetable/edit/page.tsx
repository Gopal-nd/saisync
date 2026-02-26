"use client";
export const dynamic = "force-dynamic";


import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import  dayjs from 'dayjs';

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

// Define Zod schema for form validation
type DayScheduleFormData = z.infer<typeof DayScheduleSchema>;

interface Period {
  id: string;
  periodNumber: number;
  startTime: Date;
  endTime: Date;
  subject: string;
  staff: string;
  subjectCode: string;
  isLab: boolean;
}
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePeriod />
    </Suspense>
  );
}

function UpdatePeriod() {
  const searchParams = useSearchParams();
  const semester = searchParams.get("sem");
  const branch = searchParams.get("branch");
  const day = searchParams.get("day");
  const id = searchParams.get("id");

  const { data: schedule, isLoading, error: queryError,refetch } = useQuery<Period>({
    queryKey: ["schedule", branch, semester, day],
    queryFn: async () => {
      console.log("Fetching schedule...");
      const { data } = await axiosInstance.get(`/api/schedule/one/${id}`);
      console.log("Fetched schedule:", data.data);
      return data.data ; 
    },
    enabled: !!branch && !!semester && !!day, // Fetch only if params exist
  });


  const firstSchedule = schedule // Get the first schedule entry if available

  const form = useForm<DayScheduleFormData>({
    resolver: zodResolver(DayScheduleSchema),
    // defaultValues: {
    //   periodNumber: firstSchedule?.periodNumber,
    //   startTime: firstSchedule?.startTime ? dayjs(firstSchedule.startTime).format('HH:mm') : '',
    //   endTime: firstSchedule?.endTime ? dayjs(firstSchedule.endTime).format('HH:mm') : '',
    //   subject: firstSchedule?.subject,
    //   staff: firstSchedule?.staff,
    //   subjectCode: firstSchedule?.subjectCode,
    //   isLab: firstSchedule?.isLab,
    // }
    
  });

  useEffect(() => {
    if (firstSchedule) {
      form.reset({
        periodNumber: firstSchedule.periodNumber,
        startTime: firstSchedule.startTime ? dayjs(firstSchedule.startTime).format('HH:mm') : '',
        endTime: firstSchedule.endTime ? dayjs(firstSchedule.endTime).format('HH:mm') : '',
        subject: firstSchedule.subject,
        staff: firstSchedule.staff,
        subjectCode: firstSchedule.subjectCode,
        isLab: firstSchedule.isLab,
      });
    }
  }, [firstSchedule, form]);

  const { data: staffData } = useQuery({
    queryKey: ["staff", branch, semester],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/staff", {
        params: { branch, semester },
      });
      return response.data.data;
    },
    enabled: !!branch && !!semester,
  });

  const { data: subjectData } = useQuery({
    queryKey: ["subjectData", branch, semester],
    queryFn: async () => {
      const response = await axiosInstance.get("/subjects", {
        params: { branch, semester },
      });
      return response.data.data;
    },
    enabled: !!branch && !!semester,
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post("/api/schedule/update", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data.message);
      toast.success(data.message);
      // form.reset();
      refetch()
    },
    onError: (err: any) => {
      if (axios.isAxiosError(err)) {
        const errorMsg = err.response?.data?.message || "Failed to update period";
        toast.error(errorMsg);
      }
      console.log(err);
    },
  });

  const onSubmit = async (values: DayScheduleFormData) => {
    const today = dayjs().format('YYYY-MM-DD');

  const payload = {
    ...values,
    periodNumber: Number(values.periodNumber),
    branchName: branch,
    semesterNumber: semester,
    date: day,
    id: firstSchedule?.id,
    startTime: dayjs(`${today} ${values.startTime}`).toISOString(),
    endTime: dayjs(`${today} ${values.endTime}`).toISOString(),
  };


    mutation.mutate(payload);
  };

  if (isLoading) return <div>Loading...</div>;
  if (queryError) return <div>Error fetching data...</div>;

  return (
    <div className="p-6 max-w-lg mx-auto rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        Schedule for {branch} - Semester {semester} - {day}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectData?.map((sub: any) => (
                      <SelectItem key={sub.id} value={sub.subjectName}>
                        {sub.subjectName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="staff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Staff</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Staff" />
                  </SelectTrigger>
                  <SelectContent>
                    {staffData?.map((staff: any) => (
                      <SelectItem key={staff.id} value={staff.name}>
                        {staff.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="isLab"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="w-4 h-4"
                  />
                </FormControl>
                <FormLabel>Is this a Lab Period?</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Update Period
          </Button>
        </form>
      </Form>
    </div>
  );
}
