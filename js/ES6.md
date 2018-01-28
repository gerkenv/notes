
#### 6.2 Let and Const

function getClothing(isCold) {
  if (isCold) {
    var freezing = 'Grab a jacket!';
  } else {
    var hot = 'It’s a shorts kind of day.';
    console.log(freezing);
  }
}

Output:
undefined

##### Hoisting
Hoisting is a result of how JavaScript is interpreted by your browser. Essentially, before any JavaScript code is executed, all variables are "hoisted", which means they're raised to the top of the function scope. So at run-time, the getClothing() function actually looks more like this…

function getClothing(isCold) {
  var freezing, hot;
  if (isCold) {
    freezing = 'Grab a jacket!';
  } else {
    hot = 'It’s a shorts kind of day.';
    console.log(freezing);
  }
}

Variables declared with _let_ and _const_ eliminate this specific issue of hoisting because they’re scoped to the block, not to the function. Previously, when you used _var_, variables were either scoped globally or locally to an entire function scope.

Output:
ReferenceError: freezing is not defined

#### 6.4 Template literals

Prior to ES6, the old way to concatenate strings together was by using the string concatenation operator ( + ).

const student = {
  name: 'Richard Kalehoff',
  guardian: 'Mr. Kalehoff'
};

const teacher = {
  name: 'Mrs. Wilson',
  room: 'N231'
}

let message = student.name + ' please see ' + teacher.name + ' in ' + teacher.room + ' to pick up your report card.';

Returns:
Richard Kalehoff please see Mrs. Wilson in N231 to pick up your report card.

This works alright, but it gets more complicated when you need to build multi-line strings.

let note = teacher.name + ',\n\n' +
  'Please excuse ' + student.name + '.\n' +
  'He is recovering from the flu.\n\n' +
  'Thank you,\n' +
  student.guardian;

Returns:
Mrs. Wilson,

Please excuse Richard Kalehoff.
He is recovering from the flu.

Thank you,
Mr. Kalehoff

##### Template literals
Template literals are essentially string literals that include embedded expressions.

Denoted with backticks ( `` ) instead of single quotes ( '' ) or double quotes ( "" ), template literals can contain placeholders which are represented using ${expression}. This makes it much easier to build strings.

Here's the previous examples using template literals.

let message = `${student.name} please see ${teacher.name} in ${teacher.room} to pick up your report card.`;

Returns:
Richard Kalehoff please see Mrs. Wilson in N231 to pick up your report card.

...but what about the multi-line example from before?

let note = `${teacher.name},

  Please excuse ${student.name}.
  He is recovering from the flu.

  Thank you,
  ${student.guardian}`;

Returns:
Mrs. Wilson,

Please excuse Richard Kalehoff.
He is recovering from the flu.

Thank you,
Mr. Kalehoff

#### 6.6 Destructing

In ES6, you can extract data from arrays and objects into distinct variables using destructuring.

This probably sounds like something you’ve done before, for example, look at the two code snippets below that extract data using pre-ES6 techniques:

const point = [10, 25, -34];

const x = point[0];
const y = point[1];
const z = point[2];

console.log(x, y, z);
Prints: 10 25 -34

The example above shows extracting values from an array.

const gemstone = {
  type: 'quartz',
  color: 'rose',
  karat: 21.29
};

const type = gemstone.type;
const color = gemstone.color;
const karat = gemstone.karat;

console.log(type, color, karat);
Prints: quartz rose 21.29

And this example shows extracting values from an object.

Both are pretty straightforward, however, neither of these examples are actually using destructuring.

So what exactly is destructuring?

##### Destructuring
Destructuring borrows inspiration from languages like Perl and Python by allowing you to specify the elements you want to extract from an array or object on the left side of an assignment. It sounds a little weird, but you can actually achieve the same result as before, but with much less code; and it's still easy to understand.

Let’s take a look at both examples rewritten using destructuring.

Destructuring values from an array
const point = [10, 25, -34];

const [x, y, z] = point;

console.log(x, y, z);
Prints: 10 25 -34

In this example, the brackets [ ] represent the array being destructured and x, y, and z represent the variables where you want to store the values from the array. Notice how you don’t have to specify the indexes for where to extract the values from because the indexes are implied.

TIP: You can also ignore values when destructuring arrays. For example, const [x, , z] = point; ignores the y coordinate and discards it.

