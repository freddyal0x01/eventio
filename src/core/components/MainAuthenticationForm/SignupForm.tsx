import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Prisma } from "db";
import { Vertical } from "mantine-layout-components";
import Link from "next/link";
import signup from "src/features/auth/mutations/signup";
import { SignupInput } from "src/features/auth/schemas";
import { ReactFC } from "types";
import { z } from "zod";
import SocialButtonsAuth from "./SocialButtonsAuth";
import type = Prisma.type;

type SignupFormType = z.infer<typeof SignupInput>;

export const SignupForm: ReactFC<{
  toggle: () => void;
}> = ({ toggle }) => {
  const [$signup, { isLoading }] = useMutation(signup);

  const form = useForm<SignupFormType>({
    validate: zodResolver(SignupInput),
    validateInputOnBlur: true,
  });

  return (
    <Vertical mih="100vh" center fullW fullH>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Eventio, register with
        </Text>

        <SocialButtonsAuth />

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form
          onSubmit={form.onSubmit((values) => {
            $signup(values);
          })}
        >
          <Stack>
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              {...form.getInputProps("name")}
              radius="md"
            />

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

            <Checkbox
              label="I accept terms and conditions"
              {...form.getInputProps("terms", { type: "checkbox" })}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              onClick={toggle}
              component="button"
              type="button"
              c="dimmed"
              size="xs"
            >
              Already have an account? Login here
            </Anchor>
            <Button
              disabled={!form.isValid()}
              loading={isLoading}
              type="submit"
              radius="xl"
            >
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </Vertical>
  );
};
