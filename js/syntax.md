# JS

### Strict Mode (ES5)
Always place it in the beginning of the file or the world will collapse.
```js
'use strict'
```
https://www.w3schools.com/js/js_strict.asp

### Data Types
* Immutable
  * number
    * Infinity, -Infinity, NaN
  * string
  * boolean
  * symbol (ES6)
  * null
  * undefined
* Mutable
  * object

https://www.hackerrank.com/challenges/js10-data-types/topics

### Casting
```js
var value = 5;
console.log(value + ' is ' + typeof(value)); // > 5 is number
value = String(value);
console.log(value + ' is ' + typeof value); // > 5 is string
value = Object(value);
console.log(value + ' is ' + typeof(value)); // > 5 is object
value = Symbol(value);
console.log(typeof value); // > symbol
value = Boolean(value);
console.log(value + ' is ' + typeof(value)); // > true is boolean
value = Number(value);
console.log(value + ' is ' + typeof value); // > 1 is number
```

### Coersion
* If you add a `number` and a `string`, the `number` is coerced to a `string`.
* If you add a `boolean` and a `string`, the `boolean` is coerced to a `string`.
* If you add a `number` and a `boolean`, the `boolean` is coerced to a `number`.

### Variable Declaration
* `var` (belongs to a scope of `this` object)
* `let` (belongs to a current scope and cannot be redeclared within it)
* `const` (same as `let` and additionally cannot be changed or redeclared)

https://www.hackerrank.com/challenges/js10-let-and-const/topics

### Function
```js
function sum(a, b) {
    return a + b;
}
```
https://www.hackerrank.com/challenges/js10-function/topics

### Function Expression
```js
let square = function(x) {
    return x * x;
};
```

### Straight Executed Anonymous Function
```js
(function(a, b) {
	for (var arg of arguments) console.log(arg);
})(1, 2);
```

### Arrow Function Expression (ES6)
```js
let square = x => x * x;
let sum = (a, b) => a + b;
let logsum = (a, b) => console.log(a + b);
let multiLineSquare = (x) => {
  if (typeof(x) != 'number') return 0;
  return x * x;
}
```
https://www.hackerrank.com/challenges/js10-arrows/topics

### Equality (==) and Identity or Strict Equality (===)
```js
console.log(1 == 1,            1 === 1);             //> true true
console.log(1 == '1',          1 === '1');           //> true false
console.log(0 == false,        0 === false);         //> true false
console.log(0 == null,         0 === null);          //> false false
console.log(0 == undefined,    0 === undefined);     //> false false
console.log(null == undefined, null === undefined);  //> true false
```
https://www.hackerrank.com/challenges/js10-if-else/topics

### Faulty Values
* `false`
* `undefined`
* `null`
* `0`
* `NaN`
* `""` (empty string)
* `[]` (empty array)

### If-Else Conditional Statements
```js
let age = 10;
if (age < 10) {
    console.log('child');
}
else if (age < 18) {
    console.log('teenager');
}
else {
    console.log("it doesn't matter anymore");
}
```

### Conditional (Ternary) Operator ( ? : ; )
```js
let parity = input % 2 == 0 ? "EVEN" : "ODD";
```

### Switch Conditional Statements
```js
switch (true) {
    case (1 === '1'):
        console.log('Option 1');
        break;
    case (null + undefined + []):
        console.log('Option 2');
        break;
    case (!Infinity):
    case ({} == {}):
        console.log('Option 3');
        break;
    default:
        console.log('Ohh no');
}
```
https://www.hackerrank.com/challenges/js10-switch/topics

