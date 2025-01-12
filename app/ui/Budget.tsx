import React from "react";
import { Budget } from "../lib/definitions";

interface BudgetProps {
    budget: Budget | null;
}

const BudgetComponent: React.FC<BudgetProps> = ({ budget }) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <p>Budget: {budget ? budget.amount.toFixed(2) : "Loading..."}</p>
        </div>
    );
};

export default BudgetComponent;
