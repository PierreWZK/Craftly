export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M26 7.5A13 13 0 1 0 26 24.5L20.5 19a5.5 5.5 0 1 1 0-6Z" fill="currentColor" />
      <circle cx="24.5" cy="16" r="3.5" fill="var(--color-accent)" />
    </svg>
  );
}

// Tailles explicites : text-xl et text-2xl sont remappés par design/tokens.css (titres, bandeau).
export function Logo({ size = "text-[1.5rem]" }: { size?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-extrabold tracking-tight ${size}`}>
      <LogoMark className="h-[1.15em] w-[1.15em]" />
      Craftly
    </span>
  );
}
