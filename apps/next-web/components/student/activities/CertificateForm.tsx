'use client';
import React, { useEffect, useState } from "react";
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
import { useCertificate, useCreateCertificate, useUpdateCertificate } from "@/hooks/useCertificates";

export default function CertificateForm({
  isEdit = false,
  isView = false
}: {
  isEdit?: boolean;
  isView?: boolean;
}) {
  const { id } = useParams();
  const { data: existingExperience } = useCertificate(id as string);

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: 1,
    issuedBy: '',
    issueDate: '',
    expiryDate: '',
    imageUrl: "",
    proofUrl: "",
  });

  const {mutate:createMutation,isSuccess:createSuccess,isPending:createPending} = useCreateCertificate();
  const {mutate:updateMutation,isSuccess:updateSuccess,isPending:updatePending} = useUpdateCertificate(id as string);

  useEffect(() => {
    if ((isEdit || isView) && existingExperience) {
      setForm({
        title: existingExperience.title || "",
        description: existingExperience.description || "",
        duration: existingExperience.duration || 1,
        issuedBy: existingExperience.issuedBy || "",
        issueDate: existingExperience.issueDate?.slice(0, 10) || "",
        expiryDate: existingExperience.expiryDate?.slice(0, 10) || "",
        imageUrl: existingExperience.imageUrl || "",
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
    isEdit ? updateMutation(form) : createMutation(form);
  };

  const handleDeleteFile = async () => {
    const res = await axiosFrontend.delete('/api/uploadthing', { data: { url: form.imageUrl } });
    if (res.data?.message === 'ok') {
      toast.success('Image deleted successfully');
      setForm((prev) => ({ ...prev, imageUrl: '' }));
    }
  };

   if(createSuccess || updateSuccess){
       if (isEdit) {
        toast.success("Scholarship Eddited successfully");
      } else {
        toast.success("Scholarship Created successfully");
      }
      redirect("/student/activities/");
    }
  

  if (isView) {
    return (
      <Card className="max-w-xl mx-auto mt-6 shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Certificates Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm ">
          <div><span className="font-medium">Title:</span> {form.title || "N/A"}</div>
          <div>
            <span className="font-medium">Description:</span>
            <p className="whitespace-pre-wrap mt-1 ">{form.description || "N/A"}</p>
          </div>
          <div><span className="font-medium">Issued By:</span> {form.issuedBy || "N/A"}</div>
          <div><span className="font-medium">Issue Date:</span> {form.issueDate || "N/A"}</div>
          <div><span className="font-medium">Expiry Date:</span> {form.expiryDate || "N/A"}</div>
          
          <div>
            <span className="font-medium">Certificate Image:</span><br />
            {form.imageUrl ? (
              <Image
                src={form.imageUrl}
                alt="Certificate"
                width={300}
                height={200}
                className="rounded-md border mt-2"
              />
            ) : (
              <p className="text-muted-foreground mt-1">N/A</p>
            )}
          </div>

          <div>
            <span className="font-medium">Proof URL:</span><br />
            {form.proofUrl ? (
              <a
                href={form.proofUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-1 inline-block break-all"
              >
                {form.proofUrl}
              </a>
            ) : (
              <p className="text-muted-foreground mt-1">N/A</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className="max-w-xl mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{isEdit ? "Edit" : "Create"} Certificates</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="Devops, Cloud Computing, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your Certificates..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input
                id="issueDate"
                type="date"
                name="issueDate"
                value={form.issueDate}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="issuedBy">Issued By</Label>
            <Input
              id="issuedBy"
              name="issuedBy"
              value={form.issuedBy}
              onChange={handleChange}
              placeholder="e.g., Google"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proofUrl">Proof URL</Label>
            <Input
              id="proofUrl"
              name="proofUrl"
              value={form.proofUrl}
              onChange={handleChange}
              placeholder="https://link-to-proof.com"
            />
          </div>

          <div className="space-y-2">
            <Label>Certificate / Proof Image</Label>
            {form.imageUrl ? (
              <div className="flex items-start gap-4">
                <Image
                  src={form.imageUrl}
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
                  setForm((prev) => ({ ...prev, imageUrl: url }));
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
