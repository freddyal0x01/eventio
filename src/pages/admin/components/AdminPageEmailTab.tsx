import { BlitzPage } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Button, Select } from "@mantine/core";
import { Horizontal, Vertical } from "mantine-layout-components";
import { useState } from "react";
import sendBulkEmail from "src/features/email/mutations/sendBulkEmail";
import { emailTemplates } from "src/features/email/templates";
import { EmailList, EmailTemplate } from "src/features/email/types";

const options = [
  { value: EmailList.Marketing, label: "Marketing" },
  { value: EmailList.Product, label: "Product" },
  { value: EmailList.All, label: "All" },
];

export const AdminPageEmailTab: BlitzPage = () => {
  const [list, setList] = useState<EmailList>(EmailList.Marketing);
  const [template, setTemplate] = useState<EmailTemplate>(
    emailTemplates[0]!.value,
  );
  const [$sendBulkEmail] = useMutation(sendBulkEmail);

  const foundTemplate = emailTemplates.find((t) => t.value === template);

  return (
    <Horizontal align="flex-start" mih={"100vh"} fullH>
      <Vertical>
        <Select
          label="Choose Email List"
          placeholder="Pick one"
          data={options}
          value={list}
          onChange={(value) => setList(value as EmailList)}
        />
        <Select
          label="Choose a template"
          placeholder="Pick one"
          data={emailTemplates.map((e) => ({
            value: e.value,
            label: e.name,
          }))}
          value={template}
          onChange={(value) => {
            setTemplate(value as EmailTemplate);
          }}
        />
        <Button
          onClick={() => {
            $sendBulkEmail({ list, template });
          }}
        >
          Send bulk email
        </Button>
      </Vertical>
      {/* @ts-ignore */}
      {foundTemplate && <foundTemplate.component />}
    </Horizontal>
  );
};

export default AdminPageEmailTab;
