import { Button, TextInput, Textarea } from "@mantine/core";
import { Form } from "@mantine/form";
import { UseFormReturnType } from "@mantine/form/lib/types";
import { notifications } from "@mantine/notifications";
import { Vertical } from "mantine-layout-components";
import { UploadButton } from "src/core/components/UploadThing";
import { ReactFC } from "types";
import { UpdateProfileInputType } from "../schemas";

export const EditProfileForm: ReactFC<{
  form: UseFormReturnType<UpdateProfileInputType>;
  onSubmit: (values: UpdateProfileInputType) => Promise<void>;
  isSubmitting: boolean;
}> = ({ onSubmit, form, isSubmitting }) => {
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
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const fileKey = res[0]?.key;

            // Do something with the response
            console.log("Files: ", res);
            notifications.show({
              color: "green",
              title: "Success",
              message: "File uploaded!",
            });
            form.setFieldValue("avatarImageKey", fileKey);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            console.log("Error: ", error);
            notifications.show({
              color: "red",
              title: "Error",
              message: error.message,
            });
          }}
        />
        <Button disabled={!form.isValid()} loading={isSubmitting} type="submit">
          Save
        </Button>
      </Vertical>
    </Form>
  );
};
