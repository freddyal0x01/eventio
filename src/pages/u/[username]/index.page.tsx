import { BlitzPage, Routes } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Alert, Button, Image, Modal, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications, showNotification } from "@mantine/notifications";
import { IconAlertCircle } from "@tabler/icons-react";
import { Vertical } from "mantine-layout-components";
import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
import requestVerificationEmail from "src/features/auth/mutations/requestVerificationEmail";
import { EditProfileForm } from "src/features/users/forms/EditProfileForm";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import updateProfile from "src/features/users/mutations/updateProfile";
import getUserForProfile from "src/features/users/queries/getUserForProfile";
import {
  UpdateProfileInput,
  UpdateProfileInputType,
} from "src/features/users/schemas";
import { getUploadthingUrl } from "src/utils/image-utils";
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
      avatarImageKey: user?.avatarImageKey || "",
      coverImageKey: user?.coverImageKey || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  });

  const router = useRouter();

  const [$updateProfile, { isLoading }] = useMutation(updateProfile);

  const [$requestVerificationEmail, { isLoading: isSendingEmail, isSuccess }] =
    useMutation(requestVerificationEmail);

  const [opened, { open, close }] = useDisclosure(false);

  const currentUser = useCurrentUser();

  const isOwner = currentUser?.id === user?.id;

  if (!user) return <Text>User not found 😞 </Text>;

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          form.reset();
        }}
        title="Edit Profile"
      >
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
          {isOwner && !currentUser?.emailVerifiedAt && (
            <Alert
              variant="outline"
              icon={<IconAlertCircle size={"1rem"} />}
              title={isSuccess ? "Email sent" : "Warning"}
              color="red"
            >
              <Vertical>
                <Text>
                  Your email is still not verified. Please check your inbox for
                  the welcome email we have sent you.
                </Text>
                {!isSuccess && (
                  <Button
                    loading={isSendingEmail}
                    onClick={async () => {
                      await $requestVerificationEmail();
                      notifications.show({
                        color: "green",
                        title: "Success",
                        message: "Email sent!",
                      });
                    }}
                    size="sm"
                    color="red"
                    variant="light"
                  >
                    Resend email
                  </Button>
                )}
                {isSuccess && (
                  <Text>
                    The email has been sent and should arrive in the next few
                    minutes. Please be patient and check your spam folder
                  </Text>
                )}
              </Vertical>
            </Alert>
          )}
          {isOwner && <Button onClick={open}>Edit Profile</Button>}
          <Image width={"300px"} src={getUploadthingUrl(user.coverImageKey)} />
          <Text>Hello {user.name}</Text>
          <Text>{user.bio}</Text>
        </Vertical>
      </Layout>
    </>
  );
};

export default ProfilePage;
