import { UserRole } from "@prisma/client";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { getAuthSession } from "@/lib/session";

/**
 * UploadThing file router (server-only runtime). Client code must only import
 * `UploadRouter` via `import type` — never import this module from Client Components.
 */
const f = createUploadthing();

export const uploadRouter = {
  treeMediaUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 10 },
    video: { maxFileSize: "256MB", maxFileCount: 10 },
  })
    .middleware(async () => {
      const session = await getAuthSession();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      const role = session.user.role;
      if (role !== UserRole.ADMIN && role !== UserRole.FIELD_AGENT) {
        throw new Error("Forbidden");
      }

      return { uploadedByUserId: session.user.id };
    })
    .onUploadComplete(async ({ file }) => ({
      ufsUrl: file.ufsUrl ?? file.url,
      key: file.key,
    })),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
