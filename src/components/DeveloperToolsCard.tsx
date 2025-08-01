import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash, Terminal } from "./icons";
import { useSessions } from "../hooks/useSessions";
import { SessionModal } from "./SessionModal";
import { useState } from "react";
import { useUiStore } from "@/store/uiStore";
import { MODAL_CONFIGS } from "@/constants";

export function DeveloperToolsCard() {
    const { add, remove, removeAll } = useSessions();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState<{
        title: string;
        defaultValue: object;
        buttonText: string;
        onSubmit: (data: any) => Promise<void>;
        method: string;
        endpoint: string;
    } | null>(null);
    const pushOutput = useUiStore((s) => s.pushOutput);

    const openAddModal = () => {
        setModalConfig({
            ...MODAL_CONFIGS.ADD_SESSION,
            onSubmit: async (data) => {
                await add.mutateAsync(data);
            },
        });
        setModalOpen(true);
    };

    const openRemoveModal = () => {
        setModalConfig({
            ...MODAL_CONFIGS.REMOVE_SESSION,
            onSubmit: async (data) => {
                if (!data.sessionId) throw new Error("sessionId missing");
                await remove.mutateAsync(data.sessionId);
            },
        });
        setModalOpen(true);
    };

    const onRemoveAll = async () => {
        try {
            pushOutput({
                level: "info",
                text: "Removing all sessions...",
            });
            await removeAll.mutateAsync();
        } catch (error) {
            console.error("Failed to remove all sessions:", error);
        }
    };

    return (
        <>
            <Card className="bg-white/60 backdrop-blur-sm dark:bg-gray-800/60 border-0 shadow-lg">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Terminal size={20} className="text-primary" />
                        Developer Tools
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        API session management
                    </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Button
                        className="justify-start bg-gray-200 hover:bg-gray-300 text-black dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                        variant="ghost"
                        onClick={openAddModal}
                    >
                        <Plus className="w-4 mr-2" /> Add Session
                    </Button>

                    <Button
                        className="justify-start bg-gray-200 hover:bg-gray-300 text-black dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                        variant="ghost"
                        onClick={openRemoveModal}
                    >
                        <Minus className="w-4 mr-2" /> Remove Session
                    </Button>

                    <Button
                        className="justify-start bg-gray-200 hover:bg-gray-300 text-black dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                        variant="destructive"
                        onClick={onRemoveAll}
                    >
                        <Trash className="w-4 mr-2" /> Remove All Sessions
                    </Button>
                </CardContent>
            </Card>

            {modalConfig && (
                <SessionModal
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    title={modalConfig.title}
                    defaultValue={modalConfig.defaultValue}
                    buttonText={modalConfig.buttonText}
                    onSubmit={modalConfig.onSubmit}
                    method={modalConfig.method}
                    endpoint={modalConfig.endpoint}
                />
            )}
        </>
    );
}
