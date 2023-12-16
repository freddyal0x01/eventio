import { BlitzPage } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Button } from "@mantine/core";
import { MainAuthenticationForm } from "src/core/components/MainAuthenticationForm";
import Layout from "src/core/layouts/Layout";
import sendDummyEmail from "src/features/email/mutations/sendDummyEmail";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";

const Home: BlitzPage = () => {
  const user = useCurrentUser();

  const [$sendEmail] = useMutation(sendDummyEmail);

  return (
    <Layout title="Home">
      {!user && <MainAuthenticationForm />}

      <Button
        onClick={() => {
          $sendEmail({});
        }}
      >
        Send Dummy Email
      </Button>
    </Layout>
  );
};

export default Home;