Destructuring values from an object

const gemstone = {
  type: 'quartz',
  color: 'rose',
  karat: 21.29
};

const {type, color, karat} = gemstone;

console.log(type, color, karat);
Prints: quartz rose 21.29

In this example, the curly braces { } represent the object being destructured and type, color, and karat represent the variables where you want to store the properties from the object. Notice how you don’t have to specify the property from where to extract the values. Because gemstone has a property named type, the value is automatically stored in the type variable. Similarly, gemstone has a color property, so the value of color automatically gets stored in the color variable. And it's the same with karat.

TIP: You can also specify the values you want to select when destructuring an object. For example, let {color} = gemstone; will only select the color property from the gemstone object.

#### 6.8 Object Literal Shorthand

You’ve probably written code where an object is being initialized using the same property names as the variable names being assigned to them.

But just in case you haven’t, here’s an example.

let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = {
  type: type,
  color: color,
  carat: carat
};

console.log(gemstone);
Prints: Object {type: "quartz", color: "rose", carat: 21.29}

Do you see the repetition? Doesn't type: type, color: color, and carat:carat seem redundant?

The good news is that you can remove those duplicate variables names from object properties if the properties have the same name as the variables being assigned to them.

Speaking of shorthand, there’s also a shorthand way to add methods to objects.

To see how that looks, let’s start by adding a calculateWorth() method to our gemstone object. The calculateWorth() method will tell us how much our gemstone costs based on its type, color, and carat.

let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = {
  type,
  color,
  carat,
  calculateWorth: function() {
    // will calculate worth of gemstone based on type, color, and carat
  }
};

In this example, an anonymous function is being assigned to the property calculateWorth, but is the function keyword really needed? In ES6, it’s not!

__Shorthand method names__
Since you only need to reference the gemstone’s calculateWorth property in order to call the function, having the function keyword is redundant, so it can be dropped.

let gemstone = {
  type,
  color,
  carat,
  calculateWorth() { ... }
};

#### 6.11 Family of For Loops

The for...of loop is the most recent addition to the family of for loops in JavaScript.

It combines the strengths of its siblings, the for loop and the for...in loop, to loop over any type of data that is iterable (meaning it follows the iterable protocol which we'll look at in lesson 3). By default, this includes the data types String, Array, Map, and Set—notably absent from this list is the Object data type (i.e. {}). Objects are not iterable, by default.

Before we look at the for...of loop, let’s first take a quick look at the other for loops to see where they have weaknesses.

##### The for loop
The for loop is obviously the most common type of loop there is, so this should be a quick refresher.

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < digits.length; i++) {
  console.log(digits[i]);
}
Prints:
0
1
2
3
4
5
6
7
8
9

Really the biggest downside of a for loop is having to keep track of the counter and exit condition.

In this example, we’re using the variable i as a counter to keep track of the loop and to access values in the array. We’re also using digits.length to determine the exit condition for the loop. If you just glance at this code, it can sometimes be confusing exactly what’s happening; especially for beginners.

While for loops certainly have an advantage when looping through arrays, some data is not structured like an array, so a for loop isn’t always an option.

##### The for...in loop
The for...in loop improves upon the weaknesses of the for loop by eliminating the counting logic and exit condition.

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
Prints:
0
1
2
3
4
5
6
7
8
9

But, you still have to deal with the issue of using an index to access the values of the array, and that stinks; it almost makes it more confusing than before.

Also, the for...in loop can get you into big trouble when you need to add an extra method to an array (or another object). Because for...in loops loop over all enumerable properties, this means if you add any additional properties to the array's prototype, then those properties will also appear in the loop.

Array.prototype.decimalfy = function() {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
Prints:
0
1
2
3
4
5
6
7
8
9
function() {
 for (let i = 0; i < this.length; i++) {
  this[i] = this[i].toFixed(2);
 }
}

Gross! This is why for...in loops are discouraged when looping over arrays.

##### forEach
NOTE: The forEach loop is another type of for loop in JavaScript. However, forEach() is actually an array method, so it can only be used exclusively with arrays. There is also no way to stop or break a forEach loop. If you need that type of behavior in your loop, you’ll have to use a basic for loop.

Finally, we have the mighty for...of loop.

##### For...of loop
The for...of loop is used to loop over any type of data that is iterable.

You write a for...of loop almost exactly like you would write a for...in loop, except you swap out in with of and you can drop the index.

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  console.log(digit);
}
Prints:
0
1
2
3
4
5
6
7
8
9

