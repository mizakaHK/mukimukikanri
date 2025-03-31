import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkoutPlan } from './workout-plan.interface';
import { CreateWorkoutPlanDto } from './dto/create-workout-plan.dto';
import { WorkoutPlanItem } from './workout-plan-item.interface';

@Injectable()
export class WorkoutPlanService {
  // ワークアウトプランをメモリ上に保持する配列 (データベースの代わり)
  private readonly plans: WorkoutPlan[] = [];
  private nextPlanId = 1; // プランID採番用
  private nextItemId = 1; // プラン項目ID採番用 (簡易的)

  /**
   * 新しいワークアウトプランを作成する
   * @param userId プランを作成するユーザーのID
   * @param createWorkoutPlanDto プランデータ
   * @returns 作成されたワークアウトプラン
   */
  async create(userId: number, createWorkoutPlanDto: CreateWorkoutPlanDto): Promise<WorkoutPlan> {
    const now = new Date();
    const newPlan: WorkoutPlan = {
      id: this.nextPlanId++,
      userId,
      name: createWorkoutPlanDto.name,
      description: createWorkoutPlanDto.description,
      // プラン項目にもIDを付与する (簡易的な実装)
      items: createWorkoutPlanDto.items.map(itemDto => ({
        ...itemDto,
        id: this.nextItemId++,
      })),
      createdAt: now,
      updatedAt: now,
    };
    this.plans.push(newPlan);
    return newPlan;
  }

  /**
   * 特定のユーザーの全てのワークアウトプランを取得する
   * @param userId 取得対象のユーザーID
   * @returns ユーザーのワークアウトプランの配列
   */
  async findAllByUserId(userId: number): Promise<WorkoutPlan[]> {
    return this.plans.filter((plan) => plan.userId === userId);
  }

  /**
   * 特定のIDのワークアウトプランを取得する
   * @param planId 取得対象のプランID
   * @param userId 取得を試みるユーザーID (所有権確認用)
   * @returns 見つかったワークアウトプラン
   * @throws NotFoundException プランが見つからない、またはユーザーが所有していない場合
   */
  async findOneById(planId: number, userId: number): Promise<WorkoutPlan> {
    const plan = this.plans.find((p) => p.id === planId);
    if (!plan) {
      throw new NotFoundException(`Workout plan with ID ${planId} not found`);
    }
    // ユーザーがプランの所有者か確認 (セキュリティ上重要)
    if (plan.userId !== userId) {
      // 本来はForbiddenExceptionの方が適切かもしれないが、ここではNotFoundで統一
      throw new NotFoundException(`Workout plan with ID ${planId} not found for this user`);
    }
    return plan;
  }

  // TODO: 将来的に更新(update)、削除(delete)メソッドも実装する
}
