import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Session } from "../types";
import { api } from "../utils/apiClient";
import { z } from "zod";
import { useUiStore } from "../store/uiStore";
import { getErrorMessage } from "@/utils/errorHandler";
import { API_ENDPOINTS } from "@/constants";

const SessionSchema: z.ZodType<Session> = z.object({
    sessionId: z.string(),
    userId: z.string(),
    timeout: z.number(),
    priority: z.enum(["normal", "high"]),
    metadata: z.object({
        source: z.string(),
        timestamp: z.string(),
        version: z.string(),
    }),
});

export function useSessions() {
    const qc = useQueryClient();
    const push = useUiStore((s) => s.pushOutput);

    const add = useMutation({
        mutationFn: (data: Session) =>
            api(
                API_ENDPOINTS.ADD_SESSION,
                { method: "POST", body: JSON.stringify(data) },
                SessionSchema
            ),
        onSuccess: (res) => {
            push({ level: "info", text: `Session created: ${res.sessionId}` });
            qc.invalidateQueries({ queryKey: ["/sessions"] });
        },
        onError: (err: unknown) =>
            push({
                level: "error",
                text: `Failed to create session – ${getErrorMessage(err)}`,
            }),
    });

    const remove = useMutation({
        mutationFn: (id: string) =>
            api(API_ENDPOINTS.REMOVE_SESSION, {
                method: "POST",
                body: JSON.stringify({ sessionId: id }),
            }),
        onSuccess: (_, id) => {
            push({ level: "info", text: `Session removed: ${id}` });
            qc.invalidateQueries({ queryKey: ["/sessions"] });
        },
        onError: (err: unknown) =>
            push({
                level: "error",
                text: `Failed to remove – ${getErrorMessage(err)}`,
            }),
    });

    const removeAll = useMutation({
        mutationFn: () =>
            api(API_ENDPOINTS.REMOVE_SESSIONS, { method: "POST" }),
        onSuccess: () => {
            push({ level: "info", text: "All sessions wiped" });
            qc.invalidateQueries({ queryKey: ["/sessions"] });
        },
        onError: (err: unknown) =>
            push({
                level: "error",
                text: `Failed to wipe – ${getErrorMessage(err)}`,
            }),
    });

    return { add, remove, removeAll };
}
