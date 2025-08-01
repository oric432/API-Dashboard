import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Settings2 } from "./icons";
import { useGatewayActions } from "../hooks/useGatewayActions";
import { LOG_LEVELS } from "@/constants";

export function ControlsCard() {
    const { getInterfaces, getSessions, setLogLevel } = useGatewayActions();

    return (
        <Card className="bg-white/60 backdrop-blur-sm dark:bg-gray-800/60 border-0 shadow-lg">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Settings2 size={20} /> Controls
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Manage system interfaces and sessions
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                    <Button
                        variant="default"
                        className="justify-start bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-white"
                        onClick={getInterfaces}
                    >
                        Interfaces Active
                    </Button>
                    <Button
                        variant="default"
                        className="justify-start bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-white"
                        onClick={getSessions}
                    >
                        Active Sessions
                    </Button>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="logLevel">Log Level</Label>
                    <Select
                        defaultValue="INFO"
                        onValueChange={(lvl) => setLogLevel(lvl)}
                    >
                        <SelectTrigger id="logLevel">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {LOG_LEVELS.map((l) => (
                                <SelectItem key={l} value={l}>
                                    {l}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}
