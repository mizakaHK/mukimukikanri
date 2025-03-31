// backend/src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service'; // UserServiceをインポート
import { User } from '../user/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) { // UserServiceを注入
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // リクエストヘッダーからBearerトークンを抽出
      ignoreExpiration: false, // トークンの有効期限切れを無視しない (デフォルト)
      secretOrKey: 'YOUR_SECRET_KEY', // ★重要: AuthModuleで設定したものと同じ秘密鍵を使用
    });
  }

  /**
   * PassportがJWTの検証後に呼び出すメソッド
   * @param payload JWTからデコードされたペイロード (AuthService.loginで設定したもの)
   * @returns 検証成功時はペイロード内のユーザー情報、失敗時はUnauthorizedExceptionをスロー
   */
  async validate(payload: { sub: number; email: string }): Promise<Omit<User, 'passwordHash'>> {
    // ペイロードのsub (subject) にはユーザーIDが入っている想定
    const user = await this.userService.findOneById(payload.sub);
    if (!user) {
      // トークンは有効だが、対応するユーザーがデータベースに存在しない場合
      throw new UnauthorizedException('User not found');
    }
    // パスワードハッシュを除いたユーザー情報を返す。これがリクエストオブジェクトの`req.user`に設定される。
    const { passwordHash, ...result } = user;
    return result;
  }
}
