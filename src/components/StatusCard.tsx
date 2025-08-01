import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGatewayStats } from "../hooks/useGatewayStats";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";

export function StatusCard() {
    const { data } = useGatewayStats();
    return (
        <Card className="bg-white/60 backdrop-blur-sm dark:bg-gray-800/60 border-0 shadow-lg">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 size={20} /> System Status
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    View raw system status
                </p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span>Active Interfaces</span>
                    <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                        {data?.activeInterfaces ?? "-"}
                    </Badge>{" "}
                </div>
                <div className="flex justify-between">
                    <span>Active Sessions</span>
                    <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                        {data?.activeSessions ?? "-"}
                    </Badge>
                </div>
                <div className="flex justify-between">
                    <span>Log Level</span>
                    <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                        {data?.logLevel ?? "-"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}
