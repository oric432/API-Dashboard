import { create } from "zustand";

export type OutputLevel = "payload" | "info" | "error";
export interface OutputLine {
    ts: number;
    text: string;
    level: OutputLevel;
}

interface UiState {
    // tabs
    activeTab: "output" | "logs" | "metrics";
    setTab: (t: UiState["activeTab"]) => void;

    // output console
    outputLines: OutputLine[];
    pushOutput: (l: Omit<OutputLine, "ts">) => void;
    clearOutput: () => void;
}

export const useUiStore = create<UiState>((set) => ({
    activeTab: "output",
    setTab: (activeTab) => set({ activeTab }),

    outputLines: [],
    pushOutput: (l) =>
        set((s) => ({
            outputLines: [...s.outputLines, { ts: Date.now(), ...l }],
        })),
    clearOutput: () => set({ outputLines: [] }),
}));