This makes the for...of loop the most concise version of all the for loops.

TIP: It’s good practice to use plural names for objects that are collections of values. That way, when you loop over the collection, you can use the singular version of the name when referencing individual values in the collection. For example, for (const button of buttons) {...}.

But wait, there’s more! The for...of loop also has some additional benefits that fix the weaknesses of the for and for...in loops.

You can stop or break a for...of loop at anytime.

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  if (digit % 2 === 0) {
    continue;
  }
  console.log(digit);
}
Prints:
1
3
5
7
9

And you don’t have to worry about adding new properties to objects. The for...of loop will only loop over the values in the object.

Array.prototype.decimalfy = function() {
  for (i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  console.log(digit);
}
Prints:
0
1
2
3
4
5
6
7
8
9

#### 6.14 Spread Operator

The spread operator, written with three consecutive dots ( ... ), is new in ES6 and gives you the ability to expand, or spread, iterable objects into multiple elements.

Let’s take a look at a few examples to see how it works.

const books = ["Don Quixote", "The Hobbit", "Alice in Wonderland", "Tale of Two Cities"];
console.log(...books);
Prints: Don Quixote The Hobbit Alice in Wonderland Tale of Two Cities
```js
const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
console.log(...primes);
```
Prints: 2 3 5 7 11 13 17 19 23 29

If you look at the output from the examples, notice that both the array and set have been expanded into their individual elements. So how is this useful?

NOTE: Sets are a new built-in object in ES6 that we’ll cover in more detail in a future lesson.

##### Combining arrays with concat
One example of when the spread operator can be useful is when combining arrays.

If you’ve ever needed to combine multiple arrays, prior to the spread operator, you were forced to use the Array’s concat() method.
```js
const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
const produce = fruits.concat(vegetables);
console.log(produce);
```
Prints: ["apples", "bananas", "pears", "corn", "potatoes", "carrots"]

This isn’t terrible, but wouldn’t it be nice if there was a shorthand way to write this code?

For example, something like…
```js
const produce = [fruits, vegetables];
console.log(produce);
```
Prints: [Array[3], Array[3]]

Unfortunately, that doesn’t work.

Instead of combining both arrays, this code actually adds the fruits array at the first index and the vegetables array at the second index of the produce array.

How about trying the spread operator?
```js
const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];

const produce = [...fruits,...vegetables];

console.log(produce);
```
Prints: [ 'apples', 'bananas', 'pears', 'corn', 'potatoes', 'carrots' ]

#### 6.15 ...Rest Parameter

If you can use the spread operator to spread an array into multiple elements, then certainly there should be a way to bundle multiple elements back into an array, right?

In fact, there is! It’s called the rest parameter, and it’s another new addition in ES6.

Rest parameter
The rest parameter, also written with three consecutive dots ( ... ), allows you to represent an indefinite number of elements as an array. This can be helpful in a couple of different situations.

One situation is when assigning the values of an array to variables. For example,
```js
const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);
```
Prints: 20.17 18.67 1.5 ["cheese", "eggs", "milk", "bread"]

This code takes the values of the order array and assigns them to individual variables using destructuring. total, subtotal, and tax are assigned the first three values in the array, however, items is where you want to pay the most attention.

By using the rest parameter, items is assigned the rest of the values in the array (as an array).
```js
printPackageContent('Cheese', 'eggs', 'milk', 'bread');
function printPackageContent(...items) {
  for (const item of items) {
    console.log(item);
  }
}
```
##### Variadic functions
Another use case for the rest parameter is when you’re working with variadic functions. Variadic functions are functions that take an indefinite number of arguments.

For example, let’s say we have a function called sum() which calculates the sum of an indefinite amount of numbers. How might the sum() function be called during execution?
```js
sum(1, 2);
sum(10, 36, 7, 84, 90, 110);
sum(-23, 3000, 575000);
```
There’s literally an endless number of ways the sum() function could be called. Regardless of the amount of numbers passed to the function, it should always return the total sum of the numbers.

##### Using the arguments object
In previous versions of JavaScript, this type of function would be handled using the arguments object. The arguments object is an array-like object that is available as a local variable inside all functions. It contains a value for each argument being passed to the function starting at 0 for the first argument, 1 for the second argument, and so on.

If we look at the implementation of our sum() function, then you’ll see how the arguments object could be used to handle the variable amount of numbers being passed to it.
```js
function sum() {
  let total = 0;
  for(const argument of arguments) {
    total += argument;
  }
  return total;
}
```
Now this works fine, but it does have its issues:

If you look at the definition for the sum() function, it doesn’t have any parameters.
This is misleading because we know the sum() function can handle an indefinite amount of arguments.
It can be hard to understand.
If you’ve never used the arguments object before, then you would most likely look at this code and wonder where the arguments object is even coming from. Did it appear out of thin air? It certainly looks that way.

##### Using the rest parameter
Fortunately, with the addition of the rest parameter, you can rewrite the sum() function to read more clearly.
```js
function sum(...nums) {
  let total = 0;
  for(const num of nums) {
    total += num;
  }
  return total;
}
```
This version of the sum() function is both more concise and is easier to read. Also, notice the for...in loop has been replaced with the new for...of loop.

#### 7.2 Arrow functions

ES6 introduces a new kind of function called the arrow function. Arrow functions are very similar to regular functions in behavior, but are quite different syntactically. The following code takes a list of names and converts each one to uppercase using a regular function:
```js
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(function(name) {
  return name.toUpperCase();
});
```
The code below does the same thing except instead of passing a regular function to the map() method, it passes an arrow function. Notice the arrow in the arrow function ( => ) in the code below:
```js
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
  name => name.toUpperCase()
);
```
The only change to the code above is the code inside the map() method. It takes a regular function and changes it to use an arrow function.

NOTE: Not sure how map() works? It's a method on the Array prototype. You pass a function to it, and it calls that function once on every element in the array. It then gathers the returned values from each function call and makes a new array with those results. For more info, check out MDN's documentation.

##### Convert a function to an arrow function
```js
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(function(name) {
  return name.toUpperCase();
});
```
With the function above, there are only a few steps for converting the existing "normal" function into an arrow function.

remove the function keyword
remove the parentheses
remove the opening and closing curly braces
remove the return keyword
remove the semicolon
add an arrow ( => ) between the parameter list and the function body
```js
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
  name => name.toUpperCase()
);
```
#### 7.3 Using Arrow Functions

Regular functions can be either function declarations or function expressions, however arrow functions are always expressions. In fact, their full name is "arrow function expressions", so they can only be used where an expression is valid. This includes being:

stored in a variable,
passed as an argument to a function,
and stored in an object's property.
One confusing syntax is when an arrow function is stored in a variable.
```js
const greet = name => `Hello ${name}!`;
```
In the code above, the arrow function is stored in the greet variable and you'd call it like this:
```js
greet('Asser');
```
Returns: Hello Asser

##### Parentheses and arrow function parameteres
You might have noticed the arrow function from the greet() function looks like this:
```js
name => `Hello ${name}!`
```
If you recall, the parameter list appears before the arrow function's arrow (i.e. =>). If there's only one parameter in the list, then you can write it just like the example above. But, if there are two or more items in the parameter list, or if there are zero items in the list, then you need to wrap the list in parentheses:
```js
// empty parameter list requires parentheses
const sayHi = () => console.log('Hello Udacity Student!');
sayHi();
Prints: Hello Udacity Student!
```
// multiple parameters requires parentheses
const orderIceCream = (flavor, cone) => console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);
orderIceCream('chocolate', 'waffle');
Prints: Here's your chocolate ice cream in a waffle cone.

