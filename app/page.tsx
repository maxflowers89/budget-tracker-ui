'use client'

import {useEffect, useState} from "react";
import BudgetComponent from "./ui/Budget";
import ExpensesComponent from "./ui/Expenses";
import {addBudget, addExpenses, fetchBudget, fetchCategories, fetchExpenses} from "./lib/data";
import {Budget, Expense} from "./lib/definitions";

const BudgetRoute = () => {
    const emptyBudget = {id: null, amount: 0};
    const [budget, setBudget] = useState<Budget>(emptyBudget);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newBudgetAmount, setNewBudgetAmount] = useState<number | null>(null);

    const loadBudgetAndExpenses = async () => {
        try {
            const retrievedBudget = await fetchBudget(1);
            setBudget(retrievedBudget);

            if (retrievedBudget.id) {
                const today = new Date().toISOString().split("T")[0];
                const oneYearAgo = new Date();
                oneYearAgo.setFullYear(new Date().getFullYear() - 1);

                await getExpenses(retrievedBudget.id, oneYearAgo.toISOString().split("T")[0], today);
            }
        } catch (err: any) {
            setError(err.message || "Failed to load budget.");
            return emptyBudget;
        }
    };

    const getExpenses = async (budgetId: string, from: string, to: string) => {
        try {
            setExpenses(await fetchExpenses(budgetId, from, to));
        } catch (err: any) {
            setError(err.message || "Failed to load expenses.");
        }
    };

    const handleAddBudget = async () => {
        if (newBudgetAmount === null || newBudgetAmount <= 0) {
            return alert("Please enter a valid budget amount.");
        }

        try {
            setBudget(await addBudget(1, {...budget, amount: newBudgetAmount}));
            setNewBudgetAmount(null);
        } catch (err: any) {
            setError(err.message || "Failed to add budget.");
        }
    };

    useEffect(() => {
        loadBudgetAndExpenses();
    }, []);

    return (
        <main style={{fontFamily: "Arial, sans-serif", textAlign: "center", marginTop: "50px"}}>
            {error && <p style={{color: "red"}}>{error}</p>}
            <BudgetComponent
                budget={budget}
                newBudgetAmount={newBudgetAmount}
                setNewBudgetAmount={setNewBudgetAmount}
                handleAddBudget={handleAddBudget}/>
            <ExpensesComponent
                expenses={expenses}
                onFilter={async (from, to) => {
                    if (budget.id) {
                        await getExpenses(budget.id, from, to);
                    }
                }}
                onAddExpense={async (newExpenses) => {
                    try {
                        if (budget.id) {
                            const addedExpenses = await addExpenses(budget.id, newExpenses);
                            setExpenses((prev) => [...prev, ...addedExpenses]);
                        }
                    } catch (err: any) {
                        setError(err.message || "Failed to add expenses.");
                    }
                }}
                fetchCategories={fetchCategories}
                setError={setError}
            />
        </main>
    );
};

export default BudgetRoute;
