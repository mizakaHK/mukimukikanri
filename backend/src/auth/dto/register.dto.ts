// backend/src/auth/dto/register.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: '有効なメールアドレスを入力してください' })
  @IsNotEmpty({ message: 'メールアドレスは必須です' })
  email: string;

  @IsNotEmpty({ message: 'パスワードは必須です' })
  @MinLength(6, { message: 'パスワードは6文字以上で入力してください' })
  password: string;
}
