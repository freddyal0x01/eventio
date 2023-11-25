import { useParam } from "@blitzjs/next";

export const useStringParam = (name) => {
  let param = useParam(name, "string");
  return param;
};
