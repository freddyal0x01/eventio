import { useMutation } from "@blitzjs/rpc";
import { Button, Text } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { Horizontal, Vertical } from "mantine-layout-components";
import { paymentPlans } from "src/features/payments/lemon/config";
import generateCheckoutLink from "src/features/payments/mutations/generateCheckoutLink";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import { openUrlInNewTab } from "src/utils/utils";
import { ReactFC } from "types";

type InnerProps = {
  price: number;
};

const PaymentPlan: ReactFC<{
  plan: (typeof paymentPlans)[0];
}> = ({ plan }) => {
  const [$generateCheckoutLink, { isLoading }] =
    useMutation(generateCheckoutLink);

  let choosePlan = async ({ variantId }) => {
    const checkoutUrl = await $generateCheckoutLink({ variantId });
    openUrlInNewTab(checkoutUrl);
  };

  return (
    <Vertical>
      <Button
        loading={isLoading}
        onClick={() => choosePlan({ variantId: plan.variantId })}
      >
        {plan.name} (${plan.price}) {plan.description}
      </Button>
    </Vertical>
  );
};

export const BecomeProModalComponent: ReactFC<
  ContextModalProps<InnerProps>
> = ({}) => {
  const user = useCurrentUser();

  return (
    <Vertical fullW spacing={15}>
      {!user?.hasLifetimeAccess && (
        <>
          <Vertical>Choose billing plan</Vertical>
          <Horizontal fullW spaceBetween>
            {paymentPlans.map((plan) => (
              <PaymentPlan plan={plan} key={plan.variantId} />
            ))}
          </Horizontal>
        </>
      )}
      {user?.hasLifetimeAccess && (
        <Vertical>
          <Text>Thank you for being a customer!</Text>
        </Vertical>
      )}
    </Vertical>
  );
};
