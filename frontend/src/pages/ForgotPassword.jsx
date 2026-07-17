import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "../components/layout/AuthShell";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);

  return (
    <AuthShell
      title="Lost your key? 🗝️"
      subtitle="We'll slip a note into your inbox."
      footer={<Link to="/login" className="text-terracotta font-tape">Back to log in</Link>}
    >
      {sent ? (
        <div className="text-center py-4">
          <span className="text-5xl block mb-3">💌</span>
          <p className="font-hand text-2xl text-cocoa-deep mb-1">Check your inbox!</p>
          <p className="font-utility text-sm text-cocoa/60">We've sent a reset link your way.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
          <Input id="email" label="Email" type="email" placeholder="you@cozy.com" required />
          <Button type="submit" variant="primary" className="w-full">Send reset link</Button>
        </form>
      )}
    </AuthShell>
  );
}
