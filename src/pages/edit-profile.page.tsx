import { BlitzPage, Routes } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { Vertical } from "mantine-layout-components";
import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
import { EditProfileForm } from "src/features/users/forms/EditProfileForm";
import updateProfile from "src/features/users/mutations/updateProfile";
import getUserForEditingProfile from "src/features/users/queries/getUserForEditingProfile";
import { UpdateProfileInput, UpdateProfileInputType } from "src/features/users/schemas";

export const EditProfilePage: BlitzPage = () => {
  const router = useRouter();

  const [$updateProfile, {isLoading}] = useMutation(updateProfile)

  const [data] = useQuery(getUserForEditingProfile, {}, {enabled: false})

  const form = useForm<UpdateProfileInputType>({
    initialValues: {
      name: data?.name || "",
      username: data?.username || "",
      bio: data?.bio || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  });

  return (
    <Layout>
      <Vertical>
      <EditProfileForm
          form={form}
          onSubmit={async (values) => {
            await $updateProfile(values);
            const { username } = values;
            if (username) {
              router.push(Routes.ProfilePage({ username }));
            showNotification({
              color: "green",
              title: "Success!",
              message: "Profile updated!",
            });
          }
          }}
          isSubmitting={isLoading}
        />
      </Vertical>
    </Layout>
  );
};

export default EditProfilePage;
