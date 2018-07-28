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

## Peparing the Database

### Installing Mongo DB Locally
Go to www.mongodb.com and download the latest version of database.
Mongo 3.2 is the latest version for 32 bit windows.
At 32 bit system your database is limited up to 2 Gb.

### Running the Database Server

When you have installed a database you need to
1. Add your installation folder with server binaries to `path` (environment variable). On windows it should be something like `C:\Program Files\MongoDB\Server\3.2\bin`.
2. Go to the folder where you want to store your database.
3. Run database daemon `mongod` to start up the database server:
```
mongod --dbpath ./data --logpath ./log/logfile.txt --journal --storageEngine mmapv1
```
* `--dbpath` - directory to store database structure.
* `--logpath` - file to store logs of `mongod`.
* `--journal` - stores information about running processes helping to restore data after crashes.
* `--storageEngine` - has multiple options, but default one is not suppported at 32 bit system.

