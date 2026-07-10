"use client";

import { RollButton } from "./RollButton";
import type { Phase } from "@/lib/program";
import { countUsedInPhase, getRollId } from "@/lib/program";

const accentStyles = {
  warm: {
    border: "border-orange-400/40",
    header: "from-orange-400/30 via-rose-400/20 to-amber-300/30",
    badge: "bg-orange-400/30 text-orange-100",
  },
  cool: {
    border: "border-sky-400/40",
    header: "from-sky-400/30 via-indigo-400/20 to-violet-400/30",
    badge: "bg-sky-400/30 text-sky-100",
  },
  green: {
    border: "border-emerald-400/40",
    header: "from-emerald-400/30 via-teal-400/20 to-cyan-400/30",
    badge: "bg-emerald-400/30 text-emerald-100",
  },
};

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
  const usedCount = countUsedInPhase(phase.id, usedRollIds);
  const isComplete = usedCount >= phase.rolls;
  const styles = accentStyles[phase.accent];

  return (
    <section
      className={`glass-card overflow-hidden rounded-3xl border-2 transition-all duration-300 ${styles.border} ${
        isActive ? "ring-2 ring-white/50 ring-offset-2 ring-offset-transparent" : ""
      } ${isComplete && !isActive ? "opacity-80" : ""}`}
      aria-label={`${phase.label}: ${usedCount} of ${phase.rolls} rolls used`}
    >
      <div className={`bg-gradient-to-r px-5 py-4 sm:px-6 ${styles.header}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
              {phase.label}
            </p>
            <h2 className="text-lg font-bold text-white sm:text-xl">
              {phase.days} days · {phase.rolls} rolls
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

      <div className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${Math.min(phase.rolls, 7)}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: phase.rolls }, (_, i) => {
            const rollId = getRollId(phase.id, i);
            return (
              <RollButton
                key={rollId}
                rollId={rollId}
                label={`Roll ${i + 1}`}
                isUsed={usedRollIds.has(rollId)}
                onToggle={onToggleRoll}
              />
            );
          })}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
          {Array.from({ length: phase.days }, (_, i) => (
            <span key={`${phase.id}-day-${i}`}>Day {i + 1}</span>
          ))}
        </div>

        <p className="text-sm font-medium text-white/80">
          {usedCount} of {phase.rolls} rolls used
          {phaseIndex === 0 && usedCount === 0 && (
            <span className="text-white/50"> — tap a roll when you use it</span>
          )}
        </p>
      </div>
    </section>
  );
}
