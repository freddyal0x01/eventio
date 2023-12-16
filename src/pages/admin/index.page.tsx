import { BlitzPage } from "@blitzjs/next";
import { Tabs } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import { Vertical } from "mantine-layout-components";
import Layout from "src/core/layouts/Layout";
import AdminPageEmailTab from "./components/AdminPageEmailTab";

export const AdminPage: BlitzPage = () => {
  return (
    <Layout>
      <Vertical fullW>
        <Tabs w={"100%"} orientation="vertical" defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab value="email" icon={<IconMail size="0.8rem" />}>
              Email
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="email" pl={"xs"}>
            <AdminPageEmailTab />
          </Tabs.Panel>
        </Tabs>
      </Vertical>
    </Layout>
  );
};

export default AdminPage;
