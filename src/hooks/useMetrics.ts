import { useEffect, useState } from "react";

export function useMetrics() {
    const [metrics, setMetrics] = useState<Record<string, number>>({});

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const txt = await (await fetch("/metrics")).text();
                const map: Record<string, number> = {};
                txt.split("\n").forEach((line) => {
                    const [key, val] = line.trim().split(/\s+/);
                    if (key && !key.startsWith("#") && !isNaN(Number(val))) {
                        map[key] = Number(val);
                    }
                });
                setMetrics(map);
            } catch {
                /* swallow – e.g. dev env */
            }
        };

        fetchMetrics();
        const id = setInterval(fetchMetrics, 5000);
        return () => clearInterval(id);
    }, []);

    return metrics;
}
