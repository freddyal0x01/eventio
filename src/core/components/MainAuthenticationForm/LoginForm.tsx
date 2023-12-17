import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import {
  Anchor,
  Box,
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Vertical } from "mantine-layout-components";
import Link from "next/link";
import login from "src/features/auth/mutations/login";
import { LoginInput } from "src/features/auth/schemas";
import { ReactFC } from "types";
import { z } from "zod";
import SocialButtonsAuth from "./SocialButtonsAuth";

type LoginFormType = z.infer<typeof LoginInput>;

export const LoginForm: ReactFC<{
  toggle: () => void;
}> = ({ toggle }) => {
  const [$login, { isLoading }] = useMutation(login);

  const form = useForm<LoginFormType>({
    validate: zodResolver(LoginInput),
    validateInputOnBlur: true,
  });

  return (
    <Vertical mih="100vh" center fullW fullH>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Eventio, login with
        </Text>

        <SocialButtonsAuth />

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form
          onSubmit={form.onSubmit((values) => {
            $login(values);
          })}
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps("email")}
              radius="md"
            />

            <Vertical fullW spacing={"xs"}>
              <PasswordInput
                w={"100%"}
                required
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
                radius="md"
              />
              <Box
                fz={"xs"}
                color="dimmed"
                sx={{
                  alignSelf: "end",
                }}
                component={Link}
                href={Routes.ForgotPasswordPage()}
              >
                Forgot password
              </Box>
            </Vertical>
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              onClick={toggle}
              component="button"
              type="button"
              c="dimmed"
              size="xs"
            >
              Don't have an account? Register
            </Anchor>
            <Button
              disabled={!form.isValid()}
              loading={isLoading}
              type="submit"
              radius="xl"
            >
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Vertical>
  );
};
