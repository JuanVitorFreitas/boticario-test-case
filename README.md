## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running PostgreSQL Database in Docker

```bash
# download, create and run the Postgres contianer
$ docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=pass123 postgres

# Ensure that the Postgres container is built and currently executing
$ docker ps
```

## Create a `.env` file in the project root folder. Example constants

```env
DATABASE_URL="postgresql://postgres:pass123@localhost:5432/postgres?schema=public"

# Secret used to create the JWT tokens
JWT_SECRET = '**********'
```

## Running the app

```bash
# run seed to create initial data on DB
$ npx prisma db seed

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod

```

## Swagger UI

```bash
# web
$ http://localhost:3000/api

# download JSON file
$ http://localhost:3000/api-json
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

-   Start the project
-   Happy coding 😃