### Strings
```js
let text = String('Some text');
console.log(text.charAt(2));            //> m    // undefined
console.log(text.concat(' is longer')); //> Some text is longer
console.log(text.includes('me te'));    //> true // false
console.log(text.endsWith('text'));     //> true // false
console.log(text.indexOf('e'));         //> 3    // -1
console.log(text.lastIndexOf('e'));     //> 6    // -1
console.log(text.match(/[a-z]+/));      //> ["ome", index: 1, input: "Some text",
                                        //> groups: undefined]  // undefined
console.log(text.repeat(2));            //> Some textSome text
console.log(text.replace(/e/,'o'));     //> Somo text
console.log(text.replace(/e/g,'o'));     //> Somo toxt
console.log(text.search(/e/));          //> 3    // -1
console.log(text.slice(1,-1));          //> ome tex
console.log(text.split('e'));           //> ["Som", " t", "xt"]
console.log(text.startsWith('Some'));   //> true // false
console.log(text.substr(-7, 5));        //> me te
console.log(text.toLowerCase());        //> some text
console.log(text.toUpperCase());        //> SOME TEXT
console.log('  text  '.trim());         //> text
console.log('  text  '.trimLeft());     //> 'text  '
console.log('  text  '.trimRight());     //> '  text'
```
https://www.hackerrank.com/challenges/js10-switch/topics
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

### Template Literals (ES6)
```js
let oneLine = `Some ${text}`;
let multiLine = `Several lines here do
not require any '\\n' newline signs,
    indentation is included also.`;
```

### Tagged Template Literals
Tagged template literals allow us to use a function to modify the output of a template literal. \
In this construct:
1. The first argument contains an array of string literals.
2. The subsequently processed arguments are the values of the substitution expressions.
```js
function printTemplatePartsAndValues(strings, ...values) {
	console.log('There are ' + strings.length + ' string parts');
	for (let str of strings) {
    	console.log('|' + str + '|');
    }
	for (let index in values) {
    	console.log(`value[${index}] = ${values[index]}`);
	}
}
printTemplatePartsAndValues`part 0 ${0}
part 1 ${10}     part 2 ${20}`    // you don't need parenthesis around the template
```
https://www.hackerrank.com/challenges/js10-template-literals/topics

### Arrays
```js
let array = ['1', '2', '3', '4'];
console.log('array size is ', a.length);
console.log('first element is ', a[0]);
console.log('last element is ', a[a.length - 1]);
let newSize = array.push(5);        // Append 5 to the end of the array,
                                    // returns array.length
let removed = array.pop();          // Remove the last element from the array
array.unshift(0);                   // Insert element to the beginning of the array
let shifted = array.shift();        // Remove the first element from the array
let position = array.indexOf('2');  // Get position of the element
let spliced = array.splice(1, 2));  // Remove 2 elements from index 1
let copy = array.slice();           // Same like a string.prototype.slice()
[1,0,NaN,-Infinity,Infinity].sort(); // Sort in ascending lexicographical order using
                                    // a built-in sorting
[1,0,9,6,5,NaN,-Infinity,Infinity]  // Use descending lexicographical order
.sort( (i0, i1) => i0 < i1 );
```
https://www.hackerrank.com/challenges/js10-arrays/topics

### Loops
```js
let i = 0;
while(true) {
    if (i >= 10) break;
    i++;
    console.log(i);
}

let k = 0;
do {
    k++;
    console.log(k);
} while (k < 10);

let array = [0,2,4,6,8];
for (let i = 0; i < array.length; i++) {
    if (i % 2 == 0) continue;
    console.log(i);
}

for (let index in array) {
    console.log(index, array[index]);
}

array.forEach( function(element, index, array) {
    array[index]++;
    console.log(element, index, array);
});

let person = {
    firstName : 'Chuck',
    lastName : 'Norris',
    age : 'absent'
}
for (let property in person) {
    console.log(property,' : ', person[property]);
}

for (let value of array) {
    console.log(value);
}
```
https://www.hackerrank.com/challenges/js10-loops/topics
https://www.hackerrank.com/challenges/js10-count-objects/topics


### High Order Functions

#### Filter
```js
// code representation of `filter` method
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}
// example usage
let filtered = [1,3,5,7].filter(x => x > 4);
console.log(filtered);
```

#### Map
```js
// code representation of `map` method
function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}
// example usage
let mapped = [1,3,5,7].map(x => x * 2);
console.log(mapped);
```

