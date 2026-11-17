type Pattern = "dots" | "circles" | "zigzag";

const patterns: Pattern[] = ["dots", "circles", "zigzag"];

export default function CourseCard({
  name,
  description,
  mosaic = false,
  patternIndex = 0,
}: {
  name: string;
  description?: string;
  mosaic?: boolean;
  patternIndex?: number;
}) {
  const pattern = patterns[patternIndex % patterns.length];

  return (
    <article
      className={`group relative isolate flex h-full min-h-40 w-full overflow-hidden rounded-full bg-(--fmi-accent) p-6 text-left shadow-xl transition duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-sky-500/40 ${
        mosaic
          ? "lg:min-h-0 lg:rounded-3xl lg:border-0 lg:p-2 lg:shadow-none"
          : ""
      }`}
    >
      <PatternArtwork pattern={pattern} />
      <div className="relative z-10 flex max-w-[88%] flex-col justify-center gap-2 sm:max-w-[76%] lg:max-w-[92%]">
        <h2 className="text-xl font-bold leading-tight tracking-tight text-(--text-900) sm:text-2xl lg:text-xl">
          {name}
        </h2>
        {description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-(--text-600) sm:text-base lg:text-sm lg:leading-5">
            {description}
          </p>
        )}
      </div>
    </article>
  );
}

function PatternArtwork({ pattern }: { pattern: Pattern }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -right-3 -bottom-4 h-[90%] w-[48%] text-sky-600/15 transition duration-300 group-hover:text-sky-600/25"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 180 150"
    >
      {pattern === "dots" &&
        Array.from({ length: 7 }, (_, row) =>
          Array.from({ length: 6 }, (_, column) => (
            <circle
              cx={24 + column * 25}
              cy={18 + row * 22}
              fill="currentColor"
              key={`${row}-${column}`}
              r={row % 2 === 0 && column % 2 === 0 ? 2.5 : 1.7}
            />
          )),
        )}
      {pattern === "circles" && (
        <>
          <circle cx="112" cy="106" r="20" stroke="currentColor" strokeWidth="2" />
          <circle cx="112" cy="106" r="42" stroke="currentColor" strokeWidth="2" />
          <circle cx="112" cy="106" r="64" stroke="currentColor" strokeWidth="2" />
          <circle cx="112" cy="106" r="86" stroke="currentColor" strokeWidth="2" />
        </>
      )}
      {pattern === "zigzag" && (
        <>
          <path
            d="m52 8 24 24-24 24 24 24-24 24 24 24-24 24M104 8l24 24-24 24 24 24-24 24 24 24-24 24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M32 20h12m74 40h20m-54 42h24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
}
