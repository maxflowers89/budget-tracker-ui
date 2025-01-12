export interface Budget {
    amount: number;
}

export interface Expense {
    id: string|null;
    amount: number;
    date: string; // ISO 8601 format
    category: string;
}
