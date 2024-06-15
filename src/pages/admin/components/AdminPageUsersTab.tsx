import { BlitzPage } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Button, Input, Loader, Pagination, Table, Title } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { Vertical } from "mantine-layout-components";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { useInput } from "react-hanger";
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

const UserTable = ({ usersPerPage, activePage, search }) => {
  const [users] = useQuery(getAllUsers, {
    usersPerPage,
    activePage: activePage,
    search: search.value,
  });

  const userRows = users.map((user) => <UserRow key={user.id} user={user} />);

  return (
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
  );
};

export const AdminPageUsersTab: BlitzPage = () => {
  const usersPerPage = 25;
  const search = useInput("");
  const [userCount = 0] = useQuery(
    getUserCount,
    {
      search: search.value,
    },
    { suspense: false },
  );
  const totalPages = Math.ceil(userCount / usersPerPage);
  const pagination = usePagination({ total: totalPages, initialPage: 1 });

  return (
    <Vertical fullW>
      <Vertical fullW>
        <Title order={3}>Users</Title>
        <Input placeholder="Search users" {...search.eventBind} />
        <Suspense fallback={<Loader />}>
          <UserTable
            usersPerPage={usersPerPage}
            activePage={pagination.active}
            search={search}
          />
          <Pagination
            onChange={pagination.setPage}
            value={pagination.active}
            total={totalPages}
          />
        </Suspense>
      </Vertical>
    </Vertical>
  );
};

export default AdminPageUsersTab;
