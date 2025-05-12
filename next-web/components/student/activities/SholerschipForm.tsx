"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
  });

  const createMutation = useCreateScholoership();
  const updateMutation = useUpdateScholoership(id as string);

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
      });
    }
  }, [existingData, isEdit, isView]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    };
    if (isEdit) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
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
      <div className="max-w-xl mx-auto p-6 rounded shadow space-y-4">
        <h2 className="text-2xl font-semibold">Scholarship Details</h2>
        <div className="space-y-2 text-sm text-gray-800">
          <p><strong>Title:</strong> {form.title || "N/A"}</p>
          <p><strong>Description:</strong> <span className="whitespace-pre-wrap">{form.description || "N/A"}</span></p>
          <p><strong>Received Date:</strong> {form.startDate || "N/A"}</p>
          <p><strong>Applied Date:</strong> {form.endDate || "N/A"}</p>
          <p><strong>Where Applied:</strong> {form.whereApplied || "N/A"}</p>
          <p><strong>Amount:</strong> ₹{form.amount || "N/A"}</p>
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
        </div>
      </div>
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
          {isEdit ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
}
