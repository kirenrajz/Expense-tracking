import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import { addExpense } from "../api/expenseService";

export default function AddExpensePage() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleAdd(payload) {
    setSubmitting(true);
    await addExpense(payload);
    navigate("/expenses");
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4" style={{ maxWidth: 500 }}>
        <h3 className="mb-3">Add Expense</h3>
        <ExpenseForm onSubmit={handleAdd} submitting={submitting} />
      </div>
    </>
  );
}
