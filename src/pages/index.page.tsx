import { BlitzPage } from "@blitzjs/next";
import { Button } from "@mantine/core";
import { MainAuthenticationForm } from "src/core/components/MainAuthenticationForm";
import Layout from "src/core/layouts/Layout";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";

const Home: BlitzPage = () => {
  const user = useCurrentUser();

  return (
    <Layout title="Home">
      {!user && <MainAuthenticationForm />}

      <Button>Hello there</Button>
    </Layout>
  );
};

export default Home;
