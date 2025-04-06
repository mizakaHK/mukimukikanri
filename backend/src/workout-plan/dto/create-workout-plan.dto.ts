// backend/src/workout-plan/dto/create-workout-plan.dto.ts
import { WorkoutPlanItem } from '../workout-plan-item.interface';
import { IsString, IsNotEmpty, IsInt, IsNumber, Min, IsOptional, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

// プラン項目作成用のDTO (IDは不要)
export class CreateWorkoutPlanItemDto implements Omit<WorkoutPlanItem, 'id'> {
  @IsString({ message: 'エクササイズ名は文字列で入力してください' })
  @IsNotEmpty({ message: 'エクササイズ名は必須です' })
  exerciseName: string;

  @IsInt({ message: '目標セット数は整数で入力してください' })
  @Min(1, { message: '目標セット数は1以上で入力してください' })
  targetSets: number;

  @IsInt({ message: '目標レップ数は整数で入力してください' })
  @Min(1, { message: '目標レップ数は1以上で入力してください' })
  targetReps: number;

  @IsOptional()
  @IsNumber({}, { message: '目標重量は数値で入力してください' })
  @Min(0, { message: '目標重量は0以上で入力してください' })
  targetWeight?: number;

  @IsOptional()
  @IsString({ message: 'メモは文字列で入力してください' })
  notes?: string;
}

export class CreateWorkoutPlanDto {
  @IsString({ message: 'プラン名は文字列で入力してください' })
  @IsNotEmpty({ message: 'プラン名は必須です' })
  name: string;

  @IsOptional()
  @IsString({ message: '説明は文字列で入力してください' })
  description?: string;

  @IsArray({ message: 'エクササイズリストは配列で入力してください' })
  @ArrayMinSize(1, { message: '少なくとも1つのエクササイズを含める必要があります' })
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutPlanItemDto)
  items: CreateWorkoutPlanItemDto[];
}
