# Chalhoub Demo - Getting Started

This repository contains the source code for the Chalhoub Demo project. This document will guide you on how to set up and run the project on your local machine.

## Prerequisites
Before you start, ensure that you have the following software installed on your machine:

Node.js (v16 or higher)
npm (Node Package Manager) or yarn
Git (optional, but recommended)

1. Clone the repository:
```bash
git clone https://github.com/username/chalhoub-demo.git
```

2. Navigate to the project directory:
```bash
cd chalhoub-demo
```
3. Install project dependencies using npm or yarn::
```bash
npm install
# or
yarn install
```
## Running the Application

The project is built with Next.js, a React framework. To run the application, follow these steps:

1. Start the development server::
```bash
npm run dev
# or
yarn dev
```
This will start the development server and automatically open the application in your default web browser. You can access it at http://localhost:3000.

2. If you want to build the application for production, use the following command:
```bash
npm run build
# or
yarn build
```

3. After the build is complete, you can run the production version of the application:
```bash
npm run start
# or
yarn start
```
## GraphQL Code Generation

This project uses GraphQL Code Generator to generate types based on your GraphQL schema and operations. You can compile and watch for changes to your GraphQL code using the provided scripts:

-To compile the GraphQL code:
```bash
npm run compile
# or
yarn compile
```
-To watch for changes and automatically recompile::
```bash
npm run watch
# or
yarn watch
```

## Testing

The project uses Jest as the testing framework. To run the tests, use the following command:
```bash
npm test
# or
yarn test
```
## Additional Information

For more information about the tools and libraries used in this project, refer to their official documentation:

- [Next.js Documentation](https://nextjs.org/docs)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [React](https://legacy.reactjs.org/docs/getting-started.html)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest](https://jestjs.io/docs/getting-started)

