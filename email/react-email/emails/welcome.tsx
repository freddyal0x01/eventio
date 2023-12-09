import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { ReactFC } from "types";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const defaultProps = {
  name: "Test User",
  emailVerifyUrl: "Test User",
};

export const EmailTemplateWelcome: ReactFC<{
  props: { name?: string | null; emailVerifyUrl?: string | null };
}> = ({ props = defaultProps }) => {
  const { name } = props;
  const welcomeMessage = name ? `Hello there ${name},` : "Hello,";
  return (
    <Html>
      <Head />
      <Preview>Welcome to Eventio</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src={`${baseUrl}/images/logo.png`}
              width="49"
              height="21"
              alt="Blitz Logo"
            />
            <Hr style={hr} />
            <Text style={paragraph}>
              {welcomeMessage} welcome to our platform
            </Text>
            <Button style={button}>Verify your account</Button>
            <Text style={paragraph}>— The Eventio team</Text>
            <Hr style={hr} />
            <Text style={footer}>
              Eventio, Magical Road, Somwhere in Freedomlandia
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplateWelcome;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
