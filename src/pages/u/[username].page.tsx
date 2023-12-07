import { BlitzPage } from "@blitzjs/next";
import { useQuery } from "@blitzjs/rpc";
import { Button, Text } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import Layout from "src/core/layouts/Layout";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import getUserForProfile from "src/features/users/queries/getUserForProfile";
import { useStringParam } from "src/utils/utils";

export const ProfilePage: BlitzPage = () => {
  const username = useStringParam("username");
  const [user] = useQuery(
    getUserForProfile,
    { username: username || "" },
    { enabled: !!username },
  );

  const currentUser = useCurrentUser();

  const isOwner = currentUser?.id === user?.id;

  if (!user) return <Text>User not found 😞 </Text>;

  return (
    <Layout>
      <Vertical>
        {isOwner && <Button>Edit Profile</Button>}
        <Text>Hello {user.name}</Text>
        <Text>{user.bio}</Text>
      </Vertical>
    </Layout>
  );
};

export default ProfilePage;
