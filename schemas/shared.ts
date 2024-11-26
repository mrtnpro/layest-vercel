import dayjs from "dayjs";

export const dateToISO8601 = (value: Date) => dayjs(value).format("YYYY-MM-DD");
export const ISO8601ToDate = (value: string) => dayjs(value).toDate();
