'use client';
import React, { useEffect, useState } from "react";
import {
  useCreatEcosystem,
  useEcosystem,
  useUpdateEcosystem,
} from "@/hooks/useEcoSystem";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
  ) => (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>
      {isView ? (
        <div className="px-3 py-2 border rounded text-sm text-muted-foreground">
          {value || "-"}
        </div>
      ) : isTextarea ? (
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={`Enter ${label.toLowerCase()}...`}
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
    <Card className="max-w-2xl mx-auto mt-6">
      <CardHeader className="text-xl font-bold">
        {isView ? "View" : isEdit ? "Edit" : "Create"} Ecosystem
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
              {isEdit ? "Update" : "Create"}
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
