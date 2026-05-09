"use client";

import { MediaType } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { CalendarIcon, Check, ChevronsUpDown, ImageIcon, Loader2, VideoIcon } from "lucide-react";
import { useCallback, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { createMediaUpdate } from "@/actions/media";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { TreeMediaDropzone } from "@/components/uploadthing/tree-media-dropzone";
import { cn } from "@/lib/utils";

export type AdminContractOption = {
  id: string;
  contractNumber: string;
  userName: string | null;
  treeId: string;
  treeCode: string;
};

type StagedUpload = {
  key: string;
  url: string;
  name: string;
  mediaType: MediaType;
  caption: string;
  takenAt: Date;
};

function mimeToMediaType(mime: string): MediaType {
  return mime.startsWith("video") ? MediaType.VIDEO : MediaType.PHOTO;
}

export function MediaUploadForm({ contracts }: { contracts: AdminContractOption[] }) {
  const [query, setQuery] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selected, setSelected] = useState<AdminContractOption | null>(null);
  const [staged, setStaged] = useState<StagedUpload[]>([]);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contracts;
    return contracts.filter((row) => {
      const name = row.userName?.toLowerCase() ?? "";
      return row.contractNumber.toLowerCase().includes(q) || name.includes(q) || row.treeCode.toLowerCase().includes(q);
    });
  }, [contracts, query]);

  const handleUploadComplete = useCallback((files: { key: string; ufsUrl?: string; url?: string; name: string; type: string }[]) => {
    const normalized = files
      .map((file) => ({
        key: file.key,
        url: file.ufsUrl ?? file.url ?? "",
        name: file.name,
        mediaType: mimeToMediaType(file.type ?? ""),
        caption: "",
        takenAt: new Date(),
      }))
      .filter((file) => file.url.length > 0);

    if (normalized.length === 0) {
      toast.error("Upload completed without a public file URL. Retry the upload.");
      return;
    }

    setStaged((prev) => [...prev, ...normalized]);
  }, []);

  const handleSubmit = () => {
    if (!selected) {
      toast.error("Select an active contract before uploading.");
      return;
    }
    if (staged.length === 0) {
      toast.error("Upload at least one file.");
      return;
    }

    startTransition(async () => {
      const result = await createMediaUpdate({
        contractId: selected.id,
        treeId: selected.treeId,
        items: staged.map((row) => ({
          fileUrl: row.url,
          uploadThingKey: row.key,
          mediaType: row.mediaType,
          caption: row.caption || null,
          takenAt: row.takenAt,
        })),
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success(`Update sent to ${selected.userName ?? "your steward"}`);
      setStaged([]);
      setSelected(null);
      setQuery("");
    });
  };

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Step 1</p>
        <h2 className="font-[family-name:var(--font-heading)] text-2xl">Locate the steward contract</h2>
        <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
          <PopoverTrigger
            aria-expanded={pickerOpen}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "min-h-14 w-full max-w-xl justify-between rounded-2xl border-dashed px-4 py-6 text-left font-normal"
            )}
          >
            {selected ? (
              <span className="flex flex-col gap-1">
                <span className="text-foreground font-semibold">{selected.contractNumber}</span>
                <span className="text-muted-foreground text-sm">
                  {selected.userName ?? "Unnamed steward"} · Tree {selected.treeCode}
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">Search contract number or steward name…</span>
            )}
            <ChevronsUpDown className="text-muted-foreground size-4 shrink-0 opacity-60" />
          </PopoverTrigger>
          <PopoverContent className="w-[min(100vw-2rem,36rem)] p-0" align="start">
            <div className="border-border border-b p-3">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter by contract #, name, or tree code"
                aria-label="Search contracts"
                className="h-11 rounded-xl"
              />
            </div>
            <div className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="text-muted-foreground px-4 py-6 text-sm">No contracts match that query.</p>
              ) : (
                filtered.map((row) => (
                  <button
                    key={row.id}
                    type="button"
                    className={cn(
                      "hover:bg-accent flex w-full flex-col gap-1 px-4 py-3 text-left text-sm transition-colors",
                      selected?.id === row.id && "bg-accent"
                    )}
                    onClick={() => {
                      setSelected(row);
                      setPickerOpen(false);
                    }}
                  >
                    <span className="text-foreground flex items-center gap-2 font-semibold">
                      {row.contractNumber}
                      {selected?.id === row.id ? <Check className="text-primary size-4" /> : null}
                    </span>
                    <span className="text-muted-foreground">
                      {row.userName ?? "Unnamed steward"} · Tree {row.treeCode}
                    </span>
                  </button>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
      </section>

      <section className="space-y-4">
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Step 2</p>
        <h2 className="font-[family-name:var(--font-heading)] text-2xl">Drop bi-weekly captures</h2>
        <TreeMediaDropzone
          endpoint="treeMediaUploader"
          className="rounded-3xl border border-dashed bg-[color-mix(in_oklab,var(--accent)_4%,transparent)] p-6 ut-upload-button:bg-primary ut-upload-button:text-primary-foreground ut-label:text-sm"
          content={{
            label: "Drag photos or videos, or tap to browse",
            allowedContent: "JPEG / PNG / WebP · MP4 / MOV · up to 10 files",
          }}
          onClientUploadComplete={(files) => {
            handleUploadComplete(
              files.map((file) => ({
                key: file.key,
                ufsUrl: file.ufsUrl,
                url: file.url,
                name: file.name,
                type: file.type,
              }))
            );
          }}
          onUploadError={(error) => {
            toast.error(error.message);
          }}
        />
      </section>

      {staged.length > 0 ? (
        <section className="space-y-4">
          <p className="text-primary text-xs tracking-[0.35em] uppercase">Step 3</p>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl">Caption each capture</h2>
          <div className="grid gap-6">
            {staged.map((file, index) => (
              <div key={`${file.key}-${index}`} className="rounded-3xl border border-border/70 bg-background/80 p-4 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row">
                  <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-2xl lg:max-w-xs">
                    {file.mediaType === MediaType.PHOTO ? (
                      <Image
                        src={file.url}
                        alt={`Staging preview of ${file.name}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 320px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="text-muted-foreground flex size-full flex-col items-center justify-center gap-2">
                        <VideoIcon className="size-10" aria-hidden />
                        <span className="text-xs">{file.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="rounded-full">
                        {file.mediaType === MediaType.PHOTO ? (
                          <>
                            <ImageIcon className="mr-1 size-3" aria-hidden />
                            PHOTO
                          </>
                        ) : (
                          <>
                            <VideoIcon className="mr-1 size-3" aria-hidden />
                            VIDEO
                          </>
                        )}
                      </Badge>
                      <span className="text-muted-foreground text-xs">{file.name}</span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`caption-${file.key}`}>Caption</Label>
                      <Textarea
                        id={`caption-${file.key}`}
                        value={file.caption}
                        onChange={(e) => {
                          const value = e.target.value;
                          setStaged((prev) =>
                            prev.map((row, rowIndex) => (rowIndex === index ? { ...row, caption: value } : row))
                          );
                        }}
                        rows={3}
                        className="rounded-2xl"
                        placeholder="Describe humidity, flowering stage, fruitset…"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Captured on</Label>
                      <Popover>
                        <PopoverTrigger
                          className={cn(
                            buttonVariants({ variant: "outline" }),
                            "min-h-11 w-full max-w-xs justify-start rounded-2xl"
                          )}
                        >
                          <CalendarIcon className="mr-2 size-4" aria-hidden />
                          {format(file.takenAt, "PPP")}
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2" align="start">
                          <Calendar
                            mode="single"
                            selected={file.takenAt}
                            onSelect={(next) => {
                              if (!next) return;
                              setStaged((prev) =>
                                prev.map((row, rowIndex) => (rowIndex === index ? { ...row, takenAt: next } : row))
                              );
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          size="lg"
          className="rounded-full px-10"
          disabled={!selected || staged.length === 0 || isPending}
          onClick={handleSubmit}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
              Publishing…
            </>
          ) : (
            "Publish to steward gallery"
          )}
        </Button>
      </div>
    </div>
  );
}
