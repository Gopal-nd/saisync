'use client';

import React, { useEffect, useState } from "react";
import {
  useCreateProject,
  useUpdateProject,
  useProject,
} from "@/hooks/useProjects";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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

  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject(id as string);

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

  const renderField = (
    label: string,
    value: string,
    name: string,
    isTextarea = false
  ) => {
    return (
      <div className="space-y-1">
        <Label htmlFor={name}>{label}</Label>
        {isView ? (
          <div className="border px-3 py-2 rounded text-sm text-muted-foreground bg-muted">{value || "-"}</div>
        ) : isTextarea ? (
          <Textarea
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            className="resize-none"
          />
        ) : (
          <Input
            type={name.includes("Date") ? "date" : "text"}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
          />
        )}
      </div>
    );
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isView ? "View" : isEdit ? "Edit" : "Create"} Project
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderField("Title", form.title, "title")}
          {renderField("Description", form.description, "description", true)}
          {renderField("Project Type", form.projectType, "projectType")}
          {renderField("Start Date", form.startDate, "startDate")}
          {renderField("End Date", form.endDate, "endDate")}
          {renderField("Repo URL", form.repoUrl, "repoUrl")}
          {renderField("Live URL", form.liveUrl, "liveUrl")}
          {renderField("Member IDs", form.memberIds, "memberIds")}
          {renderField("Internal Project Name", form.name, "name")}

          {!isView && (
            <Button type="submit" className="w-full">
              {isEdit ? "Update Project" : "Create Project"}
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
