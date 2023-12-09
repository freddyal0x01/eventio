import { BlitzPage, Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Button, PasswordInput, Text, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Vertical } from "mantine-layout-components";
import Link from "next/link";
import Layout from "src/core/layouts/Layout";
import resetPassword from "src/features/auth/mutations/resetPassword";
import {
  ResetPasswordInput,
  ResetPasswordInputType,
} from "src/features/auth/schemas";
import { useStringQueryParam } from "src/utils/utils";

const ResetPasswordPage: BlitzPage = () => {
  const token = useStringQueryParam("token");
  const [$resetPassword, { isSuccess, isLoading }] = useMutation(resetPassword);

  const form = useForm<ResetPasswordInputType>({
    initialValues: {
      token: "",
      password: "",
      passwordConfirmation: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(ResetPasswordInput),
  });

  if (!token) return <Text>Invalid token</Text>;

  return (
    <Layout title="Reset Your Password">
      <Vertical>
        <Title order={3}>Set a New Password</Title>

        {isSuccess && (
          <Vertical>
            <Title order={3}>Password Reset Successfully</Title>
            <p>
              Go to the <Link href={Routes.Home()}>homepage</Link>
            </p>
          </Vertical>
        )}

        {!isSuccess && (
          <form
            onSubmit={form.onSubmit(async (values) => {
              await $resetPassword({ ...values, token: token as string });
            })}
          >
            <Vertical fullW>
              <PasswordInput
                w={"100%"}
                withAsterisk
                label="Password"
                {...form.getInputProps("password")}
              />
              <PasswordInput
                w={"100%"}
                withAsterisk
                label="Password Confirmation"
                {...form.getInputProps("passwordConfirmation")}
              />
              <Button
                loading={isLoading}
                disabled={!form.isValid()}
                type="submit"
              >
                Submit
              </Button>
            </Vertical>
          </form>
        )}
      </Vertical>
    </Layout>
  );
};

ResetPasswordPage.redirectAuthenticatedTo = "/";

export default ResetPasswordPage;
