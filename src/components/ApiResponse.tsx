import { useUiStore } from "../store/uiStore";
import dayjs from "dayjs";
import { Tabs } from "./Tabs";
import { Button } from "@/components/ui/button";
import { Terminal, Server, Copy, RefreshCcw, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { MetricsTab } from "./MetricsTab";
import { TABS } from "@/constants";

export function ApiResponse() {
    const { activeTab, setTab, outputLines, clearOutput } = useUiStore();

    const handleCopy = () => {
        navigator.clipboard.writeText(
            outputLines
                .map((l) => `[${dayjs(l.ts).format("HH:mm:ss")}] ${l.text}`)
                .join("\n")
        );
    };

    return (
        <Card className=" bg-white/60 backdrop-blur-sm dark:bg-gray-800/60 border-0 shadow-lg p-6 h-[112vh] flex flex-col">
            <div className="mb-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                    <Server className="w-5 h-5 text-primary" />
                    API Response
                </div>
                <p className="text-muted-foreground text-sm">
                    Real-time system output and metrics
                </p>
            </div>

            <div className="flex items-center justify-between border-b mb-2">
                <Tabs
                    tabs={[...TABS]}
                    value={activeTab}
                    onChange={(v) => setTab(v as "output" | "metrics")}
                />
                {activeTab === "output" && (
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCopy}
                        >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={clearOutput}
                        >
                            <RefreshCcw className="w-4 h-4 mr-1" />
                            Clear
                        </Button>
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-auto text-sm">
                {activeTab === "output" && (
                    <div className="font-mono text-xs whitespace-pre-wrap p-4">
                        {outputLines.length ? (
                            <div className="space-y-1">
                                {outputLines.map((log, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 text-xs"
                                    >
                                        <Clock className="w-3 h-3 text-gray-400" />
                                        <span className="text-gray-500">
                                            {dayjs(log.ts).format("HH:mm:ss")}
                                        </span>
                                        <span
                                            className={`border px-1.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap
                                                    ${
                                                        log.level === "error"
                                                            ? "text-red-600 border-red-200 dark:text-red-400 dark:border-red-400"
                                                            : log.level ===
                                                                "info"
                                                              ? "text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-400"
                                                              : "text-cyan-600 border-cyan-200 dark:text-cyan-400 dark:border-cyan-400"
                                                    }
                                            `}
                                        >
                                            {log.level.toUpperCase()}
                                        </span>

                                        <span className="text-gray-700 dark:text-gray-300">
                                            {log.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-muted-foreground text-sm py-10">
                                <Terminal className="h-24 w-24 mb-2 opacity-40" />
                                No output yet. Execute a command to see results
                                here.
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "metrics" && <MetricsTab />}
            </div>
        </Card>
    );
}
