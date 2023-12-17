import { Button, TextInput, Textarea } from "@mantine/core";
import { Form } from "@mantine/form";
import { UseFormReturnType } from "@mantine/form/lib/types";
import { Vertical } from "mantine-layout-components";
import UploadThingFileInput from "src/core/components/UploadThingFileInput";
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
          label="Username"
          placeholder="Username"
          {...form.getInputProps("username")}
        />
        <Textarea
          w={"100%"}
          label="Bio"
          placeholder="Bio"
          {...form.getInputProps("bio")}
        />
        <UploadThingFileInput
          form={form}
          name="avatarImageKey"
          label="Profile picture"
        />
        <UploadThingFileInput
          form={form}
          name="coverImageKey"
          label="Cover picture"
        />
        <Button disabled={!form.isValid()} loading={isSubmitting} type="submit">
          Save
        </Button>
      </Vertical>
    </Form>
  );
};
