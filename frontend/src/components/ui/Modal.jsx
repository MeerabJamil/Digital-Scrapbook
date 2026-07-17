import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-deep/30 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative bg-cream-deep rounded-3xl shadow-[var(--shadow-paper-lg)] max-w-md w-full p-7 paper-grain"
            initial={{ scale: 0.85, rotate: -3, opacity: 0 }}
            animate={{ scale: 1, rotate: -1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="btn-squish absolute top-4 right-4 text-cocoa/60 hover:text-cocoa"
            >
              <X size={22} />
            </button>
            {title && <h3 className="font-hand text-4xl text-cocoa-deep mb-3">{title}</h3>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
