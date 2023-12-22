import { useQuery } from "@blitzjs/rpc";
import {
  Badge,
  Button,
  Card,
  Divider,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { LemonSqueezySubscriptionStatus } from "@prisma/client";
import { Vertical } from "mantine-layout-components";
import getSubscriptions from "src/features/lemon-squeezy-subscriptions/queries/getSubscriptions";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import { openUrlInNewTab } from "src/utils/utils";

const Subscription = ({ subscription }) => {
  const statusMap = {
    [LemonSqueezySubscriptionStatus.active]: {
      label: "Active",
      color: "green",
    },
    [LemonSqueezySubscriptionStatus.cancelled]: {
      label: "Cancelled",
      color: "red",
    },
    [LemonSqueezySubscriptionStatus.expired]: {
      label: "Expired",
      color: "red",
    },
    [LemonSqueezySubscriptionStatus.on_trial]: {
      label: "On Trial",
      color: "yellow",
    },
    [LemonSqueezySubscriptionStatus.paused]: {
      label: "Paused",
      color: "yellow",
    },
    [LemonSqueezySubscriptionStatus.past_due]: {
      label: "Past Due",
      color: "red",
    },
    [LemonSqueezySubscriptionStatus.unpaid]: {
      label: "Unpaid",
      color: "red",
    },
  };

  const foundStatus = statusMap[subscription.status];

  const purchasedDate = subscription.createdAt;
  const formattedDate = new Date(purchasedDate).toLocaleDateString();

  const {
    product_name,
    variant_name,
    card_last_four,
    card_brand,
    urls: { customer_portal },
  } = subscription.attributes;

  const user = useCurrentUser();

  let name = user?.name || user?.username || "";

  let cardBrand = card_brand
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

  let ccNumber = `**** **** **** ${card_last_four}`;

  return (
    <Card miw={200}>
      <Vertical fullW fullH>
        <Title order={4}>
          {product_name} - {variant_name}
        </Title>
        <Text>Purchased on {formattedDate}</Text>
        <Badge color={foundStatus.color}>{foundStatus.label}</Badge>
        <Button
          size="sm"
          color="gray"
          variant="default"
          onClick={() => openUrlInNewTab(customer_portal)}
        >
          Manage subscription
        </Button>
        <Divider color="dark" my="sm" />
        <Vertical>
          <Title order={5}>Credit Card Details</Title>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Card Brand</th>
                <th>Credit Card Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{name}</td>
                <td>{cardBrand}</td>
                <td>{ccNumber}</td>
              </tr>
            </tbody>
          </Table>
        </Vertical>
      </Vertical>
    </Card>
  );
};

const SubscriptionList = ({ subscriptions }) => {
  return (
    <Vertical>
      <Text fw={"bold"}>My Subscriptions</Text>
      {subscriptions.map((subscription) => (
        <Subscription key={subscription.id} subscription={subscription} />
      ))}
    </Vertical>
  );
};

export const SettingsTabBilling = () => {
  const [subscriptions] = useQuery(getSubscriptions, {});

  return (
    <Vertical>
      <SubscriptionList subscriptions={subscriptions} />
    </Vertical>
  );
};

export default SettingsTabBilling;
