import { BlitzPage } from "@blitzjs/next";
import { Vertical } from "mantine-layout-components";
import { AuthenticationForm } from "src/core/components/MainAuthenticationForm";
import Layout from "src/core/layouts/Layout";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser();

  return (
    <Layout title="Home">
      {!currentUser && (
        <Vertical center fullW fullH>
          <AuthenticationForm />
        </Vertical>
      )}
    </Layout>
  );
};

export default Home;
