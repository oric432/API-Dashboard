import { useMetrics } from "@/hooks/useMetrics";

export function MetricsTab() {
    const metrics = useMetrics();

    const demo = {
        api_requests_total: 1342,
        api_requests_failed: 29,
        api_requests_success: 1313,
        packets_received_total: 9821,
        packets_sent_total: 10032,
        bytes_received_total: 7_851_232,
        bytes_sent_total: 8_102_944,
    };

    const data = Object.keys(metrics).length ? metrics : demo;

    const niceKey = (k: string) =>
        k
            .replace(/_/g, " ")
            .replace(/total/i, "")
            .replace(/bytes/i, "Bytes")
            .replace(/packets/i, "Packets")
            .replace(/api requests/i, "API Requests")
            .replace(/\s+/g, " ")
            .trim()
            .replace(/^./, (c) => c.toUpperCase());

    return (
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3">
            {Object.entries(data).map(([k, v]) => (
                <div
                    key={k}
                    className="rounded-lg border bg-muted/5 px-4 py-3 flex flex-col"
                >
                    <span className="text-xs text-muted-foreground">
                        {niceKey(k)}
                    </span>
                    <span className="text-xl font-semibold tabular-nums">
                        {v.toLocaleString()}
                    </span>
                </div>
            ))}
        </div>
    );
}
