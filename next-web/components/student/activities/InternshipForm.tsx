'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

import {
  useInternship,
  useCreateInternship,
  useUpdateInternship
} from "@/hooks/useInternshps";
import { UploadDropzone } from "@/utils/uploadthing";
import { Button } from "@/components/ui/button";
import { axiosFrontend } from "@/lib/axios";

export default function InternshipForm({
  isEdit = false,
  isView = false
}: {
  isEdit?: boolean;
  isView?: boolean;
}) {
  const { id } = useParams();
  const { data: existingExperience, isLoading } = useInternship(id as string);

  const [form, setForm] = useState({
    companyName: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    proofUrl: ""
  });

  const createMutation = useCreateInternship();
  const updateMutation = useUpdateInternship(id as string);

  useEffect(() => {
    if (!isLoading && (isEdit || isView) && existingExperience) {
      setForm({
        companyName: existingExperience.companyName || "",
        title: existingExperience.title || "",
        description: existingExperience.description || "",
        startDate: existingExperience.startDate?.slice(0, 10) || "",
        endDate: existingExperience.endDate?.slice(0, 10) || "",
        proofUrl: existingExperience.proofUrl || ""
      });
    }
  }, [existingExperience, isEdit, isView, isLoading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.companyName || !form.title || !form.startDate || !form.endDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    isEdit
      ? updateMutation.mutate(form)
      : createMutation.mutate(form);
  };

  const handleDeleteFile = async () => {
    const confirm = window.confirm("Are you sure you want to delete the uploaded proof?");
    if (!confirm) return;

    toast.loading("Deleting image...");
    try {
      const res = await axiosFrontend.delete("/api/uploadthing", {
        data: { url: form.proofUrl }
      });

      if (res.data?.message === "ok") {
        toast.success("Image deleted");
        setForm((prev) => ({ ...prev, proofUrl: "" }));
      } else {
        toast.error("Failed to delete image.");
      }
    } catch {
      toast.error("Error while deleting image.");
    }
  };

  if (isView) {
    return (
      <div className="max-w-2xl mx-auto rounded-lg shadow p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Internship Details</h2>
        <div className="space-y-2">
          <div><span className="font-medium">Company Name:</span> {form.companyName}</div>
          <div><span className="font-medium">Title:</span> {form.title}</div>
          <div>
            <span className="font-medium">Description:</span>
            <p className="mt-1 text-sm whitespace-pre-wrap">{form.description}</p>
          </div>
          <div><span className="font-medium">Start Date:</span> {form.startDate}</div>
          <div><span className="font-medium">End Date:</span> {form.endDate}</div>
          <div>
            <span className="font-medium">Proof:</span>
            {form.proofUrl ? (
              <div className="mt-2">
                <Image
                  src={form.proofUrl}
                  alt="Certificate"
                  width={300}
                  height={200}
                  className="rounded shadow"
                />
              </div>
            ) : (
              " Not uploaded"
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Internship" : "Add New Internship"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Company Name*</label>
          <input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="Ex: Google"
            className="mt-1 block w-full rounded-md border shadow-sm px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Title / Role*</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Ex: SDE Intern"
            className="mt-1 block w-full rounded-md border shadow-sm px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="What did you do?"
            rows={4}
            className="mt-1 block w-full rounded-md border shadow-sm px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Start Date*</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border shadow-sm px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">End Date*</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border shadow-sm px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Upload Proof</label>
          {form.proofUrl ? (
            <div className="space-y-2">
              <Image
                src={form.proofUrl}
                alt="Certificate"
                width={300}
                height={200}
                className="rounded shadow"
              />
              <Button
                variant="destructive"
                type="button"
                onClick={handleDeleteFile}
              >
                Delete Proof
              </Button>
            </div>
          ) : (
            <UploadDropzone
              endpoint="imageUploader"
              className="border rounded-md p-4"
              appearance={{
                label: "",
                allowedContent: "text-xs",
              }}
              onClientUploadComplete={(res) => {
                const url = res?.[0]?.ufsUrl;
                if (url) {
                  setForm((prev) => ({ ...prev, proofUrl: url }));
                  toast.success("Uploaded");
                }
              }}
              onUploadError={(error: Error) => {
                toast.error("Upload failed: " + error.message);
              }}
            />
          )}
        </div>

        <Button
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
          className="w-full"
        >
          {isEdit
            ? updateMutation.isPending ? "Updating..." : "Update Internship"
            : createMutation.isPending ? "Submitting..." : "Create Internship"}
        </Button>
      </form>
    </div>
  );
}