##### Concise and block body syntax
All of the arrow functions we've been looking at have only had a single expression as the function body:
```js
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
  name => name.toUpperCase()
);
```
This format of the function body is called the "concise body syntax". The concise syntax:

* has no curly braces surrounding the function body
* and automatically returns the expression.
If you need more than just a single line of code in your arrow function's body, then you can use the "block body syntax".
```js
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map( name => {
  name = name.toUpperCase();
  return `${name} has ${name.length} characters in their name`;
});
```
Important things to keep in mind with the block syntax:

* it uses curly braces to wrap the function body
* and a return statement needs to be used to actually return something from the function.

So arrow functions are awesome!

* The syntax is a lot shorter,
* it's easier to write and read short, single-line functions,
* and they automatically return when using the concise body syntax!
WARNING: Everything's not all ponies and rainbows though, and there are definitely times when you might not want to use an arrow function. So before you wipe from your memory how to write a traditional function, check out these implications:

*there's a gotcha with the this keyword in arrow functions
  * go to the next lesson to find out the details!
* arrow functions are only expressions
  * there's no such thing as an arrow function declaration

#### 7.7 "this" and Regular Functions

To get a handle on how this works differently with arrow functions, let's do a quick recap of how this works in a standard function. If you have a solid grasp of how this works already, feel free to jump over this section.

