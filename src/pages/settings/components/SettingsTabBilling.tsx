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
import { orderBy } from "lodash";
import { Vertical } from "mantine-layout-components";
import getSubscriptions from "src/features/lemon-squeezy-subscriptions/queries/getSubscriptions";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import {
  capitalizeWords,
  formatToDollars,
  openUrlInNewTab,
} from "src/utils/utils";

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

  let cardBrand = capitalizeWords(card_brand);

  let ccNumber = `**** **** **** ${card_last_four}`;

  const subPrice = formatToDollars(subscription.variant?.price);

  return (
    <Card miw={200}>
      <Vertical fullW fullH>
        <Title order={4}>
          {product_name} @ {subPrice} - {variant_name}
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
  const sortedSubscriptions = orderBy(
    subscriptions,
    (s) => (s.status === LemonSqueezySubscriptionStatus.active ? 1 : 0),
    "desc",
  );

  return (
    <Vertical>
      <Text fw={"bold"}>My Subscriptions</Text>
      {sortedSubscriptions.map((subscription) => (
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
