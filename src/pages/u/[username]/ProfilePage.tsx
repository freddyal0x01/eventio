import { BlitzPage, Routes } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Button, Modal, Text, TextInput, Textarea } from "@mantine/core";
import { Form, useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { Vertical } from "mantine-layout-components";
import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
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
        <Form
          form={form}
          onSubmit={async (values) => {
            console.log("The values of form", values);
            await $updateProfile(values);
            const { username } = values;
            if (username !== user.username) {
              if (username) {
                router.push(Routes.ProfilePage({ username: username }));
              }
            }
            showNotification({
              color: "green",
              title: "Success!",
              message: "Profile updated!",
            });
            close();
          }}
        >
          <Vertical fullW>
            <TextInput
              w={"100%"}
              required
              label="Name"
              placeholder="Name"
              {...form.getInputProps("name")}
            />
            <TextInput
              w={"100%"}
              required
              label="Username"
              placeholder="Username"
              {...form.getInputProps("username")}
            />
            <Textarea
              w={"100%"}
              required
              label="Bio"
              placeholder="Bio"
              {...form.getInputProps("bio")}
            />
            <Button
              disabled={!form.isValid()}
              loading={isLoading}
              type="submit"
            >
              Save
            </Button>
          </Vertical>
        </Form>
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
