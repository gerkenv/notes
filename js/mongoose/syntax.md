# MongoDB
A database used as a part of MEAN stack.

## Preparing an Application Template

### Installation
* `npm install --global express-generator`.

### Create an Application
* `express app --hogan -c less` - generates basic application with `hogan` templating and `less` in subfolder called `app`.

### Load Dependencies
Jump to created application with `cd app` and install dependencies with `npm install`.

### Run Basic Application
Just call `DEBUG=app:* npm start` to start your application or...

### Nodemon
* `npm install -g nodemon` - installs tool that monitores your app files and restarts your application everytime you make a change some of the files.

### Run Basic Application with File Monitoring
* `nodemon -d 2 -w app/public -w app/routes -w app/app.js -w app/bin/www app/bin/www`

### Checking an Application
Now template pages should be served at `http://localhost:3000/` and `http://localhost:3000/users`.

### Installing Mongoose
`npm install -s mongoose` - downloads `mongoose` and saves it in your `package.json`.