#### Reduce
```js
// code representation of `reduce` method
function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}
// example usage
let reduced = [1,3,5,7].reduce( (a, b) => a + b, 0 );
console.log(reduced);
```

https://www.hackerrank.com/challenges/js10-arrows/topics
http://eloquentjavascript.net/05_higher_order.html


### Console Print Outs
```js
console.error('Some error');
console.warn('Some warning');
console.info('Some information');
```

### Try, Catch, Finally
Possible block combinations:
* try-catch
* try-finally
* try-catch-finally

```js
try {
    //let arr = [0,1,2];
	console.log(arr[3]);
}
catch (e) {
    console.log(e.message);
}
finally {
    console.log('execute in any case');
}
```
https://www.hackerrank.com/challenges/js10-throw/topics

### Throw
```js
try {
    throw new Error('value for exception.message')
}
catch (e) {
    console.log(e.message);
}
```
https://www.hackerrank.com/challenges/js10-throw/topics

### Objects
```js
let obj1 = {};          // create an empty object  - option # 1
let obj1 = new Object;  // create an empty object  - option # 2

let letter = 'a';
let number = 4;
let boolean = true;
let obj1 = {letter, number, boolean}; // create an object  - option # 1
console.log(obj1);
let person = {                        // create an object  - option # 2
    firstName : 'Chuck',
    lastName : 'Norris',
    age : 'iternal'
}
console.log(person.firstName);    // get property - option # 1
console.log(person['firstName']); // get property - option # 2
person.hobby = 'undefined';       // add property - option # 1
person['job'] = 'actor';          // add property - option # 2
console.log(person);
```
https://www.hackerrank.com/challenges/js10-objects/topics

### Classes (ES5)
1.1 Using object literals
```js
let chuck = {                         // create a class  - option # 2 is extended
    firstName : 'Chuck',
    lastName : 'Norris',
    age : 'iternal',
    getFirstName: function() { return this.firstName; },  // use fun.exp.
    getAge: () => this.age // will not work
    // arrow fun.exp. gets `this` from surrounding context (global now)
}
var age = 'something global';
console.log(chuck);
console.log('Age: ', chuck.getAge());
console.log('F.N.: ', chuck.getFirstName());
```

1.2 Using Functions \
  __Function declarations are hoisted__. Can be referenced before they are declared.
```js
function Person(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.getFirstName = getPersonFirstName; // use external fun. as method [1/2]
    this.getAge = () => this.age;           // define methode with fun.exp.
}
function getPersonFirstName() { return this.firstName; }  // use external fun. [2/2]
let chuck = new Person('Chuck', 'Norris', 'iternal');
console.log(chuck);
console.log('Age: ', chuck.getAge());
console.log('F.N.: ', chuck.getFirstName());

var lastName = 'something global';

// add new method through prototype
Person.prototype.getLastName = function() { return this.lastName; } // Will work
    // usual fun.exp. gets `this` depending on how funtion is called
Person.prototype.getLastName2 = () => this.lastName;   // Will not work.
    // arrow fun.exp. gets `this` from surrounding context (global now)

console.log('L.N.: ', chuck.getLastName());
console.log('L.N.2: ', chuck.getLastName2());
```

1.2.1 Singleton Class Using a Function
```js
let chuck = new function() {
    this.firstName = 'Chuck';
    this.lastName = 'Norris';
    this.age = 'iternal';
    this.getFirstName = getPersonFirstName; // use external fun. as method [1/2]
    this.getAge = () => this.age;           // define methode with fun.exp.
}
function getPersonFirstName() { return this.firstName; }  // use external fun. [2/2]
console.log(chuck);
console.log('Age: ', chuck.getAge());
console.log('F.N.: ', chuck.getFirstName());

// add new method through prototype
chuck.constructor.prototype.getLastName = function() { return this.lastName; }
console.log('L.N.: ', chuck.getLastName());
```
https://www.hackerrank.com/challenges/js10-class/topics

