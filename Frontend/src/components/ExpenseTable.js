import PropTypes from "prop-types";

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  return (
    <table className="table table-striped align-middle">
      <thead>
        <tr>
          <th>Description</th>
          <th className="text-end">Amount (RM)</th>
          <th>Date</th>
          <th className="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp) => (
          <tr key={exp.id}>
            <td>{exp.description}</td>
            <td className="text-end">{exp.amount.toFixed(2)}</td>
            <td>{exp.date}</td>
            <td className="text-end">
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => onEdit(exp.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(exp.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
