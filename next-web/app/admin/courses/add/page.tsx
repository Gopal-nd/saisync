'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import axiosInstance from "@/lib/axiosInstance";
import { SubjectSchema } from "@/schema";
import { toast } from "sonner";

const branches = ["AIML", "ECE", "CSE", "EEE", "ISE", "MECH"] as const;
const semesters = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"] as const;



type FormData = z.infer<typeof SubjectSchema>;

export default function CourseAddPage() {
  const [branch, setBranch] = useState("AIML");
  const [semester, setSemester] = useState("S1");

  const form = useForm<FormData>({
    resolver: zodResolver(SubjectSchema),
    defaultValues: { branchName: 'AIML', semesterNumber: 'S1', isLab: false },
  });

  const { data: staffList } = useQuery({
    queryKey: ["staff"],
    queryFn: async () =>{
    const response = await axiosInstance.get("/api/staff")
    return response.data.data
    },
    
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
     const res = await axiosInstance.post("/api/subjects/create", data,)
      return res.data
    },
    onSuccess:(data:any)=>{
        console.log(data)
        toast.success(data.message)
    },
    onError:(data:any)=>{
        toast.warning(data?.data?.message)
    }
  });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add Subject</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="branchName" render={({ field }) => (
            <FormItem>
              <FormLabel>Branch</FormLabel>
              <Select onValueChange={(val) => { field.onChange(val); setBranch(val); }} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="semesterNumber" render={({ field }) => (
            <FormItem>
              <FormLabel>Semester</FormLabel>
              <Select onValueChange={(val) => { field.onChange(val); setSemester(val); }} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="subjectName" render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter subject name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="subjectCode" render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Code</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter subject code" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="noOfCredits" render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Credits</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="staffName" render={({ field }) => (
            <FormItem>
              <FormLabel>Staff Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Staff" />
                </SelectTrigger>
                <SelectContent>
                  {staffList?.map((staff: any) => (
                    <SelectItem key={staff.id} value={staff.name}>{staff.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="isLab" render={({ field }) => (
            <FormItem>
              <FormLabel>Is Lab?</FormLabel>
              <FormControl>
                <input type="checkbox" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Submitting..." : "Add Subject"}
          </Button>
        </form>
      </Form>
    </div>
  );
}