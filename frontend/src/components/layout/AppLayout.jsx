import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import FloatingDecorations from "./FloatingDecorations";

export default function AppLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-cream paper-grain relative">
      <FloatingDecorations count={6} items={["✨", "🌸", "🍃"]} className="fixed" />
      <Navbar />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-5 py-8 relative z-10"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
