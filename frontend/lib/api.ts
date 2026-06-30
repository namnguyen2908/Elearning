import { auth } from "@clerk/nextjs/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

async function getAuthToken(): Promise<string | null> {
  const { getToken } = await auth();
  return getToken();
}

export async function api<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new ApiError(res.status, await res.text());
  }

  const json = await res.json();
  return json.data as T;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
