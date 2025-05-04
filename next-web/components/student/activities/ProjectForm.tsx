'use client';
import React, { useEffect, useState } from "react";
import {
  useCreateProject,
  useUpdateProject,
  useProject,
} from "@/hooks/useProjects";
import { useParams } from "next/navigation";

export default function ProjectForm({ isEdit = false, isView = false }: { isEdit?: boolean, isView?: boolean }) {
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

  // Prefill data for edit/view
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
        memberIds: existingProject.members?.map((m:any) => m.id).join(",") || "",
        name: existingProject.name || "",
      });
    }
  }, [existingProject, isEdit, isView]);

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

  const renderField = (label: string, value: string, name: string, isTextarea = false) => {
    return (
      <div>
        <label className="block font-semibold mb-1">{label}</label>
        {isView ? (
          <div className="border px-3 py-2 rounded ">{value || "-"}</div>
        ) : isTextarea ? (
          <textarea
            name={name}
            value={value}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        ) : (
          <input
            type={name.includes("Date") ? "date" : "text"}
            name={name}
            value={value}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        )}
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {isView ? "View" : isEdit ? "Edit" : "Create"} Project
      </h2>
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
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isEdit ? "Update" : "Create"}
          </button>
        )}
      </form>
    </div>
  );
}