The value of the this keyword is based completely on how its function (or method) is called. this could be any of the following:

##### 1. A new object
If the function is called with new:
```js
const mySundae = new Sundae('Chocolate', ['Sprinkles', 'Hot Fudge']);
```
In the code above, the value of `this` inside the Sundae constructor function is a new object because it was called with new.

##### 2. A specified object
If the function is invoked with call/apply:
```js
const result = obj1.printName.call(obj2);
```
In the code above, the value of `this` inside printName() will refer to obj2 since the first parameter of call() is to explicitly set what this refers to.

##### 3. A context object
If the function is a method of an object:
```js
data.teleport();
```
In the code above, the value of `this` inside teleport() will refer to data.

##### 4. The global object or undefined
If the function is called with no context:
```js
teleport();
```
In the code above, the value of `this` inside teleport() is either the global object or, if in strict mode, it's undefined.

TIP: this in JavaScript is a complicated topic. We just did a quick overview, but for an in-depth look at how this is determined, check out this All Makes Sense Now! from Kyle Simpson's book series You Don't Know JS.

####7.8 "this" and Arrow Functions

With regular functions, the value of this is set based on how the function is called. With arrow functions, the value of this is based on the function's surrounding context. In other words, the value of this inside an arrow function is the same as the value of this outside the function.

Let's check out an example with this in regular functions and then look at how arrow functions will work.
```js
// constructor
function IceCream() {
  this.scoops = 0;
}

// adds scoop to ice cream
IceCream.prototype.addScoop = function() {
  setTimeout(function() {
    this.scoops++;
    console.log('scoop added!');
  }, 500);
};

const dessert = new IceCream();
dessert.addScoop();
```
Prints:
scoop added!

After running the code above, you'd think that dessert.scoops would be 1 after half a millisecond. But, unfortunately, it's not:
```js
console.log(dessert.scoops);
```
Prints:
0

Can you tell why?

The function passed to setTimeout() is called without new, without call(), without apply(), and without a context object. That means the value of this inside the function is the global object and NOT the dessert object. So what actually happened was that a new scoops variable was created (with a default value of undefined) and was then incremented (undefined + 1 results in NaN):
```js
console.log(scoops);
```
Prints:
NaN

One way around this is to use closure:
```js
// constructor
function IceCream() {
  this.scoops = 0;
}

// adds scoop to ice cream
IceCream.prototype.addScoop = function() {
  const cone = this; // sets `this` to the `cone` variable
  setTimeout(function() {
    cone.scoops++; // references the `cone` variable
    console.log('scoop added!');
  }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();
```
The code above will work because instead of using this inside the function, it sets the cone variable to this and then looks up the cone variable when the function is called. This works because it's using the value of the this outside the function. So if we check the number of scoops in our dessert right now, we'll see the correct value of 1:
```js
console.log(dessert.scoops);
```
Prints:
1

Well that's exactly what arrow functions do, so let's replace the function passed to setTimeout() with an arrow function:
```js
// constructor
function IceCream() {
  this.scoops = 0;
}

// adds scoop to ice cream
IceCream.prototype.addScoop = function() {
  setTimeout(() => { // an arrow function is passed to setTimeout
    this.scoops++;
    console.log('scoop added!');
  }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();
```
Since arrow functions inherit their this value from the surrounding context, this code works!
```js
console.log(dessert.scoops);
```
Prints:
1

When addScoop() is called, the value of this inside addScoop() refers to dessert. Since an arrow function is passed to setTimeout(), it's using its surrounding context to determine what this refers to inside itself. So since this outside of the arrow function refers to dessert, the value of this inside the arrow function will also refer to dessert.

