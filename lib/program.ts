export type Phase = {
  id: string;
  label: string;
  days: number;
  rollsPerDay: number;
  accent: "warm" | "cool" | "green";
};

export const phases: Phase[] = [
  { id: "phase-1", label: "Phase 1", days: 7, rollsPerDay: 7, accent: "warm" },
  { id: "phase-2", label: "Phase 2", days: 4, rollsPerDay: 4, accent: "cool" },
  { id: "phase-3", label: "Phase 3", days: 2, rollsPerDay: 2, accent: "green" },
];

export function getRollId(
  phaseId: string,
  dayIndex: number,
  rollIndex: number
): string {
  return `${phaseId}-day-${dayIndex}-roll-${rollIndex}`;
}

export function getPhaseTotalRolls(phase: Phase): number {
  return phase.days * phase.rollsPerDay;
}

export function getAllRollIds(): string[] {
  return phases.flatMap((phase) => getPhaseRollIds(phase.id));
}

export function getTotalRolls(): number {
  return phases.reduce((sum, phase) => sum + getPhaseTotalRolls(phase), 0);
}

export function getPhaseRollIds(phaseId: string): string[] {
  const phase = phases.find((p) => p.id === phaseId);
  if (!phase) return [];

  const ids: string[] = [];
  for (let day = 0; day < phase.days; day++) {
    for (let roll = 0; roll < phase.rollsPerDay; roll++) {
      ids.push(getRollId(phase.id, day, roll));
    }
  }
  return ids;
}

export function countUsedInPhase(
  phaseId: string,
  usedRollIds: Set<string>
): number {
  return getPhaseRollIds(phaseId).filter((id) => usedRollIds.has(id)).length;
}

export function getCurrentPhaseIndex(usedRollIds: Set<string>): number | null {
  const index = phases.findIndex(
    (phase) => countUsedInPhase(phase.id, usedRollIds) < getPhaseTotalRolls(phase)
  );
  return index === -1 ? null : index;
}
