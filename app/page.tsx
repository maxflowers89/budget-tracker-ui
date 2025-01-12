'use client'

import { useEffect, useState } from "react";
import BudgetComponent from "./ui/Budget";
import ExpensesComponent from "./ui/Expenses";
import { fetchBudget, fetchExpenses, addExpenses, fetchCategories, addBudget } from "./lib/data";
import { Budget, Expense } from "./lib/definitions";

const BudgetRoute = () => {
    const [budget, setBudget] = useState<Budget | null>(null);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newBudgetAmount, setNewBudgetAmount] = useState<number | null>(null);

    // Fetch the budget
    const getBudget = async () => {
        try {
            const data = await fetchBudget(1); // Fetch budget for projectId=1
            setBudget(data);
            return data;
        } catch (err: any) {
            setError(err.message || "Failed to load budget.");
            return null;
        }
    };

    // Fetch expenses based on budgetId
    const loadExpenses = async (budgetId: string, from: string, to: string) => {
        try {
            const data = await fetchExpenses(budgetId, from, to);
            setExpenses(data);
        } catch (err: any) {
            setError(err.message || "Failed to load expenses.");
        }
    };

    // Add a new budget
    const handleAddBudget = async () => {
        if (newBudgetAmount === null || newBudgetAmount <= 0) {
            setError("Please enter a valid budget amount.");
            return;
        }

        try {
            // Call addBudget from data.ts
            await addBudget(1, newBudgetAmount);

            // Reload budget and expenses
            const updatedBudget = await getBudget();
            if (updatedBudget && updatedBudget.id) {
                const today = new Date().toISOString().split("T")[0];
                const oneYearAgo = new Date();
                oneYearAgo.setFullYear(new Date().getFullYear() - 1);
                await loadExpenses(updatedBudget.id, oneYearAgo.toISOString().split("T")[0], today);
            }

            setNewBudgetAmount(null); // Reset the input field
        } catch (err: any) {
            setError(err.message || "Failed to add budget.");
        }
    };

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(new Date().getFullYear() - 1);

        const loadBudgetAndExpenses = async () => {
            const budgetData = await getBudget();
            if (budgetData && budgetData.id) {
                await loadExpenses(budgetData.id, oneYearAgo.toISOString().split("T")[0], today);
            }
        };

        loadBudgetAndExpenses();
    }, []);

    return (
        <main style={{ fontFamily: "Arial, sans-serif", textAlign: "center", marginTop: "50px" }}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <h2>Add Budget</h2>
                <input
                    type="number"
                    value={newBudgetAmount ?? ""}
                    onChange={(e) => setNewBudgetAmount(parseFloat(e.target.value))}
                    placeholder="Enter budget amount"
                    style={{ marginRight: "10px" }}
                />
                <button
                    onClick={handleAddBudget}
                    style={{
                        padding: "5px 10px",
                        cursor: "pointer",
                    }}
                >
                    Add Budget
                </button>
            </div>
            <BudgetComponent budget={budget} />
            <ExpensesComponent
                expenses={expenses}
                onFilter={async (from, to) => {
                    if (budget && budget.id) {
                        await loadExpenses(budget.id, from, to);
                    }
                }}
                onAddExpense={async (newExpenses) => {
                    try {
                        if (budget && budget.id) {
                            await addExpenses(budget.id, newExpenses);
                            setExpenses((prev) => [...prev, ...newExpenses]);
                        }
                    } catch (err: any) {
                        setError(err.message || "Failed to add expenses.");
                    }
                }}
                fetchCategories={fetchCategories}
            />
        </main>
    );
};

export default BudgetRoute;
