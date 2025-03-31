// backend/src/auth/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // passport-localはデフォルトで'username'を使うため、'email'を使うよう指定
  }

  /**
   * Passportがユーザー名(email)とパスワードで呼び出す検証メソッド
   * @param email リクエストから抽出されたEメール
   * @param password リクエストから抽出されたパスワード
   * @returns 検証成功時はユーザーオブジェクト、失敗時はUnauthorizedExceptionをスロー
   */
  async validate(email: string, password: string): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      // ユーザーが見つからない、またはパスワードが一致しない場合
      throw new UnauthorizedException('Invalid credentials');
    }
    // 検証成功。ユーザーオブジェクトを返す。これがリクエストオブジェクトの`req.user`に設定される。
    return user;
  }
}
