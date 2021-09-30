import _ from "lodash/fp";

export const cutStringIfNeeded = (str = ""): string => {
  const shorterTitle = str.slice(0, 15);

  return _.upperFirst(
    shorterTitle.length !== str.length ? `${shorterTitle}...` : shorterTitle
  );
};

export const log = <T>(arg: T): T => {
  console.log(arg);
  return arg;
};
