import { useQuery } from "@blitzjs/rpc";
import { Vertical } from "mantine-layout-components";
import ToggleUserSetting from "src/core/components/ToggleUserSetting";
import getUserEmailSettings from "src/features/users/queries/getUserEmailSettings";

export const SettingsTabUserEmailSettings = () => {
  const [settings] = useQuery(getUserEmailSettings, {});

  return (
    <Vertical>
      <ToggleUserSetting
        settings={settings}
        setting="settingsEmailMarketing"
        label="Marketing emails"
      />
      <ToggleUserSetting
        settings={settings}
        setting="settingsEmailProduct"
        label="Product updates"
      />
    </Vertical>
  );
};

export default SettingsTabUserEmailSettings;
