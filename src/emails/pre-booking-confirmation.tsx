import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";

type Props = {
  contractNumber: string;
  tierLabel: string;
};

export default function PreBookingConfirmationEmail({ contractNumber, tierLabel }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your ApnaTree pre-booking is confirmed.</Preview>
      <Body style={styles.body}>
        <Container style={styles.card}>
          <Heading style={styles.h1}>You&apos;re in the grove queue.</Heading>
          <Text style={styles.meta}>Contract {contractNumber}</Text>
          <Text style={styles.text}>Tier: {tierLabel}</Text>
          <Section style={styles.callout}>
            <Text style={styles.textMuted}>
              The pre-booking allocation secures priority placement and is non-refundable once stewardship billing opens —
              subject to our allocation SLA outlined at checkout.
            </Text>
          </Section>
          <Text style={styles.footer}>Need guidance? Reply to this thread or write concierge@apnatree.in.</Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: { backgroundColor: "#fdf6e9", padding: "32px 16px", fontFamily: "Georgia, serif" },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "28px",
    border: "1px solid rgba(26,46,26,0.15)",
  },
  h1: { color: "#1a2e1a", fontSize: "28px", margin: "0 0 16px" },
  meta: { color: "#c8972a", fontWeight: 600, marginBottom: "8px" },
  text: { color: "#1c1c1c", lineHeight: 1.6, marginBottom: "8px" },
  textMuted: { color: "#4d4d4d", lineHeight: 1.6, margin: 0 },
  callout: {
    marginTop: "16px",
    padding: "16px",
    borderRadius: "12px",
    backgroundColor: "rgba(200,151,42,0.08)",
  },
  footer: { fontSize: "12px", color: "#666", marginTop: "24px" },
};
