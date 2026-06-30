import { useAuth } from "@clerk/nextjs";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

export function useApi() {
  const { getToken } = useAuth();

  async function api<T = unknown>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = await getToken();
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
      throw new Error(`API Error ${res.status}: ${await res.text()}`);
    }

    const json = await res.json();
    return json.data as T;
  }

  return { api };
}
