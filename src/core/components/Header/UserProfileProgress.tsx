import { Routes } from "@blitzjs/next";
import { RingProgress, Tooltip } from "@mantine/core";
import Link from "next/link";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";

const UserProfileProgress = () => {
  const user = useCurrentUser();

  if (!user) return null;

  const keys = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "username",
      label: "Username",
    },
    {
      key: "bio",
      label: "Bio",
    },
    {
      key: "avatarImageKey",
      label: "Profile Picture",
    },
    {
      key: "coverImageKey",
      label: "Cover Picture",
    },
  ];

  const existingKeys = keys.filter(({ key }) => user[key]);

  const completionPercentage = Math.round(
    (existingKeys.length / keys.length) * 100,
  );

  if (completionPercentage === 100) return null;

  return (
    <Link href={Routes.EditProfilePage()}>
      <Tooltip
        color="dark"
        label={`Profile progress (${completionPercentage}%)`}
      >
        <RingProgress
          size={25}
          thickness={4}
          roundCaps
          sections={[{ value: completionPercentage, color: "cyan" }]}
        />
      </Tooltip>
    </Link>
  );
};

export default UserProfileProgress;
