import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/expenses";

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form);              
      navigate(from, { replace: true });
    } catch (err) {
      
      const msg = err.response?.data?.error || "Login failed";
      setError(msg);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="text-center mb-4">Expense Tracker – Login</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="form-control"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Log In
        </button>
      </form>

      <p className="text-center mt-3">
        Don’t have an account?{" "}
        <Link to="/register" className="link-primary">
          Register
        </Link>
      </p>
    </div>
  );
}
