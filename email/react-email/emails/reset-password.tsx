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
  resetPasswordUrl: "http://localhost:3000",
};

export const EmailTemplateResetPassword: ReactFC<{
  props: { resetPasswordUrl: string };
}> = ({ props = defaultProps }) => {
  const { resetPasswordUrl } = props;
  return (
    <Html>
      <Head />
      <Preview>Reset your password for Eventio</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>
              You recently requested to reset your password for your Eventio
              account. Click the button below to reset it. If you didn't request
              this change, you can ignore this email.
            </Text>
            <MainButton href={resetPasswordUrl}>Reset your password</MainButton>
            <Footer />
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplateResetPassword;
