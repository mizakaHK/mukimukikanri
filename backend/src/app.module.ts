import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WorkoutModule } from './workout/workout.module';
import { WorkoutPlanModule } from './workout-plan/workout-plan.module';

@Module({
  imports: [AuthModule, UserModule, WorkoutModule, WorkoutPlanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