### Classes (ES6)
2.1. Using Classes (ES6) \
  __Class declarations are not hoisted__. Cannot be referenced before they are declared.
```js
try {
    let someone = new Person('name', 'surname', NaN);
    console.log(someone);
}
catch (exception) {
    console.log(exception.name + ': ' + exception.message);
}

class Person {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.getFirstName = () => this.firstName; // method as property value
    }
    getLastName() {   // prototype method
        return this.lastName;
    }
    static say(words) { // static method, applied without an instance
        console.warn('Person says: ', words);
    }
}
Person.say("i don't need an instance");
let chuck = new Person('Chuck', 'Norris', 'iternal');
console.log(chuck);
console.log(chuck.getFirstName());
console.log(chuck.getLastName());
try {
    chuck.say('incredible');  // you cannot call a static method on an instance
}
catch (exception) {
    console.log(exception.name + ': ' + exception.message);
}
```

2.2.1 Using Unnamed Class Expressions
```js
let Person = class {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.getFirstName = () => this.firstName;
    }
}
let chuck = new Person('Chuck', 'Norris', 'iternal');
console.log(chuck);
console.log(chuck.getFirstName());
```

2.2.2 Using Named Class Expressions \
  The name given to a named class expression is local to the class' body.
```js
let Person = class PersonProperties {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.getFirstName = () => this.firstName;
  }
}
let chuck = new Person('Chuck', 'Norris', 'iternal');
console.log(chuck);
console.log(chuck.getFirstName());
```
https://www.hackerrank.com/challenges/js10-class/topics

### Inheritance (ES6)
1. Extending class (ES6)
```js
class Someone {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`Someone called ${this.name} speaks`);
    }
    think() {
        console.log(`Someone called ${this.name} thinks`);
    }
}

let jake = new Someone('Jake');
jake.speak();

class Anyone extends Someone {
    // if constructor is omitted, then superior's construtor is used
    speak() {
        console.log(`Anyone called ${this.name} speaks`);
    }
}

jake = new Anyone('Jake');
jake.speak();

class Person extends Someone {
    constructor(firstName, lastName) { // not obligatory
        super(firstName);
        this.lastName = lastName;
    }
    speak() {
        super.speak();
        console.log(`${this.name} ${this.lastName} speaks`);
    }
}
jake = new Person('Jake', 'Smith');
jake.speak();
jake.think();
```

2. Extending Functions (ES5 + ES6)
```js
function Someone(name) {
    this.name = name;
}
Someone.prototype.speak = function() {
    console.log(`Someone called ${this.name} speaks`);
}

class Anyone extends Someone {
    // if constructor is omitted, then superior's construtor is used
    speak() {
        console.log(`Anyone called ${this.name} speaks`);
    }
}
```

### `.call()` and `.apply()`
The Difference Between `call()` and `apply()` is:
* `call()` method takes arguments separately.
* `apply()` method takes arguments as an array.

```js
var person = {
    fullName: function(city, country) {
        return this.firstName + " " + this.lastName + ", " + city + ", " + country;
    }
}
var person1 = {
    firstName:"John",
    lastName: "Doe",
}
console.log(person.fullName.call(person1, "Oslo", "Norway"));
console.log(person.fullName.apply(person1, ["Oslo", "Norway"]));
```

https://www.hackerrank.com/challenges/js10-class/topics

### Mathematic Operation
```js
console.log(Math.pow(2, 3));  // > 8
console.log('Math.pow(2, 3) = ' + (2 ** 3)); // > 8
console.log(Math.sqrt(16));   // > 4
console.log(Math.random());   // returns random number between 0 and 1
console.log(Math.ceil(0.5));  // > 1
console.log(Math.floor(0.5)); // > 0
// convert decimal to binary
console.log((11 >>> 0).toString(2));  // > 1011
// convert binary to decimal
console.log(parseInt(1011,2));        // > 11
```

