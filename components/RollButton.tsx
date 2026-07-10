"use client";

type RollButtonProps = {
  rollId: string;
  label: string;
  isUsed: boolean;
  onToggle: (rollId: string) => void;
};

export function RollButton({ rollId, label, isUsed, onToggle }: RollButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(rollId)}
      aria-pressed={isUsed}
      aria-label={isUsed ? `${label} used — tap to undo` : `${label} — tap to mark as used`}
      className={`group relative flex min-h-12 min-w-12 flex-col items-center justify-center rounded-2xl border-2 px-3 py-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-95 sm:min-h-14 sm:min-w-14 ${
        isUsed
          ? "scale-95 border-white/20 bg-white/10 opacity-60"
          : "border-white/40 bg-white/20 hover:border-white/60 hover:bg-white/30 hover:shadow-lg hover:shadow-black/10"
      }`}
    >
      <span
        className={`text-lg transition-all duration-200 sm:text-xl ${
          isUsed ? "line-through decoration-2" : ""
        }`}
        aria-hidden="true"
      >
        🚬
      </span>
      <span
        className={`mt-1 text-[10px] font-semibold uppercase tracking-wide sm:text-xs ${
          isUsed ? "line-through opacity-70" : "opacity-90"
        }`}
      >
        {label}
      </span>
      {isUsed && (
        <span
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-xs font-bold text-emerald-950 shadow-md"
          aria-hidden="true"
        >
          ✓
        </span>
      )}
    </button>
  );
}
