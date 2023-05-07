# microservice-nodejs-template
This is template repo for creating a node.js microservice.

Includes support for:
- Typescript
- ESLint with custom rules added from [@badboyku/eslint-config-badboyku](https://github.com/badboyku/eslint-config-badboyku)
- Jest

## Quickstart
1. Install dependencies: `npm install`
2. Start the app: `npm run build && npm start`
3. Run curl command to check health: `curl --location --request GET 'http://localhost:3000/health'`

NOTE: App will be served from default port 3000, which can be changed by following the .env.example in the repo. Check scripts section in [package.json](package.json) for additional scripts available.

---

## Code Formatting with ESLint
ESLint/Prettier has been set up with using the config from: [@gozego/eslint-config-zego](https://github.com/gozego/eslint-config-zego)
- To run eslint: `npm run lint`
- To run eslint with fix: `npm run lint:fix`

NOTE: You are able to override a rule by updating the rules inside the `.eslintrc.js` file.

Example:
```js
rules: {
  'no-console': 'error',
},
```

## Testing with Jest
Jest has been set up with coverage needing at least 80%. We are following industry standards to keep test files in the src folder, along with Jest's defaults for the test file names.
- To run jest: `npm test`
- To run jest test coverage: `npm run test:coverage`
- To run jest watch mode: `npm run test:watch`

---

## Folder Structure
In the `src` folder, let's try to keep a `@types`, `controllers`, `errors`, `middlewares`, `routes`, `services`, and `utils` folder, in order to have a common folder structure for each microservice app.  Apart from that, create folders to support your application.
