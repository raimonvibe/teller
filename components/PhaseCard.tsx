"use client";

import { RollButton } from "./RollButton";
import type { Phase } from "@/lib/program";
import {
  countUsedInPhase,
  getPhaseTotalRolls,
  getRollId,
} from "@/lib/program";

const accentStyles = {
  warm: {
    border: "border-orange-400/40",
    header: "from-orange-400/30 via-rose-400/20 to-amber-300/30",
    badge: "bg-orange-400/30 text-orange-100",
    dayBg: "bg-white/5",
  },
  cool: {
    border: "border-sky-400/40",
    header: "from-sky-400/30 via-indigo-400/20 to-violet-400/30",
    badge: "bg-sky-400/30 text-sky-100",
    dayBg: "bg-white/5",
  },
  green: {
    border: "border-emerald-400/40",
    header: "from-emerald-400/30 via-teal-400/20 to-cyan-400/30",
    badge: "bg-emerald-400/30 text-emerald-100",
    dayBg: "bg-white/5",
  },
};

function rollsGridClass(rollsPerDay: number): string {
  if (rollsPerDay >= 7) {
    return "grid grid-cols-4 gap-2 sm:grid-cols-7 sm:gap-3";
  }
  if (rollsPerDay >= 4) {
    return "grid grid-cols-4 gap-2 sm:gap-3";
  }
  return "grid grid-cols-2 gap-2 sm:gap-3";
}

type PhaseCardProps = {
  phase: Phase;
  phaseIndex: number;
  usedRollIds: Set<string>;
  isActive: boolean;
  onToggleRoll: (rollId: string) => void;
};

export function PhaseCard({
  phase,
  phaseIndex,
  usedRollIds,
  isActive,
  onToggleRoll,
}: PhaseCardProps) {
  const totalRolls = getPhaseTotalRolls(phase);
  const usedCount = countUsedInPhase(phase.id, usedRollIds);
  const isComplete = usedCount >= totalRolls;
  const styles = accentStyles[phase.accent];
  const gridClass = rollsGridClass(phase.rollsPerDay);
  const compactRolls = phase.rollsPerDay >= 7;

  return (
    <section
      className={`glass-card overflow-hidden rounded-3xl border-2 transition-all duration-300 ${styles.border} ${
        isActive ? "ring-2 ring-white/50 ring-offset-2 ring-offset-transparent" : ""
      } ${isComplete && !isActive ? "opacity-80" : ""}`}
      aria-label={`${phase.label}: ${usedCount} of ${totalRolls} rolls used`}
    >
      <div className={`bg-gradient-to-r px-5 py-4 sm:px-6 ${styles.header}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
              {phase.label}
            </p>
            <h2 className="text-lg font-bold text-white sm:text-xl">
              {phase.days} days · {phase.rollsPerDay} rolls per day
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {isComplete && (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
              >
                Complete
              </span>
            )}
            {isActive && !isComplete && (
              <span className="rounded-full bg-white/25 px-3 py-1 text-xs font-semibold text-white">
                Active
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3 px-4 py-5 sm:space-y-4 sm:px-6 sm:py-6">
        {Array.from({ length: phase.days }, (_, dayIndex) => {
          const dayRollIds = Array.from(
            { length: phase.rollsPerDay },
            (_, rollIndex) => getRollId(phase.id, dayIndex, rollIndex)
          );
          const dayUsedCount = dayRollIds.filter((id) =>
            usedRollIds.has(id)
          ).length;

          return (
            <div
              key={`${phase.id}-day-${dayIndex}`}
              className={`rounded-2xl border border-white/10 p-3 sm:p-4 ${styles.dayBg}`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-white sm:text-base">
                  Day {dayIndex + 1}
                </h3>
                <span className="text-xs font-medium text-white/60">
                  {dayUsedCount}/{phase.rollsPerDay} used
                </span>
              </div>

              <div className={gridClass}>
                {dayRollIds.map((rollId, rollIndex) => (
                  <RollButton
                    key={rollId}
                    rollId={rollId}
                    rollNumber={rollIndex + 1}
                    label={`Roll ${rollIndex + 1}`}
                    isUsed={usedRollIds.has(rollId)}
                    compact={compactRolls}
                    onToggle={onToggleRoll}
                  />
                ))}
              </div>
            </div>
          );
        })}

        <p className="text-sm font-medium text-white/80">
          {usedCount} of {totalRolls} rolls used
          {phaseIndex === 0 && usedCount === 0 && (
            <span className="text-white/50"> — tap a roll when you use it</span>
          )}
        </p>
      </div>
    </section>
  );
}