Now what do you think would happen if we changed the addScoop() method to an arrow function?
```js
// constructor
function IceCream() {
    this.scoops = 0;
}

// adds scoop to ice cream
IceCream.prototype.addScoop = () => { // addScoop is now an arrow function
  setTimeout(() => {
    this.scoops++;
    console.log('scoop added!');
  }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();
```
Yeah, this doesn't work for the same reason - arrow functions inherit their this value from their surrounding context. Outside of the addScoop() method, the value of this is the global object. So if addScoop() is an arrow function, the value of this inside addScoop() is the global object. Which then makes the value of this in the function passed to setTimeout() also set to the global object!

#### 7.9 Default Function Parameters

Take a look at this code:
```js
function greet(name, greeting) {
  name = (typeof name !== 'undefined') ?  name : 'Student';
  greeting = (typeof greeting !== 'undefined') ?  greeting : 'Welcome';

  return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!
```
Returns:
Welcome Student!
Welcome James!
Howdy Richard!

What is all that horrible mess in the first two lines of the greet() function? All of that is there to provide default values for the function if the required arguments aren't provided. It's pretty ugly, though...

Fortunately, ES6 has introduced a new way to create defaults. It's called default function parameters.

##### Default function parameters
Default function parameters are quite easy to read since they're placed in the function's parameter list:
```js
function greet(name = 'Student', greeting = 'Welcome') {
  return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!
```
Returns:
Welcome Student!
Welcome James!
Howdy Richard!

Wow, that's a lot less code, so much cleaner, and significantly easier to read!

To create a default parameter, you add an equal sign ( = ) and then whatever you want the parameter to default to if an argument is not provided. In the code above, both parameters have default values of strings, but they can be any JavaScript type!

#### 7.10 Default and Destructing Arrays

You can combine default function parameters with destructuring to create some pretty powerful functions!
```js
function createGrid([width = 5, height = 5]) {
  return `Generates a ${width} x ${height} grid`;
}

createGrid([]); // Generates a 5 x 5 grid
createGrid([2]); // Generates a 2 x 5 grid
createGrid([2, 3]); // Generates a 2 x 3 grid
createGrid([undefined, 3]); // Generates a 5 x 3 grid
```
Returns:
Generates a 5 x 5 grid
Generates a 2 x 5 grid
Generates a 2 x 3 grid
Generates a 5 x 3 grid

The createGrid() function expects an array to be passed to it. It uses destructuring to set the first item in the array to the width and the second item to be the height. If the array is empty or if it has only one item in it, then the default parameters kick in and give the missing parameters a default value of 5.

There is a problem with this though, the following code will not work:
```js
createGrid(); // throws an error
```
Uncaught TypeError: Cannot read property 'Symbol(Symbol.iterator)' of undefined

This throws an error because createGrid() expects an array to be passed in that it will then destructure. Since the function was called without passing an array, it breaks. But, we can use default function parameters for this!
```js
function createGrid([width = 5, height = 5] = []) {
  return `Generates a ${width} x ${height} grid`;
}
```
See that new = [] in the function's parameter? If createGrid() is called without any argument then it will use this default empty array. And since the array is empty, there's nothing to destructure into width and height, so their default values will apply! So by adding = [] to give the entire parameter a default, the following code will now work:
```js
createGrid(); // Generates a 5 x 5 grid
```
Returns: Generates a 5 x 5 grid

##### Defaults and Destructuring Objects
Just like array destructuring with array defaults, a function can have an object be a default parameter and use object destructuring:
```js
function createSundae({scoops = 1, toppings = ['Hot Fudge']}) {
  const scoopText = scoops === 1 ? 'scoop' : 'scoops';
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

createSundae({}); // Your sundae has 1 scoop with Hot Fudge toppings.
createSundae({scoops: 2}); // Your sundae has 2 scoops with Hot Fudge toppings.
createSundae({scoops: 2, toppings: ['Sprinkles']}); // Your sundae has 2 scoops with Sprinkles toppings.
createSundae({toppings: ['Cookie Dough']}); // Your sundae has 1 scoop with Cookie Dough toppings.
```
Returns:
Your sundae has 1 scoop with Hot Fudge toppings.
Your sundae has 2 scoops with Hot Fudge toppings.
Your sundae has 2 scoops with Sprinkles toppings.
Your sundae has 1 scoop with Cookie Dough toppings.

Just like the array example before, if you try calling the function without any arguments it won't work:
```js
createSundae(); // throws an error
```
Uncaught TypeError: Cannot match against 'undefined' or 'null'.

