import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { ReactFC } from "types";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainButton from "../components/MainButton";
import { emailStyles } from "../styles";

const defaultProps = {
  emailVerifyUrl: "Test User",
};

export const EmailTemplateVerifyEmail: ReactFC<{
  props: { emailVerifyUrl: string };
}> = ({ props = defaultProps }) => {
  const { emailVerifyUrl } = props;
  return (
    <Html>
      <Head />
      <Preview>Verify your email for Eventio</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>
              Hello, you requested this email for verifying your account. If you
              didn't request it, please ignore it.
            </Text>
            <MainButton href={emailVerifyUrl}>Verify your account</MainButton>
            <Footer />
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplateVerifyEmail;
