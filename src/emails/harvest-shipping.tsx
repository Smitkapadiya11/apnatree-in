import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";

type Props = {
  season: string;
  trackingNumber?: string | null;
};

export default function HarvestShippingEmail({ season, trackingNumber }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Harvest crates shipped · {season}</Preview>
      <Body style={{ backgroundColor: "#fdf6e9", padding: "32px 16px" }}>
        <Container style={{ backgroundColor: "#ffffff", borderRadius: 16, padding: 28 }}>
          <Heading style={{ color: "#1a2e1a" }}>Mangoes rolling toward you.</Heading>
          <Text style={{ color: "#333" }}>Season {season}</Text>
          {trackingNumber ? (
            <Text style={{ fontWeight: 600 }}>Tracking · {trackingNumber}</Text>
          ) : (
            <Text>Courier details appear inside Harvest as soon as manifests sync.</Text>
          )}
        </Container>
      </Body>
    </Html>
  );
}
