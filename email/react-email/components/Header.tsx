import { Hr, Img } from "@react-email/components";
import { emailStyles } from "../styles";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const Header = () => {
  return (
    <>
      <Img
        src={`${baseUrl}/images/logo.png`}
        width="49"
        height="21"
        alt="Blitz Logo"
      />
      <Hr style={emailStyles.hr} />
    </>
  );
};

export default Header;
