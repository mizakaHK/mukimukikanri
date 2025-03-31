import { Controller, Post, Body, UseGuards, Request, Get, Param, ParseIntPipe } from '@nestjs/common';
import { WorkoutPlanService } from './workout-plan.service';
import { CreateWorkoutPlanDto } from './dto/create-workout-plan.dto';
import { AuthGuard } from '@nestjs/passport'; // JWT認証ガードをインポート

@Controller('workout-plans') // コントローラーのルートパスを複数形に変更
@UseGuards(AuthGuard('jwt')) // このコントローラー全体にJWT認証ガードを適用
export class WorkoutPlanController {
  constructor(private readonly workoutPlanService: WorkoutPlanService) {}

  /**
   * 新しいワークアウトプランを作成するエンドポイント
   * POST /workout-plans
   * リクエストボディにはCreateWorkoutPlanDtoが必要
   * JWT認証が必要
   */
  @Post()
  async create(@Request() req, @Body() createWorkoutPlanDto: CreateWorkoutPlanDto) {
    const userId = req.user.id;
    // ★注意: DTOのバリデーションは別途実装が必要
    return this.workoutPlanService.create(userId, createWorkoutPlanDto);
  }

  /**
   * 認証済みユーザーの全てのワークアウトプランを取得するエンドポイント
   * GET /workout-plans
   * JWT認証が必要
   */
  @Get()
  async findAll(@Request() req) {
    const userId = req.user.id;
    return this.workoutPlanService.findAllByUserId(userId);
  }

  /**
   * 特定のIDのワークアウトプランを取得するエンドポイント
   * GET /workout-plans/:id
   * JWT認証が必要
   */
  @Get(':id')
  async findOne(@Request() req, @Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe: URLパラメータのidを数値に変換。変換できない場合はエラー。
    const userId = req.user.id;
    // Service側でプランの存在確認と所有権確認を行う
    return this.workoutPlanService.findOneById(id, userId);
  }
}
