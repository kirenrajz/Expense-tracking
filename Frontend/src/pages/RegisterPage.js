import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register({ username: form.username, password: form.password });
      navigate("/login", { replace: true, state: { fromRegister: true } });
    } catch (err) {
      const msg =
        err.response?.data?.error || err.response?.data?.message || "Registration failed";
      setError(msg);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="text-center mb-4">Create Account</h2>

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
            minLength={6}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirm" className="form-label">
            Confirm Password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            className="form-control"
            value={form.confirm}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>

      <p className="text-center mt-3">
        Already have an account?{" "}
        <Link to="/login" className="link-primary">
          Log in
        </Link>
      </p>
    </div>
  );
}
