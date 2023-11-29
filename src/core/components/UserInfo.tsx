import { Text } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";

export const UserInfo = () => {
  const currentUser = useCurrentUser();

  if (!currentUser) return null;

  return (
    <>
      <Vertical>
        <Text>
          User id: <code>{currentUser.id}</code>
        </Text>
        <Text>
          User role: <code>{currentUser.role}</code>
        </Text>
      </Vertical>
    </>
  );
};
