import { useParam } from "@blitzjs/next";
import { useRouter } from "next/router";

export const useStringParam = (name) => {
  let param = useParam(name, "string");
  return param;
};

export const useStringQueryParam = (name) => {
  let { query } = useRouter();
  return query[name];
};

type ArrayItem = {
  key: string;
  value: string;
};

export const convertArrayToObject = (array: ArrayItem[]) => {
  return array.reduce((obj, item) => {
    obj[item.key] = item.value;
    return obj;
  }, {});
};
