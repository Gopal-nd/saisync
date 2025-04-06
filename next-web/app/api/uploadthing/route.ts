import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});

import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function DELETE(request: Request) {
  try {
    
    const data = await request.json();
    const newUrl = data.url.substring(data.url.lastIndexOf("/") + 1);
    console.log(newUrl)
  
    const res = await utapi.deleteFiles(newUrl);
    console.log(res)
    return NextResponse.json({ message: "ok" });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "not ok" });
    
  }
}