#### Float to Integer
* https://stackoverflow.com/questions/5971645/what-is-the-double-tilde-operator-in-javascript
*
```js
// double bitwise inversion cutting off the float part
console.log('Cut off float part = ' + ~~(1.9)); // > 1 // Limited to [-2^32, 2^31-1]
// sign exchange + bitwise inversion are cutting off the float part and increment the value
console.log('Math.ceil(1.1) = ' + -~(1.1)); // > 2 // Limited to [0, 2^31-1]
```

### Bitwise Operations
```js
// NOT (bit inversion)
console.log(~3);      // > -4
// invert sign = invert bits + 1
console.log(~5 + 1); // > 5
// OR
console.log(3 | 5);   // > 7 --> 011 | 101 = 111
// AND
console.log(3 & 5);   // > 1 --> 011 & 101 = 001
// XOR
console.log(3 ^ 5);   // > 6 --> 011 ^ 101 = 110
```
https://www.hackerrank.com/challenges/js10-bitwise/topics

### Dates
```js
console.log(new Date());    // uses current date, time and timezone
console.log(new Date('01/02/2003'));    // using date string with GMT+1 (format # 1)
console.log(new Date('Mar 9, 2004'));   // using date string with GMT+1 (format # 2)
console.log(new Date('2005, 03, 23'));  // using date string with GMT+1 (format # 3)
console.log(new Date('2005, 03, 23, 12:34:56:789'));  // using date string
console.log(new Date(1987, 1, 3, 12, 34, 56, 789)); // using numbers with GMT+1
let date = new Date();
console.log(date.getFullYear());
console.log(date.getMonth());
console.log(date.getDay());
console.log(date.getHours());
console.log(date.getMinutes());
// get day in long format
console.log(Intl.DateTimeFormat('en-US', {weekday:'long'}).format(date));
```
https://www.hackerrank.com/challenges/js10-date/topics

### RegEx
```js
// regex methods
/abc/.test('some abc');   // returns 'true' or 'false'
re = /A([BC])([gh])/ig;
re.exec('abg ACH');       // returns array with information about next found match
re.exec('abg ACH');       // or null
// string methods
'AB3.4.5.6 ab2.8.9'.match(/a(\d+\.)*)/i);  // returns array with first match
                            // information or null,
                            // with 'g' returns all of the matches
'some abc'.search(/abc/);   // returns index of a first match
'a jka'.replace(/a/g, 'b'); // replaces the pattern string with a new one groups
                            // without 'g' replaces only the first match
'a s1 b s2 c s3 d'.split(/\s?s\d\s?/);  // splits string into array with specified
                                        // delimeter
// groups
re = /(.)(b).+?\2/; // '\2' refers to the second group '(b)'
re.test('abc 3b');  // > true
```
https://www.hackerrank.com/challenges/js10-regexp-1/topics
http://eloquentjavascript.net/09_regexp.html
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter

### Injection to HTML
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <style>
        /* Write CSS styles here */
    </style>
    <!-- or set a refernce to it -->
    <link rel="stylesheet" href="css-file-path" type="text/css">
  </head>
  <body>
    <!-- define your HTML elements here -->
    <script>
        /* Write JS code here */
    </script>
    <!-- or set a refernce to it -->
    <script src="js-file-path" type="text/javascript">
  </body>
</html>
```
// check ./examplePages/accessingDom

https://www.hackerrank.com/challenges/js10-create-a-button/topics


## Asynchronous Operations

### Callbacks
```js
let posts = ['one', 'two'];

function showPosts(posts) {
    console.log(posts);
}

// function getPosts(callback(err, posts)) {
function getPosts(callback) {
    // wait for response
    setTimeout(() => {
        let error = false;

        if (error) {
            callback("Something went wrong", false);
        } else {
            callback(null, posts);
        }
    }, 2000);
}

// function addPost(post, callback(err, isAdded)) {
function addPost(post, callback) {
    // send request to server
    posts.push(post);
    // wait for response
    setTimeout(() => {
        let error = false;

        if (error) {
            callback("Something went wrong", false);
        } else {
            callback(null, true);
        }
    }, 2000);
}

