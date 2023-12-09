import {
  Button,
  FileInput,
  Loader,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Form } from "@mantine/form";
import { UseFormReturnType } from "@mantine/form/lib/types";
import { showNotification } from "@mantine/notifications";
import { IconPhoto } from "@tabler/icons-react";
import { Horizontal, Vertical } from "mantine-layout-components";
import { useBoolean } from "react-hanger";
import { useUploadThing } from "src/core/components/UploadThing";
import { ReactFC } from "types";
import { UpdateProfileInputType } from "../schemas";

export const EditProfileForm: ReactFC<{
  form: UseFormReturnType<UpdateProfileInputType>;
  onSubmit: (values: UpdateProfileInputType) => Promise<void>;
  isSubmitting: boolean;
}> = ({ onSubmit, form, isSubmitting }) => {
  const loading = useBoolean(false);
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (files) => {
      loading.setFalse();
      const fileKey = files?.[0]?.key;
      if (fileKey) {
        form.setFieldValue("avatarImageKey", fileKey);
      }
    },
    onUploadError: () => {
      loading.setFalse();
      showNotification({
        message: "Image upload failed",
        color: "red",
        icon: <IconPhoto size={16} />,
      });
    },
  });

  return (
    <Form form={form} onSubmit={onSubmit}>
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
        <FileInput
          label={
            <Horizontal spacing={"xs"} center>
              <Text>Profile picture</Text>
              {loading.value && <Loader size={"xs"} />}
            </Horizontal>
          }
          disabled={loading.value}
          onChange={(files) => {
            console.log("files", files);
            loading.setTrue();
            if (files) {
              startUpload([files]);
            }
          }}
          clearable={true}
          placeholder="Profile picture"
          icon={<IconPhoto size={16} />}
        />
        <Button disabled={!form.isValid()} loading={isSubmitting} type="submit">
          Save
        </Button>
      </Vertical>
    </Form>
  );
};
