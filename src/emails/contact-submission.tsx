import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";

type Props = {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
};

export default function ContactSubmissionEmail({ name, email, phone, message }: Props) {
  return (
    <Html>
      <Head />
      <Preview>New concierge message from {name}</Preview>
      <Body style={{ backgroundColor: "#fdf6e9", padding: "28px 16px", fontFamily: "Georgia, serif" }}>
        <Container style={{ backgroundColor: "#ffffff", borderRadius: 16, padding: 28 }}>
          <Heading style={{ color: "#1a2e1a" }}>Concierge inbox</Heading>
          <Text style={{ color: "#333" }}>
            <strong>Name:</strong> {name}
          </Text>
          <Text style={{ color: "#333" }}>
            <strong>Email:</strong> {email}
          </Text>
          {phone ? (
            <Text style={{ color: "#333" }}>
              <strong>Phone:</strong> {phone}
            </Text>
          ) : null}
          <Text style={{ color: "#333", whiteSpace: "pre-wrap" }}>
            <strong>Message</strong>
            <br />
            {message}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
