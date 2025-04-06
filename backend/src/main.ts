import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // フロントエンドのURL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // DTOに定義されていないプロパティを削除
    transform: true, // 型変換を有効化
    forbidNonWhitelisted: true, // 未定義のプロパティがあるとエラー
    disableErrorMessages: false, // 開発中はエラーメッセージを表示
  }));
  
  app.setGlobalPrefix('api');
  
  await app.listen(process.env.PORT ?? 3001); // フロントエンドと重複しないようにポート変更
}
bootstrap();
