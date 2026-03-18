import { authStorage } from "@/lib/auth-storage";

const API_URL = import.meta.env.VITE_MILA_RAFFO_STORE_API;

export class HttpError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
  retryWithRefresh?: boolean;
}

const getErrorMessage = (body: unknown, fallback: string) => {
  if (
    body &&
    typeof body === "object" &&
    "message" in body &&
    typeof (body as { message?: unknown }).message === "string"
  ) {
    return (body as { message: string }).message;
  }
  return fallback;
};

const refreshTokens = async (): Promise<boolean> => {
  const session = authStorage.get();
  if (!session?.refreshToken) return false;

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: session.refreshToken }),
  });

  if (!response.ok) {
    authStorage.clear();
    return false;
  }

  const payload = (await response.json()) as
    | { accessToken: string; refreshToken: string; user: unknown }
    | { access_token: string; refresh_token?: string; user: unknown };

  const accessToken = "accessToken" in payload ? payload.accessToken : payload.access_token;
  const refreshToken =
    "refreshToken" in payload
      ? payload.refreshToken
      : payload.refresh_token || session.refreshToken;

  authStorage.set({
    accessToken,
    refreshToken,
    user: session.user,
  });

  return true;
};

export const apiRequest = async <T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> => {
  const {
    headers,
    skipAuth = false,
    retryWithRefresh = true,
    ...init
  } = options;

  const session = authStorage.get();
  const requestHeaders = new Headers(headers);

  if (
    !requestHeaders.has("Content-Type") &&
    init.body &&
    !(init.body instanceof FormData)
  ) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (!skipAuth && session?.accessToken) {
    requestHeaders.set("Authorization", `Bearer ${session.accessToken}`);
  }

  // Prevent browser conditional cache revalidation that can yield 304 for API GET calls.
  const requestInit: RequestInit = {
    ...init,
    headers: requestHeaders,
  };

  if ((requestInit.method ?? "GET").toUpperCase() === "GET") {
    if (!requestHeaders.has("Cache-Control")) {
      requestHeaders.set("Cache-Control", "no-store");
    }

    if (!requestHeaders.has("Pragma")) {
      requestHeaders.set("Pragma", "no-cache");
    }

    if (!requestInit.cache) {
      requestInit.cache = "no-store";
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...requestInit,
  });

  if (response.status === 401 && !skipAuth && retryWithRefresh) {
    const refreshed = await refreshTokens();
    if (refreshed) {
      return apiRequest<T>(path, {
        ...options,
        retryWithRefresh: false,
      });
    }
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as unknown;
    throw new HttpError(
      response.status,
      getErrorMessage(body, "Request failed"),
      body,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};
