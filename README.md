# 키워드 알림 API

## 기본정보

- `App` entry point is located in `./src/app.js`

- `Server` config entrypoint is located in `./src/bin/www.js`

- `Babel` config to transpile the code is located at `./.babelrc`

- `Prettier` config is located at `./.prettierrc`

- `Eslint` config is located at `./.eslintrc`

- `Routes` config entrypoint is located in `./src/routes/v1/index.route.js`

- `Mysql` config is located at `./src/config/mysql.config.js`

  - Models definition are located in `./src/services`

- `Error` Handling middleware is located at `./src/middlewares/errorHandler.middleware.js`

  - You can configure as many errors you need in `./src/helpers/errors.helper.js`

- `Swagger` config file is located at `./swagger.json`

  - Swagger routes are defined in `./src/routes/swagger.route.js`

## 프로젝트 구조

> `src/`
>
> - **`config/`** - this folder contains all the configs file (database, etc...)
> - **`controllers/`** - all the controllers to use in routes that interact with services
> - **`helpers/`** - some helpers func i.e. an error helper that returns json everytime an error comes in
> - **`middlewares/`** - here you can find all the custom middlewares
> - **`models/`** - database model definition
> - **`routes/`** - here you find all the defined routes of the app
> - **`services/`** - here we store all the services; i.e. here we define methods to manipulate a db model entity
> - **`utils/`** - containing some utils function to be reused in the code (i.e. axios global configuration)
> - **`validations/`** - 리소스 별로 validation 전략

> `docker/`
>
> - **`mysql/`** - mysql docker compose

# 설치 및 설정방법

docker mysql 시작

```bash
cd ./docker/mysql
docker compose up -d
cd ../..
```

---

node module 설치

```bash
npm i --save
```

node 개발모드 시작

```bash
npm run start:dev
```

# API 문서

[http://localhost:3000/api/v1/docs/](http://localhost:3000/api/v1/docs/)

# ERD

![ERD](/assets/wantERD.png)

# 키워드 알림 비동기처리 아이디어(아키텍쳐)

## 1. AWS를 이용한 메세지-큐

![Architecture](/assets/msgQueue.png)

- 게시글 추가 또는 댓글 추가 완료 후 message-receiver에게 본문 메세지를 전송

- 대용량 요청에 대비해서 안전하게 처리하도록 SQS를 이용한 메세지큐 이용

- 메세지큐를 구독하고있던 message-processor에서 키워드 매칭 후 푸쉬알림을 요청

- alert-sender에서 알람 전송
