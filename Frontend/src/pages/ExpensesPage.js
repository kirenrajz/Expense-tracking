import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchExpenses,
  deleteExpense,
} from "../api/expenseService";
import ExpenseTable from "../components/ExpenseTable";
import Navbar from "../components/Navbar";

export default function ExpensesPage() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchExpenses();
        setExpenses(data);
      } catch (err) {
        setError("Failed to load expenses");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch {
      alert("Delete failed");
    }
  }

  function handleEdit(id) {
    navigate(`/expenses/${id}/edit`);
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Your Expenses</h3>
          <button
            className="btn btn-success"
            onClick={() => navigate("/expenses/new")}
          >
            + Add Expense
          </button>
        </div>

        {loading && <p>Loading…</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && expenses.length === 0 && (
          <p>No expenses recorded yet.</p>
        )}
        {!loading && expenses.length > 0 && (
          <ExpenseTable
            expenses={expenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
}

