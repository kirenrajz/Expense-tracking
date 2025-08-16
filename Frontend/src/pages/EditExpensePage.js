import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import {
  fetchExpenseById,
  updateExpense,
} from "../api/expenseService";

export default function EditExpensePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const exp = await fetchExpenseById(id);
        setInitial({ ...exp, date: exp.date });
      } catch {
        setError("Expense not found");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function handleUpdate(payload) {
    setSubmitting(true);
    await updateExpense(id, payload);
    navigate("/expenses");
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4" style={{ maxWidth: 500 }}>
        {loading && <p>Loading…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <>
            <h3 className="mb-3">Edit Expense</h3>
            <ExpenseForm
              initial={initial}
              onSubmit={handleUpdate}
              submitting={submitting}
            />
          </>
        )}
      </div>
    </>
  );
}
