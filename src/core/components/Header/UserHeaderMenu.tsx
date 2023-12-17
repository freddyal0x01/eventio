import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Box, Indicator, Menu, Tooltip } from "@mantine/core";
import {
  IconLogout,
  IconPencil,
  IconSettings,
  IconUser,
  IconUserShield,
} from "@tabler/icons-react";
import Conditional from "conditional-wrap";
import { useRouter } from "next/router";
import logout from "src/features/auth/mutations/logout";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import { MenuItemIcon, MenuItemLink } from "../MenuItems";
import { UserAvatar } from "../UserAvatar";

const UserHeaderMenu = () => {
  const [logoutMutation] = useMutation(logout);

  const user = useCurrentUser();

  const router = useRouter();

  if (!user) return null;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Box sx={{ cursor: "pointer" }}>
          <Conditional
            condition={user.isAdmin}
            wrap={(children) => (
              <Indicator
                color="none"
                position="bottom-end"
                label={
                  <Tooltip color="dark" label="Admin">
                    <Box>
                      <IconUserShield size={13} />
                    </Box>
                  </Tooltip>
                }
              >
                {children}
              </Indicator>
            )}
          >
            <UserAvatar user={user} />
          </Conditional>
        </Box>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <MenuItemLink Icon={IconSettings} href={Routes.SettingsPage()}>
          Settings
        </MenuItemLink>
        <MenuItemLink Icon={IconPencil} href={Routes.EditProfilePage()}>
          Edit Profile
        </MenuItemLink>
        {user.isAdmin && (
          <MenuItemLink Icon={IconUserShield} href={Routes.AdminPage()}>
            Admin
          </MenuItemLink>
        )}

        {user.username && (
          <MenuItemLink
            Icon={IconUser}
            href={Routes.ProfilePage({
              username: user.username,
            })}
          >
            Go to Profile
          </MenuItemLink>
        )}

        {/* <Menu.Item
          icon={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item> */}

        <Menu.Divider />

        <MenuItemIcon
          color="red.4"
          onClick={async () => {
            await logoutMutation();
            router.push("/");
          }}
          Icon={IconLogout}
        >
          Logout
        </MenuItemIcon>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserHeaderMenu;
