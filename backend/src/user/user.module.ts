import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  // UserService を他のモジュールから利用可能にするためにエクスポートする
  exports: [UserService],
})
export class UserModule {}
