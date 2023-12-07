import { useMutation } from "@blitzjs/rpc";
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { Vertical } from "mantine-layout-components";
import login from "src/features/auth/mutations/login";
import signup from "src/features/auth/mutations/signup";
import { LoginInput, SignupInput } from "src/features/auth/schemas";
import { z } from "zod";
import { GoogleButton, TwitterButton } from "./SocialButtons";

type SignupFormType = z.infer<typeof SignupInput>;
type LoginFormType = z.infer<typeof LoginInput>;

export const bindCheckboxToForm = (form: any, key: string) => {
  const inputProps = form.getInputProps(key);

  return {
    ...inputProps,
    checked: inputProps.value,
  };
};

export function MainAuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);

  const [$login, { isLoading: isLoggingIn }] = useMutation(login);
  const [$signup, { isLoading: isSigningUp }] = useMutation(signup);

  const form = useForm<SignupFormType>({
    validate:
      type === "register" ? zodResolver(SignupInput) : zodResolver(LoginInput),
    validateInputOnBlur: true,
    validateInputOnChange: ["terms"],
  });

  const loading = isLoggingIn || isSigningUp;

  return (
    <Vertical mih="100vh" center fullW fullH>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome to Eventio, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form
          onSubmit={form.onSubmit((values) => {
            if (type === "login") {
              $login(values);
            } else if (type === "register") {
              $signup(values);
            }
          })}
        >
          <Stack>
            {type === "register" && (
              <TextInput
                required
                label="Name"
                placeholder="Your name"
                {...form.getInputProps("name")}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps("email")}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                {...bindCheckboxToForm(form, "terms")}
                label="I accept terms and conditions"
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button
              disabled={!form.isValid()}
              loading={loading}
              type="submit"
              radius="xl"
            >
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Vertical>
  );
}
