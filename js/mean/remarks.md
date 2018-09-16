## Starting a MongoDB
Run database daemon `mongod` to start up the database server on 32-bit system:
```
mongod --dbpath ./mean/data --logpath .mean/data/log/logfile.txt --journal --storageEngine mmapv1
```
* `--storageEngine` - you can skip this parameter if you run the daemon on 64-bit system.
* `--logpath` - if parameter is not set, then log is streamed to the console, that opens the daemon.
* `--journal` is default active at 64-bit system.

## Express
### CORS
What is cross-origin resource sharing(CORS)? - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
You can enable CORS :
* manually - https://www.npmjs.com/package/cors
* with module - https://www.npmjs.com/package/cors

To enable CORS for all origins for all types of HTTP methods put line `app.use(cors());` in main express `app`.
```js
var express = require('express')
var cors = require('cors')
var app = express();

// enable CORS for all origins for all types of HTTP methods
app.use(cors());
```

### Routes
Easiest way to create a route is to allocate it in express main `app` script.
```js
var express = require('express');
var app = express();

// GET route for '/'
app.get('/', (req, res) => {
  res.send('Some response');
});
```
More sophisticated way is to put routes in different module, usually these modules are called the same as the namespace they represent.
```js
// ./routes/users.js
const express = require('express');
const router = express.Router();
    // './register' GET route
router.get('/register', (req, res, next) => {
    res.send('GET register user');
});
    // './authenticate' GET route
router.get('/authenticate', (req, res, next) => {
    res.send('GET authenticate user');
});
    // exporting routes
module.exports = router;

// ./app.js
const express = require('express');
const app = express();
    // '/users' routes
const users = require('./routes/users');
    // define namespace for `users` routes
app.use('/users', users);
```



