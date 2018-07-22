# Express.js
JS framework to create server application with `node.js`.

## Preparing an Application Template

### Installation
* `npm install --global express-generator`.

### Create an Application
* `express app` - generates basic application in current directory. `app` is an application name with `jade` templating.
* `express app --hogan -c less` - generates basic application with `hogan` templating and `less`
* `express app --hogan -c stylus` - generates basic application with `hogan` templating and `less`

### Load Dependencies
Jump to created application with `cd app` and install dependencies with `npm install`.

### Run Basic Application
Just call `DEBUG=app:* npm start` to start your application.

### Nodemon
* `npm install -g nodemon` - installs tool that monitores your app files and restarts your application everytime you make a change some of the files.
* `nodemon file` - will execute the `file` and triggers reload of the `file` everytime it changes.
* `nodemon --watch file-without-extension file-without-extension` - will make the same as previous command but for a file without an extension.

### Run Basic Application with File Monitoring
* `nodemon -w app -w app/bin/www -d 5 app/bin/www`

## Building a First Page
Let start from one page and comment out `usersRouter` in `app.js`.
```js
// First at the top where the `users` module is required.
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// Second, a bit below where it set as a router for our application
app.use('/', indexRouter);
// app.use('/users', usersRouter);
```
Now we have only `indexRouter` to play with. Let's move to `app/routes/index.js`.
Here we can comment out a template response to `GET` request.
```js
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
```
And will start to build our own response.
```js
router.get('/', function(req, res) {
    // will be filled up later
});
```

### Responding to `GET` with `send` Function
We will begin from `res.send` which gives us a possiblity to send:
1. Text Response.
```js
router.get('/', function(req, res) {
    res.send('Hello');
});
```
We open the dev. tools in browser and refresh the page `localhost:3000`.
The response will automaticaly be set the type `text/html` and the status will be set to `200`. Following responses will be sent with a status `304` until the response will not be changed.

2. Status Code
```js
router.get('/', function(req, res) {
    res.send(200);  // sending plain number (200, 400, 404, 405) means sending
                    // status
});
```
3. JSON File
```js
router.get('/', function(req, res) {
    res.send({
        users: ['Will', 'Laura']
    });
});
```
All of more options are described in express user guide:
* https://expressjs.com/en/guide/routing.html

### Responding to `GET` with `render` Function
Okay, now let move to our templates, we will change the callback for a `GET` request:
```js
router.get('/', function(req, res) {
    res.render('index', {
        title: 'My App!',
        name: 'Template'
    });
});
```
And in our `hogan` template at `app/views/index.hjs` we will modify the `<body>`element:
```js
  <body>
    <h1>{{ title }}</h1>
    <p>Welcome to {{ name }} Application</p>
  </body>
```
Now we can reload our page and we see our properties of an object were injected into the template.

### Getting Information out of Query String
Let's access `http://localhost:3000/?name=QueryString` url. To get information out of query string we can use `req.query.name`, where `name` is parameter of a query. Let's update our template to alterate together with `name` parameter.
```js
router.get('/', function(req, res) {
    console.log(req.query);
    res.render('index', {
        title: 'My App!',
        name: req.query.name
    });
});
```
Of course we use multiply parameters. Change a router response to:
```js
    console.log(req.query);
    res.render('index', {
        title: req.query.title || 'My App!',
        name: req.query.name || 'Static'
    });
```
And go to `http://localhost:3000/?name=Interactive&title=Modified%20App`.
Also now we can access `http://localhost:3000` and default parameters will be used when there are no query parameters are available.

### Getting Parameters out of URL
Let's say we want to access a particular user with certain URL, so it could look like `http://localhost:3000/users/:id`, so in order to read this `id` out of the string we can use `req.params.id`. Let's make an example. We will extend our response to a `GET` request:
```js
router
    .get('/', function(req, res) {
        console.log(req.query);
        res.render('index', {
            title: req.query.title || 'My App!',
            name: req.query.name || 'Static'
        });
    })
    .get('/users/:id', function(req, res) {
        console.log(req.params);
        res.send(`The user with id ${req.params.id} not exist`, 400);
    });
```
So now we can go to `http://localhost:3000/users/12` and see our response.

As you noticed we can chain responses in our `.get` definition, also following code works absolutely identically:
```js
router.get('/', function(req, res) {
    console.log(req.query);
    res.render('index', {
        title: req.query.title || 'My App!',
        name: req.query.name || 'Static'
    });
});
router.get('/users/:id', function(req, res) {
    console.log(req.params);
    res.send(`The user with id ${req.params.id} not exist`, 400);
});
```
One thing to mention, here we are using `send` function with 2 arguments, first one is a `body` of response and the second one is a `status code`.

### URL Namespaces
Going back in `app.js` you could notice that we were using following function
```js
app.use('/', indexRouter);
```
to register our router, here this `'/'` is our namespace that is added to our
path in function:
```js
router.get('/users/:id', function(req, res) {
    res.send(`The user with id ${req.params.id} not exist`, 400);
});
```
So we also have a possibility to register a router with a namespace `/users`
```js
app.use('/users', indexRouter);
```
and then we can skip `/users` in response definiition:
```js
router.get('/:id', function(req, res) {
    res.send(`The user with id ${req.params.id} not exist`, 400);
});
```
### Several Routers
Since we know how the router can respond to different requests, now its time to separate things depending on their purposes. So let's comment following line in `app.js` back in:
```js
// at the top
var usersRouter = require('./routes/users');

// a bit below
app.use('/users', usersRouter);
```
Now we can copy our code responsible for `GET` requests to `/users` in to separated router at `app/routes/users.js` so it should look like this:
```js
var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/:id', function(req, res) {
    console.log(req.params);
    res.send(`The user with id ${req.params.id} not exist`, 400);
});

module.exports = router;
```







