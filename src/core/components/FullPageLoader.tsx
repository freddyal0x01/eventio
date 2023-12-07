import { Loader } from "@mantine/core";
import { Vertical } from "mantine-layout-components";

export const FullPageLoader = () => {
  return (
    <Vertical mih={"100vh"} miw={"100vw"} center fullW fullH>
      <Loader />
    </Vertical>
  );
};
