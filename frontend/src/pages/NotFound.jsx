import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import FloatingDecorations from "../components/layout/FloatingDecorations";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream paper-grain flex items-center justify-center relative overflow-hidden px-6">
      <FloatingDecorations count={8} className="fixed" />
      <div className="text-center relative z-10">
        <motion.span
          className="text-8xl block mb-4"
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          🍂
        </motion.span>
        <h1 className="font-hand text-6xl text-cocoa-deep mb-3">This page fell out of the scrapbook</h1>
        <p className="font-utility text-cocoa/70 mb-7 max-w-md mx-auto">We looked under the desk and behind the bookshelf, but couldn't find it. Let's get you back to your pages.</p>
        <Button as={Link} to="/dashboard" variant="primary">Back to my scrapbook</Button>
      </div>
    </div>
  );
}
