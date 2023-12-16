import { BlitzPage } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Button, Select } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import { useState } from "react";
import sendBulkEmail from "src/features/email/mutations/sendBulkEmail";
import { EmailList } from "src/features/email/types";

const options = [
  { value: EmailList.Marketing, label: "Marketing" },
  { value: EmailList.Product, label: "Product" },
  { value: EmailList.All, label: "All" },
];

export const AdminPageEmailTab: BlitzPage = () => {
  const [list, setList] = useState<EmailList>(EmailList.Marketing);
  const [$sendBulkEmail] = useMutation(sendBulkEmail);

  return (
    <Vertical>
      <Select
        label="Choose Email List"
        placeholder="Pick one"
        data={options}
        value={list}
        onChange={(value) => setList(value as EmailList)}
      />
      <Button
        onClick={() => {
          $sendBulkEmail({ list });
        }}
      >
        Send bulk email
      </Button>
    </Vertical>
  );
};

export default AdminPageEmailTab;
