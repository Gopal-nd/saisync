'use client';

import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import Image from 'next/image';
import { toast } from 'sonner';

import { UploadDropzone } from '@/utils/uploadthing';
import { axiosFrontend } from "@/lib/axios";

import { useParticipate, useCreateParticipate, useUpdateParticipate } from "@/hooks/useparticipate";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ParticipateFormPage({
  isEdit = false,
  isView = false,
}: {
  isEdit?: boolean;
  isView?: boolean;
}) {
  const { id } = useParams();
  const { data: existingExperience } = useParticipate(id as string);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    location: "",
    proofUrl: "",
    typeOfParticipatedeEvent: "",
  });

  const { mutate: createMutation , isPending: createPending,isSuccess: createSuccess} = useCreateParticipate();
  const { mutate: updateMutation , isPending: updatePending,isSuccess: updateSuccess} = useUpdateParticipate(id as string);

  useEffect(() => {
    if ((isEdit || isView) && existingExperience) {
      setForm({
        title: existingExperience.title || "",
        description: existingExperience.description || "",
        startDate: existingExperience.date?.slice(0, 10) || "",
        location: existingExperience.location || "",
        proofUrl: existingExperience.cretificateUrl || "",
        typeOfParticipatedeEvent: existingExperience.typeOfParticipatedeEvent || "",
      });
    }
  }, [existingExperience, isEdit, isView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    return true;
  };

       if(createSuccess || updateSuccess){
           if (isEdit) {
            toast.success("Participation updated successfully");
          } else {
            toast.success("Participation Created successfully");
          }
          redirect("/student/activities/participate/");
        }
      

  if (isView) {
    return (
      <Card className="max-w-xl mx-auto p-6 shadow">
        <CardHeader>
          <CardTitle className="text-2xl">Participation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 ">
          <p><strong>Type of Event:</strong> {form.typeOfParticipatedeEvent || "N/A"}</p>
          <p><strong>Title:</strong> {form.title || "N/A"}</p>
          <p><strong>Description:</strong><br />{form.description || "N/A"}</p>
          <p><strong>Date:</strong> {form.startDate || "N/A"}</p>
          <p><strong>Location:</strong> {form.location || "N/A"}</p>
          <div>
            <strong>Proof:</strong><br />
            {form.proofUrl ? (
              <Image src={form.proofUrl} alt="Certificate" width={200} height={200} className="rounded" />
            ) : "N/A"}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl mx-auto p-6 shadow">
      <CardHeader>
        <CardTitle className="text-xl">{isEdit ? "Edit" : "Create"} Participation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={form.title} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={form.description} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="startDate">Date</Label>
            <Input id="startDate" type="date" name="startDate" value={form.startDate} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={form.location} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="typeOfParticipatedeEvent">Type of Event</Label>
            <Input
              id="typeOfParticipatedeEvent"
              name="typeOfParticipatedeEvent"
              placeholder="Hackathon, Workshop, Sports, etc"
              value={form.typeOfParticipatedeEvent}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Proof (Certificate)</Label>
            {form.proofUrl ? (
              <>
                <Image src={form.proofUrl} alt="Uploaded Certificate" width={200} height={200} className="rounded" />
                <Button variant="destructive" onClick={handleDeleteFile}>Delete</Button>
              </>
            ) : (
              <UploadDropzone
                endpoint="imageUploader"
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
