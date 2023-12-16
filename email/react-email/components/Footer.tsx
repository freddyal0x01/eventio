import { Hr, Link, Text } from "@react-email/components";
import { emailStyles } from "../styles";

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as any,
};

export const Footer = ({ unsubscribeLink }: { unsubscribeLink?: string }) => {
  return (
    <>
      <Text style={emailStyles.paragraph}>- The Eventio team</Text>
      {unsubscribeLink && (
        <>
          <Hr style={emailStyles.hr} />
          <Text style={footer}>
            <Link href={unsubscribeLink} style={footer}>
              Unsubscribe
            </Link>
          </Text>
        </>
      )}
    </>
  );
};

export default Footer;
