import { BlitzPage } from "@blitzjs/next";
import { Tabs } from "@mantine/core";
import {
  IconCreditCard,
  IconMail,
  IconSettings,
  IconUserCog,
} from "@tabler/icons-react";
import { Vertical } from "mantine-layout-components";
import Layout from "src/core/layouts/Layout";
import SettingsTabBilling from "./components/SettingsTabBilling";
import SettingsTabChangePassword from "./components/SettingsTabChangePassword";
import SettingsTabUserEmailSettings from "./components/SettingsTabUserEmailSettings";

export const SettingsPage: BlitzPage = () => {
  return (
    <Layout>
      <Vertical fullW>
        <Tabs w={"100%"} orientation="vertical" defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab value="account" icon={<IconUserCog size="0.8rem" />}>
              Account
            </Tabs.Tab>
            <Tabs.Tab value="email" icon={<IconMail size="0.8rem" />}>
              Email
            </Tabs.Tab>
            <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>
              Settings
            </Tabs.Tab>
            <Tabs.Tab value="billing" icon={<IconCreditCard size="0.8rem" />}>
              Billing
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="account" pl="xs">
            <SettingsTabChangePassword />
          </Tabs.Panel>

          <Tabs.Panel value="email" pl="xs">
            <SettingsTabUserEmailSettings />
          </Tabs.Panel>

          <Tabs.Panel value="settings" pl="xs">
            Settings
          </Tabs.Panel>

          <Tabs.Panel value="billing" pl="xs">
            <SettingsTabBilling />
          </Tabs.Panel>
        </Tabs>
      </Vertical>
    </Layout>
  );
};

SettingsPage.authenticate = true;
export default SettingsPage;
