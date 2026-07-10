"use client";

type RollButtonProps = {
  rollId: string;
  label: string;
  rollNumber: number;
  isUsed: boolean;
  compact?: boolean;
  onToggle: (rollId: string) => void;
};

export function RollButton({
  rollId,
  label,
  rollNumber,
  isUsed,
  compact = false,
  onToggle,
}: RollButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(rollId)}
      aria-pressed={isUsed}
      aria-label={
        isUsed ? `${label} used — tap to undo` : `${label} — tap to mark as used`
      }
      className={`group relative flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-95 ${
        compact
          ? "min-h-10 min-w-0 px-1 py-2 sm:min-h-12 sm:px-2 sm:py-2.5"
          : "min-h-12 min-w-12 px-3 py-3 sm:min-h-14 sm:min-w-14"
      } ${
        isUsed
          ? "scale-95 border-white/20 bg-white/10 opacity-60"
          : "border-white/40 bg-white/20 hover:border-white/60 hover:bg-white/30 hover:shadow-lg hover:shadow-black/10"
      }`}
    >
      <span
        className={`flex items-center justify-center rounded-full bg-white/15 font-bold transition-all duration-200 ${
          compact
            ? "h-7 w-7 text-xs sm:h-8 sm:w-8 sm:text-sm"
            : "h-8 w-8 text-sm sm:h-9 sm:w-9 sm:text-base"
        } ${isUsed ? "line-through decoration-2 opacity-70" : ""}`}
        aria-hidden="true"
      >
        {rollNumber}
      </span>
      <span
        className={`mt-1 text-center font-semibold uppercase tracking-wide ${
          compact
            ? "text-[9px] leading-tight sm:text-[10px]"
            : "text-[10px] sm:text-xs"
        } ${isUsed ? "line-through opacity-70" : "opacity-90"}`}
      >
        {label}
      </span>
      {isUsed && (
        <span
          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[10px] font-bold text-emerald-950 shadow-md sm:h-5 sm:w-5 sm:text-xs"
          aria-hidden="true"
        >
          ✓
        </span>
      )}
    </button>
  );
}
