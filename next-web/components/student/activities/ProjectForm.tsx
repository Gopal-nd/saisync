'use client';

import React, { useEffect, useState } from "react";
import {
  useCreateProject,
  useUpdateProject,
  useProject,
} from "@/hooks/useProjects";
import { useParams, redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ProjectForm({
  isEdit = false,
  isView = false,
}: {
  isEdit?: boolean;
  isView?: boolean;
}) {
  const { id } = useParams();
  const { data: existingProject } = useProject(id as string);
  const [form, setForm] = useState({
    title: "",
    description: "",
    projectType: "",
    startDate: "",
    endDate: "",
    repoUrl: "",
    liveUrl: "",
    memberIds: "",
    name: "",
  });

  const { mutate: createMutation, isSuccess: createSuccess, isPending: createPending } = useCreateProject();
  const { mutate: updateMutation, isSuccess: updateSuccess, isPending: updatePending } = useUpdateProject(id as string);

  useEffect(() => {
    if ((isEdit || isView) && existingProject) {
      setForm({
        title: existingProject.title || "",
        description: existingProject.description || "",
        projectType: existingProject.projectType || "",
        startDate: existingProject.startDate?.slice(0, 10) || "",
        endDate: existingProject.endDate?.slice(0, 10) || "",
        repoUrl: existingProject.repoUrl || "",
        liveUrl: existingProject.liveUrl || "",
        memberIds: existingProject.members?.map((m: any) => m.id).join(",") || "",
        name: existingProject.name || "",
      });
    }
  }, [existingProject, isEdit, isView]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    isEdit ? updateMutation(form) : createMutation(form);
  };

  if (createSuccess || updateSuccess) {
    if (isEdit) {
      toast.success("Project updated successfully");
    } else {
      toast.success("Project created successfully");
    }
    redirect("/student/activities/projects");
  }

  if (isView) {
    return (
      <Card className="max-w-xl mx-auto mt-6 shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div><span className="font-medium">Title:</span> {form.title || "N/A"}</div>
          <div>
            <span className="font-medium">Description:</span>
            <p className="whitespace-pre-wrap mt-1">{form.description || "N/A"}</p>
          </div>
          <div><span className="font-medium">Project Type:</span> {form.projectType || "N/A"}</div>
          <div><span className="font-medium">Start Date:</span> {form.startDate || "N/A"}</div>
          <div><span className="font-medium">End Date:</span> {form.endDate || "N/A"}</div>
          <div><span className="font-medium">Repository URL:</span> <a href={form.repoUrl} className="text-blue-600 underline">{form.repoUrl}</a></div>
          <div><span className="font-medium">Live URL:</span> <a href={form.liveUrl} className="text-blue-600 underline">{form.liveUrl}</a></div>
          <div><span className="font-medium">Team Members (IDs):</span> {form.memberIds || "N/A"}</div>
          <div><span className="font-medium">Project Name:</span> {form.name || "N/A"}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {isEdit ? "Edit" : "Create"} Project
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Portfolio Website"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your project..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectType">Project Type</Label>
            <Input
              id="projectType"
              name="projectType"
              value={form.projectType}
              onChange={handleChange}
              placeholder="e.g., Web, AI, Research"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="repoUrl">Repository URL</Label>
            <Input
              id="repoUrl"
              name="repoUrl"
              value={form.repoUrl}
              onChange={handleChange}
              placeholder="https://github.com/user/project"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live URL</Label>
            <Input
              id="liveUrl"
              name="liveUrl"
              value={form.liveUrl}
              onChange={handleChange}
              placeholder="https://project-demo.vercel.app"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="memberIds">Member IDs</Label>
            <Input
              id="memberIds"
              name="memberIds"
              value={form.memberIds}
              onChange={handleChange}
              placeholder="Comma-separated IDs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Display name for the project"
            />
          </div>

          <Button type="submit" className="w-full" disabled={createPending || updatePending}>
            {isEdit ? (updatePending ? "Updating..." : "Update") : (createPending ? "Creating..." : "Create")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
