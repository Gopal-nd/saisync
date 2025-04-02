"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

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

// Define Zod schema for form validation
const DayScheduleSchema = z.object({
  periodNumber: z.coerce.number({ invalid_type_error: "Period number is required" }),
  startTime: z.string().nonempty("Start time is required"),
  endTime: z.string().nonempty("End time is required"),
  subject: z.string().nonempty("Subject is required"),
  staff: z.string().nonempty("Staff is required"),
  subjectCode: z.string().nonempty("Subject code is required"),
  isLab: z.boolean().default(false),
});

type DayScheduleFormData = z.infer<typeof DayScheduleSchema>;

export default function DaySchedule() {
  const searchParams = useSearchParams();
  const semester = searchParams.get("sem") 
  const branch = searchParams.get("branch") 
  const day = searchParams.get("day") 

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
      const response = await axiosInstance.get("/api/staff", {
        params: { branch, semester },
      });
      return response.data.data;
    },
  });


  const { data: subjectData } = useQuery({
    queryKey: ["subjectData", branch, semester],
    queryFn: async () => {
      const response = await axiosInstance.get("/subjects", {
        params: { branch, semester },
      });
      return response.data.data;
    },
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: DayScheduleFormData) => {
    setError(null);

    const payload = {
      ...values,
      periodNumber: Number(values.periodNumber),
      branchName: branch,
      semesterNumber: semester,
      date: day,
    };

    try {
      await axiosInstance.post("/api/schedule/create", payload);
      toast.success("Period added successfully!");
      form.reset();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMsg = err.response?.data?.error || "Failed to add period";
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        setError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        Schedule for {branch} - Semester {semester} - {day}
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
                  <Input type="time" placeholder="Start Time" {...field} />
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
                  <Input type="time" placeholder="End Time" {...field} />
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
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                </FormControl>
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
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subjectCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject Code</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Subject Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectData?.map((sub: any) => (
                        <SelectItem key={sub.id} value={sub.subjectCode}>
                          {sub.subjectCode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
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
            Add Period
          </Button>
        </form>
      </Form>
    </div>
  );
}
