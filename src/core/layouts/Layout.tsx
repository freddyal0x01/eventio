import { ErrorBoundary, Routes } from "@blitzjs/next";
import {
  Anchor,
  AppShell,
  Badge,
  Footer,
  Header,
  Loader,
  Modal,
  Text,
} from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { Horizontal, Vertical } from "mantine-layout-components";
import Head from "next/head";
import Link from "next/link";
import { ReactNode, Suspense } from "react";

import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import { GlobalModal } from "src/modals";
import { ReactFC } from "types";
import UserHeaderMenu from "../components/Header/UserHeaderMenu";
import UserProfileProgress from "../components/Header/UserProfileProgress";
import { OnboardingWizard } from "../components/OnboardingWizard";
import { RootErrorFallback } from "../components/RootErrorFallback";

type Props = {
  title?: string;
  children?: ReactNode;
  maxWidth?: number;
};

const Layout: ReactFC<{
  title?: string;
  maxWidth?: number;
}> = ({ title, maxWidth = 800, children }) => {
  const thisYear = new Date().getFullYear();
  const user = useCurrentUser();

  return (
    <>
      <Head>
        <title>{title || "eventio"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        padding="md"
        // navbar={
        //   <Navbar width={{ base: 300 }} height={500} p="xs">
        //     {/* Navbar content */}
        //   </Navbar>
        // }
        header={
          <Header height={55} p="xs">
            <Horizontal fullH fullW spaceBetween>
              <Anchor
                underline={false}
                component={Link}
                href={Routes.Home()}
                fw="bold"
              >
                Eventio
              </Anchor>

              {user && (
                <Horizontal center>
                  <Horizontal center spacing="xs">
                    <Horizontal>
                      <UserHeaderMenu />
                      {/* <Text>{user.name}</Text> */}

                      <UserProfileProgress />
                    </Horizontal>
                    <Badge
                      onClick={() => {
                        openContextModal({
                          modal: GlobalModal.becomePro,
                          title: "Become a pro",
                          innerProps: {
                            price: 35,
                          },
                        });
                      }}
                      color="red"
                    >
                      Pro
                    </Badge>
                  </Horizontal>

                  {/* <DarkLightSwitch /> */}
                </Horizontal>
              )}
            </Horizontal>
          </Header>
        }
        footer={
          <Footer height={35}>
            <Horizontal fullH fullW center>
              <Text fz="xs" color="dimmed">
                Copyright {thisYear}
              </Text>
            </Horizontal>
          </Footer>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Vertical fullW fullH>
          <ErrorBoundary
            resetKeys={[user]}
            FallbackComponent={RootErrorFallback}
          >
            <Suspense
              fallback={
                <Vertical center fullH fullW>
                  <Loader />
                </Vertical>
              }
            >
              <Modal
                size={"xl"}
                centered={true}
                closeOnClickOutside={false}
                closeOnEscape={false}
                withCloseButton={false}
                title="Onboarding"
                opened={!!user && !user?.onboarded}
                onClose={() => {}}
              >
                <OnboardingWizard />
              </Modal>
              {children}
            </Suspense>
          </ErrorBoundary>
        </Vertical>
      </AppShell>
    </>
  );
};

export default Layout;
