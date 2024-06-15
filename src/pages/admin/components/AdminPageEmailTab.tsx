import { BlitzPage } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import {
  ActionIcon,
  Button,
  Input,
  Select,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { IconPencil, IconTextResize, IconTrash } from "@tabler/icons-react";
import RichTextEditorTextArea from "email/react-email/components/RichTextEditorTextArea";
import { Horizontal, Vertical } from "mantine-layout-components";
import { useState } from "react";
import { UseArray, useArray, useInput } from "react-hanger";
import sendBulkEmail from "src/features/email/mutations/sendBulkEmail";
import { emailTemplates } from "src/features/email/templates";
import {
  EmailList,
  EmailTemplate,
  SpecialVariables,
  VariableType,
} from "src/features/email/types";
import { remapVariables } from "src/features/email/utils";
import { updateArrayMemberById } from "src/utils/react-hanger-utils";
import { convertArrayToObject } from "src/utils/utils";
import { ReactFC } from "types";

const options = [
  { value: EmailList.Marketing, label: "Marketing" },
  { value: EmailList.Product, label: "Product" },
  { value: EmailList.All, label: "All" },
];

type Variables = UseArray<any>;

const Variable: ReactFC<{ variable: VariableType; variables: Variables }> = ({
  variable,
  variables,
}) => {
  const updateVariable = (update: Partial<VariableType>) => {
    updateArrayMemberById({
      array: variables,
      id: variable.id,
      update,
    });
  };

  const writingElementProps = {
    onChange: (e) => {
      updateVariable({ value: e.target.value });
    },
    placeholder: "Value",
    value: variable.value,
  };

  const writingTextElementProps = {
    onChange: (e) => {
      updateVariable({ value: e });
    },
    placeholder: "Value",
    value: variable.value,
  };

  return (
    <Horizontal>
      <Horizontal spacing={"xs"}>
        <ActionIcon
          variant="light"
          color="red"
          onClick={() => {
            variables.removeById(variable.id);
          }}
        >
          <IconTrash size={13} />
        </ActionIcon>
        <Tooltip
          label={`Change to ${variable.isTextArea ? "input" : "textarea"}`}
        >
          <ActionIcon
            variant="light"
            onClick={() => {
              updateVariable({ isTextArea: !variable.isTextArea });
            }}
          >
            {variable.isTextArea ? (
              <IconTextResize size={13} />
            ) : (
              <IconPencil size={13} />
            )}
          </ActionIcon>
        </Tooltip>
      </Horizontal>
      <Input
        onChange={(e) => {
          updateVariable({ key: e.target.value });
        }}
        placeholder="Key"
        value={variable.key}
      />
      {variable.isTextArea && variable.key !== "text" && (
        <Textarea minRows={10} w={300} {...writingElementProps} />
      )}
      {variable.isTextArea && variable.key === "text" && (
        <RichTextEditorTextArea {...writingTextElementProps} />
      )}
      {!variable.isTextArea && <Input {...writingElementProps} />}
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

let specialVariables: SpecialVariables = {
  userName: "John Doe",
  userEmail: "john@doe.com",
  userId: "1234",
  userBio: "I'm a dev",
  userUsername: "johndoe",
  userAvatarImageKey: "https://pics.commmmmmmmmm",
};

export const AdminPageEmailTab: BlitzPage = () => {
  const [list, setList] = useState<EmailList>(EmailList.Marketing);
  const [template, setTemplate] = useState<EmailTemplate>(
    emailTemplates[0]!.value,
  );

  const variables = useArray<VariableType>([]);

  const subject = useInput("");

  const [$sendBulkEmail] = useMutation(sendBulkEmail);

  const foundTemplate = emailTemplates.find((t) => t.value === template);

  const remappedVariables = remapVariables({
    variables: variables.value,
    specialVariables: specialVariables,
  });

  const componentProps = convertArrayToObject(remappedVariables);

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

        <Input placeholder="Subject" {...subject.eventBind} />

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
            $sendBulkEmail({
              list,
              template,
              subject: subject.value,
              variables: variables.value.map((v) => ({
                key: v.key,
                value: v.value,
              })),
            });
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
