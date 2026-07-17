import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthShell from "../components/layout/AuthShell";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back 🌸"
      subtitle="Your pages missed you."
      footer={<>New here? <Link to="/register" className="text-terracotta font-tape">Start a scrapbook</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="font-tape text-sm text-terracotta bg-blush/40 rounded-xl px-3 py-2">{error}</p>
        )}
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@cozy.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="text-right -mt-2">
          <Link to="/forgot-password" className="font-utility text-xs text-cocoa/60 hover:text-terracotta">Forgot password?</Link>
        </div>
        <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
          {submitting ? "Opening..." : "Open my journal"}
        </Button>
      </form>
    </AuthShell>
  );
}
