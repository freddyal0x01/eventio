import { useQuery } from "@blitzjs/rpc";
import { Text } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import getTodos from "src/features/todos/queries/getTodos";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";

export const UserInfo = () => {
  const currentUser = useCurrentUser();

  const [todos] = useQuery(getTodos, {});

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
