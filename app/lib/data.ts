import { Budget, Expense } from "./definitions";
import { getTodayDateMinusYears } from "./utils";

export async function fetchBudget(projectId: number): Promise<Budget> {
    if (process.env.NODE_ENV === "development") {
        // Mock data in development
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ amount: 5678.90 }); // Mocked data
            }, 500);
        });
    }

    // Real API call in other environments
    const response = await fetch(`http://localhost:8080/api/v1/budget?projectId=${projectId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch budget: ${response.statusText}`);
    }
    return response.json();
}

export async function fetchExpenses(
    from: string = getTodayDateMinusYears(1),
    to: string = new Date().toISOString().split("T")[0]
): Promise<Expense[]> {
    if (process.env.NODE_ENV === "development") {
        // Return mock data in development
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: "1", amount: 200.5, date: `${from}`, category: "Food" },
                    { id: "2", amount: 150.0, date: `${to}`, category: "Transport" },
                    { id: "3", amount: 300.0, date: "2024-06-15", category: "Rent" },
                ]);
            }, 500); // Simulated delay
        });
    }

    // Real API call in other environments
    const response = await fetch(`http://localhost:8080/api/v1/expenses?from=${from}&to=${to}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch expenses: ${response.statusText}`);
    }
    return response.json();
}

export async function addExpenses(newExpenses: Expense[]): Promise<void> {
    const response = await fetch("http://localhost:8080/api/v1/expenses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpenses),
    });

    if (!response.ok) {
        throw new Error(`Failed to add expenses: ${response.statusText}`);
    }
}

export async function fetchCategories(): Promise<string[]> {
    if (process.env.NODE_ENV === "development") {
        // Return mock data in development mode
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(["Food", "Transport", "Utilities", "Entertainment", "Rent", "Miscellaneous"]);
            }, 500); // Simulated delay
        });
    }

    const response = await fetch("http://localhost:8080/api/v1/categories");

    if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    return response.json();
}

