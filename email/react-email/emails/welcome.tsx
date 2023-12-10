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
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>
              {welcomeMessage} welcome to our platform
            </Text>
            <MainButton href="https://dashboard.stripe.com/login">
              Click here to verify your account
            </MainButton>
            <Footer />
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplateWelcome;
