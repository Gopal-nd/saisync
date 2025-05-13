'use client';

import React, { useEffect, useState } from "react";
import {
  useExperience,
  useCreateExperience,
  useUpdateExperience,
} from "@/hooks/useExperianceTrip";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { axiosFrontend } from "@/lib/axios";

export default function ExperienceForm({
  isEdit = false,
  isView = false,
}: {
  isEdit?: boolean;
  isView?: boolean;
}) {
  const { id } = useParams();
  const { data: existingExperience } = useExperience(id as string);

  const [form, setForm] = useState({
    companyName: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    proofUrl: "",
  });

  const createMutation = useCreateExperience();
  const updateMutation = useUpdateExperience(id as string);

  useEffect(() => {
    if ((isEdit || isView) && existingExperience) {
      setForm({
        companyName: existingExperience.companyName || "",
        title: existingExperience.title || "",
        description: existingExperience.description || "",
        startDate: existingExperience.startDate?.slice(0, 10) || "",
        endDate: existingExperience.endDate?.slice(0, 10) || "",
        proofUrl: existingExperience.proofUrl || "",
      });
    }
  }, [existingExperience, isEdit, isView]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      updateMutation.mutate(form);
    } else {
      createMutation.mutate(form);
    }
  };

  const handleDeleteFile = async () => {
    const res = await axiosFrontend.delete("/api/uploadthing", {
      data: { url: form.proofUrl },
    });
    if (res.data?.message === "ok") {
      toast.success("Image deleted successfully");
      setForm((prev) => ({ ...prev, proofUrl: "" }));
    }
  };

  if (isView) {
    return (
      <Card className="max-w-xl mx-auto p-6">
        <CardHeader className="text-2xl font-semibold">Experience Details</CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <div>
            <strong>Company Name:</strong> {form.companyName || "N/A"}
          </div>
          <div>
            <strong>Title:</strong> {form.title || "N/A"}
          </div>
          <div>
            <strong>Description:</strong>
            <p className="whitespace-pre-wrap">{form.description || "N/A"}</p>
          </div>
          <div>
            <strong>Start Date:</strong> {form.startDate || "N/A"}
          </div>
          <div>
            <strong>End Date:</strong> {form.endDate || "N/A"}
          </div>
          <div>
            <strong>Proof:</strong>
            {form.proofUrl ? (
              <Image
                src={form.proofUrl}
                alt="Uploaded Certificate"
                width={200}
                height={200}
                className="object-cover mt-2"
              />
            ) : (
              " N/A"
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl mx-auto p-6">
      <CardHeader className="text-xl font-bold">
        {isEdit ? "Edit" : "Create"} Experience
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="title">Title/Role</Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter your role"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your experience"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Proof Upload</Label>
            {form.proofUrl ? (
              <div className="space-y-2">
                <Image
                  src={form.proofUrl}
                  alt="Uploaded Proof"
                  width={200}
                  height={200}
                  className="rounded-md object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDeleteFile}
                >
                  Delete
                </Button>
              </div>
            ) : (
              <UploadDropzone
                endpoint="imageUploader"
                appearance={{
                  label: "text-sm text-gray-500",
                  allowedContent: "text-xs text-muted-foreground",
                }}
                className="w-full"
                onClientUploadComplete={(res) => {
                  const url = res[0].ufsUrl;
                  setForm((prev) => ({ ...prev, proofUrl: url }));
                }}
                onUploadError={(error: Error) => {
                  console.error(`Upload failed: ${error.message}`);
                }}
              />
            )}
          </div>

          <Button type="submit" className="w-full">
            {isEdit ? "Update" : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
