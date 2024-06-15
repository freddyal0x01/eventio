import { useMutation } from "@blitzjs/rpc";
import { Button, Card, PasswordInput, Text, Title } from "@mantine/core";
import { Form, useForm, zodResolver } from "@mantine/form";
import { Vertical } from "mantine-layout-components";
import changePasswordForLoggedIn from "src/features/auth/mutations/changePasswordForLoggedIn";
import {
  ChangePasswordInput,
  ChangePasswordInputType,
} from "src/features/auth/schemas";

export const SettingsTabChangePassword = () => {
  const [$changePasswordForLoggedIn, { isLoading, isSuccess }] = useMutation(
    changePasswordForLoggedIn,
  );

  const form = useForm<ChangePasswordInputType>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(ChangePasswordInput),
  });

  return (
    <Card withBorder w={"100%"} maw={300}>
      {isSuccess && <Text>Password successfully changed</Text>}
      {!isSuccess && (
        <Vertical fullW>
          <Title order={4}>Change Password</Title>
          <Vertical fullW>
            <Form
              style={{
                width: "100%",
              }}
              onSubmit={async (values) => {
                await $changePasswordForLoggedIn(values);
              }}
              form={form}
            >
              <Vertical fullW>
                <PasswordInput
                  w={"100%"}
                  withAsterisk
                  label="Current Password"
                  {...form.getInputProps("currentPassword")}
                />
                <PasswordInput
                  w={"100%"}
                  withAsterisk
                  label="New Password"
                  {...form.getInputProps("newPassword")}
                />
                <PasswordInput
                  w={"100%"}
                  withAsterisk
                  label="New Password Confirmation"
                  {...form.getInputProps("newPasswordConfirmation")}
                />
                <Button
                  loading={isLoading}
                  disabled={!form.isValid()}
                  type="submit"
                >
                  Submit
                </Button>
              </Vertical>
            </Form>
          </Vertical>
        </Vertical>
      )}
    </Card>
  );
};

export default SettingsTabChangePassword;
