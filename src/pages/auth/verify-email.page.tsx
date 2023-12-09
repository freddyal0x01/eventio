import { BlitzPage } from "@blitzjs/next";
import { Text } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import Layout from "src/core/layouts/Layout";
import { useStringQueryParam } from "src/utils/utils";

export const VerifyEmailPage: BlitzPage = () => {
  const token = useStringQueryParam("token");
  return (
    <Layout>
      <Vertical>
        <Text>Token is {token}</Text>
      </Vertical>
    </Layout>
  );
};

export default VerifyEmailPage;
