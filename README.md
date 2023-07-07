# Backend

The backend API server for everything. Has a dependency on AWS Cognito. Requires a valid AWS Cognito user token for authentication.

## Running the app

Dev:

First run backend dependencies (required Docker)

```
npm run docker-compose:up
```

Then...

```
npm run start:dev
```

## Environment variables

Controlled by .env files. Set `ENV` to apply .env-${environment}.env over the default .env file (e.g. `ENV=production`)

## Migrations

To manually run migrations

```
ENV=development npm run migrations
```

Migrations will run automatically when the app starts.
