# 筋トレ管理アプリ 要件定義

## 1. ターゲットユーザー
- **対象ユーザー:** 初心者から上級者まで対応
- **ユーザーモード:** 利用者のレベルに合わせて、モード選択により設定や記録項目が増加する

## 2. ユーザー認証・プロフィール管理
- **機能:** ユーザー認証（登録、ログイン等）やプロフィール管理については実装時に詳細を決定（おまかせ）

## 3. ワークアウト記録機能
- **必須記録項目:**  
  - エクササイズ名  
  - セット数  
  - レップ数  
  - 使用重量  
- **オプション記録項目:** ユーザーが必要に応じて追加可能
- **履歴管理:** 過去のワークアウト履歴の閲覧機能

## 4. エクササイズライブラリ
- **実装時期:** エクササイズライブラリ機能は後々実装予定

## 5. ワークアウトプラン・スケジュール管理
- **プラン作成:** ユーザーが自分でワークアウトプランを作成できる機能（必須）
- **追加機能:** ワークアウトプラン管理やカレンダー連携は後々実装予定

## 6. 進捗管理・統計分析
- **機能:**  
  - グラフィカルかつダイナミックな進捗管理と統計分析  
  - 表示項目例：重量推移、トレーニング頻度、セット数の増減  
- **目標達成度:** ユーザーが設定した目標に対する達成度を表示

## 7. ソーシャル機能
- **機能:**  
  - 全ユーザー中で、目標達成者の上位何パーセントに入るかを表示  
- **SNS連携:** SNS（Twitter、Instagramなど）との連携機能は後々実装予定

## 8. 通知・リマインダー機能
- **実装時期:** トレーニングリマインダーなどの通知機能は後々実装予定

## 9. データ連携・エクスポート機能
- **スマートウォッチ連携:** 自動でエクササイズ種目や記録を計測する機能（後々実装予定）
- **データエクスポート:** CSV、Excel、PDF形式でのエクスポート機能（必須）

## 10. プラットフォーム・UI/UX
- **対応プラットフォーム:**  
  - Web  
  - iOS / Android  
- **UI/UX:** シンプルかつ直感的なデザインを重視

## 11. 課金機能
- **機能:** 課金機能の導入（サブスクリプションやアプリ内購入など）
- **特典:** 課金により自動計測機能が利用可能になる

## 12. 技術スタック
- **バックエンド:**  
  - **Node.js + NestJS:** TypeScriptで統一的に実装し、モジュール化された設計と依存性注入の仕組みを活用
- **Webフロントエンド:**  
  - **React / Next.js:** TypeScriptによる型安全な開発、SSR/SSG機能を活用してパフォーマンスとSEOを向上
- **モバイル (iOS/Android):**  
  - **React Native:** TypeScriptをベースに、クロスプラットフォームでのアプリ開発を実現

---
# AWSインフラアーキテクチャ設計

本節では、AWS上で筋トレ管理アプリのインフラを構築する際のアーキテクチャを提案します。Node.js+NestJSによるバックエンド、React/Next.jsによるWebフロントエンド、React Nativeを利用したモバイルアプリに対応し、スケーラブルかつ高可用性のあるシステムを目指します。

---

## 1. ネットワーク構成
- **VPC (Virtual Private Cloud):**
  - 全体のネットワークを隔離し、パブリックサブネットとプライベートサブネットに分割
- **サブネット:**
  - **パブリックサブネット:**  
    - Application Load Balancer (ALB)  
    - NAT Gateway（アウトバウンド通信用）
    - 静的コンテンツ配信用（S3経由のCloudFront）
  - **プライベートサブネット:**  
    - バックエンドサービス（ECS/EKS/EC2）  
    - RDS（PostgreSQL）  
    - ElastiCache（Redis）

---

## 2. フロントエンド
- **ホスティング:**
  - **静的コンテンツ (Next.jsのSSG/CSR部分):**  
    - AWS S3にホストし、CloudFrontでCDN配信
  - **SSR（Next.jsの場合）:**  
    - サーバーレス（Lambda@Edge）またはECS/EKS上で実行するオプション
