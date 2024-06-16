import { BlitzPage } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { Button, Input, Paper } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import { useInput } from "react-hanger";
import Layout from "src/core/layouts/Layout";
import createSignupInvite from "src/features/signup-invites/mutations/createSignupInvite";

export const RequestInvitePage: BlitzPage = () => {
  const email = useInput("");

  const [$createSignupInvite, { isLoading, isSuccess }] = useMutation(
    createSignupInvite,
    {},
  );

  return (
    <Layout title="Request invite">
      <Vertical mih="100vh" center fullW fullH>
        <Paper w="100%" maw={400} radius="md" p="xl" withBorder>
          <Vertical fullW center spacing="sm">
            {!isSuccess && (
              <>
                <Input w="100%" placeholder="Email" {...email.eventBind} />
                <Button
                  loading={isLoading}
                  disabled={!email.hasValue}
                  onClick={() => {
                    $createSignupInvite({ email: email.value });
                  }}
                >
                  Request invite
                </Button>
              </>
            )}
            {isSuccess && (
              <div>
                <p>
                  Success, you will receive an email when your invite is
                  accepted.
                </p>
              </div>
            )}
          </Vertical>
        </Paper>
      </Vertical>
    </Layout>
  );
};

export default RequestInvitePage;
