# MongoDB

## Preparing the Database

### Installing Mongo DB Locally
Go to https://www.mongodb.com and download the latest version of database.
Mongo 3.2 is the latest version for 32 bit windows.
At 32 bit system your database is limited up to 2 Gb.

### Running the Database Server

When you have installed a database you need to
1. Add your installation folder with server binaries to `path` (environment variable). On windows it should be something like `C:\Program Files\MongoDB\Server\3.2\bin`.
2. Open a shell as an administrator.
3. Go to the folder where you want to store your database.
    1. Create subfolder `data`.
    2. Create subfolder `log`.
        1. Create file `log/mongod.log`.
4. Run database daemon `mongod` to install the database server as window service.
    1. on 32-bit system:
```
mongod --directoryperdb --dbpath ./data --logpath ./log/mongod.log --journal --storageEngine mmapv1 --rest --install
```
* `--directoryperdb` - each database will be stored in a separate directory.
* `--dbpath` - directory to store database structure (absolute path).
* `--logpath` - file to store logs of `mongod`.
* `--journal` - stores information about running processes helping to restore data after crashes.
* `--storageEngine` - has multiple options, but default one `WiredTiger` is not supported at 32 bit system.
* `--rest` - specifies REST API for database, by default, without additional arguments `--httpinterface` is used. Deleted in version 3.6;
* `--install` - installs windows service.

    2. on 64-bit system:
```
mongod --directoryperdb --dbpath ./data --logpath ./log/mongod.log --journal --rest --install
```
* If you have any issues - check your log file you've specified - it can contain information about the error.
5. Start created service
```
net start MongoDB
```
## Using the Database Client
Open up another command prompt and type:
```
mongo
```
This will open up the `mongo shell`.
Use:
`cls` - to clear the screen.
`show dbs` - show all available databases.
`use name` - to create and switch to a new database called `name`.
`db` - to show the name of currently used database.

So when we are working with a document (database entry) we using the JSON-like syntax. Something like this:
```json
{
  field1: value1,
  field2: value2,
  field3: value3
}
```
So for a `customer` we might want to have:
```json
{
  first_name: "John",
  last_name: "Doe",
  phones: ["+123456789","+123456788"],
  age: 33,
  balance: 150.01,
  address: {
    street: "4 main st.",
    city: "Boston"
  }
  purchases: [
    {
      name: "4K TV", id: "1234", quantity: "10"
    },
    {
      name: "Ipad", id: "1235", quantity: "100"
    }
  ]
}
```

### Creating a User for DB
So we have to be using some of databases already. Now we can try to create a user for a current database.
```js
db.createUser({
  user: "user",
  pwd: "password",
  roles: [ "readWrite", "dbAdmin" ]
});
```
> Successfully added user: { "user" : "user", "roles" : [ "readWrite", "dbAdmin" ] }
https://docs.mongodb.com/manual/reference/method/db.createUser/

### Collections
`collection` in `mongo` is nearly the same like tables in relational databases. They predefined to store documents.
`db.createCollection('customers')` - will create a new colletion in current database.
`show collections` - displays all avilable collections.

### Insert (C of CRUD)
```js
// Let's insert an object in our new collection called `customers`.
db.customers.insert({
  first_name: "John",
  last_name: "Doe"
});
// Now we can display all available objects in our collection
db.customers.find();
// Insert several objects different properties in our collection.
// Insert can also accept array with objects
db.customers.insert([
  {
    first_name: "John1",
    last_name: "Doe1"
  },
  {
    first_name: "John2",
    last_name: "Doe2"
    gender: "Male"
  }
]);
// If we check what we have now with
db.customers.find();
// we will see that 3 objects that we've created has different set of fields,
// what is impossible for relational database
```
When you have a lot of objects with tons of properties it would be quite complicated to read the objects displayed with `db.customers.find()`, so to show the objects in another, standard indented form you can call:
```
db.customers.find().pretty();
```

### Update (U of CRUD)
1. Update an entry completely
```js
// To update an entry you need to specify a matching criterion, and then the new // object, you will have to specify each field of the object again, since it will
// be completely overwritten.
db.customers.update({
  first_name: "John"
},
{
  name: "Jess",
  surname: "Smith",
  gender: "female"
});
```
2. Update / add some field of / to an entry
```js
db.customers.update({
  first_name: "John1"
},
{
  $set:{
    first_name: "Mike",
  }
});
```
3. Increment numbers
```js
// lets first add some numeric field
db.customers.update({
  first_name: "John2"
},
{
  $set:{
    age: 45,
  }
});
// now we can try to increment the number with `$inc`
db.customers.update({
  first_name: "John2"
},
{
  $inc:{
    age: 10,
  }
});
// after this command `age` has to be `55`
```
4. Remove fields
```js
db.customers.update({
  first_name: "John2"
},
{
  $unset:{
    age: 1
  }
});
```
5. `Upsert` - create something in case if an object for update is not exists
```js
db.customers.update({
  first_name: "Jayson"
},
{
  first_name: "Jayson",
  last_name: "Green",
  gender: "Male"
},
{
  upsert: 1
});
```
6. `$rename` a `field` in object
```js
db.customers.update({
  first_name: "Jayson"
},
{
  $rename:
  {
    "gender":"sex"
  }
});
```

### Delete a document (object) (D of CRUD)
1. Remove __all__ documents where `first_name` is `john2`
```js
db.customers.remove({
  first_name:"John2"
});
```
2. Remove __one__ document where `first_name` is `john2`, the one that is found first.
```js
db.customers.remove({
  first_name:"John2"
},
{
  justOne: 1
});
```

### Read (R of CRUD)
1. Get all element of collection:
```js
db.customers.find();
```
2. Find particular element:
```js
db.customers.find({first_name:"Jayson"});
// or you can surround the field in quotes
db.customers.find({"first_name":"Jayson"});
```
3. `OR`
```js
db.customers.find({$or:[
  {first_name:"Jayson"},{last_name:"Doe1"}]
});
```
4. `less than ($lt)`, also you can use `$gt`, `$lte`, `$gte`.
```js
db.customers.find({ age: {$lt:40} }).pretty();
```
5. Searching nested field
```js
// add a document with object field
db.customers.insert({address:{street:"First st", city:"London"}});
// get all entries with `city:"London"`
// in this case quotes are necessary
db.customers.find({"address.city":"London"}).pretty();
```
6. Searching an array value
```js
// add documents with array field
db.customers.insert([{colors:["red", "black"]}, {colors:["blue", "red"]}]);
// get all entries with `color:"red"`
db.customers.find({"colors":"red"}).pretty();
```

### Sorting
1. Ascending order
```js
db.customers.find().sort({first_name:1}).pretty();
```
2. Descending order
```js
db.customers.find().sort({first_name:-1}).pretty();
```

### Count
```js
db.customers.find().count();
```

### Limit
```js
db.customers.find().limit(3).pretty();
```

### Iteration
```js
db.customers.find().forEach(function(doc) {
  print("Customer Name is ", doc.first_name);
});
```
