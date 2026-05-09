import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";

type Props = {
  contractNumber: string;
  treeCode: string;
};

export default function ContractActivatedEmail({ contractNumber, treeCode }: Props) {
  return (
    <Html>
      <Head />
      <Preview>{treeCode} is officially yours to steward.</Preview>
      <Body style={{ backgroundColor: "#1a2e1a", padding: "32px 16px" }}>
        <Container style={{ backgroundColor: "#fdf6e9", borderRadius: 18, padding: 28 }}>
          <Heading style={{ color: "#1a2e1a", fontSize: 30 }}>Assigned canopy</Heading>
          <Text style={{ color: "#c8972a", fontSize: 32, fontWeight: 700, letterSpacing: 4 }}>{treeCode}</Text>
          <Text style={{ color: "#333", lineHeight: 1.6 }}>
            Contract {contractNumber} is awaiting stewardship billing inside your dashboard. First bi-weekly media drop arrives within fifteen days of activation.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
