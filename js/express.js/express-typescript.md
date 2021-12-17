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

// app.disable("x-powered-by");

const requestHandler: RequestHandler = (req, res) => {
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
