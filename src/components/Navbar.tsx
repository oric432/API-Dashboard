import { Sun, Moon } from "./icons";
import { Badge } from "@/components/ui/badge";
export function Navbar() {
    return (
        <header className="flex items-center justify-between border-b bg-white/60 dark:bg-gray-800/60 border-0 shadow-sm px-6 py-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 font-semibold text-xl">
                <img
                    src="/Bamza_108.png"
                    alt="Logo"
                    className="h-16 w-16 rounded"
                />
                VoiceGateway
                <span className="text-muted-foreground text-base">
                    127.0.0.1:8084
                </span>
                <Badge
                    variant="outline"
                    className="ml-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                >
                    Online
                </Badge>
            </div>
            <div className="flex items-center gap-5">
                <Sun
                    className="hidden dark:inline cursor-pointer"
                    onClick={() =>
                        document.documentElement.classList.remove("dark")
                    }
                />
                <Moon
                    className="inline dark:hidden cursor-pointer"
                    onClick={() =>
                        document.documentElement.classList.add("dark")
                    }
                />
            </div>
        </header>
    );
}