- **DNS管理:**
  - Route 53でドメイン管理およびトラフィックルーティング

---

## 3. バックエンド
- **実行環境:**
  - **AWS ECS (Fargate) または EC2 Auto Scaling グループ:**  
    - Node.js+NestJSで構築したバックエンドをコンテナ化し、Fargateで管理負荷を軽減
- **ロードバランシング:**
  - Application Load Balancer (ALB) によりバックエンドへのリクエストを分散
- **API管理 (オプション):**
  - 必要に応じてAPI Gatewayを配置し、APIのセキュリティや管理を強化

---

## 4. データベース
- **RDS (PostgreSQL):**
  - マルチAZ構成で高可用性と自動バックアップを実現
- **データセキュリティ:**
  - プライベートサブネット内に配置し、VPCセキュリティグループによりアクセス制限を実施

---

## 5. キャッシュ
- **ElastiCache (Redis):**
  - セッション管理やクエリキャッシュ、パフォーマンス向上のために利用

---

## 6. CI/CD & デプロイメント
- **パイプライン:**
  - AWS CodePipeline と CodeBuild を使用し、継続的インテグレーションおよびデリバリーを自動化
- **インフラ管理:**
  - AWS CloudFormation または Terraform を利用し、Infrastructure as Code (IaC) で環境構築と管理を自動化

---

## 7. ログ・モニタリング・セキュリティ
- **ログ管理・モニタリング:**
  - CloudWatch Logs および CloudWatch Metrics でシステムのパフォーマンスやエラーを監視
- **セキュリティ:**
  - AWS WAF & Shield によりWebアプリケーションファイアウォールとDDoS対策を実施
  - IAM (Identity and Access Management) を用いて最小権限の原則を遵守

---

## 8. スケーラビリティと高可用性
- **オートスケーリング:**
  - ECS/EC2のオートスケーリンググループによるバックエンドの動的スケール対応
  - RDSのリードレプリカやCloudFrontによるコンテンツ配信のスケール対応
- **フェイルオーバー:**
  - マルチAZ構成と定期的なバックアップにより、障害発生時の自動フェイルオーバーを実現

---

このAWSアーキテクチャ設計は、TypeScriptを用いて実装されるアプリケーション（バックエンド、Webフロントエンド、モバイル）とシームレスに連携し、効率的な開発・運用、そして高い拡張性と信頼性を提供することを目的としています。

# 実装詳細

## バックエンドAPI仕様 (v1 - 2025/04/01時点)

ベースURL: `http://localhost:3000` (開発時)

### 認証 (Auth)

#### `POST /auth/register`

-   **説明:** 新規ユーザーを登録する。
-   **リクエストボディ:**
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword" 
    }
    ```
    *(注意: passwordは8文字以上などのバリデーションが別途必要)*
-   **レスポンス (成功時):** `201 Created`
    ```json
    {
      "id": 1,
      "email": "user@example.com"
    }
    ```
-   **レスポンス (失敗時):**
    -   `409 Conflict`: Eメールアドレスが既に存在する場合
    ```json
    {
      "statusCode": 409,
      "message": "Email already exists",
      "error": "Conflict"
    }
    ```

#### `POST /auth/login`

-   **説明:** Eメールとパスワードでログインし、JWTアクセストークンを取得する。
-   **リクエストボディ:**
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
-   **レスポンス (成功時):** `201 Created` (NestJSのデフォルト。200 OKが適切な場合もある)
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
    }
    ```
-   **レスポンス (失敗時):**
    -   `401 Unauthorized`: Eメールまたはパスワードが間違っている場合
    ```json
    {
      "statusCode": 401,
      "message": "Invalid credentials",
      "error": "Unauthorized"
    }
    ```

#### `GET /auth/profile`

-   **説明:** 認証済みユーザーのプロフィール情報（IDとEメール）を取得する。
-   **認証:** 要JWT (`Authorization: Bearer <token>`)
-   **レスポンス (成功時):** `200 OK`
    ```json
    {
      "id": 1,
      "email": "user@example.com"
    }
    ```
-   **レスポンス (失敗時):**
    -   `401 Unauthorized`: JWTが無効または提供されていない場合

