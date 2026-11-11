interface FMILibLogoProps {
  size?: number;
  className?: string;
  inverse?: boolean;
}

export default function FMILibLogo({
  size = 80,
  className = "",
  inverse = false,
}: FMILibLogoProps) {
  const fills = inverse
    ? ["#69D8E4", "#8AE3EC", "#B0EFF3", "#FFFFFF"]
    : [
        "var(--fmi-logo-page-1)",
        "var(--fmi-logo-page-2)",
        "var(--fmi-logo-page-3)",
        "var(--fmi-logo-page-4)",
      ];

  return (
    <svg
      aria-label="FMI Lib"
      className={`shrink-0 ${className}`}
      height={size}
      role="img"
      viewBox="0 0 48 48"
      width={size}
    >
      <path
        d="M24 18.5c2.4-3 5.3-4.5 9.2-4.5H40c.6 0 1 .4 1 1v4h-7.5c-3.8 0-6.9 1.4-9.5 4.3v-4.8Z"
        fill={fills[0]}
      />
      <path
        d="M24 23.8c2.4-3 5.3-4.5 9.2-4.5H38v5h-4.5c-3.8 0-6.9 1.4-9.5 4.3v-4.8Z"
        fill={fills[1]}
      />
      <path
        d="M24 29.1c2.4-3 5.3-4.5 9.2-4.5H36v5h-2.5c-3.8 0-6.9 1.4-9.5 4.3v-4.8Z"
        fill={fills[2]}
      />
      <path
        d="M9 15.5c0-1.1.9-2 2-2h5c3.5 0 6.1 1.1 8 3.5v17c-2-2.4-4.6-3.5-8-3.5h-5c-1.1 0-2-.9-2-2v-13Z"
        fill={fills[3]}
      />
    </svg>
  );
}
