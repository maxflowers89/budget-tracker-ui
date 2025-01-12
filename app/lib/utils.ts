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

/**
 * Parses a backend error response to extract a meaningful error message.
 *
 * This function expects the backend to return a JSON object with the following structure:
 * ```json
 * {
 *   "statusCode": 404,
 *   "message": "There is no budget associated to project with id 1",
 *   "requestDescription": "uri=/api/v1/budget"
 * }
 * ```
 *
 * If the backend response contains a `message` field, it will return that.
 * Otherwise, it provides a fallback generic error message with the HTTP status code.
 *
 * @param {Response} response - The fetch API `Response` object from a failed request.
 * @returns {Promise<string>} - A promise that resolves to the extracted error message.
 *
 * @example
 * // Usage example
 * fetch("http://example.com/api")
 *   .then((response) => {
 *     if (!response.ok) {
 *       return parseError(response);
 *     }
 *     return response.json();
 *   })
 *   .catch((error) => console.error("Error:", error));
 */
export function parseError(response: Response): Promise<string> {
    return response.json().then((error) => {
        if (error && error.message) {
            return error.message;
        }

        return `An error occurred (status code: ${response.status}).`;
    });
}