// Usage of callback (dirty)
addPost('three', (err, isAdded) => {
    if (err) throw err;
    if (!isAdded) throw "Post was not added";
    getPosts((err, posts) => {
        if (err) throw err;
        if (!posts) throw "Posts are not found";
        showPosts(posts);
    });
});

// clean callback usage means you have to define callbacks for all functions separately

function addPostCallback(err, isAdded) {
    if (err) throw err;
    if (!isAdded) throw "Post was not added";
    getPosts(getPostsCallback);
}

function getPostsCallback(err, posts) {
    if (err) throw err;
    if (!posts) throw "Posts are not found";
    showPosts(posts);
}

addPost("four", addPostCallback);
```

### Promises
```js
let posts = ['one', 'two'];

function showPosts(posts) {
    console.log(posts);
}

function getPosts() {
    // wait for response
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let error = false;

            if (error) {
                reject("Something went wrong");
            } else {
                resolve(posts);
            }
        }, 2000);
    });
}

function addPost(post) {
    // send request to server
    posts.push(post);
    // wait for response
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let error = false;

            if (error) {
                reject("Something went wrong");
            } else {
                resolve();
            }
        }, 2000);
    });
}

// Usage of sequent promises
addPost("three").then(() => {
    console.log("1");
    return getPosts();
}).then((posts) => {
    console.log("2");
    showPosts(posts);
}).catch((err) => {
    console.trace(err);
});
console.log("3");


// Usage of parallel promises #1
Promise.all([
    addPost("four"), addPost("five"), addPost("six")
]).then(() => {
    return getPosts();
}).then((posts) => {
    showPosts(posts);
}).catch((err) => {
    console.trace(err);
});

// Usage of parallel promises #2
const promise0 = Promise.resolve("I will be always resolved");
const promise1 = "some value";
const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 10000, "returned argument");
});

Promise.all([
    promise0, promise1, promise2
]).then((data) => {
    console.log({data});
}).catch((err) => console.trace(err));
```

### Async & await
```js
// We are using same functions, as in `promises` chapter
let posts = ['one', 'two'];

function showPosts(posts) {
    console.log(posts);
}

function getPosts() {
    // wait for response
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let error = false;

            if (error) {
                reject("Something went wrong");
            } else {
                resolve(posts);
            }
        }, 2000);
    });
}

function addPost(post) {
    // send request to server
    posts.push(post);
    // wait for response
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let error = false;

            if (error) {
                reject("Something went wrong");
            } else {
                resolve();
            }
        }, 2000);
    });
}

// But we are applying async and await to use promises as usual functions
async function addPostAndReload() {
    try {
        let result1 = await addPost("three");
        console.log("1");
        let result2 = await getPosts();
        console.log("2");
        showPosts(result2);
        console.log("3");
    }
    catch(err) {
        console.stack(err);
    }
    console.log("4");
}

addPostAndReload();
console.log("5");
```


## Concepts

### Event-Driven Environment
The following script meant to run on the page with at least one button.
```js
$(document).ready(function() {
    // This function will run only once, when page is loaded, on `ready` event
    // so this variable is defined and initialized only once
    var a = 1;

    $('button').on('click', function() {
        // this function with required variables remains in memory and fired every time some button is clicked (on `click` event)
        alert(a);
    });
});
```
Javascript is not really fast, the only fast thing about it is that only code parts, associated with some events are stored in memory and fired each time an event occurs.

### Closure
Is something that retains its state and scope after it executes.
If we look at previous code example you may notice that function, that is triggered by `click` event uses variable `a`. We said that child function
```js
function() {
    alert(a);
}
```
remains in memory, but reference to variable `a` in child function scope also remains and used to store address of variable `a`. Thus memory address where variable `a` is stored will not be cleaned by garbage collector because child event listener function requires this variable for execution. This cases next problem, the parent function
```js
function() {
    // parent function scope
    var a = 1;
    $('button').on('click', function() {
        // child function scope
        alert(a);
    });
}
```
has to stay in memory as well because reference to variable `a` belongs to the child function scope, but the variable `a` itself belongs to the parent function scope.
In this case parent function with all referenced variables is a closure. And this closure will be sitting in memory as long as child function - `click` event listener using reference to variable `a` exists.

So if you want to free the space - you have to unbound the function fromm an event, this way you releasing all referenced variables. You can make it so in `jquery`:
```js
$('button').off('click');
```
This way child function with reference to variable `a` and parent function with variable `a` may be released (closure may be released).

### Scope
It is important to understand that `scope` and `context` is not the same thing.
* `Scope` means variable access.
+ `Context` means a value of `this`.

By default, in JS you're creatiang a variable in `root scope`, you're creating it in the context of the `window` object.
```js
console.log(a);         // > undefined
console.log(window.a);  // > undefined
var a = 1;
console.log(a);         // > 1
console.log(window.a);  // > 1
window.a = 3;
console.log(a);         // > 3
console.log(window.a);  // > 3
```
As you can see, you can access variables created in the `root scope` through `window`object.

If you're creating some function, then you creating a child scope, in this case this function can use its own scope and availbale all parent scopes. But code in parent scope has absolutely no access to child scopes.
```js
// parent scope
var a = 1;

