import { useMutation } from "@blitzjs/rpc";
import { Checkbox } from "@mantine/core";
import setUserSetting from "src/features/users/mutations/setUserSetting";

const ToggleUserSetting = ({ settings, setting, label }) => {
  const [$setUserSetting, { isLoading }] = useMutation(setUserSetting);

  return (
    <Checkbox
      disabled={isLoading}
      onClick={() => {
        $setUserSetting({
          key: setting,
          value: !settings?.[setting],
        });
      }}
      checked={settings?.[setting]}
      label={label}
    />
  );
};

export default ToggleUserSetting;
