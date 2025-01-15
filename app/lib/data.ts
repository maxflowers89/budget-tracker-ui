import { Budget, Expense } from "./definitions";
import { getTodayDateMinusYears, parseError } from "./utils";

export async function addBudget(projectId: number, budget: Budget): Promise<Budget> {
    const response = await fetch(`http://localhost:8080/api/v1/budget?projectId=${projectId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(budget),
    });

    if (!response.ok) {
        throw new Error(await parseError(response));
    }

    return response.json();
}

export async function fetchBudget(projectId: number): Promise<Budget> {
    const response = await fetch(`http://localhost:8080/api/v1/budget?projectId=${projectId}`);

    if (!response.ok) {
        const errorMessage = await parseError(response);
        throw new Error(errorMessage);
    }

    return response.json();
}

export async function fetchExpenses(
    budgetId: string,
    from: string = getTodayDateMinusYears(1),
    to: string = new Date().toISOString().split("T")[0]
): Promise<Expense[]> {
    const response = await fetch(`http://localhost:8080/api/v1/expenses?budgetId=${budgetId}&from=${from}&to=${to}`);

    if (!response.ok) {
        const errorMessage = await parseError(response);
        throw new Error(errorMessage);
    }

    return response.json();
}

export async function addExpenses(budgetId: string, newExpenses: Expense[]): Promise<Expense[]> {
    const response = await fetch(`http://localhost:8080/api/v1/expenses?budgetId=${budgetId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpenses),
    });

    if (!response.ok) {
        const errorMessage = await parseError(response);
        throw new Error(errorMessage);
    }

    return response.json();
}

export async function fetchCategories(): Promise<string[]> {
    const response = await fetch("http://localhost:8080/api/v1/categories");

    if (!response.ok) {
        const errorMessage = await parseError(response);
        throw new Error(errorMessage);
    }

    return response.json();
}

