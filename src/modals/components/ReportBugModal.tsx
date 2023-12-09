import { Button } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { Horizontal, Vertical } from "mantine-layout-components";
import { ReactFC } from "types";

type InnerProps = {};

export const ReportBugModalComponent: ReactFC<
  ContextModalProps<InnerProps>
> = ({ context, id, innerProps }) => {
  const {} = innerProps;

  const handleCloseModal = () => context.closeModal(id);

  return (
    <Vertical fullW spacing={15}>
      <Vertical>Hello from ReportBugModal modal</Vertical>
      <Horizontal fullW spaceBetween>
        <Button color="gray" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log("submit");
          }}
        >
          Submit
        </Button>
      </Horizontal>
    </Vertical>
  );
};
