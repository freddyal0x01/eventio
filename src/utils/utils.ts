import { useParam } from "@blitzjs/next";
import { Prisma } from "@prisma/client";
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

export const isIos =
  typeof navigator !== "undefined" &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent || "") ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
export const isSafari =
  typeof navigator !== "undefined" &&
  /Version\/[\d\.]+.*Safari/.test(navigator.userAgent);

export let openUrlInNewTab = async (url) => {
  if (url) {
    if (isIos || isSafari) {
      window.location.assign(url);
    } else {
      window.open(url, "_blank");
    }
  }
};

export const storePrismaJson = (json) => {
  return JSON.parse(JSON.stringify(json)) as Prisma.JsonObject;
};

export const formatToDollars = (amount) => {
  const dollars = amount / 100;
  const isWholeNumber = dollars % 1 === 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dollars);
};

export const capitalizeWords = (words) => {
  return words
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
};
