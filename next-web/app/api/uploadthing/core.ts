import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();
; // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
  .onUploadComplete((data) => {
    console.log("upload completed", data);
  }),

  pdfUploader :f({
    pdf: {
        maxFileCount: 1,
        maxFileSize: "16MB",
    },
  })
  .onUploadComplete((data) => {
    console.log("upload completed", data);
  })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
