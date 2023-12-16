import { Tooltip } from "@mantine/core";
import { IconHelpCircle } from "@tabler/icons-react";

export const HelpTooltipCircle = ({ tooltip }) => (
  <Tooltip bg="gray.9" sx={{ boxShadow: "lg", color: "white" }} label={tooltip}>
    <IconHelpCircle size={18}>{tooltip}</IconHelpCircle>
  </Tooltip>
);
