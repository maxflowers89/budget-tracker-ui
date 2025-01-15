import React from "react";
import { Budget } from "../lib/definitions";

interface BudgetComponentProps {
    budget: Budget;
    newBudgetAmount: number | null;
    setNewBudgetAmount: (amount: number | null) => void;
    handleAddBudget: () => Promise<void>;
}

const BudgetComponent: React.FC<BudgetComponentProps> = ({
                                                             budget,
                                                             newBudgetAmount,
                                                             setNewBudgetAmount,
                                                             handleAddBudget,
                                                         }) => {
    return (
        <div style={{marginBottom: "20px"}}>
            <h2>Budget</h2>
            <input
                type="number"
                value={newBudgetAmount ? newBudgetAmount : ""}
                onChange={(e) => setNewBudgetAmount(parseFloat(e.target.value))}
                placeholder="Enter budget amount"
                style={{marginRight: "10px"}}
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

            <p>Budget: {budget ? budget.amount.toFixed(2) + " €" : "Loading..."}</p>
        </div>
    );
};

export default BudgetComponent;
