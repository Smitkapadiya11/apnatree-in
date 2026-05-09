import "server-only";

import type { ReactElement } from "react";

import { render } from "@react-email/render";
import { Resend } from "resend";

import ContractActivatedEmail from "@/emails/contract-activated";
import ContactSubmissionEmail from "@/emails/contact-submission";
import FarmVisitEmail from "@/emails/farm-visit";
import HarvestShippingEmail from "@/emails/harvest-shipping";
import NewMediaUpdateEmail from "@/emails/new-media-update";
import PreBookingConfirmationEmail from "@/emails/pre-booking-confirmation";
import RentPaidEmail from "@/emails/rent-paid";
import ShippingPaidEmail from "@/emails/shipping-paid";
import { env } from "@/lib/env";

let resendSingleton: Resend | undefined;

function getResend(): Resend {
  const key = env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  resendSingleton ??= new Resend(key);
  return resendSingleton;
}

export async function sendEmail(message: {
  to: string;
  subject: string;
  react: ReactElement;
}): Promise<{ success: boolean }> {
  try {
    const html = await render(message.react);
    await getResend().emails.send({
      from: env.FROM_EMAIL,
      to: message.to,
      subject: message.subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function sendPreBookingConfirmationEmail(params: {
  to: string;
  contractNumber: string;
  tierLabel: string;
}) {
  return sendEmail({
    to: params.to,
    subject: "Your ApnaTree reservation is locked in",
    react: (
      <PreBookingConfirmationEmail contractNumber={params.contractNumber} tierLabel={params.tierLabel} />
    ),
  });
}

export async function sendContractActivatedEmail(params: {
  to: string;
  treeCode: string;
  contractNumber: string;
}) {
  return sendEmail({
    to: params.to,
    subject: `Your tree ${params.treeCode} is waiting in Gir`,
    react: (
      <ContractActivatedEmail contractNumber={params.contractNumber} treeCode={params.treeCode} />
    ),
  });
}

export async function sendRentPaidEmail(params: {
  to: string;
  contractNumber: string;
  yearNumber: number;
}) {
  return sendEmail({
    to: params.to,
    subject: `Annual stewardship received · Year ${params.yearNumber}`,
    react: <RentPaidEmail contractNumber={params.contractNumber} yearNumber={params.yearNumber} />,
  });
}

export async function sendNewMediaUpdateEmail(params: {
  to: string;
  caption?: string | null;
  count?: number;
}) {
  const count = params.count ?? 1;
  const subject =
    count > 1 ? `Your tree update · ${count} new moments from Gir` : "Your tree update from the Gir Forest";

  return sendEmail({
    to: params.to,
    subject,
    react: (
      <NewMediaUpdateEmail
        caption={params.caption}
        count={count}
        dashboardUrl={`${env.NEXT_PUBLIC_APP_URL}/dashboard/media`}
      />
    ),
  });
}

export async function sendContactSubmissionEmail(params: {
  to: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}) {
  return sendEmail({
    to: params.to,
    subject: `Concierge · ${params.name}`,
    react: (
      <ContactSubmissionEmail
        name={params.name}
        email={params.email}
        phone={params.phone}
        message={params.message}
      />
    ),
  });
}

export async function sendFarmVisitRequestEmail(params: {
  to: string;
  confirmationCode: string;
  visitDate: string;
  visitors: number;
}) {
  return sendEmail({
    to: params.to,
    subject: `Farm visit requested · Code ${params.confirmationCode}`,
    react: <FarmVisitEmail {...params} />,
  });
}

export async function sendHarvestShippingEmail(params: {
  to: string;
  season: string;
  trackingNumber?: string | null;
}) {
  return sendEmail({
    to: params.to,
    subject: "Your Kesar harvest is en route",
    react: <HarvestShippingEmail {...params} />,
  });
}

export async function sendShippingPaidEmail(params: { to: string; season: string }) {
  return sendEmail({
    to: params.to,
    subject: "Shipping secured · Packing underway",
    react: <ShippingPaidEmail season={params.season} />,
  });
}
