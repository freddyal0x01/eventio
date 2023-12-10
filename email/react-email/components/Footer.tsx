import { Hr, Text } from "@react-email/components";
import { emailStyles } from "../styles";

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};

export const Footer = () => {
  return (
    <>
      <Hr style={emailStyles.hr} />
      <Text style={footer}>Eventio, Magical Road, Somewhere in Poland</Text>
    </>
  );
};

export default Footer;
