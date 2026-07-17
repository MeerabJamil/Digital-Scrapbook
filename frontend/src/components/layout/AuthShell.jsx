import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FloatingDecorations from "./FloatingDecorations";
import WashiTape from "./WashiTape";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-cream paper-grain flex items-center justify-center px-5 py-12 relative overflow-hidden">
      <FloatingDecorations count={8} className="fixed" />
      <Link to="/" className="absolute top-6 left-6 font-hand text-2xl text-cocoa-deep z-10">📔 Petal & Page</Link>

      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="relative bg-cream-deep rounded-3xl shadow-[var(--shadow-paper-lg)] paper-grain w-full max-w-md p-8 z-10"
      >
        <WashiTape tone="lavender" rotate={-10} className="-top-4 left-10" />
        <WashiTape tone="peach" rotate={8} className="-top-4 right-10" />
        <h1 className="font-hand text-4xl text-cocoa-deep mb-1 text-center">{title}</h1>
        {subtitle && <p className="font-utility text-sm text-cocoa/60 text-center mb-6">{subtitle}</p>}
        {children}
        {footer && <div className="mt-5 text-center font-utility text-sm text-cocoa/70">{footer}</div>}
      </motion.div>
    </div>
  );
}
