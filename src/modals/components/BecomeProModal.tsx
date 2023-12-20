import { useMutation } from "@blitzjs/rpc";
import { Button, Text } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { Horizontal, Vertical } from "mantine-layout-components";
import generateCheckoutLink from "src/features/payments/mutations/generateCheckoutLink";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import { openUrlInNewTab } from "src/utils/utils";
import { ReactFC } from "types";

type InnerProps = {
  price: number;
};

export const BecomeProModalComponent: ReactFC<
  ContextModalProps<InnerProps>
> = ({ context, id, innerProps }) => {
  const { price } = innerProps;

  const user = useCurrentUser();

  const [$generateCheckoutLink, { isLoading }] =
    useMutation(generateCheckoutLink);

  let onPurchaseClick = async () => {
    const checkoutUrl = await $generateCheckoutLink({});
    openUrlInNewTab(checkoutUrl);
  };

  const closeModal = () => context.closeModal(id);

  return (
    <Vertical fullW spacing={15}>
      {!user?.hasLifetimeAccess && (
        <>
          <Vertical>You can purchase pro for ${price}</Vertical>
          <Horizontal fullW spaceBetween>
            <Button color="gray" onClick={closeModal}>
              Cancel
            </Button>
            <Button loading={isLoading} onClick={onPurchaseClick}>
              Purchase
            </Button>
          </Horizontal>
        </>
      )}
      {user?.hasLifetimeAccess && (
        <Vertical>
          <Text>Thank you for being a customer!</Text>
          <Button color="gray" onClick={closeModal}>
            Cancel
          </Button>
        </Vertical>
      )}
    </Vertical>
  );
};
