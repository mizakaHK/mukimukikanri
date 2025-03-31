// backend/src/workout/workout-record.interface.ts
export interface WorkoutRecord {
  id: number; // 記録の一意なID
  userId: number; // この記録を行ったユーザーのID
  exerciseName: string; // エクササイズ名
  sets: number; // セット数
  reps: number; // レップ数
  weight: number; // 使用重量
  recordedAt: Date; // 記録日時
}
