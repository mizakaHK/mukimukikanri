import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'; // UserModuleをインポート
import { PassportModule } from '@nestjs/passport'; // PassportModuleをインポート
import { JwtModule } from '@nestjs/jwt'; // JwtModuleをインポート
import { LocalStrategy } from './local.strategy'; // LocalStrategyをインポート
import { JwtStrategy } from './jwt.strategy'; // JwtStrategyをインポート

@Module({
  imports: [
    UserModule, // UserServiceを利用可能にする
    PassportModule, // Passport機能を利用可能にする
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'development_secret_key', // 環境変数から読み込み、なければ開発用キーを使用
      signOptions: { expiresIn: '60m' }, // トークンの有効期限 (例: 60分)
    }),
  ],
  controllers: [AuthController],
  // AuthServiceに加えて、LocalStrategyとJwtStrategyをプロバイダーとして登録
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
