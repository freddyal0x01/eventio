import { ButtonProps, MantineThemeOverride } from "@mantine/core";

const ButtonDefaultProps: Partial<ButtonProps> = {
  size: "md",
  variant: "light",
};

export const theme: MantineThemeOverride = {
  loader: "bars",
  cursorType: "pointer",
  primaryColor: "violet",
  components: {
    Button: {
      defaultProps: ButtonDefaultProps,
    },
  },
};
