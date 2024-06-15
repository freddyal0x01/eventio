import { Group } from "@mantine/core";
import { GoogleButton, TwitterButton } from "./SocialButtons";

export default function SocialButtonsAuth() {
  return (
    <Group grow mb="md" mt="md">
      <GoogleButton radius="xl">Google</GoogleButton>
      <TwitterButton radius="xl">Twitter</TwitterButton>
    </Group>
  );
}
