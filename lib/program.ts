export type Phase = {
  id: string;
  label: string;
  days: number;
  rolls: number;
  accent: "warm" | "cool" | "green";
};

export const phases: Phase[] = [
  { id: "phase-1", label: "Phase 1", days: 7, rolls: 7, accent: "warm" },
  { id: "phase-2", label: "Phase 2", days: 4, rolls: 4, accent: "cool" },
  { id: "phase-3", label: "Phase 3", days: 4, rolls: 2, accent: "green" },
];

export function getRollId(phaseId: string, index: number): string {
  return `${phaseId}-roll-${index}`;
}

export function getAllRollIds(): string[] {
  return phases.flatMap((phase) =>
    Array.from({ length: phase.rolls }, (_, i) => getRollId(phase.id, i))
  );
}

export function getTotalRolls(): number {
  return phases.reduce((sum, phase) => sum + phase.rolls, 0);
}

export function getPhaseRollIds(phaseId: string): string[] {
  const phase = phases.find((p) => p.id === phaseId);
  if (!phase) return [];
  return Array.from({ length: phase.rolls }, (_, i) => getRollId(phase.id, i));
}

export function countUsedInPhase(phaseId: string, usedRollIds: Set<string>): number {
  return getPhaseRollIds(phaseId).filter((id) => usedRollIds.has(id)).length;
}

export function getCurrentPhaseIndex(usedRollIds: Set<string>): number | null {
  const index = phases.findIndex(
    (phase) => countUsedInPhase(phase.id, usedRollIds) < phase.rolls
  );
  return index === -1 ? null : index;
}
