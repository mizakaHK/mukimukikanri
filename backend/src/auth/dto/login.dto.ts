// backend/src/auth/dto/login.dto.ts
export class LoginDto {
  email: string;
  password?: string; // LocalStrategyが処理するため、コントローラーでは必須ではないが定義しておく
}
