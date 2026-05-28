import { ValidationError } from "@/lib/errors/extended_errors/ValidationError";

export function getTodayISODate(): string {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(new Date());

    const year = parts.find((part) => part.type === "year")?.value ?? "";
    const month = parts.find((part) => part.type === "month")?.value ?? "";
    const day = parts.find((part) => part.type === "day")?.value ?? "";

    return `${year}-${month}-${day}`;
}

export function getTodayDashboardDateRange(): { startingDate: string; endingDate: string } {
    const today = getTodayISODate();
    return {
        startingDate: today,
        endingDate: today,
    };
}

export function parseDateOnly(value: string, fieldName: string): Date {
    const normalized = value?.trim();
    if (!normalized) {
        throw new ValidationError(`The ${fieldName} is required.`, fieldName);
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
        throw new ValidationError(
            `The ${fieldName} must be in YYYY-MM-DD format.`,
            fieldName
        );
    }

    const parsed = new Date(`${normalized}T00:00:00.000Z`);
    if (Number.isNaN(parsed.getTime())) {
        throw new ValidationError(`The ${fieldName} is not a valid date.`, fieldName);
    }

    const [year, month, day] = normalized.split("-").map(Number);
    if (
        parsed.getUTCFullYear() !== year ||
        parsed.getUTCMonth() + 1 !== month ||
        parsed.getUTCDate() !== day
    ) {
        throw new ValidationError(`The ${fieldName} is not a valid calendar date.`, fieldName);
    }

    return parsed;
}

export function toKolkataDayBounds(dateValue: string): { start: string; end: string } {
    const normalized = dateValue.trim();
    return {
        start: `${normalized}T00:00:00.000+05:30`,
        end: `${normalized}T23:59:59.999+05:30`,
    };
}

export function toNumber(value: string | null): number {
    if (value === null) {
        return 0;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
}

export function formatPercent(numerator: number, denominator: number): string {
    if (denominator <= 0) {
        return "0%";
    }

    return `${((numerator / denominator) * 100).toFixed(1)}%`;
}