function foo() {
    // child scope
    var b = 2;
    a = 3;
    console.log(a);
}

console.log(b);
```
In this case you will get an exception, that `b` is not defined, but `a` will be modified.

#### Naming Conflict
If we create a variable in parent scope and a varibale with  the same name in the child scope, then we will overwrite a reference to the variable of parent scope. The only way for us to access the variable of parent scope would be a usage of the parent context.
```js
var a = 1;

function foo() {
    var a = 2;
    console.log(a);
    console.log(window.a);
}
foo();

console.log(a);
```

#### Unintanded Global
```js
var a = 1;

function foo() {
    var b = 2;
    c = 3;
}

console.log(c);
```
if you're using the `c` variable in the child scope of the `foo` function, then within compilation process a declaration of this variable will be searched in the child scope, if nothing is found there, then search will be continued in a parent scope, if nothing is found there either, then search goes further to outer scope until it reaches the `global` scope. And if the declaration of the variable is not found there, then searched variable will be created automatically within the global context.
That is the default behavor that can be suppressed by `strict` mode.

### Context
Context in JS is `this`, so it an object which will hold all of your variables and functions - properties and methods.
So if we write:
```js
console.log(this);
```
Then in browser, it is the `window` object.

By default, in JS you're creatiang a variable in `root scope` and you're creating it in the context of the `window` object.
```js
console.log(a);         // > undefined
console.log(window.a);  // > undefined
var a = 1;
console.log(a);         // > 1
console.log(window.a);  // > 1
window.a = 3;
console.log(a);         // > 3
console.log(window.a);  // > 3
```
As you can see, you can access variables created in the `root scope` through `window`object.

If you're creating a function in `window` context you're actually creating a variable in `window` context.
```js
function foo() {
    console.log(this);
}

foo();
window.foo();
```
As you can see both calls `foo()` and `window.foo()` provide the same result;

But if you're defining an object then everything defined inside of it will be referencing `this` to the object.
```js
var obj = {
    foo : function() {
        console.log(this);
    }
}

obj.foo();
```

#### How To Manipulate The Context
You have 3 functions to mutate the `context`:
* call(new_this, arg1, arg2, arg3);
* apply(new_this, [arg1, arg2, arg3]);
* bind(new_this)

First two differs only in the way they transfer function arguments, `apply` uses comma-separated form and `call` uses an array.
```js
var obj = {
  foo : function(arg1, arg2) {
    console.log(this);
    console.table(arguments);
  }
}
obj.foo.call(window, "call", "separated", "arguments");
var newObj = {prop1: 1, prop2: 2};
obj.foo.apply(newObj, ["apply", "array", "of", "arguments"]);
```

The `bind` returns an instance of the same function but with a new context.
```js
var obj = {
    foo : function() {
        console.log(this);
    }
}
var newFoo = obj.foo.bind(window);
obj.foo();
newFoo();
```

#### Context Mutation And Events
If we will set an event listener to a DOM object with `jquery`, then the value of `this` will be the DOM object.
```js
var obj = {
    foo : function() {
        console.log(this);
    }
}
// `jquery` way
$('body').on('click', obj.foo);
// or `standard` way
document.body.addEventListener('click', obj.foo);
```
> <body>...</body>

#### Example 1. Why context is important
If we want to create a generic event that will behave differently depending on a DOM object where the event is applied.

Let's create 3 list elements with counter of clicks inside of each element, in nested `span`.
```html
  <ul>
    <li>1st list element - <span>0</span></li>
    <li>2nd list element - <span>0</span></li>
    <li>3rd list element - <span>0</span></li>
  </ul>
