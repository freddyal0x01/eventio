import { ErrorBoundary, Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import {
  Anchor,
  AppShell,
  Button,
  Footer,
  Header,
  Loader,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconUserShield } from "@tabler/icons-react";
import Conditional from "conditional-wrap";
import { Horizontal, Vertical } from "mantine-layout-components";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, Suspense } from "react";
import logout from "src/features/auth/mutations/logout";
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser";
import { ReactFC } from "types";
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
  const [logoutMutation] = useMutation(logout);
  const user = useCurrentUser();

  const router = useRouter();

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
                color="gray.3"
                component={Link}
                href={Routes.Home()}
                fw="bold"
              >
                Eventio
              </Anchor>

              {user && (
                <Horizontal center>
                  <Horizontal center spacing="xs">
                    <Conditional
                      condition={!!user.username}
                      wrap={(children) => {
                        return (
                          <Link
                            href={Routes.ProfilePage({
                              username: user.username as string,
                            })}
                          >
                            {children}
                          </Link>
                        );
                      }}
                    >
                      <Text>{user.name}</Text>
                    </Conditional>

                    {user.isAdmin && (
                      <Tooltip label="Admin">
                        <IconUserShield size={15} />
                      </Tooltip>
                    )}
                  </Horizontal>
                  <Button
                    size="xs"
                    variant="light"
                    onClick={async () => {
                      await logoutMutation();
                      router.push("/");
                    }}
                  >
                    Logout
                  </Button>
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
              {children}
            </Suspense>
          </ErrorBoundary>
        </Vertical>
      </AppShell>
    </>
  );
};

export default Layout;