### ワークアウト記録 (Workout)

#### `POST /workout`

-   **説明:** 新しいワークアウト記録を作成する。
-   **認証:** 要JWT (`Authorization: Bearer <token>`)
-   **リクエストボディ:**
    ```json
    {
      "exerciseName": "Bench Press",
      "sets": 3,
      "reps": 10,
      "weight": 60
    }
    ```
    *(注意: 各フィールドのバリデーションが別途必要)*
-   **レスポンス (成功時):** `201 Created`
    ```json
    {
      "id": 1,
      "userId": 1,
      "exerciseName": "Bench Press",
      "sets": 3,
      "reps": 10,
      "weight": 60,
      "recordedAt": "2025-03-31T18:06:45.674Z" 
    }
    ```
-   **レスポンス (失敗時):**
    -   `401 Unauthorized`: JWTが無効または提供されていない場合

#### `GET /workout`

-   **説明:** 認証済みユーザーの全てのワークアウト記録を取得する。
-   **認証:** 要JWT (`Authorization: Bearer <token>`)
-   **レスポンス (成功時):** `200 OK`
    ```json
    [
      {
        "id": 1,
        "userId": 1,
        "exerciseName": "Bench Press",
        "sets": 3,
        "reps": 10,
        "weight": 60,
        "recordedAt": "2025-03-31T18:06:45.674Z"
      }
      // ... 他の記録
    ]
    ```
-   **レスポンス (失敗時):**
    -   `401 Unauthorized`: JWTが無効または提供されていない場合

### ワークアウトプラン (Workout Plan)

#### `POST /workout-plans`

-   **説明:** 新しいワークアウトプランを作成する。
-   **認証:** 要JWT (`Authorization: Bearer <token>`)
-   **リクエストボディ:**
    ```json
    {
      "name": "My First Plan",
      "description": "Beginner full body workout",
      "items": [
        {"exerciseName": "Squat", "targetSets": 3, "targetReps": 12},
        {"exerciseName": "Push Up", "targetSets": 3, "targetReps": 10}
      ]
    }
    ```
    *(注意: 各フィールドのバリデーションが別途必要)*
-   **レスポンス (成功時):** `201 Created`
    ```json
    {
      "id": 1,
      "userId": 1,
      "name": "My First Plan",
      "description": "Beginner full body workout",
      "items": [
        {"exerciseName": "Squat", "targetSets": 3, "targetReps": 12, "id": 1},
        {"exerciseName": "Push Up", "targetSets": 3, "targetReps": 10, "id": 2}
      ],
      "createdAt": "2025-03-31T18:08:35.156Z",
      "updatedAt": "2025-03-31T18:08:35.156Z"
    }
    ```
-   **レスポンス (失敗時):**
    -   `401 Unauthorized`: JWTが無効または提供されていない場合

#### `GET /workout-plans`

-   **説明:** 認証済みユーザーの全てのワークアウトプランを取得する。
-   **認証:** 要JWT (`Authorization: Bearer <token>`)
-   **レスポンス (成功時):** `200 OK`
    ```json
    [
      {
        "id": 1,
        "userId": 1,
        "name": "My First Plan",
        // ... 他のフィールド ...
        "items": [ /* ... */ ]
      }
      // ... 他のプラン
    ]
    ```
-   **レスポンス (失敗時):**
    -   `401 Unauthorized`: JWTが無効または提供されていない場合

#### `GET /workout-plans/:id`

-   **説明:** 特定のIDのワークアウトプランを取得する。
-   **認証:** 要JWT (`Authorization: Bearer <token>`)
-   **URLパラメータ:**
    -   `id`: 取得したいプランのID (数値)
-   **レスポンス (成功時):** `200 OK`
    ```json
    {
      "id": 1,
      "userId": 1,
      "name": "My First Plan",
      // ... 他のフィールド ...
      "items": [ /* ... */ ]
    }
    ```
-   **レスポンス (失敗時):**
    -   `401 Unauthorized`: JWTが無効または提供されていない場合
    -   `404 Not Found`: 指定されたIDのプランが存在しない、またはユーザーが所有していない場合
