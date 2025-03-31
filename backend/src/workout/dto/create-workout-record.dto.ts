// backend/src/workout/dto/create-workout-record.dto.ts
export class CreateWorkoutRecordDto {
  exerciseName: string; // ★注意: バリデーションが必要 (例: @IsNotEmpty(), @IsString())
  sets: number;         // ★注意: バリデーションが必要 (例: @IsInt(), @Min(1))
  reps: number;         // ★注意: バリデーションが必要 (例: @IsInt(), @Min(1))
  weight: number;       // ★注意: バリデーションが必要 (例: @IsNumber(), @Min(0))
}
