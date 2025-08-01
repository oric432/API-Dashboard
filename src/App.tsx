import { Navbar } from "./components/Navbar";
import { StatusCard } from "./components/StatusCard";
import { ControlsCard } from "./components/ControlsCard";
import { DeveloperToolsCard } from "./components/DeveloperToolsCard";
import { ApiResponse } from "./components/ApiResponse";

export default function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-foreground dark:from-gray-900 dark:to-gray-900 dark:text-white transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <aside className="w-80 shrink-0 space-y-6 p-4">
                    <StatusCard />
                    <ControlsCard />
                    <DeveloperToolsCard />
                </aside>
                <main className="flex-1 overflow-hidden p-4">
                    <ApiResponse />
                </main>
            </div>
        </div>
    );
}
