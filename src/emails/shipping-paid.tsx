import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";

type Props = {
  season: string;
};

export default function ShippingPaidEmail({ season }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Shipping paid · {season}</Preview>
      <Body style={{ backgroundColor: "#fdf6e9", padding: "32px 16px" }}>
        <Container style={{ backgroundColor: "#ffffff", borderRadius: 16, padding: 28 }}>
          <Heading style={{ color: "#1a2e1a" }}>Dispatch lane unlocked</Heading>
          <Text style={{ color: "#333" }}>Season {season}: freight charges cleared. Packing begins shortly.</Text>
        </Container>
      </Body>
    </Html>
  );
}
