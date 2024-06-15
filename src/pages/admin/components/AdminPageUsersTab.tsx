import { BlitzPage } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Button, Pagination, Table, Title } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { Vertical } from "mantine-layout-components";
import { useRouter } from "next/router";
import impersonateUser from "src/features/admin/mutations/impersonateUser";
import getAllUsers from "src/features/admin/queries/getAllUsers";
import getUserCount from "src/features/admin/queries/getUserCount";

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
  const usersPerPage = 25;
  const [userCount] = useQuery(getUserCount, {});
  const totalPages = Math.ceil(userCount / usersPerPage);
  const pagination = usePagination({ total: totalPages, initialPage: 1 });

  const [users] = useQuery(getAllUsers, {
    usersPerPage,
    activePage: pagination.active,
  });

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
        <Pagination
          onChange={pagination.setPage}
          value={pagination.active}
          total={totalPages}
        />
      </Vertical>
    </Vertical>
  );
};

export default AdminPageUsersTab;
