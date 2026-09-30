import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  className?: string;
  inverse?: boolean;
};

export function AuctumSeal({ size = 72, className, inverse }: Props) {
  const ink = inverse ? "#F1F2EA" : "#17231D";
  const stamp = inverse ? "#E8C7C0" : "#8C2F22";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Auctum Ledger seal"
      className={cn("shrink-0", className)}
    >
      <circle cx="50" cy="50" r="47" fill="none" stroke={ink} strokeWidth="1.2" opacity="0.55" />
      <g fill={ink} opacity="0.8">
        <path d="M50 1 L54 16 L50 21 L46 16 Z" />
        <path d="M50 99 L54 84 L50 79 L46 84 Z" />
        <path d="M1 50 L16 46 L21 50 L16 54 Z" />
        <path d="M99 50 L84 46 L79 50 L84 54 Z" />
      </g>
      <ellipse cx="50" cy="50" rx="21" ry="30" fill="none" stroke={stamp} strokeWidth="2.4" />
      <path
        d="M50 21 C39 33 61 45 50 50 C39 55 61 67 50 79"
        fill="none"
        stroke={stamp}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
