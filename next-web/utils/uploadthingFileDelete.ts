"use server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const deleteUTFiles = async (files: string[]) => {
  try {
    await utapi.deleteFiles(files);
  } catch (error) {
    console.error("UTAPI: Error deleting files", error);
  }
};