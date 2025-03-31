import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto'; // LoginDtoもインポート

@Controller('auth') // このコントローラーのルートパスは /auth
export class AuthController {
  // AuthServiceをコンストラクタで注入
  constructor(private authService: AuthService) {}

  /**
   * ユーザー登録エンドポイント
   * POST /auth/register
   * リクエストボディにはRegisterDtoの形式でemailとpasswordが必要
   */
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // ★注意: DTOのバリデーションは別途実装が必要
    if (!registerDto.password) {
        throw new Error("Password is required for registration."); // 仮のエラー処理
    }
    return this.authService.register(registerDto.email, registerDto.password);
  }

  /**
   * ログインエンドポイント
   * POST /auth/login
   * リクエストボディにはLoginDtoの形式でemailとpasswordが必要
   * UseGuards(AuthGuard('local')) によりLocalStrategyが実行される
   */
  @UseGuards(AuthGuard('local')) // 'local'ストラテジーを使用するガードを適用
  @Post('login')
  async login(@Request() req) {
    // LocalStrategyのvalidateメソッドが成功すると、req.userにユーザー情報が設定される
    // そのユーザー情報を使ってAuthServiceのloginメソッドを呼び出し、JWTを生成・返却
    return this.authService.login(req.user);
  }

  /**
   * プロフィール取得エンドポイント (要認証)
   * GET /auth/profile
   * UseGuards(AuthGuard('jwt')) によりJwtStrategyが実行される
   */
  @UseGuards(AuthGuard('jwt')) // 'jwt'ストラテジーを使用するガードを適用
  @Get('profile')
  getProfile(@Request() req) {
    // JwtStrategyのvalidateメソッドが成功すると、req.userにユーザー情報が設定される
    // このユーザー情報をそのまま返す
    return req.user;
  }
}
