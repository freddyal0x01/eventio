import Layout from "src/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import { UserInfo } from "src/core/components/UserInfo";
import { AuthenticationForm } from "src/core/components/MainAuthenticationForm";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import { Vertical } from "mantine-layout-components";

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser();

  return (
    <Layout title="Home">
      {currentUser && <UserInfo />}
      {!currentUser && (
        <Vertical center fullW fullH>
          <AuthenticationForm />
        </Vertical>
      )}
    </Layout>
  );
};

export default Home;
