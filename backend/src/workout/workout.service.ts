import { Injectable } from '@nestjs/common';
import { WorkoutRecord } from './workout-record.interface';
import { CreateWorkoutRecordDto } from './dto/create-workout-record.dto';

@Injectable()
export class WorkoutService {
  // ワークアウト記録をメモリ上に保持する配列 (データベースの代わり)
  private readonly records: WorkoutRecord[] = [];
  private nextId = 1; // 簡易的なID採番用

  /**
   * 新しいワークアウト記録を作成する
   * @param userId 記録を行うユーザーのID
   * @param createWorkoutRecordDto 記録データ
   * @returns 作成されたワークアウト記録
   */
  async create(userId: number, createWorkoutRecordDto: CreateWorkoutRecordDto): Promise<WorkoutRecord> {
    const newRecord: WorkoutRecord = {
      id: this.nextId++,
      userId, // 認証済みユーザーのIDを設定
      ...createWorkoutRecordDto, // DTOのプロパティを展開
      recordedAt: new Date(), // 現在日時を記録
    };
    this.records.push(newRecord);
    return newRecord;
  }

  /**
   * 特定のユーザーの全てのワークアウト記録を取得する
   * @param userId 取得対象のユーザーID
   * @returns ユーザーのワークアウト記録の配列
   */
  async findAllByUserId(userId: number): Promise<WorkoutRecord[]> {
    // 指定されたuserIdを持つ記録のみをフィルタリングして返す
    return this.records.filter((record) => record.userId === userId);
  }
}
