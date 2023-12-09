import { BlitzPage } from "@blitzjs/next";
import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MainAuthenticationForm } from "src/core/components/MainAuthenticationForm";
import Layout from "src/core/layouts/Layout";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import { confirmDelete } from "src/utils/mantine-utils";

const Home: BlitzPage = () => {
  const user = useCurrentUser();

  const deleteAccountMutation = () => {
    console.log("deleting account");
  };

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is
          destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  return (
    <Layout title="Home">
      {!user && <MainAuthenticationForm />}

      <Button
        color="red"
        onClick={() => {
          confirmDelete(
            () => {
              deleteAccountMutation();
            },
            {
              confirmLabel: "Delete my account",
            },
          );
        }}
      >
        Delete account
      </Button>
    </Layout>
  );
};

export default Home;
