import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";

type Props = {
  contractNumber: string;
  yearNumber: number;
};

export default function RentPaidEmail({ contractNumber, yearNumber }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Stewardship payment recorded.</Preview>
      <Body style={{ backgroundColor: "#fdf6e9", padding: "32px 16px", fontFamily: "Georgia, serif" }}>
        <Container style={{ backgroundColor: "#fff", borderRadius: 16, padding: 28, border: "1px solid rgba(26,46,26,0.15)" }}>
          <Heading style={{ color: "#1a2e1a" }}>Payment secured</Heading>
          <Text style={{ color: "#333", lineHeight: 1.6 }}>
            Contract {contractNumber} · Stewardship year {yearNumber} is marked paid. Receipt details live inside Payments.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
