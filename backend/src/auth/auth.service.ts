import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // bcryptをインポート
import { User } from '../user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, // UserServiceを注入
    private jwtService: JwtService,   // JwtServiceを注入
  ) {}

  /**
   * Eメールとパスワードでユーザーを検証する
   * @param email ユーザーのEメール
   * @param pass ユーザーが入力したパスワード
   * @returns 検証成功時はパスワードハッシュを除いたユーザー情報、失敗時はnull
   */
  async validateUser(email: string, pass: string): Promise<Omit<User, 'passwordHash'> | null> {
    const user = await this.userService.findOneByEmail(email);
    // ユーザーが存在し、かつパスワードが一致するか検証
    if (user && await bcrypt.compare(pass, user.passwordHash)) {
      // パスワードハッシュを除いたユーザー情報を返す
      const { passwordHash, ...result } = user;
      return result;
    }
    return null; // 認証失敗
  }

  /**
   * ログイン処理を行い、JWTアクセストークンを発行する
   * @param user 認証済みユーザー情報 (validateUserの戻り値)
   * @returns アクセストークンを含むオブジェクト
   */
  async login(user: Omit<User, 'passwordHash'>) {
    // JWTのペイロード（トークンに含める情報）
    // ここではユーザーIDとEメールを含める
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload), // ペイロードを基にJWTを生成
    };
  }

  /**
   * 新規ユーザー登録を行う
   * @param email 登録するEメール
   * @param pass 登録するパスワード
   * @returns 作成されたユーザー情報（パスワードハッシュを除く）
   */
  async register(email: string, pass: string): Promise<Omit<User, 'passwordHash'>> {
    // パスワードをハッシュ化
    const saltRounds = 10; // ハッシュ化のコスト係数（高いほど安全だが処理時間が増える）
    const passwordHash = await bcrypt.hash(pass, saltRounds);

    // UserServiceを使ってユーザーを作成
    // createメソッドはConflictExceptionをスローする可能性がある（Eメール重複時）
    const newUser = await this.userService.create(email, passwordHash);
    return newUser;
  }
}
