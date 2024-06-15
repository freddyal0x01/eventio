import { BlitzPage } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Checkbox, Text } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import Layout from "src/core/layouts/Layout";
import setUserEmailSetting from "src/features/users/mutations/setUserEmailSetting";
import getUserEmailSettingsForUnsubscribe from "src/features/users/queries/getUserEmailSettingsForUnsubscribe";
import { useStringQueryParam } from "src/utils/utils";

const ToggleUserSetting = ({ settings, setting, token, label }) => {
  const [$setUserSetting, { isLoading }] = useMutation(setUserEmailSetting);

  return (
    <Checkbox
      disabled={isLoading}
      onClick={() => {
        $setUserSetting({
          key: setting,
          value: !settings?.[setting],
          token,
        });
      }}
      checked={settings?.[setting]}
      label={label}
    />
  );
};

export const UnsubscribePage: BlitzPage = () => {
  const token = useStringQueryParam("token");

  const [settings] = useQuery(getUserEmailSettingsForUnsubscribe, {
    token: token as string,
  });

  return (
    <Layout>
      <Vertical>
        <Text>Email Settings</Text>
      </Vertical>

      <Vertical>
        <ToggleUserSetting
          token={token}
          settings={settings}
          setting="settingsEmailMarketing"
          label="Marketing emails"
        />
        <ToggleUserSetting
          token={token}
          settings={settings}
          setting="settingsEmailProduct"
          label="Product updates"
        />
      </Vertical>
    </Layout>
  );
};

export default UnsubscribePage;
