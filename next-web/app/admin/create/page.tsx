"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schema";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axiosInstance";

const branches = ["AIML", "ECE", "CSE", "EEE", "ISE", "MECH"] as const;
const semesters = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"] as const;
const sections = ["A", "B", "C", "D", "E", "F", "G"] as const;
const schemas = ["Y_2022", "Y_2021", "Y_2018", "Y_2024"] as const;
const roles = ["STUDENT", "ADMIN", "STAFF", "HOD", "SUPPORT_STAFF"];

export default function RegisterPage() {
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      password: "123123",
      name: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post("/api/auth/sign-up", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Registration successful");
    },
    onError: (error: any) => {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message);
      } else {
        toast.error("something went wrong ,Registration Failed");
      }
    },
  });

  const upload = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post("/api/auth/bulk-sign-up", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Users created successfully");
    },
    onError: (error: any) => {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message);
      } else {
        toast.error("something went wrong ,Users creation Failed");
      }
    },
  });


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCsvFile(file || null);
  };

  const handleUpload = () => {
    if (!csvFile) {
      toast.error("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", csvFile);
    console.log(formData);
    upload.mutate(formData);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold">Register New Users</h1>
      <div className="max-w-xl mx-auto mt-10 p-6 border  rounded-lg">
        <Tabs defaultValue="account">
          <TabsList className="flex items-center justify-between w-full mb-4">
            <TabsTrigger value="add">Add New User</TabsTrigger>
            <TabsTrigger value="upload">Upload CSV</TabsTrigger>
          </TabsList >
          <TabsContent value="add">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="sce22am039@sairamtap.edu.in"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter the User Email.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="name" type="name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Role</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            {field.value || "Select Role"}
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Create User
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="upload">
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center w-full">
                <label
                  htmlFor="csv-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    {csvFile ? (
                       <p className="mb-2 text-sm ">
                        <span className="font-semibold">File selected:</span> {csvFile.name}
                      </p>
                    ) : (
                      <p className="mb-2 text-sm ">
                        <span className="font-semibold">Click to upload </span> or drag and drop
                      </p>
                    )}
                    <p className="text-xs ">CSV file only</p>
                  </div>
                  <input
                    id="csv-upload"
                    type="file"
                    className="hidden"
                    accept=".csv"
                    onChange={handleFileChange}
                  />
                </label>
                <Button
                  type="button"
                  className="w-full mt-5"
                  onClick={handleUpload}
                  disabled={!csvFile}
                >
                  Upload
                </Button>
              </div>
              <div className="text-sm ">
                <p>CSV file should contain the following columns:</p>
                <ul className="list-disc list-inside mt-2">
                  <li>email</li>
                  <li>name</li>
                  <li>role</li>
                  <li>password (optional, will use default if not provided)</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
