import { BlitzPage, Routes } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Button, Modal, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { Vertical } from "mantine-layout-components";
import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
import { EditProfileForm } from "src/features/users/forms/EditProfileForm";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import updateProfile from "src/features/users/mutations/updateProfile";
import getUserForProfile from "src/features/users/queries/getUserForProfile";
import {
  UpdateProfileInput,
  UpdateProfileInputType,
} from "src/features/users/schemas";
import { useStringParam } from "src/utils/utils";

export const ProfilePage: BlitzPage = () => {
  const username = useStringParam("username");
  const [user] = useQuery(
    getUserForProfile,
    { username: username || "" },
    { enabled: !!username },
  );

  const form = useForm<UpdateProfileInputType>({
    initialValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  });

  const router = useRouter();

  const [$updateProfile, { isLoading }] = useMutation(updateProfile);

  const [opened, { open, close }] = useDisclosure(false);

  const currentUser = useCurrentUser();

  const isOwner = currentUser?.id === user?.id;

  if (!user) return <Text>User not found 😞 </Text>;

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit Profile">
        <EditProfileForm
          form={form}
          onSubmit={async (values) => {
            await $updateProfile(values);
            const { username } = values;
            if (username !== user.username) {
              if (username) {
                router.push(Routes.ProfilePage({ username }));
              }
            }
            showNotification({
              color: "green",
              title: "Success!",
              message: "Profile updated!",
            });
            close();
          }}
          isSubmitting={isLoading}
        />
      </Modal>

      <Layout>
        <Vertical>
          {isOwner && <Button onClick={open}>Edit Profile</Button>}
          <Text>Hello {user.name}</Text>
          <Text>{user.bio}</Text>
        </Vertical>
      </Layout>
    </>
  );
};

export default ProfilePage;
