import clsx from "clsx";
export function Tabs({
    tabs,
    value,
    onChange,
}: {
    tabs: { id: string; label: string }[];
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="flex border-b text-sm font-medium">
            {tabs.map((t) => (
                <button
                    key={t.id}
                    className={clsx(
                        "px-4 py-2",
                        value === t.id
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => onChange(t.id)}
                >
                    {t.label}
                </button>
            ))}
        </div>
    );
}
