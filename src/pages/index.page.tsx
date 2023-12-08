import { BlitzPage } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Button } from "@mantine/core";
import { MainAuthenticationForm } from "src/core/components/MainAuthenticationForm";
import Layout from "src/core/layouts/Layout";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import sendTestEmail from "src/features/users/mutations/sendTestEmail";

const Home: BlitzPage = () => {
  const user = useCurrentUser();

  const [$sendTestEmail] = useMutation(sendTestEmail);

  return (
    <Layout title="Home">
      <Button
        onClick={() =>
          $sendTestEmail({
            html: "<div> Hello there! </div>",
            subject: "Test email",
            to: "freddyal0x01@gmail.com",
          })
        }
      >
        Send test email
      </Button>
      {!user && <MainAuthenticationForm />}
    </Layout>
  );
};

export default Home;
