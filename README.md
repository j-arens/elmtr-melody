Melody
========

A multifaceted audio player widget for Elementor.

## Requirements

* php
* node
* npm
* composer
* docker
* docker-compose

## Development

Install dependencies.

```sh
$ composer install
$ npm install
```

Create the docker container, should be accessible at http://localhost:4000

```sh
$ npm run docker:up
```

Run webpack in watch mode and start browsersync at http://localhost:4001. Everything will be proxied to the docker container and changes will live reload.

```sh
$ npm start
```

If you want to start over with a fresh container:

```sh
$ npm run docker:reload
```

## Unit Testing & Linting

JS tests:

```sh
$ npm run test
```

JS lint:

```sh
$ npm run lint
$ npm run lint:fix
```

Jest snapshots can be updated with:

```sh
$ npm run test:update-ss
```

PHP tests:

```sh
$ npm run test:php
```

## Integration Testing

Cypress is used for all e2e/integration tests.

Run in interactive mode:

```sh
$ npm run cypress:open
```
Run in non-interactive mode

```sh
$ npm run test:e2e
```

## Contributing

All changes need to be have their own branch, pull requests should be concise and limited in scope. Run the integration tests before pushing to ensure existing features still work. CI jobs are run with google build and are triggered automatically when pushing a commit. PR's cannot be merged until all the tests that run in CI have passed.

## Releasing

All building, deploying and releasing is handled via npm scripts.

```sh
$ npm run release
```
