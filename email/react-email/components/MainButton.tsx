import { Button } from "@react-email/components";

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

const MainButton = (props) => {
  return <Button style={button} {...props} />;
};

export default MainButton;
