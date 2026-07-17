export default function Input({ label, id, type = "text", className = "", ...props }) {
  return (
    <label htmlFor={id} className="block">
      {label && (
        <span className="font-hand text-2xl text-cocoa-deep mb-1 block">{label}</span>
      )}
      <input
        id={id}
        type={type}
        className={`w-full rounded-2xl bg-cream-deep border-2 border-cocoa/15 px-4 py-2.5 font-body text-ink placeholder:text-cocoa/40 transition-all focus:border-lavender-deep focus:shadow-[0_0_0_4px_rgba(220,206,249,0.45)] outline-none ${className}`}
        {...props}
      />
    </label>
  );
}
