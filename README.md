# Backend

The backend API for my medium post. Has a dependency on AWS Cognito. Requires a valid AWS Cognito user token for authentication.

## Running the app

Dev:

```
npm run start:dev
```

It will start the Postgres database in a container, therefore requires Docker to be installed.

## Environment variables

Controlled by .env files. Set `ENV` to apply .env-${environment}.env over the default .env file (e.g. `ENV=production`)

## Migrations

To manually run migrations

```
ENV=development npm run migrations
```

Migrations will run automatically when the app starts.
