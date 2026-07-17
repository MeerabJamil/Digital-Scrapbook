export default function SectionHeading({ eyebrow, title, subtitle, align = "left", className = "" }) {
  return (
    <div className={`${align === "center" ? "text-center items-center" : "items-start"} flex flex-col ${className}`}>
      {eyebrow && (
        <span className="font-tape text-terracotta text-sm tracking-wide uppercase mb-1">{eyebrow}</span>
      )}
      <h2 className="font-hand text-5xl md:text-6xl text-cocoa-deep leading-tight">{title}</h2>
      <svg width="140" height="14" viewBox="0 0 140 14" className="mt-1 mb-2" aria-hidden="true">
        <path d="M2 9 Q 20 2, 38 9 T 74 9 T 110 9 T 138 9" stroke="#E9C5C5" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
      {subtitle && <p className="font-utility text-cocoa/70 max-w-xl">{subtitle}</p>}
    </div>
  );
}
