import { useState } from "react";
import PropTypes from "prop-types";

export default function ExpenseForm({ initial, onSubmit, submitting }) {
  const [form, setForm] = useState(
    initial ?? { description: "", amount: "", date: "" }
  );
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.description.trim()) {
      setError("Description is required");
      return;
    }
    if (Number(form.amount) <= 0) {
      setError("Amount must be positive");
      return;
    }

    try {
      await onSubmit({
        description: form.description.trim(),
        amount: parseFloat(form.amount),
        date: form.date, 
      });
    } catch (err) {
      setError("Save failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          className="form-control"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="amount">
          Amount (RM)
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          className="form-control"
          value={form.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="date">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          className="form-control"
          value={form.date}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
        {submitting ? "Saving…" : "Save"}
      </button>
    </form>
  );
}

ExpenseForm.propTypes = {
  initial: PropTypes.shape({
    description: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    date: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};
