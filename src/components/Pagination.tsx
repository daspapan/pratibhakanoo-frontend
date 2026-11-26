"use client";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  labels: { prev: string; next: string; page: string };
}

export default function Pagination({ page, totalPages, onChange, labels }: Props) {
  if (totalPages <= 1) return null; // nothing to page through yet

  const btn = "flex h-11 min-w-11 items-center justify-center rounded-[14px] border-2 px-3 font-bold transition-colors";
  return (
    <nav aria-label="Story pages" className="flex items-center justify-center gap-1.5">
      <button type="button" aria-label={labels.prev} disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className={`${btn} border-line bg-white disabled:opacity-40`}>‹</button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)}
          aria-label={`${labels.page} ${n}`}
          aria-current={n === page ? "page" : undefined}
          className={`${btn} ${n === page ? "border-ink bg-ink text-white" : "border-line bg-white hover:bg-cream-dark"}`}>
          {n}
        </button>
      ))}

      <button type="button" aria-label={labels.next} disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className={`${btn} border-line bg-white disabled:opacity-40`}>›</button>
    </nav>
  );
}