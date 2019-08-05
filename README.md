# Grocery List

Time spent 2-3hrs

## Features

- Typescript for compilation time type safety and modern JS features
- Webpack for simple bundling and transpilation
- Shared Typescript interfaces for data sent between api and client code for easy development and type safety checking
- Express.js for simple ever side API structure and development
- Server rendered react hydrated on the client for a simple single codebase for applicaiton functionality shared between server and client
- Jest with snapshot testing for react components
- Jest testing of API data layer functionality

## Setup

- Install dependencies `yarn install`
- Run tests `yarn run test`
- Start local server `yarn run start`, navigate to `localhost:3000`

## With more time;

- Setup database backing rather than in-memory data store loaded from json file
- Implement delete functionality for list items in react components
- Mock up datastore for list-model tests rather than test against in-memory json file
- Clean up functionality, eg; update list size when items are added
- Refactor all `list-model` functionality to return promises and enhance testability
