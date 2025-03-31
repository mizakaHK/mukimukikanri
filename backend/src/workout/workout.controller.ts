import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutRecordDto } from './dto/create-workout-record.dto';
import { AuthGuard } from '@nestjs/passport'; // JWT認証ガードをインポート

@Controller('workout') // このコントローラーのルートパスは /workout
@UseGuards(AuthGuard('jwt')) // このコントローラー全体にJWT認証ガードを適用
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  /**
   * 新しいワークアウト記録を作成するエンドポイント
   * POST /workout
   * リクエストボディにはCreateWorkoutRecordDtoが必要
   * JWT認証が必要
   */
  @Post()
  async create(@Request() req, @Body() createWorkoutRecordDto: CreateWorkoutRecordDto) {
    // req.userにはJwtStrategyのvalidateメソッドから返されたユーザー情報が入っている
    const userId = req.user.id;
    // ★注意: DTOのバリデーションは別途実装が必要
    return this.workoutService.create(userId, createWorkoutRecordDto);
  }

  /**
   * 認証済みユーザーの全てのワークアウト記録を取得するエンドポイント
   * GET /workout
   * JWT認証が必要
   */
  @Get()
  async findAll(@Request() req) {
    // req.userにはJwtStrategyのvalidateメソッドから返されたユーザー情報が入っている
    const userId = req.user.id;
    return this.workoutService.findAllByUserId(userId);
  }
}
