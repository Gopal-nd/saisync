'use client';

import React, { useEffect, useState } from "react";
import { useCreatEcosystem, useEcosystem, useUpdateEcosystem } from "@/hooks/useEcoSystem";
import { useParams, redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EcoSystemForm({
  isEdit = false,
  isView = false,
}: {
  isEdit?: boolean;
  isView?: boolean;
}) {
  const { id } = useParams();
  const { data: existingProject } = useEcosystem(id as string);

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

  const createMutation = useCreatEcosystem();
  const updateMutation = useUpdateEcosystem(id as string);

  // Sync existing data to form on load for edit/view
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

  // Handle toast and redirect after success
  useEffect(() => {
    if (createMutation.isSuccess) {
      toast.success("Ecosystem created successfully");
      redirect("/student/activities/ecosystem"); // Change to your ecosystem list route
    }
    if (updateMutation.isSuccess) {
      toast.success("Ecosystem updated successfully");
      redirect("/student/activities/ecosystem"); // Change to your ecosystem list route
    }
  }, [createMutation.isSuccess, updateMutation.isSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      memberIds: form.memberIds
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id !== ""),
    };

    if (isEdit) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  // Helper to render form fields, handles view mode rendering
  const renderField = (
    label: string,
    value: string,
    name: string,
    isTextarea = false
  ) => (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>
      {isView ? (
        <div >
          {value || "-"}
        </div>
      ) : isTextarea ? (
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={`Enter ${label.toLowerCase()}...`}
          className="resize-none"
        />
      ) : (
        <Input
          id={name}
          name={name}
          type={name.toLowerCase().includes("date") ? "date" : "text"}
          value={value}
          onChange={handleChange}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      )}
    </div>
  );

  return (
    <Card className="max-w-2xl mx-auto mt-6 shadow-lg border">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {isView ? "View" : isEdit ? "Edit" : "Create"} Ecosystem
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isView ? (
          <div className="space-y-4">
            {renderField("Title", form.title, "title")}
            {renderField("Description", form.description, "description", true)}
            <div className="space-y-1">
              <Label>Project Type</Label>
              <div className="px-3 py-2 border rounded text-sm text-muted-foreground">
                {form.projectType || "-"}
              </div>
            </div>
            {renderField("Start Date", form.startDate, "startDate")}
            {renderField("End Date", form.endDate, "endDate")}
            {renderField("Repo URL", form.repoUrl, "repoUrl")}
            {renderField("Live URL", form.liveUrl, "liveUrl")}
            {renderField("Member IDs (comma separated)", form.memberIds, "memberIds")}
            {renderField("Name", form.name, "name")}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderField("Title", form.title, "title")}
            {renderField("Description", form.description, "description", true)}

            <div className="space-y-1">
              <Label htmlFor="projectType">Project Type</Label>
              <Input
                type="text"
                id="projectType"
                name="projectType"
                list="project-type-options"
                value={form.projectType}
                onChange={handleChange}
                placeholder="Select or type your project type"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <datalist id="project-type-options">
                <option value="Ideathon" />
                <option value="Solvathon" />
                <option value="Innovathon" />
                <option value="Inspirathon" />
              </datalist>
            </div>

            {renderField("Start Date", form.startDate, "startDate")}
            {renderField("End Date", form.endDate, "endDate")}
            {renderField("Repo URL", form.repoUrl, "repoUrl")}
            {renderField("Live URL", form.liveUrl, "liveUrl")}
            {renderField("Member IDs (comma separated)", form.memberIds, "memberIds")}
            {renderField("Name", form.name, "name")}

            <Button
              type="submit"
              className="w-full"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {(createMutation.isPending || updateMutation.isPending)
                ? "Saving..."
                : isEdit ? "Update" : "Create"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
