import Button from "./Button";

export default function EmptyState({ emoji = "📖", title, subtitle, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-6">
      <span className="text-6xl mb-4 animate-bounce" style={{ animationDuration: "2.4s" }}>{emoji}</span>
      <h3 className="font-hand text-4xl text-cocoa-deep mb-2">{title}</h3>
      {subtitle && <p className="font-utility text-cocoa/70 max-w-sm mb-5">{subtitle}</p>}
      {actionLabel && (
        <Button variant="primary" onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
