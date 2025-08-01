import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { githubDarkTheme, githubLightTheme, JsonEditor } from "json-edit-react";
import { useState, useEffect } from "react";
import { useUiStore } from "@/store/uiStore";
import { getErrorMessage } from "@/utils/errorHandler";
import { Badge } from "./ui/badge";
import { useIsDarkMode } from "@/hooks/useIsDark";

interface JsonModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    defaultValue?: object;
    buttonText?: string;
    onSubmit: (data: any) => Promise<void> | void;
    method: string; // <-- Add this
    endpoint: string; // <-- Add this
}

export function SessionModal({
    open,
    onOpenChange,
    title,
    defaultValue = {},
    buttonText = "Submit",
    onSubmit,
    method, // <-- Add this
    endpoint, // <-- Add this
}: JsonModalProps) {
    const [data, setData] = useState(defaultValue);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const pushOutput = useUiStore((s) => s.pushOutput);

    // Update data when defaultValue changes
    useEffect(() => {
        setData({ ...defaultValue });
    }, [defaultValue]);

    const handleSubmit = async () => {
        try {
            pushOutput({
                level: "payload",
                text: JSON.stringify(data, null, 2),
            });

            setIsSubmitting(true);
            await onSubmit(data);

            pushOutput({
                level: "info",
                text: "Request completed successfully",
            });
        } catch (e: unknown) {
            console.error("Submit error:", e);
            pushOutput({
                level: "error",
                text: `Error: ${getErrorMessage(e)}`,
            });
            // Don't close modal on error so user can retry
        } finally {
            onOpenChange(false);
            setIsSubmitting(false);
        }
    };

    const handleDataChange = (newData: any) => {
        setData(newData);
    };

    const isDarkMode = useIsDarkMode();

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0  backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 bg-white/60 backdrop-blur-sm dark:bg-gray-800/60 border-0 shadow-lg">
                    <div className="mb-2">
                        <Dialog.Title className="flex items-center gap-2 text-lg font-semibold mb-2">
                            <span>&lt;/&gt;</span>
                            {title}
                        </Dialog.Title>
                        <p className="text-sm text-muted-foreground mb-4">
                            Edit the JSON payload below. Professional code
                            editor with syntax highlighting and validation.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                {" "}
                                <Badge variant="outline" className="font-mono">
                                    {method}
                                </Badge>
                                <code className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-xs font-mono">
                                    {endpoint}
                                </code>
                            </div>
                        </div>

                        <div className="mt-3 px-3 py-1 rounded text-xs">
                            Request Payload:
                        </div>
                    </div>

                    <div className="h-64 p-2 overflow-auto text-foreground rounded-lg">
                        <JsonEditor
                            data={data}
                            setData={handleDataChange}
                            restrictEdit={false}
                            restrictDelete
                            restrictTypeSelection={true}
                            showArrayIndices={false}
                            showStringQuotes={false}
                            showCollectionCount={false}
                            theme={
                                isDarkMode ? githubDarkTheme : githubLightTheme
                            }
                        />
                    </div>

                    <div className="mt-4 flex justify-end">
                        <div className="space-x-2">
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Sending..." : buttonText}
                            </Button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
