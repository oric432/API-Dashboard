import { API_ENDPOINTS } from "@/constants";
import { useUiStore } from "../store/uiStore";
import { api } from "../utils/apiClient";
import { getErrorMessage } from "@/utils/errorHandler";

export function useGatewayActions() {
    const push = useUiStore((s) => s.pushOutput);

    const getInterfaces = async () => {
        try {
            push({ level: "info", text: "Fetching active interfaces..." });
            const res = await api(API_ENDPOINTS.GET_INTERFACES);
            push({ level: "info", text: JSON.stringify(res, null, 2) });
        } catch (err: unknown) {
            push({
                level: "error",
                text: `Failed to fetch interfaces: ${getErrorMessage(err)}`,
            });
        }
    };

    const getSessions = async () => {
        try {
            push({ level: "info", text: "Fetching active sessions..." });
            const res = await api(API_ENDPOINTS.GET_SESSIONS);
            push({ level: "info", text: JSON.stringify(res, null, 2) });
        } catch (err: unknown) {
            push({
                level: "error",
                text: `Failed to fetch sessions: ${getErrorMessage(err)}`,
            });
        }
    };

    const setLogLevel = async (level: string) => {
        try {
            push({ level: "info", text: `Setting log level to ${level}...` });
            const res = await api(API_ENDPOINTS.SET_LOG_LEVEL, {
                method: "POST",
                body: JSON.stringify({ level }),
                headers: { "Content-Type": "application/json" },
            });
            push({
                level: "info",
                text: `Log level set: ${JSON.stringify(res, null, 2)}`,
            });
        } catch (err: unknown) {
            push({
                level: "error",
                text: `Failed to set log level: ${getErrorMessage(err)}`,
            });
        }
    };

    return { getInterfaces, getSessions, setLogLevel };
}
