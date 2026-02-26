'use client';

import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { UploadDropzone } from "@/utils/uploadthing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { axiosFrontend } from "@/lib/axios";
import {
  useCreateInternship,
  useInternship,
  useUpdateInternship
} from "@/hooks/useInternshps";

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

  const { mutate: createMutation , isPending: createPending,isSuccess: createSuccess} = useCreateInternship();
  const { mutate: updateMutation , isPending: updatePending,isSuccess: updateSuccess} = useUpdateInternship(id as string);

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
      ? updateMutation(form)
      : createMutation(form);
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

     if(createSuccess || updateSuccess){
         if (isEdit) {
          toast.success("Internship updated successfully");
        } else {
          toast.success("Internship Created successfully");
        }
        redirect("/student/activities/internship/");
      }
    


  if (isView) {
    return (
      <Card className="max-w-xl mx-auto mt-6">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">Internship Details</h2>
          <div><strong>Company Name:</strong> {form.companyName || "N/A"}</div>
          <div><strong>Title:</strong> {form.title || "N/A"}</div>
          <div><strong>Description:</strong>
            <p className="whitespace-pre-wrap">{form.description || "N/A"}</p>
          </div>
          <div><strong>Start Date:</strong> {form.startDate || "N/A"}</div>
          <div><strong>End Date:</strong> {form.endDate || "N/A"}</div>
          <div>
            <strong>Proof:</strong>{" "}
            {form.proofUrl ? (
              <Image src={form.proofUrl} alt="Proof" width={200} height={200} className="rounded" />
            ) : "N/A"}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl mx-auto mt-6">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-bold">
          {isEdit ? "Edit Internship" : "Create Internship"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Company Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Role / Title</Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Internship Role"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="What did you do in this internship?"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1 space-y-2">
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
            <Label>Proof of Internship</Label>
            {form.proofUrl ? (
              <div className="space-y-2">
                <Image
                  src={form.proofUrl}
                  alt="Proof"
                  width={250}
                  height={250}
                  className="rounded border"
                />
                <Button
                  type="button"
                  variant="destructive"
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
                  label: "text-sm text-gray-500",
                  allowedContent: "text-xs text-muted-foreground"
                }}
                onClientUploadComplete={(res) => {
                  const url = res[0].ufsUrl;
                  setForm((prev) => ({ ...prev, proofUrl: url }));
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Upload failed: ${error.message}`);
                }}
              />
            )}
          </div>

          <Button type="submit" className="w-full">
            {isEdit ? "Update Internship" : "Create Internship"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
