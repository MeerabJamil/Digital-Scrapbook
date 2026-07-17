export default function PaperClip({ rotate = -6, size = 34, className = "" }) {
  return (
    <svg
      className={`pointer-events-none absolute drop-shadow-sm ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      width={size}
      height={size * 1.4}
      viewBox="0 0 34 48"
      fill="none"
    >
      <path
        d="M9 14V34C9 39.5228 13.4772 44 19 44C24.5228 44 29 39.5228 29 34V10C29 6.13401 25.866 3 22 3C18.134 3 15 6.13401 15 10V32C15 33.6569 16.3431 35 18 35C19.6569 35 21 33.6569 21 32V14"
        stroke="#9AA5A0"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
