import { BlitzPage } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Button } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import { AuthenticationForm } from "src/core/components/MainAuthenticationForm";
import Layout from "src/core/layouts/Layout";
import adminOnlyMutation from "src/features/auth/mutations/adminOnlyMutation";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";

const Home: BlitzPage = () => {
  const user = useCurrentUser();

  const [$adminOnlyMutation] = useMutation(adminOnlyMutation);

  return (
    <Layout title="Home">
      {user && (
        <Vertical>
          <Button
            onClick={() => {
              $adminOnlyMutation({});
            }}
          >
            Admin only button
          </Button>
        </Vertical>
      )}
      {!user && (
        <Vertical center fullW fullH>
          <AuthenticationForm />
        </Vertical>
      )}
    </Layout>
  );
};

export default Home;
