import { Injectable, ConflictException } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UserService {
  // ユーザーデータをメモリ上に保持する配列 (データベースの代わり)
  private readonly users: User[] = [];
  private nextId = 1; // 簡易的なID採番用

  /**
   * Eメールアドレスでユーザーを検索する
   * @param email 検索するEメールアドレス
   * @returns 見つかったユーザー、またはundefined
   */
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  /**
   * 新しいユーザーを作成する
   * @param email ユーザーのEメールアドレス
   * @param passwordHash ハッシュ化されたパスワード
   * @returns 作成されたユーザー情報
   * @throws ConflictException Eメールアドレスが既に存在する場合
   */
  async create(email: string, passwordHash: string): Promise<Omit<User, 'passwordHash'>> {
    const existingUser = await this.findOneByEmail(email);
    if (existingUser) {
      // Eメールアドレスが既に使われている場合はエラー
      throw new ConflictException('Email already exists');
    }
    const newUser: User = {
      id: this.nextId++,
      email,
      passwordHash,
    };
    this.users.push(newUser);
    // パスワードハッシュを除いたユーザー情報を返す
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  /**
   * IDでユーザーを検索する (JWT認証で使用)
   * @param id 検索するユーザーID
   * @returns 見つかったユーザー、またはundefined
   */
  async findOneById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
