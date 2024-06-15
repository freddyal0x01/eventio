import { BlitzPage } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Button, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Vertical } from "mantine-layout-components";
import Layout from "src/core/layouts/Layout";
import forgotPassword from "src/features/auth/mutations/forgotPassword";
import {
  ForgotPasswordInput,
  ForgotPasswordInputType,
} from "src/features/auth/schemas";

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess, isLoading }] =
    useMutation(forgotPassword);

  const form = useForm<ForgotPasswordInputType>({
    initialValues: {
      email: "",
    },

    validate: zodResolver(ForgotPasswordInput),
  });

  return (
    <Layout title="Forgot Your Password?">
      <Title order={3}>Forgot your password?</Title>

      {isSuccess && (
        <Vertical>
          <Title order={3}>Request Submitted</Title>
          <p>
            If your email is in our system, you will receive instructions to
            reset your password shortly.
          </p>
        </Vertical>
      )}

      {!isSuccess && (
        <form
          onSubmit={form.onSubmit(async (values) => {
            await forgotPasswordMutation(values);
            notifications.show({
              color: "green",
              title: "Success!",
              message:
                "If your email is in our system, you will receive instructions to reset your password shortly.",
            });
          })}
        >
          <Vertical>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <Button
              disabled={!form.isValid()}
              loading={isLoading}
              type="submit"
            >
              Submit
            </Button>
          </Vertical>
        </form>
      )}
    </Layout>
  );
};

export default ForgotPasswordPage;
