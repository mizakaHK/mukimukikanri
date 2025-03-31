// backend/src/auth/dto/register.dto.ts
export class RegisterDto {
  email: string;
  password?: string; // ★注意: 本来はバリデーションが必要 (例: @IsNotEmpty(), @MinLength(8))
}
