import { Button, Modal } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { Horizontal, Vertical } from "mantine-layout-components";
import { useBoolean } from "react-hanger";
import { ReactFC } from "types";

type InnerProps = {
  price: number;
};

export const BecomeProModalComponent: ReactFC<
  ContextModalProps<InnerProps>
> = ({ context, id, innerProps }) => {
  const { price } = innerProps;

  const tellMeMoreOpened = useBoolean(false);

  const closeModal = () => context.closeModal(id);

  return (
    <Vertical fullW spacing={15}>
      <Vertical>You can purchase pro for ${price}</Vertical>
      <Button onClick={tellMeMoreOpened.setTrue}>Tell me more</Button>
      <Modal
        overlayProps={{
          blur: 2,
        }}
        title="Pro Plan Details"
        zIndex={210}
        opened={tellMeMoreOpened.value}
        onClose={tellMeMoreOpened.setFalse}
      >
        More information about the pro plan
      </Modal>
      <Horizontal fullW spaceBetween>
        <Button color="gray" onClick={closeModal}>
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
