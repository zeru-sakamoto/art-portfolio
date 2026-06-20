interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-pill border border-accent bg-bg-medium px-3 py-1 font-body text-sm tracking-wide whitespace-nowrap text-accent uppercase ${className}`}
    >
      {children}
    </span>
  );
}