```
And we will write an event callback which will be working with each object separately.
```js
// `jquery` way
$('li').on('click', function() {
  var currentTimes = parseInt( $('this').find('span').html() );
  $('this').find('span').html(currentTimes + 1);
});
// or `standard` way
for (let li of document.getElementsByTagName('li')) {
	li.addEventListener('click', function() {
        let currentLi = this;
        let count = parseInt(currentLi.firstElementChild.innerHTML);
        currentLi.firstElementChild.innerHTML = ++count;
    });
};
```

### IIFE
Immediately invoked function expression (IIFE) is an expression that saved as a value returned by this expression. If you're declaring a function then it is saved as a reference.
```js
// function definition
function fun() { /* ... */ }

// functional expression
const funExp = function() { /* ... */ }

// immediately invoked function expression
let iife = ( function(){ /* ... */ } )();
```
So it is basically functional expression surrounded with `(  )();` evaluation scopes.
Nice thing about IIFE - it allows to create a closure in very simple way.

### Private Global Properties And Methods with IIFE
Some links:
* https://stackoverflow.com/questions/27849064/how-to-implement-private-method-in-es6-class-with-traceur
* http://2ality.com/2016/01/private-data-classes.html
* http://speakingjs.com/es5/ch17.html#private_data_for_objects

Let's create a private method for our class and put it in closure.
```js
var Person = (function() {
  // global private property
  let _quantityOfPersons = 0;
  // global private method
  let _printQuantity = function() {
    console.log(`One of ${_quantityOfPersons} persons.`);
  }

  class Person {
    constructor(name) {
      // public
      this.Name = name;
      _quantityOfPersons++;
    }
    printInfo() {
      _printQuantity();
      console.log(`Name is ${this.Name}`);
    }
  }

  return Person;
})();

let person1 = new Person('Jake');
person1.printInfo();
let person2 = new Person('Mike');
person1.printInfo();
console.log(person1.hasOwnProperty('Name'));
console.log(person1.hasOwnProperty('_quantityOfPersons'));
```

## Memoization
Functions can use objects to remember the results of previous operations, making it
possible to avoid unnecessary work. This optimization is called memoization.

```js
var fibonacci = (function() {
  var memo = [0, 1];
  var fib = function (n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
}());
```

We can generalize this by making a function that helps us make memoized functions. The memoizer function will take an initial memo array and the formula function.
It returns a recur function that manages the memo store and that calls the formula
function as needed. We pass the recur function and the function’s parameters to the
formula function:

```js
var memoizer = function (memo, formula) {
  var recur = function (n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = formula(recur, n);
      memo[n] = result;
    }
    return result;
  };
  return recur;
};
```

We can now define fibonacci with the memoizer, providing the initial memo array and
formula function:

```js
var fibonacci = memoizer([0, 1], function (recur, n) {
 return recur(n - 1) + recur(n - 2);
});
```

## Issue / RegExp by Expression Literal
RegExp objects made by regular expression literals share a single instance:

```js
function make_a_matcher( ) {
 return /a/gi;
}
var x = make_a_matcher( );
var y = make_a_matcher( );
// Beware: x and y are the same object!
x.lastIndex = 10;
document.writeln(y.lastIndex); // 10
```
