'use client';
import React, { useEffect, useState } from "react";
import {
  useAchivement,
  useCreateAchivement,
  useUpdateAchivement
} from "@/hooks/useAchivements";
import { redirect, useParams } from "next/navigation";
import { toast } from 'sonner';
import { UploadDropzone } from '@/utils/uploadthing';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  const { mutate: createMutation , isPending: createPending,isSuccess: createSuccess}= useCreateAchivement();
  const { mutate: updateMutation , isPending: updatePending,isSuccess: updateSuccess} = useUpdateAchivement(id as string);

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
    isEdit ? updateMutation(form) : createMutation(form);
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
            redirect("/student/activities/achivements/");
          }
        

  if (isView) {
    return (
      <Card className="max-w-xl mx-auto mt-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Achievement Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div><span className="font-medium">Type of Event:</span> {form.typeOfParticipatedeEvent || "N/A"}</div>
          <div><span className="font-medium">Title:</span> {form.title || "N/A"}</div>
          <div><span className="font-medium">Description:</span><p className="whitespace-pre-wrap">{form.description || "N/A"}</p></div>
          <div><span className="font-medium">Date:</span> {form.startDate || "N/A"}</div>
          <div><span className="font-medium">Location:</span> {form.location || "N/A"}</div>
          <div>
            <span className="font-medium">Proof:</span>{" "}
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
      <CardHeader>
        <CardTitle className="text-xl font-bold">{isEdit ? "Edit" : "Create"} Achievement</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., 1st place in Hackathon"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your achievement..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date</Label>
              <Input
                id="startDate"
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g., IIT Bombay"
              />
            </div>
          </div>

          <div className="space-y-2">
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
            <Label>Certificate / Proof</Label>
            {form.proofUrl ? (
              <div className="flex items-start gap-4">
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
