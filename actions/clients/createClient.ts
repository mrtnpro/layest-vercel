"use server";

import type { paths } from "@/schemas/api";
import { ClientSchema } from "@/schemas/client";
import * as R from "remeda";
import * as v from "valibot";

import fetcher from "../fetcher";

type SuccessResponse =
  paths["/api/v1/clients"]["post"]["responses"][201]["content"]["application/json"];

export type FormState =
  | {
      success: false;
      message?: string;
      fields?: Record<string, string>;
      issues?: string[];
    }
  | { success: true; result: SuccessResponse };

export async function createClientAction(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = v.safeParse(ClientSchema, formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};

    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }

    // console.log("fields", JSON.stringify(fields, null, 4));
    // console.log("parsed", JSON.stringify(parsed.output, null, 4));

    return {
      success: false,

      message: "Invalid form data",
      // Note: We can't use `parsed.output` here because it includes react server action keys
      // which are usually prefixd with `$ACTION_`. We could omit them though, needs further research
      // fields: parsed.output,
      fields,

      // Note: We could restructure valibot errors to RHF errors as @hookform/resolvers/valibot do
      // https://github.com/react-hook-form/resolvers/blob/master/valibot/src/valibot.ts
      issues: parsed.issues
        .map((issue) =>
          issue.path
            ? `${issue.path.map((path) => path.key).join(".")}: ${issue.message}`
            : undefined,
        )
        .filter((v) => v != null),
    };
  }

  try {
    const payload = R.mapValues(parsed.output, (v) =>
      String(v).length > 0 ? v : undefined,
    );

    const result = await fetcher<SuccessResponse>({
      path: "/clients",
      method: "post",
      body: payload,
    });

    console.log("result", result);

    if (!result || "statusCode" in result || !("id" in result)) {
      return { success: false, message: "Something went wrong on the server" };
    }

    return { success: true, result: result };
  } catch (error) {
    console.log("error", error);

    return {
      success: false,
      message: "An unknown server error prevented this form submission ",
    };
  }
}
