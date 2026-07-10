"use client";

import { useCallback, useEffect, useState } from "react";
import { PhaseCard } from "./PhaseCard";
import { ProgressHeader } from "./ProgressHeader";
import { getCurrentPhaseIndex, phases } from "@/lib/program";
import { clearUsedRolls, loadUsedRolls, saveUsedRolls } from "@/lib/storage";

export function Tracker() {
  const [usedRollIds, setUsedRollIds] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUsedRollIds(loadUsedRolls());
    setHydrated(true);
  }, []);

  const toggleRoll = useCallback((rollId: string) => {
    setUsedRollIds((prev) => {
      const next = new Set(prev);
      if (next.has(rollId)) {
        next.delete(rollId);
      } else {
        next.add(rollId);
      }
      saveUsedRolls(next);
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    const confirmed = window.confirm(
      "Reset all progress? This will unmark every roll you've crossed off."
    );
    if (!confirmed) return;
    clearUsedRolls();
    setUsedRollIds(new Set());
  }, []);

  const usedCount = usedRollIds.size;
  const currentPhaseIndex = getCurrentPhaseIndex(usedRollIds);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 py-8 sm:gap-6 sm:px-6 sm:py-10">
      <ProgressHeader usedCount={usedCount} currentPhaseIndex={currentPhaseIndex} />

      <div className="flex flex-col gap-5 sm:gap-6">
        {phases.map((phase, index) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            phaseIndex={index}
            usedRollIds={usedRollIds}
            isActive={currentPhaseIndex === index}
            onToggleRoll={toggleRoll}
          />
        ))}
      </div>

      <footer className="flex flex-col items-center gap-3 pb-4 pt-2">
        <button
          type="button"
          onClick={handleReset}
          disabled={!hydrated || usedCount === 0}
          className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white/90 transition-all hover:border-white/40 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Reset progress
        </button>
        {!hydrated && (
          <p className="text-xs text-white/50" aria-live="polite">
            Loading saved progress…
          </p>
        )}
      </footer>
    </div>
  );
}
