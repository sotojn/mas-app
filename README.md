# mas-app
A node app that Kito wants me to help him build. 

## Getting Started
This node applicaion has two parts. Inside the packages directory is a React App that holds all the UI elements for the node server. This package is called `mas-ui`. Then the top level holds the server that will handle all api calls and serve the compliled html files from `mas-ui`.

### Inital Setup / Quick Start
At the top level of the monorepo ensure you have the following node version installed. Every version on this list has been tested to work.

- **22.4.1**

Next run the following command to install all needed dependencies, build the UI, and compile the code:

```
yarn setup
```

When developing, it's important to build often.

To compile just the UI, run:

```
yarn build:ui
```

And for the server run:

```
yarn build
```