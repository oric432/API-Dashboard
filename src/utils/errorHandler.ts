export function getErrorMessage(err: unknown): string {
    if (err && typeof err === "object" && "message" in err) {
        return (err as { message?: string }).message ?? String(err);
    }
    if (typeof err === "string") {
        return err;
    }
    return "Unknown error";
}
