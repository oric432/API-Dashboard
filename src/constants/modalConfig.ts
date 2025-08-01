import { API_ENDPOINTS } from "./api";

export const MODAL_CONFIGS = {
    ADD_SESSION: {
        title: "Add Session",
        defaultValue: {
            sessionId: "session_001",
            userId: "user_123",
            timeout: 3600,
            priority: "normal",
            metadata: {
                source: "dashboard",
                timestamp: new Date().toISOString(),
                version: "1.0.0",
            },
        },
        buttonText: "Add Session",
        method: "POST",
        endpoint: API_ENDPOINTS.ADD_SESSION,
    },
    REMOVE_SESSION: {
        title: "Remove Session",
        defaultValue: { sessionId: "session_001" },
        buttonText: "Remove Session",
        method: "POST",
        endpoint: API_ENDPOINTS.REMOVE_SESSION,
    },
} as const;
