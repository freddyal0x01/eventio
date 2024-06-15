import { BlitzPage } from "@blitzjs/next";
import { Tabs } from "@mantine/core";
import { IconMail, IconMoneybag, IconUsers } from "@tabler/icons-react";
import { Vertical } from "mantine-layout-components";
import Layout from "src/core/layouts/Layout";
import { AdminPageBillingTab } from "./components/AdminPageBillingTab";
import { AdminPageEmailTab } from "./components/AdminPageEmailTab";
import { AdminPageUsersTab } from "./components/AdminPageUsersTab";

export const AdminPage: BlitzPage = () => {
  return (
    <Layout>
      <Vertical fullW>
        <Tabs w={"100%"} orientation="vertical" defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab value="email" icon={<IconMail size="0.8rem" />}>
              Email
            </Tabs.Tab>
            <Tabs.Tab value="billing" icon={<IconMoneybag size="0.8rem" />}>
              Billing
            </Tabs.Tab>
            <Tabs.Tab value="users" icon={<IconUsers size="0.8rem" />}>
              Users
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="email" pl={"xs"}>
            <AdminPageEmailTab />
          </Tabs.Panel>
          <Tabs.Panel value="billing" pl={"xs"}>
            <AdminPageBillingTab />
          </Tabs.Panel>
          <Tabs.Panel value="users" pl={"xs"}>
            <AdminPageUsersTab />
          </Tabs.Panel>
        </Tabs>
      </Vertical>
    </Layout>
  );
};

export default AdminPage;
