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
  unsubscribeLink: "",
};

export const EmailTemplateDummy: ReactFC<{
  props: {
    name?: string | null;
    emailVerifyUrl?: string | null;
    unsubscribeLink: string;
  };
}> = ({ props = defaultProps }) => {
  const { name, unsubscribeLink } = props;
  return (
    <Html>
      <Head />
      <Preview>Welcome to Eventio</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>This is a dummy email</Text>
            <MainButton href="https://dashboard.stripe.com/login">
              This is a dummy button
            </MainButton>
            <Footer unsubscribeLink={unsubscribeLink} />
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplateDummy;
