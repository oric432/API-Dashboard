export type LogLevel = "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR";

export interface GatewayStats {
    activeInterfaces: number;
    activeSessions: number;
    logLevel: LogLevel;
}

export interface SessionMetadata {
    source: string;
    timestamp: string;
    version: string;
}

export interface Session {
    sessionId: string;
    userId: string;
    timeout: number;
    priority: "normal" | "high";
    metadata: SessionMetadata;
}
