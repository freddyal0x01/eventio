import { BlitzPage } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Button, Table, Title } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import { useRouter } from "next/router";
import impersonateUser from "src/features/admin/mutations/impersonateUser";
import getAllUsers from "src/features/admin/queries/getAllUsers";

const UserRow = ({ user }) => {
  const [$impersonateUser, { isLoading }] = useMutation(impersonateUser);
  const router = useRouter();
  return (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.subscriptions.length}</td>
      <td>
        <Button
          loading={isLoading}
          onClick={async () => {
            await $impersonateUser({ userId: user.id });
            router.push("/");
          }}
          size="xs"
        >
          Impersonate
        </Button>
      </td>
    </tr>
  );
};

export const AdminPageUsersTab: BlitzPage = () => {
  const [users] = useQuery(getAllUsers, {});

  const userRows = users.map((user) => <UserRow key={user.id} user={user} />);

  return (
    <Vertical fullW>
      <Vertical fullW>
        <Title order={3}>Users</Title>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Subscriptions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{userRows}</tbody>
        </Table>
      </Vertical>
    </Vertical>
  );
};

export default AdminPageUsersTab;
