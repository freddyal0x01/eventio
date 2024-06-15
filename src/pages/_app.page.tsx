import { AppProps, ErrorBoundary } from "@blitzjs/next";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Suspense } from "react";
import { withBlitz } from "src/blitz-client";
import { FullPageLoader } from "src/core/components/FullPageLoader";
import { RootErrorFallback } from "src/core/components/RootErrorFallback";
import { globalModals } from "src/modals";
import "src/styles/globals.css";
import { theme } from "src/styles/mantine-theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          ...theme,
          colorScheme,
        }}
      >
        <ModalsProvider modals={globalModals}>
          <ErrorBoundary FallbackComponent={RootErrorFallback}>
            <Notifications position="top-right" />
            <Suspense fallback={<FullPageLoader />}>
              <Component {...pageProps} />
            </Suspense>
          </ErrorBoundary>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default withBlitz(MyApp);
