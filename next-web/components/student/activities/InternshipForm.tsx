'use client';
import React, { useEffect, useState } from "react";
import {
  useExperience,
  useCreateExperience,
  useUpdateExperience
} from "@/hooks/useExperianceTrip";
import { useParams } from "next/navigation";
import { toast } from 'sonner'
import { UploadDropzone } from '@/utils/uploadthing'
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { axiosFrontend } from "@/lib/axios";
import { useCreateInternship, useInternship, useUpdateInternship } from "@/hooks/useInternshps";

export default function InternshipForm({
  isEdit = false,
  isView = false
}: {
  isEdit?: boolean;
  isView?: boolean;
}) {
  const { id } = useParams();
  const { data: existingExperience } = useInternship(id as string);

  const [form, setForm] = useState({
    companyName: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    proofUrl: ""
  });

  const createMutation = useCreateInternship();
  const updateMutation = useUpdateInternship(id as string);

  useEffect(() => {
    if ((isEdit || isView) && existingExperience) {
      setForm({
        companyName: existingExperience.companyName || "",
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
      updateMutation.mutate(form);
    } else {
      createMutation.mutate(form);
    }
  };

    const handleDeleteFile = async () => {
      const res = await axiosFrontend.delete('/api/uploadthing', { data: { url: form.proofUrl } })
      console.log(res.data)
      if (res.data?.message === 'ok') {
        toast.success('Image deleted successfully')
        setForm((prev) => ({ ...prev, proofUrl: '' }))
      }
      return true
    }

  if (isView) {
    return (
      <div className="max-w-xl mx-auto p-6 rounded shadow ">
        <h2 className="text-2xl font-semibold mb-4">Internship Details</h2>
        <div className="space-y-3 text-gray-800">
          <div>
            <strong>Company Name:</strong> {form.companyName || "N/A"}
          </div>
          <div>
            <strong>Title:</strong> {form.title || "N/A"}
          </div>
          <div>
            <strong>Description:</strong>
            <p className="whitespace-pre-wrap">{form.description || "N/A"}</p>
          </div>
          <div>
            <strong>Start Date:</strong> {form.startDate || "N/A"}
          </div>
          <div>
            <strong>End Date:</strong> {form.endDate || "N/A"}
          </div>
          <div>
            <strong>Proof URL:</strong>{" "}
            {form.proofUrl ? (
                <Image src={form.proofUrl} alt="Uploaded Certificate" width={200} height={200} className='object-cover' />

            ) : (
              "N/A"
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 rounded shadow ">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Edit" : "Create"} Internship
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="title"
          placeholder="Role/Title"
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
            <div className="flex flex-col">
          {form.proofUrl ? (
            <>
              <Image src={form.proofUrl} alt="Uploaded Certificate" width={200} height={200} className='object-cover' />
              <Button onClick={handleDeleteFile} className='bg-red-500 hover:bg-red-700'>Delete</Button>
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
                const url = res[0].ufsUrl
                setForm((prev) => ({ ...prev, proofUrl: url }));
              }}
              onUploadError={(error: Error) => {
                console.error(`Upload failed: ${error.message}`)
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
