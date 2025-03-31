// backend/src/user/user.interface.ts
export interface User {
  id: number;
  email: string;
  passwordHash: string; // パスワードはハッシュ化して保存
}
