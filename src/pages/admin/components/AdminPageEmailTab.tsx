import { BlitzPage } from "@blitzjs/next";
import { Select } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import { EmailList } from "src/features/email/types";

const options = [
  { value: EmailList.Marketing, label: "Marketing" },
  { value: EmailList.Product, label: "Product" },
  { value: EmailList.All, label: "All" },
];

export const AdminPageEmailTab: BlitzPage = () => {
  return (
    <Vertical>
      <Select label="Choose Email List" placeholder="Pick one" data={options} />
    </Vertical>
  );
};

export default AdminPageEmailTab;
