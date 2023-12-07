import { ErrorFallbackProps } from "@blitzjs/next";
import { Paper, Text } from "@mantine/core";
import { AuthenticationError, AuthorizationError } from "blitz";
import { Vertical } from "mantine-layout-components";
import { ReactFC } from "types";
import { MainAuthenticationForm } from "./MainAuthenticationForm";

const ErrorComponent: ReactFC<{
  statusCode: string | number;
  title: string;
}> = ({ statusCode, title }) => {
  return (
    <Vertical center fullW>
      <Paper p={"xl"} w={"100%"} maw={400} radius={"md"}>
        <Vertical center fullW spacing={0}>
          <Text color={"dimmed"} fz={"md"} fw={"bold"}>
            {statusCode}
          </Text>
          <Vertical spacing={0} center>
            <Text fz={"xl"}>An error occurred 😭</Text>
            <Text fz={"md"} color={"dimmed"}>
              {title}
            </Text>
          </Vertical>
        </Vertical>
      </Paper>
    </Vertical>
  );
};

export function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <MainAuthenticationForm />;
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    );
  }
}
