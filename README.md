# React blog
元々WordPressで作成していた個人用ブログをRNext.js製のアプリケーションに置き換えるプロジェクト。3年前から始まっているのに、作る時間を取らないため一向に完成しないサグラダ・ファミリア。

![logo](public/images/pr_logo.png)

## 技術スタック
技術選定は、全面的に学習を目的にしていました。

| 名前        | 概要                |
|------------|---------------------|
| ルーティング | AppRouter (Next.js) |
| 認証        | NextAuth (Next.js)  |
| RDB        | MySQL               |
| ORM        | Prisma              |

## セットアップ
1. 任意のDBを立ち上げてください。以下は例です。
    ```bash
    sudo mysql.server start
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
| `DB_HOST`| DBのhostを設定します |
| `NEXTAUTH_URL`| サイトのルートURLを指定します |
| `NEXTAUTH_SECRET`| [こちら](https://next-auth.js.org/configuration/options#nextauth_secret)を参照してください |
| `GITHUB_CLIENT_ID`| [こちら](https://docs.github.com/ja/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)を参照し、OAuthアプリケーションを作成して、発行されたものを設定してください。|
| `GITHUB_CLIENT_SECRET`| [こちら](https://docs.github.com/ja/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)を参照し、OAuthアプリケーションを作成して、発行されたものを設定してください。 |
