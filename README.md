#  ZACorp Backend

## Setup this repo to start development

-   Run `make bootstrap` (for the first time setup)
-   Run `make dev-up` to start dev.
-   Happy coding :tada:

## To write new migrate

-   Run `make create-migrate NewMigrationName` to create new migration file.
-   Run `make up-migrate` to run all migration.
-   Run `make down-migrate` to revert 1 version right before.

## How to run
1. make bootstrap
2. make dev-up


## How to deploy 

```
make deploy
```

## .evn
NODE_ENV=development

#== APP
PORT=3000
TRANSPORT_PORT=8080
ENABLE_ORM_LOGS=true
ENABLE_DOCUMENTATION=true
SESSION_SECRET=secret

#== JWT
ACCESS_TOKEN_EXPIRATION_TIME=25200
ACCESS_TOKEN_PRIVATE_KEY=secret-access
JWT_PUBLIC_KEY=secret

#== DB
DB_TYPE=postgres
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=device_manage

#== Migration
MIGRATION_NAME=device-manage

#== Mail
MAIL_HOST=localhost
MAIL_PORT=1026

#== Redis
REDIS_CACHE_ENABLED=true
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_TTL=3600

#== Mail
MAIL_HOST=localhost
MAIL_PORT=1025
