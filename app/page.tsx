'use client'

import { useEffect, useState } from "react";
import BudgetComponent from "./ui/Budget";
import ExpensesComponent from "./ui/Expenses";
import { fetchBudget, fetchExpenses, fetchCategories, addExpenses } from "./lib/data";
import { Budget, Expense } from "./lib/definitions";

const BudgetRoute = () => {
    const [budget, setBudget] = useState<Budget | null>(null);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [error, setError] = useState<string | null>(null);

    const loadExpenses = async (from: string, to: string) => {
        try {
            const data = await fetchExpenses(from, to);
            setExpenses(data);
        } catch (err: any) {
            setError(err.message || "Unknown error");
        }
    };

    const addExpenseHandler = async (newExpenses: Expense[]) => {
        try {
            await addExpenses(newExpenses);
            setExpenses((prev) => [...prev, ...newExpenses]);
        } catch (err: any) {
            setError(err.message || "Failed to add expenses.");
        }
    };

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(new Date().getFullYear() - 1);

        const getBudget = async () => {
            try {
                const data = await fetchBudget(1);
                setBudget(data);
            } catch (err: any) {
                setError(err.message || "Unknown error");
            }
        };

        getBudget();
        loadExpenses(oneYearAgo.toISOString().split("T")[0], today);
    }, []);

    return (
        <main style={{ fontFamily: "Arial, sans-serif", textAlign: "center", marginTop: "50px" }}>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <BudgetComponent budget={budget} />
            <ExpensesComponent
                expenses={expenses}
                onFilter={loadExpenses}
                onAddExpense={addExpenseHandler}
                fetchCategories={fetchCategories}
            />
        </main>
    );
};

export default BudgetRoute;
