// backend/src/workout/dto/create-workout-record.dto.ts
import { IsNotEmpty, IsString, IsInt, IsNumber, Min } from 'class-validator';

export class CreateWorkoutRecordDto {
  @IsString({ message: 'エクササイズ名は文字列で入力してください' })
  @IsNotEmpty({ message: 'エクササイズ名は必須です' })
  exerciseName: string;

  @IsInt({ message: 'セット数は整数で入力してください' })
  @Min(1, { message: 'セット数は1以上で入力してください' })
  sets: number;

  @IsInt({ message: 'レップ数は整数で入力してください' })
  @Min(1, { message: 'レップ数は1以上で入力してください' })
  reps: number;

  @IsNumber({}, { message: '重量は数値で入力してください' })
  @Min(0, { message: '重量は0以上で入力してください' })
  weight: number;

  recordedAt?: string; // オプション: フロントエンドから送信される場合
}
