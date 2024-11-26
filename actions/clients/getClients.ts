"use server";

import { paths } from "@/schemas/api";

import fetcher from "../fetcher";

export type PaginatedClientsResponse =
  paths["/api/v1/clients"]["get"]["responses"][200]["content"]["application/json"];

export async function getClients() {
  const result = await fetcher<PaginatedClientsResponse>({
    path: "/clients",
  });

  if (!result) {
    throw new Error(`[getClients] No result: ${result}`);
  }

  return result as PaginatedClientsResponse;
}
