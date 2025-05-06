'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from 'sonner';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { UploadDropzone } from '@/utils/uploadthing';
import { axiosFrontend } from "@/lib/axios";
import { useCreateScholoership, useScholoership, useUpdateScholoership } from "@/hooks/useScholoership";

export default function ScholarshipForm({
  isEdit = false,
  isView = false
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
    amount: ""
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
      amount: parseFloat(form.amount || "0")
    };
    if (isEdit) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDeleteFile = async () => {
    const res = await axiosFrontend.delete('/api/uploadthing', { data: { url: form.proofUrl } });
    if (res.data?.message === 'ok') {
      toast.success('Image deleted successfully');
      setForm((prev) => ({ ...prev, proofUrl: '' }));
    }
  };

  if (isView) {
    return (
      <div className="max-w-xl mx-auto p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Scholarship Details</h2>
        <div className="space-y-3 text-gray-800">
          <div><strong>Title:</strong> {form.title || "N/A"}</div>
          <div><strong>Description:</strong> <p className="whitespace-pre-wrap">{form.description || "N/A"}</p></div>
          <div><strong>Received Date:</strong> {form.startDate || "N/A"}</div>
          <div><strong>Applied Date:</strong> {form.endDate || "N/A"}</div>
          <div><strong>Where Applied:</strong> {form.whereApplied || "N/A"}</div>
          <div><strong>Amount:</strong> {form.amount || "N/A"}</div>
          <div>
            <strong>Proof:</strong>{" "}
            {form.proofUrl ? (
              <Image src={form.proofUrl} alt="Uploaded Certificate" width={200} height={200} className="object-cover" />
            ) : "N/A"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Edit" : "Create"} Scholarship
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Scholarship Provider Name"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="whereApplied"
          placeholder="Where Applied"
          value={form.whereApplied}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount (INR)"
          value={form.amount}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex flex-col">
          {form.proofUrl ? (
            <>
              <Image src={form.proofUrl} alt="Uploaded Certificate" width={200} height={200} className='object-cover' />
              <Button onClick={handleDeleteFile} type="button" className='bg-red-500 hover:bg-red-700 mt-2'>Delete</Button>
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
