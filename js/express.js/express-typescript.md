# Express + Typescript
https://blog.logrocket.com/typescript-with-node-js-and-express/

## Simple Server 1

### Setup
```
npm init
yarn add --dev typescript ts-node @types/node express @types/express
```

## Add A Server With A Generic Handler
```ts
import express, { RequestHandler } from "express";

const PORT = 3000;
const app = express();

// express does not utilise any body parsing strategy by default, so `body-parser` is required
// http://expressjs.com/en/resources/middleware/body-parser.html
app.use(express.json());

// app.disable("x-powered-by");

const requestHandler: RequestHandler = (req, res) => {
  console.log("--------------------------", new Date().toISOString());
  console.log(`req.method \n `, req.method);
  console.log(`req.originalUrl \n `, req.originalUrl);
  console.log(`req.query \n `, req.query);
  console.log(`req.headers \n `, req.headers);
  console.log(`req.cookies \n `, req.cookies);
  console.log(`req.body \n `, req.body);
  res.status(200).json("ok");
};

app.get("*", requestHandler);
app.post("*", requestHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```

## `express.json` vs `BodyParser.json`
https://stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json
__TL;DR__
`bodyParser` was added back to Express in release 4.16.0. So you don't need a separate package anymore.

## Example Project Structure
- https://softwareontheroad.com/ideal-nodejs-project-structure/
