## Running the app

For running the app locally through terminal use one of following commands in the app root folder:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

use `localhost:3005/api` to see swagger documentation.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running the app in Docker

To run the app in docker simply make sure that you have docker installed on your machine, then in the app folder run:

```bash
$ npm run start:docker
```

use `localhost:3005/api` to see swagger documentation.

## Note

If you encounter a permission error while runnig using `npm run start:docker`, run the following command in the root of application:

```
$ chmod +x start-app.sh
```
