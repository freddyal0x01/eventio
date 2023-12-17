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
  unsubscribeLink: "",
  title: "Black Friday Savings",
  mainButtonText: "Shop Now",
  text: "Default text here",
};

export const EmailTemplateBlackFriday: ReactFC<{
  props: {
    name?: string | null;
    unsubscribeLink: string;
    title?: string;
    mainButtonText?: string;
    text?: string;
  };
}> = ({ props = defaultProps }) => {
  const { unsubscribeLink, text, title, mainButtonText } = props;
  return (
    <Html>
      <Head />
      <Preview>Black Friday Savings</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>{title}</Text>
            <Text
              dangerouslySetInnerHTML={{
                __html: text as string,
              }}
            />
            <MainButton href="https://dashboard.stripe.com/login">
              {mainButtonText}
            </MainButton>
            <Footer unsubscribeLink={unsubscribeLink} />
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplateBlackFriday;
