import { useSession } from "@blitzjs/auth";
import { invoke } from "@blitzjs/rpc";
import { Button } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import stopImpersonating from "../mutations/stopImpersonating";

export const ImpersonationHeader = () => {
  const session = useSession();
  const queryClient = useQueryClient();
  if (!session.impersonatingFromUserId) return null;

  return (
    <Button
      size="xs"
      color="yellow"
      leftIcon={<IconAlertTriangle size={13} />}
      onClick={async () => {
        await invoke(stopImpersonating, {});
        queryClient.clear();
        window.location.reload;
      }}
    >
      Stop impersonating
    </Button>
  );
};
