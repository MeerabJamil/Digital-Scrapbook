const VARIANTS = {
  primary: "bg-terracotta text-cream hover:bg-cocoa-deep shadow-[var(--shadow-paper)]",
  secondary: "bg-sage text-cocoa-deep hover:bg-sage-deep shadow-[var(--shadow-paper)]",
  ghost: "bg-transparent text-cocoa border-2 border-cocoa/30 hover:border-cocoa/60",
  sticker: "bg-gold text-cocoa-deep hover:brightness-105 shadow-[var(--shadow-paper)]",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  as: As = "button",
  ...props
}) {
  return (
    <As
      className={`btn-squish font-tape text-lg px-6 py-2.5 rounded-full inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </As>
  );
}
