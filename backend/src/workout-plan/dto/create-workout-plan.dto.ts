// backend/src/workout-plan/dto/create-workout-plan.dto.ts
import { WorkoutPlanItem } from '../workout-plan-item.interface';

// プラン項目作成用のDTO (IDは不要)
class CreateWorkoutPlanItemDto implements Omit<WorkoutPlanItem, 'id'> {
  exerciseName: string; // ★バリデーション必要
  targetSets: number;   // ★バリデーション必要
  targetReps: number;   // ★バリデーション必要
  targetWeight?: number;
  notes?: string;
}

export class CreateWorkoutPlanDto {
  name: string; // ★バリデーション必要
  description?: string;
  items: CreateWorkoutPlanItemDto[]; // ★バリデーション必要 (配列自体と配列要素の両方)
}
