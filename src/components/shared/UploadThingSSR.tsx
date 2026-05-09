import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { uploadRouter } from "@/lib/uploadthing";

export function UploadThingSSR() {
  return <NextSSRPlugin routerConfig={extractRouterConfig(uploadRouter)} />;
}
