/**
 * Returns a date string representing today's date minus the specified number of years.
 * @param years Number of years to subtract from today's date.
 * @returns Date string in ISO 8601 format (YYYY-MM-DD).
 */
export function getTodayDateMinusYears(years: number): string {
    const today = new Date();
    today.setFullYear(today.getFullYear() - years);
    return today.toISOString().split("T")[0];
}
