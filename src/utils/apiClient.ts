import { z } from "zod";
export const API_BASE =
    import.meta.env.VITE_GATEWAY_URL ?? "http://127.0.0.1:8084/api";

export async function api<T>(
    path: string,
    init?: RequestInit,
    schema?: z.ZodType<T>
) {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...(init?.headers || {}),
        },
        ...init,
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const json = (await res.json()) as unknown;
    return schema ? schema.parse(json) : (json as T);
}
