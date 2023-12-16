import { BlitzPage } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { ActionIcon, Button, Input, Select } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { Horizontal, Vertical } from "mantine-layout-components";
import { useState } from "react";
import { UseArray, useArray } from "react-hanger";
import sendBulkEmail from "src/features/email/mutations/sendBulkEmail";
import { emailTemplates } from "src/features/email/templates";
import { EmailList, EmailTemplate } from "src/features/email/types";
import { updateArrayMemberById } from "src/utils/react-hanger-utils";
import { convertArrayToObject } from "src/utils/utils";
import { ReactFC } from "types";

const options = [
  { value: EmailList.Marketing, label: "Marketing" },
  { value: EmailList.Product, label: "Product" },
  { value: EmailList.All, label: "All" },
];

type VariableType = {
  id: string;
  key: string;
  value: string;
};

type Variables = UseArray<any>;

const Variable: ReactFC<{ variable: VariableType; variables: Variables }> = ({
  variable,
  variables,
}) => {
  return (
    <Horizontal>
      <ActionIcon
        color="red"
        onClick={() => {
          variables.removeById(variable.id);
        }}
      >
        <IconTrash size={13} />
      </ActionIcon>
      <Input
        onChange={(e) => {
          updateArrayMemberById({
            array: variables,
            id: variable.id,
            update: {
              key: e.target.value,
            },
          });
        }}
        placeholder="Key"
        value={variable.key}
      />
      <Input
        onChange={(e) => {
          updateArrayMemberById({
            array: variables,
            id: variable.id,
            update: {
              value: e.target.value,
            },
          });
        }}
        placeholder="Value"
        value={variable.value}
      />
    </Horizontal>
  );
};

const VariablesManager: ReactFC<{
  variables: Variables;
}> = ({ variables }) => {
  return (
    <Vertical>
      <Button
        onClick={() =>
          variables.push({
            id: Math.random().toString(),
            key: "",
            value: "",
          })
        }
      >
        Add a variable
      </Button>

      <Vertical>
        {variables.value.map((v) => (
          <Variable variables={variables} variable={v} key={v.id} />
        ))}
      </Vertical>
    </Vertical>
  );
};

export const AdminPageEmailTab: BlitzPage = () => {
  const [list, setList] = useState<EmailList>(EmailList.Marketing);
  const [template, setTemplate] = useState<EmailTemplate>(
    emailTemplates[0]!.value,
  );

  const variables = useArray([]);

  const [$sendBulkEmail] = useMutation(sendBulkEmail);

  const foundTemplate = emailTemplates.find((t) => t.value === template);

  const componentProps = convertArrayToObject(variables.value);

  console.log("Component Props", componentProps);

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
        <VariablesManager variables={variables} />
        <Button
          onClick={() => {
            $sendBulkEmail({ list, template });
          }}
        >
          Send bulk email
        </Button>
      </Vertical>
      {/*@ts-ignore*/}
      {foundTemplate && <foundTemplate.component props={componentProps} />}
    </Horizontal>
  );
};

export default AdminPageEmailTab;
