import { Navbar } from "./components/Navbar";
import { StatusCard } from "./components/StatusCard";
import { ControlsCard } from "./components/ControlsCard";
import { DeveloperToolsCard } from "./components/DeveloperToolsCard";
import { ApiResponse } from "./components/ApiResponse";

export default function App() {
    return (
        <div
            className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50
                    text-foreground dark:from-gray-900 dark:to-gray-900 dark:text-white
                    transition-colors duration-300 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
        >
            {" "}
            <Navbar />
            <div className="flex-1 overflow-auto p-4 flex mb-4">
                <div className="grid grid-cols-[20rem_1fr] gap-4 h-full min-h-0 flex-1">
                    <aside className="flex flex-col space-y-4 h-full">
                        <StatusCard />
                        <ControlsCard />
                        <DeveloperToolsCard />
                    </aside>

                    <ApiResponse />
                </div>
            </div>
        </div>
    );
}
