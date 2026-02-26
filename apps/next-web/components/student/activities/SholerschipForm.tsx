"use client";
import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/utils/uploadthing";
import { axiosFrontend } from "@/lib/axios";
import {
  useCreateScholoership,
  useScholoership,
  useUpdateScholoership,
} from "@/hooks/useScholoership";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ScholarshipForm({
  isEdit = false,
  isView = false,
}: {
  isEdit?: boolean;
  isView?: boolean;
}) {
  const { id } = useParams();
  const { data: existingData } = useScholoership(id as string);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    whereApplied: "",
    proofUrl: "",
    amount: "",
    name: "",
    others: "",
  });

  const {mutate:createMutation,isSuccess:createSuccess,isPending:createPending} = useCreateScholoership();
  const {mutate:updateMutation,isSuccess:updateSuccess,isPending:updatePending} = useUpdateScholoership(id as string);

  useEffect(() => {
    if ((isEdit || isView) && existingData) {
      setForm({
        title: existingData.providerName || "",
        description: existingData.description || "",
        startDate: existingData.whenRecived?.slice(0, 10) || "",
        endDate: existingData.whenApplied?.slice(0, 10) || "",
        whereApplied: existingData.WhereApplied || "",
        proofUrl: existingData.proofUrl || "",
        amount: existingData.amount?.toString() || "",
        name: existingData.name || "",
        others: existingData.others || "",
      });
    }
  }, [existingData, isEdit, isView]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      providerName: form.title,
      description: form.description,
      whenRecived: form.startDate,
      whenApplied: form.endDate,
      WhereApplied: form.whereApplied,
      proofUrl: form.proofUrl,
      amount: parseFloat(form.amount || "0"),
      name: form.name,
      others: form.others,
    };
    if (isEdit) {
      updateMutation(payload);
    } else {
      createMutation(payload);
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

  if(createSuccess || updateSuccess){
     if (isEdit) {
      toast.success("Scholarship Eddited successfully");
    } else {
      toast.success("Scholarship Created successfully");
    }
    redirect("/student/activities/scholoership");
  }

  if (isView) {
    return (
           <Card className="max-w-xl mx-auto p-6 shadow">
        <CardHeader>
          <CardTitle className="text-2xl">Medical Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 ">
          <p><strong>Title:</strong> {form.title || "N/A"}</p>
          <p><strong>Description:</strong> <span className="whitespace-pre-wrap">{form.description || "N/A"}</span></p>
          <p><strong>Received Date:</strong> {form.startDate || "N/A"}</p>
          <p><strong>Applied Date:</strong> {form.endDate || "N/A"}</p>
          <p><strong>Where Applied:</strong> {form.whereApplied || "N/A"}</p>
          <p><strong>Amount:</strong> ₹{form.amount || "N/A"}</p>
           <p><strong>Name:</strong> {form.name || "N/A"}</p>
          <p><strong>Othrers:</strong> ₹{form.others || "N/A"}</p>
          <div>
            <strong>Proof:</strong>{" "}
            {form.proofUrl ? (
              <Image
                src={form.proofUrl}
                alt="Uploaded Certificate"
                width={200}
                height={200}
                className="rounded object-cover mt-2"
              />
            ) : (
              "N/A"
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-semibold">
        {isEdit ? "Edit" : "Create"} Scholarship
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="title"
          placeholder="Scholarship Provider Name"
          value={form.title}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <Input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
        />
        <Input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="whereApplied"
          placeholder="Where Applied"
          value={form.whereApplied}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="amount"
          placeholder="Amount (INR)"
          value={form.amount}
          onChange={handleChange}
        />
          <select
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded border bg-primary-foreground"
        >
          <option value="">Select Name</option>
          <option value="ssp">SSP</option>
          <option value="lms">LMS</option>
          <option value="lpf">LPF</option>
          <option value="Other">Other</option>
        </select>
        <Textarea
          name="others"
          placeholder="Others"
          value={form.others}
          onChange={handleChange}
        />
        

        <div className="space-y-2">
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
                onClick={handleDeleteFile}
                type="button"
                variant="destructive"
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
              className="w-full"
              onClientUploadComplete={(res) => {
                const url = res[0].url;
                setForm((prev) => ({ ...prev, proofUrl: url }));
              }}
              onUploadError={(error: Error) => {
                console.error(`Upload failed: ${error.message}`);
                toast.error("Upload failed");
              }}
            />
          )}
        </div>

        <Button type="submit" className="w-full">
         {createPending || updatePending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {isEdit ? "Update" : "Create"} 
        </Button>
      </form>
    </div>
  );
}
