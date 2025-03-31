// backend/src/workout-plan/workout-plan-item.interface.ts
export interface WorkoutPlanItem {
  id: number; // プラン項目の一意なID (プラン内でのIDでも良いが、ここでは全体で一意とする)
  exerciseName: string; // エクササイズ名
  targetSets: number; // 目標セット数
  targetReps: number; // 目標レップ数
  targetWeight?: number; // 目標重量 (オプション)
  notes?: string; // メモ (オプション)
}
