## Description

This is a repository for a tryout at Grupo Boticário.

## Installation

```bash
$ pnpm install
```

## Running PostgreSQL Database in Docker

```bash
# download, create and run the Postgres contianer
$ docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=<password> postgres

# Ensure that the Postgres container is built and currently executing
$ docker ps
```

## Create a `.env` file in the project root folder. Example constants

```env
DATABASE_URL="postgresql://postgres:<password>@localhost:5432/postgres?schema=public"

JWT_SECRET = '**********'
```

## Running the app

```bash
# run seed to create initial data on DB
$ npx prisma db seed
consumer password in seed: 123456

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

# test coverage
$ pnpm run test:cov
```

-   Start the project
-   Happy coding 😃
