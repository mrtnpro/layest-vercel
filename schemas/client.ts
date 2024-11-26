import dayjs from "dayjs";
import * as v from "valibot";

import { ISO8601ToDate, dateToISO8601 } from "./shared";

const ClientBaseSchema = v.object({
  email: v.pipe(v.string(), v.minLength(2), v.email()),

  firstname: v.pipe(v.string(), v.minLength(2)),
  lastname: v.pipe(v.string(), v.minLength(2)),
});

const ClientAddressSchema = v.object({
  address: v.optional(v.string()),
  zip: v.optional(v.string()),
  city: v.optional(v.string()),
  state: v.optional(v.string()),
  country: v.optional(v.string()),
});

export const ClientSchema = v.object({
  ...ClientBaseSchema.entries,
  ...ClientAddressSchema.entries,

  nationality: v.optional(v.string()),
  birthplace: v.optional(v.string()),
  birthdate: v.optional(
    v.pipe(
      v.string(),
      v.transform(ISO8601ToDate),
      v.minValue(
        // Include currently oldest human John Tinniswood 👴
        dayjs().startOf("day").subtract(112, "years").toDate(),
        "Must be younger than 112 years",
      ),
      v.maxValue(
        dayjs().startOf("day").subtract(18, "years").toDate(),
        "Must be at least 18 years old",
      ),
      v.transform(dateToISO8601),
    ),
  ),

  phone: v.optional(v.string()),

  customFields: v.optional(v.record(v.string(), v.string()), {}),
});

export type Client = v.InferOutput<typeof ClientSchema>;
