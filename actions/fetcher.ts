import { paths } from "@/schemas/api";

import { getToken } from "./getToken";

type FetcherProps = {
  path: string;
  body?: object;
  method?: "get" | "post" | "path" | "delete";
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

type ValidationFailedResponse =
  paths["/api/v1/clients"]["post"]["responses"][400]["content"]["application/json"];
type UnauthorizedResponse =
  paths["/api/v1/clients"]["post"]["responses"][401]["content"]["application/json"];
type ForbiddenResponse =
  paths["/api/v1/clients"]["post"]["responses"][403]["content"]["application/json"];

export default async function fetcher<
  TResponse,
  TValidationError = ValidationFailedResponse,
  TUnauthorizedError = UnauthorizedResponse,
  TForbiddenError = ForbiddenResponse,
>({
  path,
  method = "get",
  headers = {},
  body = {},
  // signal,
}: FetcherProps): Promise<
  | TResponse
  | TValidationError
  | TUnauthorizedError
  | TForbiddenError
  | undefined
> {
  try {
    const token = await getToken();

    const response = await fetch(`https://api.layest.com/api/v1${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
        ...headers,
      },
      body: method !== "get" ? JSON.stringify(body) : undefined,
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Promise resolved and HTTP status is successful");

      return result as TResponse;
    } else {
      if (response.status === 400) {
        throw new Error(`[fetcher]: 400 error: ${response}`);
        return result as TValidationError;
      }
      if (response.status === 401) {
        throw new Error(`[fetcher]: 401 error: ${response}`);
        return result as TUnauthorizedError;
      }
      if (response.status === 403) {
        throw new Error(`[fetcher]: 403 error: ${response}`);
        return result as TForbiddenError;
      }

      if (response.status === 500) {
        throw new Error(`[fetcher]: 500 error: ${response}`);
        // throw new Error("500, internal server error");
      }

      // throw new Error(response.status);

      // // For any other server error
      // throw new Error(response.status);
    }
  } catch (error) {
    console.error("Fetch", error);
    throw new Error(`[fetcher]: Caught error: ${error}`);
    // Output e.g.: "Fetch Error: 404, Not found"
  }
}
