"use client";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  label: string; // "Page" / "पेज"
}

/** Dots under the grid: the current page is a wider orange pill. */
export default function PageDots({ page, totalPages, onChange, label }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div role="group" aria-label={label} className="flex justify-center gap-1">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${label} ${n}`}
          aria-current={n === page ? "page" : undefined}
          className="flex h-8 w-8 items-center justify-center"
        >
          <span
            className={`block h-2 rounded-full transition-all duration-300 ${
              n === page ? "w-6 bg-brand" : "w-2 bg-line hover:bg-clay"
            }`}
          />
        </button>
      ))}
    </div>
  );
}