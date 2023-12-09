import { BlitzPage } from "@blitzjs/next";
import { useQuery } from "@blitzjs/rpc";
import { Text } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import Layout from "src/core/layouts/Layout";
import verifyEmailToken from "src/features/auth/queries/verifyEmailToken";
import { useStringQueryParam } from "src/utils/utils";

export const VerifyEmailPage: BlitzPage = () => {
  const token = useStringQueryParam("token");

  const [result, { isSuccess, error }] = useQuery(
    verifyEmailToken,
    {
      token: token as any,
    },
    {
      enabled: !!token,
    },
  );

  return (
    <Layout>
      <Vertical>
        <>
          {result && isSuccess && <Text>Email verified!</Text>}
          {error && <Text>Invalid token</Text>}
        </>
      </Vertical>
    </Layout>
  );
};

export default VerifyEmailPage;
