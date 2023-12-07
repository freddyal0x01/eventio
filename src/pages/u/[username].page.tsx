import { BlitzPage } from "@blitzjs/next";
import { Text } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import Layout from "src/core/layouts/Layout";
import { useStringParam } from "src/utils/utils";

export const ProfilePage: BlitzPage = () => {
  const username = useStringParam("username");

  return (
    <Layout>
      <Vertical>
        <Text>Hello {username}</Text>
      </Vertical>
    </Layout>
  );
};

export default ProfilePage;