We can prevent this issue by providing a default object to the function:
```js
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) {
  const scoopText = scoops === 1 ? 'scoop' : 'scoops';
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}
```
By adding an empty object as the default parameter in case no arguments are provided, calling the function without any arguments now works.
```js
createSundae(); // Your sundae has 1 scoop with Hot Fudge toppings.
```
Returns: Your sundae has 1 scoop with Hot Fudge toppings.

##### Array defaults vs. object defaults
Default function parameters are a simple addition, but it makes our lives so much easier! One benefit of object defaults over array defaults is how they handle skipped options. Check this out:
```js
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) { … }
```
...with the createSundae() function using object defaults with destructuring, if you want to use the default value for scoops but change the toppings, then all you need to do is pass in an object with toppings:
```js
createSundae({toppings: ['Hot Fudge', 'Sprinkles', 'Caramel']});
```
Compare the above example with the same function that uses array defaults with destructuring.
```js
function createSundae([scoops = 1, toppings = ['Hot Fudge']] = []) { … }
```
With this function setup, if you want to use the default number of scoops but change the toppings, you'd have to call your function a little...oddly:
```js
createSundae([undefined, ['Hot Fudge', 'Sprinkles', 'Caramel']]);
```
Since arrays are positionally based, we have to pass undefined to "skip" over the first argument (and accept the default) to get to the second argument.

Unless you've got a strong reason to use array defaults with array destructuring, we recommend going with object defaults with object destructuring!

#### 7.12 Class Preview

Here's a quick peek of what a JavaScript class look like:
```js
class Dessert {
  constructor(calories = 250) {
    this.calories = calories;
  }
}

class IceCream extends Dessert {
  constructor(flavor, calories, toppings = []) {
    super(calories);
    this.flavor = flavor;
    this.toppings = toppings;
  }
  addTopping(topping) {
    this.toppings.push(topping);
  }
}
```
Notice the new class keyword right in front of Dessert and IceCream, or the new extends keyword in class IceCream extends Dessert? What about the call to super() inside the IceCream's constructor() method.

There are a bunch of new keywords and syntax to play with when creating JavaScript classes. But, before we jump into the specifics of how to write JavaScript classes, we want to point out a rather confusing part about JavaScript compared with class-based languages.

#### 7.14 JavaScript Classes

##### ES5 "Class" Recap
Since ES6 classes are just a mirage and hide the fact that prototypal inheritance is actually going on under the hood, let's quickly look at how to create a "class" with ES5 code:
```js
function Plane(numEngines) {
  this.numEngines = numEngines;
  this.enginesActive = false;
}

// methods "inherited" by all instances
Plane.prototype.startEngines = function () {
  console.log('starting engines...');
  this.enginesActive = true;
};

const richardsPlane = new Plane(1);
richardsPlane.startEngines();

const jamesPlane = new Plane(4);
jamesPlane.startEngines();
```
In the code above, the Plane function is a constructor function that will create new Plane objects. The data for a specific Plane object is passed to the Plane function and is set on the object. Methods that are "inherited" by each Plane object are placed on the Plane.prototype object. Then richardsPlane is created with one engine while jamesPlane is created with 4 engines. Both objects, however, use the same startEngines method to activate their respective engines.

Things to note:

* the constructor function is called with the new keyword
* the constructor function, by convention, starts with a capital letter
* the constructor function controls the setting of data on the objects that will be created
* "inherited" methods are placed on the constructor function's prototype object
  Keep these in mind as we look at how ES6 classes work because, remember, ES6 classes set up all of this for you under the hood.

##### ES6 Classes
Here's what that same Plane class would look like if it were written using the new class syntax:
```js
class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
}
```

#### 7.16 Working with a JavaScript Classes

Class is just a function
Just to prove that there isn't anything special about class, check out this code:
```js
class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
}

typeof Plane; // function
```
Returns: function

That's right—it's just a function! There isn't even a new type added to JavaScript.

⚠️ Where Are All The Commas? ⚠️
Did you notice that there aren't any commas between the method definitions in the Class? Commas are not used to separate properties or methods in a Class. If you add them, you'll get a "SyntaxError of unexpected token ,"

##### Static methods
To add a static method, the keyword static is placed in front of the method name. Look at the badWeather() method in the code below.
```js
class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  static badWeather(planes) {
    for (plane of planes) {
      plane.enginesActive = false;
    }
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
}
```
See how badWeather() has the word static in front of it while startEngines() doesn't? That makes badWeather() a method that's accessed directly on the Plane class, so you can call it like this:

