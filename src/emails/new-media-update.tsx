import { Body, Button, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";

type Props = {
  caption?: string | null;
  count?: number;
  dashboardUrl: string;
};

export default function NewMediaUpdateEmail({ caption, count = 1, dashboardUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>
        {count > 1 ? `${count} fresh captures from your Gir canopy.` : "Fresh imagery from your Gir canopy."}
      </Preview>
      <Body style={{ backgroundColor: "#fdf6e9", padding: "32px 16px" }}>
        <Container style={{ backgroundColor: "#ffffff", borderRadius: 16, padding: 28 }}>
          <Heading style={{ color: "#1a2e1a" }}>Your tree just whispered hello.</Heading>
          {caption ? <Text style={{ color: "#444", fontStyle: "italic" }}>{caption}</Text> : null}
          <Button href={dashboardUrl} style={{ backgroundColor: "#c8972a", color: "#1c1c1c", padding: "12px 20px", borderRadius: 999 }}>
            Open gallery
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
