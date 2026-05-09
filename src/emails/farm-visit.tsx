import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";

type Props = {
  confirmationCode: string;
  visitDate: string;
  visitors: number;
};

export default function FarmVisitEmail({ confirmationCode, visitDate, visitors }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Visit code {confirmationCode}</Preview>
      <Body style={{ backgroundColor: "#fdf6e9", padding: "32px 16px" }}>
        <Container style={{ backgroundColor: "#fff", padding: 28, borderRadius: 16 }}>
          <Heading style={{ color: "#1a2e1a" }}>Farm pilgrimage logged</Heading>
          <Text style={{ fontSize: 36, fontWeight: 700, color: "#c8972a", letterSpacing: 6 }}>{confirmationCode}</Text>
          <Text style={{ color: "#333" }}>
            {visitDate} · {visitors} guest(s). Present this code at the orchard gate. Travel + lodging remain self-managed per policy.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
