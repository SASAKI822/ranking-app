# ranking-app
## overview
これは、typescript と Next.js フレームワークで作成された 映像作品ランキング アプリです。これによりユーザーは映像作品をジャンル、順位毎に検索し、映像作品リストへ追加することができます。また、映像作品だけではなく俳優、声優も検索することができ、自分のお気に入りの俳優、声優の出演作品も抑えることができます。このアプリを使用すると、ユーザーは自分の見たい映像作品や、既に見た映像作品を確認することができます。
***
![image1](https://user-images.githubusercontent.com/104541982/222117961-c7e54ad7-7ebf-4fb2-95b0-097c6a7a7799.png)  
***
![image2](https://user-images.githubusercontent.com/104541982/222118496-e69fb11d-037a-4682-b781-6adf129b8e37.png)  
***
![image3](https://user-images.githubusercontent.com/104541982/222118507-61d4a1cf-3832-4fdf-af7c-104476bd9335.png)   
***
## demo
https://ranking-app-alpha.vercel.app

## テスト用アカウント
- メールアドレス：test@test.com　　
- パスワード　　：123123  
## 開発環境  
### フロントエンド
- React.js
- Next.js
- Typescript
- Recoil
- Material UI
### バックエンド
- Firebase

### デプロイ
- Vercel
## API 
TMDb は映画やTV作品のデータベースを提供するWeb APIです。作品のタイトルやポスター画像、出演者、スタッフ以外に、ユーザーによる評価やレビューなどもサイト上で公開しており、それらの情報もAPIとして利用することが可能です。
## Features
- サインアップ機能(email, google)
- サインイン機能(email, google)
- サインアウト機能
- API取得　(The Movie Database API)
- 映画、俳優を検索
- 映画、俳優一覧(ジャンル/絞り込み/ページネーション)
- 映画、俳優登録機能  
- レスポンシブデザイン

## Installation and Setup Instructions
1. クローン: `git clone https://github.com/SASAKI822/ranking-app`  
1. パッケージの更新の確認: `npm install -g npm-check-updates`  
1. 更新パッケージの確認: `ncu`  
1. package.jsonを更新: `ncu -u`  
1. インストール: `npm install`  
1. テスト スイートを実行: `npm test`  
1. サーバーを起動 `npm start`  
1. アプリにアクセス: `localhost:3000`  
