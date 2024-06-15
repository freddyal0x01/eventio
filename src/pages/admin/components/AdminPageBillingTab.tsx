import { BlitzPage } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Button, Table, Title } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import getLemonSqueezyProducts from "src/features/lemon-squeezy-products/queries/getLemonSqueezyProducts";
import getLemonSqueezyVariants from "src/features/lemon-squeezy-variants/queries/getLemonSqueezyVariants";
import populateLemonSqueezyInfo from "src/features/payments/mutations/populateLemonSqueezyInfo";

export const AdminPageBillingTab: BlitzPage = () => {
  const [$populate, { isLoading }] = useMutation(populateLemonSqueezyInfo);
  const [products] = useQuery(getLemonSqueezyProducts, {});
  const [variants] = useQuery(getLemonSqueezyVariants, {});

  const rows = products.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product._count?.subscriptions}</td>
      <td>{product.productId}</td>
      <td>{product._count?.variants}</td>
      <td>{product.attributes ? "Yes" : "No"}</td>
    </tr>
  ));

  const variantRows = variants.map((variant) => (
    <tr key={variant.id}>
      <td>{variant.id}</td>
      <td>{variant.name}</td>
      <td>{variant._count?.subscriptions}</td>
      <td>{variant.price}</td>
      <td>{variant.variantId}</td>
      <td>{variant.product?.name}</td>
      <td>{variant.attributes ? "Yes" : "No"}</td>
    </tr>
  ));

  return (
    <Vertical>
      <Button
        loading={isLoading}
        onClick={async () => {
          try {
            const result = await $populate();
            console.log(result);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Populate
      </Button>

      <Vertical fullW>
        <Title order={3}>Products</Title>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Subscriptions</th>
              <th>Product ID</th>
              <th>Variants</th>
              <th>Attributes</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Vertical>

      <Vertical fullW>
        <Title order={3}>Variants</Title>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Subscriptions</th>
              <th>Price</th>
              <th>Variant ID</th>
              <th>Product</th>
              <th>Attributes</th>
            </tr>
          </thead>
          <tbody>{variantRows}</tbody>
        </Table>
      </Vertical>
    </Vertical>
  );
};
