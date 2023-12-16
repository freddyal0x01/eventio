import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

type Options = {
  onCancel?: () => void;
  text?: string;
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

export const confirmDelete = (cb, options: Options = {}) => {
  const {
    onCancel,
    text = "Are you sure you want to delete this? This action might be irreversible.",
    title = "Confirm deletion",
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
  } = options;

  return modals.openConfirmModal({
    title,
    centered: true,
    children: <Text size="sm">{text}</Text>,
    labels: { confirm: confirmLabel, cancel: cancelLabel },
    confirmProps: { color: "red" },
    onCancel,
    onConfirm: () => {
      cb?.();
    },
  });
};

const deleteAccountMutation = () => {
  console.log("deleting account");
};

const openDeleteModal = () =>
  modals.openConfirmModal({
    title: "Delete your profile",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to delete your profile? This action is destructive
        and you will have to contact support to restore your data.
      </Text>
    ),
    labels: { confirm: "Delete account", cancel: "No don't delete it" },
    confirmProps: { color: "red" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => console.log("Confirmed"),
  });

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
</Button>;
