import { BlitzPage, Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { assert } from "blitz";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
import resetPassword from "src/features/auth/mutations/resetPassword";

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter();
  const token = router.query.token?.toString();
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword);

  const form = useForm({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },

    validate: {},
  });

  let onSubmit = async (values) => {
    assert(token, "token is required.");
    await resetPasswordMutation({ ...values, token });
  };

  return (
    <Layout title="Reset Your Password">
      <h1>Set a New Password</h1>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </p>
        </div>
      ) : (
        <form onSubmit={form.onSubmit(onSubmit)}>
          <PasswordInput
            withAsterisk
            label="Password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            withAsterisk
            label="Password Confirmation"
            {...form.getInputProps("passwordConfirmation")}
          />
        </form>
      )}
    </Layout>
  );
};

ResetPasswordPage.redirectAuthenticatedTo = "/";

export default ResetPasswordPage;
