'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from 'next/image';
import { toast } from 'sonner';

import { useNptel, useCreateNptel, useUpdateNptel } from "@/hooks/useNptel";
import { axiosFrontend } from "@/lib/axios";
import { UploadDropzone } from '@/utils/uploadthing';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function NptelForm({
  isEdit = false,
  isView = false
}: {
  isEdit?: boolean;
  isView?: boolean;
}) {
  const { id } = useParams();
  const { data: existingExperience } = useNptel(id as string);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    proofUrl: ""
  });

  const createMutation = useCreateNptel();
  const updateMutation = useUpdateNptel(id as string);

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
    isEdit ? updateMutation.mutate(form) : createMutation.mutate(form);
  };

  const handleDeleteFile = async () => {
    const res = await axiosFrontend.delete('/api/uploadthing', { data: { url: form.proofUrl } });
    if (res.data?.message === 'ok') {
      toast.success('Image deleted successfully');
      setForm((prev) => ({ ...prev, proofUrl: '' }));
    }
    return true;
  };

  if (isView) {
    return (
      <Card className="max-w-xl mx-auto p-6 shadow">
        <CardHeader>
          <CardTitle>NPTEL Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-gray-800">
          <div><strong>Title:</strong> {form.title || "N/A"}</div>
          <div>
            <strong>Description:</strong>
            <p className="whitespace-pre-wrap">{form.description || "N/A"}</p>
          </div>
          <div><strong>Start Date:</strong> {form.startDate || "N/A"}</div>
          <div><strong>End Date:</strong> {form.endDate || "N/A"}</div>
          <div>
            <strong>Proof:</strong>
            {form.proofUrl ? (
              <Image src={form.proofUrl} alt="Uploaded Certificate" width={200} height={200} className="mt-2 rounded object-cover" />
            ) : (
              "N/A"
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl mx-auto p-6 shadow">
      <CardHeader>
        <CardTitle>{isEdit ? "Edit NPTEL" : "Create NPTEL"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Role/Title"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="resize-none"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
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
          <div className="flex flex-col gap-2">
            <Label>Proof of Completion</Label>
            {form.proofUrl ? (
              <>
                <Image
                  src={form.proofUrl}
                  alt="Uploaded Certificate"
                  width={200}
                  height={200}
                  className="rounded object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteFile}
                >
                  Delete Image
                </Button>
              </>
            ) : (
              <UploadDropzone
                endpoint="imageUploader"
                appearance={{
                  label: "text-sm text-gray-500",
                  allowedContent: "text-xs text-muted-foreground",
                }}
                className="w-full border border-dashed rounded-md p-4"
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
