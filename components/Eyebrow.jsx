export function Eyebrow({ children, className = "" }) {
  return (
    <p className={`chip mb-4 ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-sapphire-500" aria-hidden="true" />
      {children}
    </p>
  );
}
