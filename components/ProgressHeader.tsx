"use client";

import { getTotalRolls, phases } from "@/lib/program";

type ProgressHeaderProps = {
  usedCount: number;
  currentPhaseIndex: number | null;
};

export function ProgressHeader({ usedCount, currentPhaseIndex }: ProgressHeaderProps) {
  const totalRolls = getTotalRolls();
  const remaining = totalRolls - usedCount;
  const percentage = totalRolls > 0 ? (usedCount / totalRolls) * 100 : 0;

  const phaseLabel =
    currentPhaseIndex === null
      ? "Program complete"
      : `Phase ${currentPhaseIndex + 1} of ${phases.length}`;

  return (
    <header className="glass-card rounded-3xl border border-white/20 p-5 sm:p-6">
      <div className="mb-1 flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Teller
        </h1>
        <p className="text-sm font-medium text-white/70">Tobacco tracker</p>
      </div>

      <p className="mb-1 text-sm text-white/80">
        {usedCount} of {totalRolls} rolls used · {remaining} remaining
      </p>
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/60">
        {phaseLabel}
      </p>

      <div
        className="h-3 overflow-hidden rounded-full bg-white/15"
        role="progressbar"
        aria-valuenow={usedCount}
        aria-valuemin={0}
        aria-valuemax={totalRolls}
        aria-label="Overall progress"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 via-orange-400 to-emerald-400 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </header>
  );
}
