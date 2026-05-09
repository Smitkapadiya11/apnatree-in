-- AlterTable
ALTER TABLE "media_updates" ADD COLUMN IF NOT EXISTS "blurDataURL" TEXT;
ALTER TABLE "media_updates" ADD COLUMN IF NOT EXISTS "uploadThingKey" TEXT;

-- CreateTable
CREATE TABLE IF NOT EXISTS "contact_submissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);
