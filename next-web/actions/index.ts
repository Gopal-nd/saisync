'use server';

import { UTApi } from 'uploadthing/server';

const utpApi = new UTApi();

function extractUploadThingKey(url: string): string {
  const match = url.match(/\/f\/([a-zA-Z0-9]+)/);
  return match ? match[1] : '';
}

export async function deleteFilesServerAction(fileUrl: string) {
  try {
    const key = extractUploadThingKey(fileUrl);
    const result = await utpApi.deleteFiles(key);

    // 👇 Only return a simple result
    return { success: true, deleted: result };
  } catch (err) {
    console.error('Delete failed:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
