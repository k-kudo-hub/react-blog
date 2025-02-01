# React blog

URL: https://blog.k-kudo.com

元々WordPressで作成していた個人用ブログをNext.js製のアプリケーションに置き換えるプロジェクト。
長い長い凍結期間を経て2025年1月にとうとうローンチ🎉

![logo](public/images/pr_logo.png)

## 技術スタック
技術選定は、当時勉強したかった技術を中心に組み立てつつ、インフラ周りはコストを抑えることを重視しています。

| 領域         | 技術      | 選定理由                                            |
|--------------|-----------|-----------------------------------------------------|
|フロントエンド|Next.js    | 当時まだReact系FWを使用したことがなかったため       |
|バックエンド  |Next.js    | スイッチングコスト低減のため (分離は意識)           |
|状態管理      |Recoil     | Redux以外のライブラリを使ってみたかった             |
|DB            |PostgreSQL | 最初MySQLだったが、NeonがPostgres互換だったため |
|ORM           |Prisma     | TypeORM, Sequelize以外を使ってみたかった            |
|認証          |NextAuth   | Cognitoを使ってみたかったが、サーバ費用削減のため   |
|Web Server    |Vercel     | まず世に出すという意味で最も手軽なもの、移行するかも|
|DB Server     |Neon.      | サーバ費用削減のため、無料枠があるNeonを選定        |

## セットアップ
1. 任意のDBを立ち上げてください。以下は例です。
    ```bash
    brew services start postgresql
    ```
1. 環境変数を設定します。詳しくは[環境設定](#環境変数)を参照してください。
    ```bash
    cp .env.sample .env
    ```
1. DB構造を反映します
    ```bash
    yarn migrate:dev
    ```
1. ローカル環境を立ち上げます
    ```bash
    yarn start
    ```
1. 下記にアクセスします

    http://localhost:3000

## 環境変数
| 名前 | 概要 |
|-----|------|
| `DB_HOST`| DBに接続するためのURLを設定します |
| `DB_DIRECT_HOST`| DBに直接接続するためのURLを設定します |
| `NEXT_PUBLIC_SERVER_PORT`| APIサーバのポートを指定します。 |
| `NEXT_PUBLIC_SERVER_PROTOCOL`| APIサーバの通信プロトコルを指定します。 |
| `NEXT_PUBLIC_SERVER_HOST`| APIサーバのホストを指定します。 |
| `NEXTAUTH_URL`| サイトのルートURLを指定します |
| `NEXTAUTH_SECRET`| [こちら](https://next-auth.js.org/configuration/options#nextauth_secret)を参照してください |
| `GITHUB_CLIENT_ID`| [こちら](https://docs.github.com/ja/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)を参照し、OAuthアプリケーションを作成して、発行されたものを設定してください。|
| `GITHUB_CLIENT_SECRET`| [こちら](https://docs.github.com/ja/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)を参照し、OAuthアプリケーションを作成して、発行されたものを設定してください。 |
