import React, { useState, useEffect } from "react";
import { Expense } from "../lib/definitions";

interface ExpensesProps {
    expenses: Expense[];
    onFilter: (from: string, to: string) => void;
    onAddExpense: (newExpenses: Expense[]) => void;
    fetchCategories: () => Promise<string[]>;
    setError: (error: string) => void;
}

const ExpensesComponent: React.FC<ExpensesProps> = ({ expenses, onFilter, onAddExpense, fetchCategories, setError }) => {
    const [from, setFrom] = useState("2024-01-01");
    const [to, setTo] = useState(new Date().toISOString().split("T")[0]);
    const [categories, setCategories] = useState<string[]>([]);
    const [newExpense, setNewExpense] = useState<Omit<Expense, "id">>({
        amount: 0,
        date: "",
        category: "",
    });

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err: any) {
                setError(err.message || "Failed to load budget.");
            }
        };

        loadCategories();
    }, []);

    const handleAddExpense = () => {
        if (!newExpense.date || !newExpense.category || newExpense.amount <= 0) {
            alert("Please fill all fields correctly.");
            return;
        }

        const expenseToAdd: Expense = { ...newExpense, id: null };
        onAddExpense([expenseToAdd]);
        setNewExpense({ amount: 0, date: "", category: "" });
    };

    const handleInputChange = (field: keyof Omit<Expense, "id">, value: string | number) => {
        setNewExpense({ ...newExpense, [field]: value });
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                minHeight: "100vh",
                textAlign: "center",
            }}
        >
            <h2>Expenses</h2>

            {/* Date Filters */}
            <div style={{marginTop: "30px"}}>
                <label>
                    From:{" "}
                    <input
                        type="date"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </label>
                <label style={{marginLeft: "10px"}}>
                    To:{" "}
                    <input
                        type="date"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                </label>
                <button
                    onClick={() => onFilter(from, to)}
                    style={{
                        marginLeft: "10px",
                        padding: "5px 10px",
                        cursor: "pointer",
                    }}
                >
                    Filter
                </button>
            </div>

            {/* Add New Expense */}
            <div style={{marginTop: "30px", width: "80%"}}>
                <h3>Add New Expense</h3>
                <div>
                    <label>
                        Date:{" "}
                        <input
                            type="date"
                            value={newExpense.date}
                            onChange={(e) => handleInputChange("date", e.target.value)}
                        />
                    </label>
                    <label style={{marginLeft: "10px"}}>
                        Category:{" "}
                        <select
                            value={newExpense.category}
                            onChange={(e) => handleInputChange("category", e.target.value)}
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label style={{marginLeft: "10px"}}>
                        Amount:{" "}
                        <input
                            type="number"
                            value={newExpense.amount}
                            onChange={(e) => handleInputChange("amount", e.target.value ? parseFloat(e.target.value) : "")}
                        />
                    </label>
                    <button
                        onClick={handleAddExpense}
                        style={{
                            marginLeft: "10px",
                            padding: "5px 10px",
                            cursor: "pointer",
                        }}
                    >
                        Add Expense
                    </button>
                </div>
            </div>

            {/* Expense Table */}
            {expenses.length > 0 ? (
                <table
                    border={1}
                    style={{
                        width: "80%",
                        textAlign: "center",
                        borderCollapse: "collapse",
                        marginTop: "20px",
                    }}
                >
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.date}</td>
                            <td>{expense.category}</td>
                            <td>{expense.amount.toFixed(2)} €</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No expenses found.</p>
            )}
        </div>
    );
};

export default ExpensesComponent;
