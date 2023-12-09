import { useParam } from "@blitzjs/next";
import { useRouter } from "next/router";

export const useStringParam = (name) => {
  let param = useParam(name, "string");
  return param;
};

export const useStringQueryParam = (name) => {
  let {query} = useRouter();
  return query[name];
}
