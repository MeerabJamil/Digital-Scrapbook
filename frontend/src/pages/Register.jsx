import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthShell from "../components/layout/AuthShell";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(name, email, password);
      navigate("/avatar-setup");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Let's make you a page 📖"
      subtitle="A cozy corner of the internet, just for your memories."
      footer={<>Already keeping a journal? <Link to="/login" className="text-terracotta font-tape">Log in</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="font-tape text-sm text-terracotta bg-blush/40 rounded-xl px-3 py-2">{error}</p>
        )}
        <Input
          id="name"
          label="What should we call you?"
          placeholder="Wren"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          minLength={6}
          required
        />
        <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
          {submitting ? "Creating..." : "Create my scrapbook"}
        </Button>
      </form>
    </AuthShell>
  );
}
