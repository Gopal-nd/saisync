'use client';
import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import Image from 'next/image';
import { toast } from 'sonner';
import {
  useCreateMedical,
  useMedical,
  useUpdateMedical
} from "@/hooks/useMedical";
import { UploadDropzone } from '@/utils/uploadthing';
import { axiosFrontend } from "@/lib/axios";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function MedicalForm({
  isEdit = false,
  isView = false
}: {
  isEdit?: boolean;
  isView?: boolean;
}) {
  const { id } = useParams();
  const { data: existingExperience } = useMedical(id as string);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    proofUrl: ""
  });

   const { mutate: createMutation , isPending: createPending,isSuccess: createSuccess}= useCreateMedical();
  const { mutate: updateMutation , isPending: updatePending,isSuccess: updateSuccess} = useUpdateMedical(id as string);

  useEffect(() => {
    if ((isEdit || isView) && existingExperience) {
      setForm({
        title: existingExperience.title || "",
        description: existingExperience.description || "",
        startDate: existingExperience.startDate?.slice(0, 10) || "",
        endDate: existingExperience.endDate?.slice(0, 10) || "",
        proofUrl: existingExperience.proofUrl || ""
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
      updateMutation(form);
    } else {
      createMutation(form);
    }
  };

  const handleDeleteFile = async () => {
    const res = await axiosFrontend.delete('/api/uploadthing', { data: { url: form.proofUrl } });
    if (res.data?.message === 'ok') {
      toast.success('Image deleted successfully');
      setForm((prev) => ({ ...prev, proofUrl: '' }));
    }
  };

         if(createSuccess || updateSuccess){
             if (isEdit) {
              toast.success("Achivement updated successfully");
            } else {
              toast.success("Achivement Created successfully");
            }
            redirect("/student/activities/medical/");
          }
        
  if (isView) {
    return (
      <Card className="max-w-xl mx-auto p-6 shadow">
        <CardHeader>
          <CardTitle className="text-2xl">Medical Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 ">
          <div><strong>Title:</strong> {form.title || "N/A"}</div>
          <div>
            <strong>Description:</strong>
            <p className="whitespace-pre-wrap">{form.description || "N/A"}</p>
          </div>
          <div><strong>Start Date:</strong> {form.startDate || "N/A"}</div>
          <div><strong>End Date:</strong> {form.endDate || "N/A"}</div>
          <div>
            <strong>Proof:</strong>{" "}
            {form.proofUrl ? (
              <Image
                src={form.proofUrl}
                alt="Uploaded Certificate"
                width={200}
                height={200}
                className='rounded-md border object-cover'
              />
            ) : "N/A"}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl mx-auto p-6 shadow">
      <CardHeader>
        <CardTitle>{isEdit ? "Edit" : "Create"} Medical</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Role/Title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your medical detail..."
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                type="date"
                id="endDate"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Proof Upload</Label>
            {form.proofUrl ? (
              <div className="flex flex-col items-start space-y-2">
                <Image
                  src={form.proofUrl}
                  alt="Uploaded Certificate"
                  width={200}
                  height={200}
                  className="rounded-md border object-cover"
                />
                <Button
                  variant="destructive"
                  type="button"
                  onClick={handleDeleteFile}
                >
                  Delete Image
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
