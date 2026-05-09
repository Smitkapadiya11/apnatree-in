"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { submitContactForm } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm({ whatsappHref }: { whatsappHref?: string }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await submitContactForm({
        name: values.name,
        email: values.email,
        phone: values.phone?.length ? values.phone : null,
        message: values.message,
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Message queued — our concierge replies within one business day.");
      form.reset();
    });
  });

  return (
    <div className="space-y-8">
      {whatsappHref ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="border-border inline-flex min-h-11 items-center justify-center rounded-full border px-6 text-sm font-semibold transition hover:bg-muted"
        >
          Chat on WhatsApp
        </a>
      ) : null}

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input id="contact-name" autoComplete="name" {...form.register("name")} />
            {form.formState.errors.name ? (
              <p className="text-destructive text-xs">{form.formState.errors.name.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input id="contact-email" type="email" autoComplete="email" {...form.register("email")} />
            {form.formState.errors.email ? (
              <p className="text-destructive text-xs">{form.formState.errors.email.message}</p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-phone">Phone (optional)</Label>
          <Input id="contact-phone" type="tel" autoComplete="tel" {...form.register("phone")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-message">How can we help?</Label>
          <Textarea id="contact-message" rows={6} className="rounded-2xl" {...form.register("message")} />
          {form.formState.errors.message ? (
            <p className="text-destructive text-xs">{form.formState.errors.message.message}</p>
          ) : null}
        </div>

        <Button type="submit" size="lg" className="rounded-full px-10" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </form>
    </div>
  );
}
