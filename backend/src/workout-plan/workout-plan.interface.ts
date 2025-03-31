// backend/src/workout-plan/workout-plan.interface.ts
import { WorkoutPlanItem } from './workout-plan-item.interface';

export interface WorkoutPlan {
  id: number; // プランの一意なID
  userId: number; // このプランを作成したユーザーのID
  name: string; // プラン名
  description?: string; // プランの説明 (オプション)
  items: WorkoutPlanItem[]; // プランに含まれるエクササイズ項目のリスト
  createdAt: Date; // 作成日時
  updatedAt: Date; // 更新日時
}
