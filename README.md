# mas-app
A node app that Kito wants me to help him build. 

## Getting Started
This node applicaion has two parts. Inside the packages directory is a React App that holds all the UI elements for the node server. This package is called `mas-ui`. Then the top level holds the server that will handle all api calls and serve the compliled html files from `mas-ui`.

## Inital Setup / Quick Start
At the top level of the monorepo ensure you have the following node version installed. Every version on this list has been tested to work.

- **22.4.1**

You will also need to globally install the `corepack` dependency and enable it for yarn to work.

```
yarn add -g corepack
```
```
corepack enable
```

### Compiling the UI and API server

Run the following command to install all needed dependencies, build the UI, and compile the code:

```
yarn setup
```

When developing, it's important to build often.

To compile just the UI, run:

```
yarn build:ui
```

And to compile just the server run:

```
yarn build
```

### Running the UI and API server

To run the api server, you must have a running postgres service that the `mas-api` can connect to.

Configure the `postgres` client to match your postgres instance at `/src/config/db.config.ts`

To run the API execute:
```
yarn start
```

To run the UI execute:
```
yarn start:ui
```

### Launching with docker-compose

The best way to get `mas-app` running quickly without the need for setting up `postgress` is using docker-compose. Quickly start up an instance by running:

```
docker compose up -d --build
```

And to shutdown the instance run:

```
docker compose down -v
```

