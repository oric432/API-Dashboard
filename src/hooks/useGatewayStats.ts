import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/apiClient";
import { z } from "zod";
import { API_ENDPOINTS } from "@/constants";

const LogLevelSchema = z.enum(["TRACE", "DEBUG", "INFO", "WARN", "ERROR"]);
const NumberSchema = z.number();

export function useGatewayStats() {
    return useQuery({
        queryKey: ["/stats"],
        queryFn: async () => {
            const [logLevel, activeInterfaces, activeSessions] =
                await Promise.all([
                    api(API_ENDPOINTS.GET_LOG_LEVEL, undefined, LogLevelSchema),
                    api(API_ENDPOINTS.GET_INTERFACES, undefined, NumberSchema),
                    api(API_ENDPOINTS.GET_SESSIONS, undefined, NumberSchema),
                ]);
            return { logLevel, activeInterfaces, activeSessions };
        },
        refetchInterval: 5_000,
    });
}
