'use client';
import React, { useEffect, useState } from "react";
import {
  useAchivement,
  useCreateAchivement,
  useUpdateAchivement
} from "@/hooks/useAchivements";
import { useParams } from "next/navigation";
import { toast } from 'sonner';
import { UploadDropzone } from '@/utils/uploadthing';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { axiosFrontend } from "@/lib/axios";

export default function AchivementsForm({
  isEdit = false,
  isView = false
}: {
  isEdit?: boolean;
  isView?: boolean;
}) {
  const { id } = useParams();
  const { data: existingExperience } = useAchivement(id as string);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    location: "",
    proofUrl: "",
    typeOfParticipatedeEvent: "",
  });

  const createMutation = useCreateAchivement();
  const updateMutation = useUpdateAchivement(id as string);

  useEffect(() => {
    if ((isEdit || isView) && existingExperience) {
      setForm({
        title: existingExperience.title || "",
        description: existingExperience.description || "",
        startDate: existingExperience.date?.slice(0, 10) || "",
        location: existingExperience.location || "",
        proofUrl: existingExperience.cretificateUrl || "",
        typeOfParticipatedeEvent: existingExperience.typeOfParticipatedeEvent || ""
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
    const res = await axiosFrontend.delete('/api/uploadthing', { data: { url: form.proofUrl } });
    if (res.data?.message === 'ok') {
      toast.success('Image deleted successfully');
      setForm((prev) => ({ ...prev, proofUrl: '' }));
    }
    return true;
  };

  if (isView) {
    return (
      <Card className="max-w-xl mx-auto mt-6">
        <CardHeader className="text-2xl font-semibold">Achievement Details</CardHeader>
        <CardContent className="space-y-4 text-sm ">
          <div><strong>Type of Event:</strong> {form.typeOfParticipatedeEvent || "N/A"}</div>
          <div><strong>Title:</strong> {form.title || "N/A"}</div>
          <div><strong>Description:</strong><p className="whitespace-pre-wrap">{form.description || "N/A"}</p></div>
          <div><strong>Date:</strong> {form.startDate || "N/A"}</div>
          <div><strong>Location:</strong> {form.location || "N/A"}</div>
          <div>
            <strong>Proof:</strong>{" "}
            {form.proofUrl ? (
              <Image src={form.proofUrl} alt="Certificate" width={200} height={200} className="rounded-lg border" />
            ) : "N/A"}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl mx-auto mt-6">
      <CardHeader className="text-xl font-bold">
        {isEdit ? "Edit" : "Create"} Achievement
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., 1st place in Hackathon"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your achievement..."
            />
          </div>
          <div>
            <Label htmlFor="startDate">Date</Label>
            <Input
              id="startDate"
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g., IIT Bombay"
            />
          </div>
          <div>
            <Label htmlFor="typeOfParticipatedeEvent">Type of Event</Label>
            <Input
              id="typeOfParticipatedeEvent"
              name="typeOfParticipatedeEvent"
              value={form.typeOfParticipatedeEvent}
              onChange={handleChange}
              placeholder="Hackathon, Workshop, Sports, etc."
            />
          </div>

          <div className="space-y-2">
            <Label>Certificate/Proof</Label>
            {form.proofUrl ? (
              <div className="flex flex-col items-start gap-2">
                <Image
                  src={form.proofUrl}
                  alt="Uploaded Certificate"
                  width={200}
                  height={200}
                  className="rounded-md border"
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