Plane.badWeather([plane1, plane2, plane3]);
NOTE: A little hazy on how constructor functions, class methods, or prototypal inheritance works? We've got a course on it! Check out Object Oriented JavaScript.

Benefits of classes
1. Less setup
  1. There's a lot less code that you need to write to create a function
2. Clearly defined constructor function
  1. Inside the class definition, you can clearly specify the constructor function.
3. Everything's contained
  1. All code that's needed for the class is contained in the class declaration. Instead of having the constructor  function in one place, then adding methods to the prototype one-by-one, you can do everything all at once!

Things to look out for when using classes
1. class is not magic
  1. The class keyword brings with it a lot of mental constructs from other, class-based languages. It doesn't magically add this functionality to JavaScript classes.
2. class is a mirage over prototypal inheritance
  1. We've said this many times before, but under the hood, a JavaScript class just uses prototypal inheritance.
3. Using classes requires the use of new
  1. When creating a new instance of a JavaScript class, the new keyword must be used

For example,
```js
class Toy {
   ...
}

const myToy1 = Toy(); // throws an error
```
Uncaught TypeError: Class constructor Toy cannot be invoked without 'new'

but, adding the new keyword fixes the problem
```js
const myToy2 = new Toy(); // this works!
```
#### 7.17 Super and Extends

##### Subclasses with ES6
Now that we've looked at creating classes in JavaScript. Let's use the new super and extends keywords to extend a class.
```js
class Tree {
  constructor(size = '10', leaves = {spring: 'green', summer: 'green', fall: 'orange', winter: null}) {
    this.size = size;
    this.leaves = leaves;
    this.leafColor = null;
  }

  changeSeason(season) {
    this.leafColor = this.leaves[season];
    if (season === 'spring') {
      this.size += 1;
    }
  }
}

class Maple extends Tree {
  constructor(syrupQty = 15, size, leaves) {
    super(size, leaves);
    this.syrupQty = syrupQty;
  }

  changeSeason(season) {
    super.changeSeason(season);
    if (season === 'spring') {
      this.syrupQty += 1;
    }
  }

  gatherSyrup() {
    this.syrupQty -= 3;
  }
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason('fall');
myMaple.gatherSyrup();
myMaple.changeSeason('spring');
```
Both Tree and Maple are JavaScript classes. The Maple class is a "subclass" of Tree and uses the extends keyword to set itself as a "subclass". To get from the "subclass" to the parent class, the super keyword is used. Did you notice that super was used in two different ways? In Maple's constructor method, super is used as a function. In Maple's changeSeason() method, super is used as an object!

##### Compared to ES5 subclasses
Let's see this same functionality, but written in ES5 code:
```js
function Tree() {
  this.size = size || 10;
  this.leaves = leaves || {spring: 'green', summer: 'green', fall: 'orange', winter: null};
  this.leafColor;
}

Tree.prototype.changeSeason = function(season) {
  this.leafColor = this.leaves[season];
  if (season === 'spring') {
    this.size += 1;
  }
}

function Maple (syrupQty, size, leaves) {
  Tree.call(this, size, leaves);
  this.syrupQty = syrupQty || 15;
}

Maple.prototype = Object.create(Tree.prototype);
Maple.prototype.constructor = Maple;

Maple.prototype.changeSeason = function(season) {
  Tree.prototype.changeSeason.call(this, season);
  if (season === 'spring') {
    this.syrupQty += 1;
  }
}

Maple.prototype.gatherSyrup = function() {
  this.syrupQty -= 3;
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason('fall');
myMaple.gatherSyrup();
myMaple.changeSeason('spring');
```
Both this code and the class-style code above achieve the same functionality.

#### 7.19 Working with JavaScript Subclasses

##### Working with subclasses
Like most of the new additions, there's a lot less setup code and it's a lot cleaner syntax to create a subclass using class, super, and extends.

Just remember that, under the hood, the same connections are made between functions and prototypes.

super must be called before this
In a subclass constructor function, before this can be used, a call to the super class must be made.
```js
class Apple {}
class GrannySmith extends Apple {
  constructor(tartnessLevel, energy) {
    this.tartnessLevel = tartnessLevel; // `this` before `super` will throw an error!
    super(energy);
  }
}
```

