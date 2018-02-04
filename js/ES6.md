
All provided content is a copy of a [ES6 JavaScript course](https://www.udacity.com/course/es6-javascript-improved--ud356) at [Udacity.com](https://www.udacity.com/).
So if you prefer an interactive way of studying - go register there and check out this course.

#### 6.2 Let and Const
```js
function getClothing(isCold) {
  if (isCold) {
    var freezing = 'Grab a jacket!';
  } else {
    var hot = 'It’s a shorts kind of day.';
    console.log(freezing);
  }
}
getClothing(false);
```
> undefined

##### Hoisting
Hoisting is a result of how JavaScript is interpreted by your browser. Essentially, before any JavaScript code is executed, all variables are "hoisted", which means they're raised to the top of the function scope. So at run-time, the `getClothing()` function actually looks more like this…
```js
function getClothing(isCold) {
  var freezing, hot;
  if (isCold) {
    freezing = 'Grab a jacket!';
  } else {
    hot = 'It’s a shorts kind of day.';
    console.log(freezing);
  }
}
```
Variables declared with `let` and `const` eliminate this specific issue of hoisting because they’re scoped to the block, not to the function. Previously, when you used `var`, variables were either scoped globally or locally to an entire function scope.
```js
function getClothing(isCold) {
  if (isCold) {
    let freezing = 'Grab a jacket!';
  } else {
    let hot = 'It’s a shorts kind of day.';
    console.log(freezing);
  }
}
getClothing(false);
```
> ReferenceError: freezing is not defined

#### 6.4 Template literals

Prior to ES6, the old way to concatenate strings together was by using the string concatenation operator ( + ).
```js
const student = {
  name: 'Richard Kalehoff',
  guardian: 'Mr. Kalehoff'
};

const teacher = {
  name: 'Mrs. Wilson',
  room: 'N231'
}

let message = student.name + ' please see ' + teacher.name + ' in ' + teacher.room + ' to pick up your report card.';
```
> Richard Kalehoff please see Mrs. Wilson in N231 to pick up your report card.

This works alright, but it gets more complicated when you need to build multi-line strings.
```js
let note = teacher.name + ',\n\n' +
  'Please excuse ' + student.name + '.\n' +
  'He is recovering from the flu.\n\n' +
  'Thank you,\n' +
  student.guardian;
```
> Mrs. Wilson,
>
> Please excuse Richard Kalehoff. \
> He is recovering from the flu.
>
> Thank you, \
> Mr. Kalehoff

##### Template literals
Template literals are essentially string literals that include embedded expressions.

Denoted with backticks ( `` ) instead of single quotes ( '' ) or double quotes ( "" ), template literals can contain placeholders which are represented using `${expression}`. This makes it much easier to build strings.

Here's the previous examples using template literals.
```js
let message = `${student.name} please see ${teacher.name} in ${teacher.room} to pick up your report card.`;
```
> Richard Kalehoff please see Mrs. Wilson in N231 to pick up your report card.

...but what about the multi-line example from before?
```js
let note = `${teacher.name},

  Please excuse ${student.name}.
  He is recovering from the flu.

  Thank you,
  ${student.guardian}`;
```
> Mrs. Wilson,
>
> Please excuse Richard Kalehoff. \
> He is recovering from the flu.
>
> Thank you, \
> Mr. Kalehoff

#### 6.6 Destructing

In ES6, you can extract data from arrays and objects into distinct variables using destructuring.

This probably sounds like something you’ve done before, for example, look at the two code snippets below that extract data using pre-ES6 techniques:
```js
const point = [10, 25, -34];

const x = point[0];
const y = point[1];
const z = point[2];

console.log(x, y, z);
```
> 10 25 -34

The example above shows extracting values from an array.
```js
const gemstone = {
  type: 'quartz',
  color: 'rose',
  karat: 21.29
};

const type = gemstone.type;
const color = gemstone.color;
const karat = gemstone.karat;

console.log(type, color, karat);
```
> quartz rose 21.29

And this example shows extracting values from an object.

Both are pretty straightforward, however, neither of these examples are actually using destructuring.

So what exactly is destructuring?

##### Destructuring
Destructuring borrows inspiration from languages like Perl and Python by allowing you to specify the elements you want to extract from an array or object on the left side of an assignment. It sounds a little weird, but you can actually achieve the same result as before, but with much less code; and it's still easy to understand.

Let’s take a look at both examples rewritten using destructuring.

Destructuring values from an array:
```js
const point = [10, 25, -34];

const [x, y, z] = point;

console.log(x, y, z);
```
> 10 25 -34

In this example, the brackets `[ ]` represent the array being destructured and `x`, `y`, and `z` represent the variables where you want to store the values from the array. Notice how you don’t have to specify the indexes for where to extract the values from because the indexes are implied.

__TIP__: You can also ignore values when destructuring arrays. For example, `const [x, , z] = point;` ignores the `y` coordinate and discards it.

Destructuring values from an object:
```js
const gemstone = {
  type: 'quartz',
  color: 'rose',
  karat: 21.29
};

const {type, color, karat} = gemstone;

console.log(type, color, karat);
```
> quartz rose 21.29

In this example, the curly braces `{ }` represent the object being destructured and `type`, `color`, and `karat` represent the variables where you want to store the properties from the object. Notice how you don’t have to specify the property from where to extract the values. Because gemstone has a property named type, the value is automatically stored in the type variable. Similarly, `gemstone` has a color property, so the value of color automatically gets stored in the `color` variable. And it's the same with `karat`.

__TIP__: You can also specify the values you want to select when destructuring an object. For example, `let {color} = gemstone`; will only select the color property from the gemstone object.

#### 6.8 Object Literal Shorthand

You’ve probably written code where an object is being initialized using the same property names as the variable names being assigned to them.

But just in case you haven’t, here’s an example.
```js
let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = {
  type: type,
  color: color,
  carat: carat
};

console.log(gemstone);
```
> Object {type: "quartz", color: "rose", carat: 21.29}

Do you see the repetition? Doesn't `type: type`, `color: color`, and `carat:carat` seem redundant?

The good news is that you can remove those duplicate variables names from object properties if the properties have the same name as the variables being assigned to them.

Speaking of shorthand, there’s also a shorthand way to add methods to objects.

To see how that looks, let’s start by adding a `calculateWorth()` method to our gemstone object. The `calculateWorth()` method will tell us how much our gemstone costs based on its type, color, and carat.
```js
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
```
In this example, an anonymous function is being assigned to the property `calculateWorth`, but is the `function` keyword really needed? In ES6, it’s not!

__Shorthand method names__
Since you only need to reference the `gemstone`’s `calculateWorth` property in order to call the function, having the `function` keyword is redundant, so it can be dropped.
```js
let gemstone = {
  type,
  color,
  carat,
  calculateWorth() { ... }
};
```
#### 6.11 Family of For Loops

The `for...of` loop is the most recent addition to the family of for loops in JavaScript.

It combines the strengths of its siblings, the `for` loop and the `for...in` loop, to loop over any type of data that is iterable (meaning it follows the iterable protocol which we'll look at in lesson 3(8)). By default, this includes the data types String, Array, Map, and Set—notably absent from this list is the Object data type (i.e. {}). Objects are not iterable, by default.

Before we look at the `for...of` loop, let’s first take a quick look at the other for loops to see where they have weaknesses.

##### The for loop
The `for` loop is obviously the most common type of loop there is, so this should be a quick refresher.
```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < digits.length; i++) {
  console.log(digits[i]);
}
```
> 0 \
1 \
2 \
3 \
4 \
5 \
6 \
7 \
8 \
9

Really the biggest downside of a `for` loop is having to keep track of the counter and exit condition.

In this example, we’re using the variable `i` as a counter to keep track of the loop and to access values in the array. We’re also using `digits.length` to determine the exit condition for the loop. If you just glance at this code, it can sometimes be confusing exactly what’s happening; especially for beginners.

While `for` loops certainly have an advantage when looping through arrays, some data is not structured like an array, so a `for` loop isn’t always an option.

##### The for...in loop
The `for...in` loop improves upon the weaknesses of the `for` loop by eliminating the counting logic and exit condition.
```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
```
>0 \
1 \
2 \
3 \
4 \
5 \
6 \
7 \
8 \
9

But, you still have to deal with the issue of using an index to access the values of the array, and that stinks; it almost makes it more confusing than before.

Also, the `for...in` loop can get you into big trouble when you need to add an extra method to an array (or another object). Because `for...in` loops loop over all enumerable properties, this means if you add any additional properties to the array's prototype, then those properties will also appear in the loop.
```js
Array.prototype.decimalfy = function() {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
```
> 0 \
1 \
2 \
3 \
4 \
5 \
6 \
7 \
8 \
9 \
function() { \
 for (let i = 0; i < this.length; i++) { \
  this[i] = this[i].toFixed(2); \
 } \
}

Gross! This is why `for...in` loops are discouraged when looping over arrays.

##### forEach
__NOTE__: The `forEach` loop is another type of for loop in JavaScript. However, `forEach()` is actually an array method, so it can only be used exclusively with arrays. There is also no way to stop or break a `forEach` loop. If you need that type of behavior in your loop, you’ll have to use a basic `for` loop.

Finally, we have the mighty `for...of` loop.

##### For...of loop
The `for...of` loop is used to loop over any type of data that is iterable.

You write a `for...of` loop almost exactly like you would write a `for...in` loop, except you swap out in with of and you can drop the index.
```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  console.log(digit);
}
```
> 0 \
1 \
2 \
3 \
4 \
5 \
6 \
7 \
8 \
9

This makes the `for...of` loop the most concise version of all the for loops.

__TIP__: It’s good practice to use plural names for objects that are collections of values. That way, when you loop over the collection, you can use the singular version of the name when referencing individual values in the collection. For example, `for (const button of buttons)` {...}.

But wait, there’s more! The `for...of` loop also has some additional benefits that fix the weaknesses of the `for` and `for...in` loops.

You can stop or break a `for...of` loop at anytime.
```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  if (digit % 2 === 0) {
    continue;
  }
  console.log(digit);
}
```
> 1 \
3 \
5 \
7 \
9

And you don’t have to worry about adding new properties to objects. The `for...of` loop will only loop over the values in the object.
```js
Array.prototype.decimalfy = function() {
  for (i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  console.log(digit);
}
```
> 0 \
1 \
2 \
3 \
4 \
5 \
6 \
7 \
8 \
9

#### 6.14 Spread Operator

The spread operator, written with three consecutive dots (`...`), is new in ES6 and gives you the ability to expand, or spread, iterable objects into multiple elements.

Let’s take a look at a few examples to see how it works.
```js
const books = ["Don Quixote", "The Hobbit", "Alice in Wonderland", "Tale of Two Cities"];
console.log(...books);
```
> Don Quixote The Hobbit Alice in Wonderland Tale of Two Cities
```js
const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
console.log(...primes);
```
> 2 3 5 7 11 13 17 19 23 29

If you look at the output from the examples, notice that both the array and set have been expanded into their individual elements. So how is this useful?

__NOTE__: _Sets_ are a new built-in object in ES6 that we’ll cover in more detail in a future lesson.

##### Combining arrays with concat
One example of when the spread operator can be useful is when combining arrays.

If you’ve ever needed to combine multiple arrays, prior to the spread operator, you were forced to use the Array’s concat() method.
```js
const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
const produce = fruits.concat(vegetables);
console.log(produce);
```
> ["apples", "bananas", "pears", "corn", "potatoes", "carrots"]

This isn’t terrible, but wouldn’t it be nice if there was a shorthand way to write this code?

For example, something like…
```js
const produce = [fruits, vegetables];
console.log(produce);
```
> [Array[3], Array[3]]

Unfortunately, that doesn’t work.

Instead of combining both arrays, this code actually adds the fruits array at the first index and the vegetables array at the second index of the produce array.

How about trying the spread operator?
```js
const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];

const produce = [...fruits,...vegetables];

console.log(produce);
```
> [ 'apples', 'bananas', 'pears', 'corn', 'potatoes', 'carrots' ]

#### 6.15 ...Rest Parameter

If you can use the spread operator to spread an array into multiple elements, then certainly there should be a way to bundle multiple elements back into an array, right?

In fact, there is! It’s called the rest parameter, and it’s another new addition in ES6.

##### Rest parameter
The rest parameter, also written with three consecutive dots ( `...` ), allows you to represent an indefinite number of elements as an array. This can be helpful in a couple of different situations.

One situation is when assigning the values of an array to variables. For example,
```js
const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);
```
> 20.17 18.67 1.5 ["cheese", "eggs", "milk", "bread"]

This code takes the values of the `order` array and assigns them to individual variables using destructuring. `total`, `subtotal`, and `tax` are assigned the first three values in the array, however, items is where you want to pay the most attention.

By using the rest parameter, items is assigned the rest of the values in the array (as an array).
```js
printPackageContent('Cheese', 'eggs', 'milk', 'bread');
function printPackageContent(...items) {
  for (const item of items) {
    console.log(item);
  }
}
```
> Cheese \
eggs \
milk \
bread

##### Variadic functions
Another use case for the rest parameter is when you’re working with variadic functions. Variadic functions are functions that take an indefinite number of arguments.

For example, let’s say we have a function called `sum()` which calculates the sum of an indefinite amount of numbers. How might the `sum()` function be called during execution?
```js
sum(1, 2);
sum(10, 36, 7, 84, 90, 110);
sum(-23, 3000, 575000);
```
There’s literally an endless number of ways the `sum()` function could be called. Regardless of the amount of numbers passed to the function, it should always return the total sum of the numbers.

##### Using the arguments object
In previous versions of JavaScript, this type of function would be handled using the `arguments` object. The `arguments` object is an array-like object that is available as a local variable inside all functions. It contains a value for each `argument` being passed to the function starting at 0 for the first `argument`, 1 for the second `argument`, and so on.

If we look at the implementation of our `sum()` function, then you’ll see how the `arguments` object could be used to handle the variable amount of numbers being passed to it.
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

If you look at the definition for the `sum()` function, it doesn’t have any parameters.
This is misleading because we know the `sum()` function can handle an indefinite amount of arguments.
It can be hard to understand.
If you’ve never used the arguments object before, then you would most likely look at this code and wonder where the arguments object is even coming from. Did it appear out of thin air? It certainly looks that way.

##### Using the rest parameter
Fortunately, with the addition of the rest parameter, you can rewrite the `sum()` function to read more clearly.
```js
function sum(...nums) {
  let total = 0;
  for(const num of nums) {
    total += num;
  }
  return total;
}
```
This version of the `sum()` function is both more concise and is easier to read. Also, notice the `for...in` loop has been replaced with the new `for...of` loop.

#### 7.2 Arrow functions

ES6 introduces a new kind of function called the arrow function. Arrow functions are very similar to regular functions in behavior, but are quite different syntactically. The following code takes a list of names and converts each one to uppercase using a regular function:
```js
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(function(name) {
  return name.toUpperCase();
});
```
The code below does the same thing except instead of passing a regular function to the `map()` method, it passes an arrow function. Notice the arrow in the arrow function ( `=>` ) in the code below:
```js
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
  name => name.toUpperCase()
);
```
The only change to the code above is the code inside the `map()` method. It takes a regular function and changes it to use an arrow function.

__NOTE__: Not sure how `map()` works? It's a method on the Array prototype. You pass a function to it, and it calls that function once on every element in the array. It then gathers the returned values from each function call and makes a new array with those results. For more info, check out MDN's documentation.

##### Convert a function to an arrow function
```js
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(function(name) {
  return name.toUpperCase();
});
```
With the function above, there are only a few steps for converting the existing "normal" function into an arrow function.

1. remove the function keyword
2. remove the parentheses
3. remove the opening and closing curly braces
4. remove the return keyword
5. remove the semicolon
6. add an arrow ( `=>` ) between the parameter list and the function body
```js
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
  name => name.toUpperCase()
);
```
#### 7.3 Using Arrow Functions

Regular functions can be either function declarations or function expressions, however arrow functions are always expressions. In fact, their full name is "arrow function expressions", so they can only be used where an expression is valid. This includes being:

* stored in a variable,
* passed as an argument to a function,
* and stored in an object's property.
One confusing syntax is when an arrow function is stored in a variable.
```js
const greet = name => `Hello ${name}!`;
```
In the code above, the arrow function is stored in the `greet` variable and you'd call it like this:
```js
greet('Asser');
```
> Hello Asser

##### Parentheses and arrow function parameteres
You might have noticed the arrow function from the `greet()` function looks like this:
```js
name => `Hello ${name}!`
```
If you recall, the parameter list appears before the arrow function's arrow (i.e. `=>`). If there's only one parameter in the list, then you can write it just like the example above. But, if there are two or more items in the parameter list, or if there are zero items in the list, then you need to wrap the list in parentheses:
```js
// empty parameter list requires parentheses
const sayHi = () => console.log('Hello Udacity Student!');
sayHi();
```
> Hello Udacity Student!
```js
// multiple parameters requires parentheses
const orderIceCream = (flavor, cone) => console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);
orderIceCream('chocolate', 'waffle');
```
> Here's your chocolate ice cream in a waffle cone.

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
__WARNING__: Everything's not all ponies and rainbows though, and there are definitely times when you might not want to use an arrow function. So before you wipe from your memory how to write a traditional function, check out these implications:

* there's a gotcha with the `this` keyword in arrow functions
  * go to the next lesson to find out the details!
* arrow functions are only expressions
  * there's no such thing as an arrow function declaration

#### 7.7 "this" and Regular Functions

To get a handle on how this works differently with arrow functions, let's do a quick recap of how this works in a standard function. If you have a solid grasp of how this works already, feel free to jump over this section.

The value of the this keyword is based completely on how its function (or method) is called. this could be any of the following:

##### 1. A new object
If the function is called with `new`:
```js
const mySundae = new Sundae('Chocolate', ['Sprinkles', 'Hot Fudge']);
```
In the code above, the value of `this` inside the Sundae constructor function is a new object because it was called with `new`.

##### 2. A specified object
If the function is invoked with `call`/`apply`:
```js
const result = obj1.printName.call(obj2);
```
In the code above, the value of `this` inside `printName()` will refer to `obj2` since the first parameter of `call()` is to explicitly set what `this` refers to.

##### 3. A context object
If the function is a method of an object:
```js
data.teleport();
```
In the code above, the value of `this` inside `teleport()` will refer to data.

##### 4. The global object or undefined
If the function is called with no context:
```js
teleport();
```
In the code above, the value of `this` inside `teleport()` is either the global object or, if in strict mode, it's `undefined`.

__TIP__: `this` in JavaScript is a complicated topic. We just did a quick overview, but for an in-depth look at how this is determined, check out [this All Makes Sense Now!](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md) from Kyle Simpson's book series [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS).

#### 7.8 "this" and Arrow Functions

With regular functions, the value of `this` is set based on how the function is called. With arrow functions, the value of `this` is based on the function's surrounding context. In other words, the value of `this` inside an arrow function is the same as the value of `this` outside the function.

Let's check out an example with `this` in regular functions and then look at how arrow functions will work.
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
> scoop added!

After running the code above, you'd think that `dessert.scoops` would be 1 after half a millisecond. But, unfortunately, it's not:
```js
console.log(dessert.scoops);
```
> 0

Can you tell why?

The function passed to `setTimeout()` is called without `new`, without `call()`, without `apply()`, and without a context object. That means the value of `this` inside the function is the global object and NOT the `dessert` object. So what actually happened was that a _new scoops variable was created_ (with a default value of `undefined`) and was then incremented (`undefined + 1` results in `NaN`):
```js
console.log(scoops);
```
> NaN

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
The code above will work because instead of using `this` inside the function, it sets the `cone` variable to `this` and then looks up the `cone` variable when the function is called. This works because it's using the value of the `this` outside the function `setTimeout()`. So if we check the number of scoops in our `dessert` right now, we'll see the correct value of 1:
```js
console.log(dessert.scoops);
```
> 1

Well that's exactly what arrow functions do, so let's replace the function passed to `setTimeout()` with an arrow function:
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
> 1

When `addScoop()` is called, the value of `this` inside `addScoop()` refers to `dessert`. Since an arrow function is passed to `setTimeout()`, it's using its surrounding context to determine what `this` refers to inside itself. So since `this` outside of the arrow function refers to `dessert`, the value of `this` inside the arrow function will also refer to `dessert`.

Now what do you think would happen if we changed the `addScoop()` method to an arrow function?
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
Yeah, this doesn't work for the same reason - arrow functions inherit their this value from their surrounding context. Outside of the `addScoop()` method, the value of `this` is the global object. So if `addScoop()` is an arrow function, the value of `this` inside `addScoop()` is the global object. Which then makes the value of `this` in the function passed to `setTimeout()` also set to the global object!

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
> Welcome Student! \
Welcome James! \
Howdy Richard!

What is all that horrible mess in the first two lines of the `greet()` function? All of that is there to provide default values for the function if the required arguments aren't provided. It's pretty ugly, though...

Fortunately, ES6 has introduced a new way to create defaults. It's called _default function parameters_.

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
> Welcome Student! \
Welcome James! \
Howdy Richard!

Wow, that's a lot less code, so much cleaner, and significantly easier to read!

To create a default parameter, you add an equal sign ( `=` ) and then whatever you want the parameter to default to if an argument is not provided. In the code above, both parameters have default values of strings, but they can be any JavaScript type!

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
> Generates a 5 x 5 grid \
Generates a 2 x 5 grid \
Generates a 2 x 3 grid \
Generates a 5 x 3 grid

The `createGrid()` function expects an array to be passed to it. It uses destructuring to set the first item in the array to the `width` and the second item to be the `height`. If the array is empty or if it has only one item in it, then the default parameters kick in and give the missing parameters a default value of 5.

There is a problem with this though, the following code will not work:
```js
createGrid(); // throws an error
```
> Uncaught TypeError: Cannot read property 'Symbol(Symbol.iterator)' of undefined

This throws an error because `createGrid()` expects an array to be passed in that it will then destructure. Since the function was called without passing an array, it breaks. But, we can use default function parameters for this!
```js
function createGrid([width = 5, height = 5] = []) {
  return `Generates a ${width} x ${height} grid`;
}
```
See that new `= []` in the function's parameter? If `createGrid()` is called without any argument then it will use this default empty array. And since the array is empty, there's nothing to destructure into `width` and `height`, so their default values will apply! So by adding `= []` to give the entire parameter a default, the following code will now work:
```js
createGrid(); // Generates a 5 x 5 grid
```
> Generates a 5 x 5 grid

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
> Your sundae has 1 scoop with Hot Fudge toppings. \
Your sundae has 2 scoops with Hot Fudge toppings. \
Your sundae has 2 scoops with Sprinkles toppings. \
Your sundae has 1 scoop with Cookie Dough toppings.

Just like the array example before, if you try calling the function without any arguments it won't work:
```js
createSundae(); // throws an error
```
> Uncaught TypeError: Cannot match against 'undefined' or 'null'.

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
> Your sundae has 1 scoop with Hot Fudge toppings.

##### Array defaults vs. object defaults
Default function parameters are a simple addition, but it makes our lives so much easier! One benefit of object defaults over array defaults is how they handle skipped options. Check this out:
```js
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) { … }
```
...with the `createSundae()` function using object defaults with destructuring, if you want to use the default value for scoops but change the toppings, then all you need to do is pass in an object with toppings:
```js
createSundae({toppings: ['Hot Fudge', 'Sprinkles', 'Caramel']});
```
Compare the above example with the same function that uses array defaults with destructuring.
```js
function createSundae([scoops = 1, toppings = ['Hot Fudge']] = []) { … }
```
With this function setup, if you want to use the default number of `scoops` but change the `toppings`, you'd have to call your function a little...oddly:
```js
createSundae([undefined, ['Hot Fudge', 'Sprinkles', 'Caramel']]);
```
Since arrays are positionally based, we have to pass `undefined` to "skip" over the first argument (and accept the default) to get to the second argument.

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
Notice the new `class` keyword right in front of `Dessert` and `IceCream`, or the new `extends` keyword in `class IceCream extends Dessert`? What about the call to `super()` inside the `IceCream`'s `constructor()` method.

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
In the code above, the `Plane` function is a constructor function that will create new `Plane` objects. The data for a specific `Plane` object is passed to the `Plane` function and is set on the object. Methods that are "inherited" by each `Plane` object are placed on the `Plane.prototype` object. Then `richardsPlane` is created with one engine while `jamesPlane` is created with 4 engines. Both objects, however, use the same `startEngines` method to activate their respective engines.

Things to note:

* the constructor function is called with the `new` keyword
* the constructor function, by convention, _starts with a capital letter_
* the constructor function controls the _setting of data on the objects that will be created_
* "inherited" methods are placed on the constructor function's `prototype` object

Keep these in mind as we look at how ES6 classeswork because, remember, ES6 classes set up all ofthis for you under the hood.

##### ES6 Classes
Here's what that same `Plane` class would look like if it were written using the new class syntax:
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
> function

That's right—it's just a function! There isn't even a new type added to JavaScript.

⚠️ Where Are All The Commas? ⚠️
Did you notice that there aren't any commas between the method definitions in the Class? Commas are not used to separate properties or methods in a Class. If you add them, you'll get a "SyntaxError of unexpected token ,"

##### Static methods
To add a static method, the keyword `static` is placed in front of the method name. Look at the `badWeather()` method in the code below.
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
See how `badWeather()` has the word `static` in front of it while `startEngines()` doesn't? That makes `badWeather()` a method that's accessed directly on the `Plane` class, so you can call it like this:

`Plane.badWeather([plane1, plane2, plane3]);`
__NOTE__: A little hazy on how constructor functions, class methods, or prototypal inheritance works? Udacity has a course on it! Check out [Object Oriented JavaScript](https://www.udacity.com/course/object-oriented-javascript--ud015).

Benefits of classes:
1. Less setup
    1. There's a lot less code that you need to write to create a function
2. Clearly defined constructor function
    1. Inside the class definition, you can clearly specify the constructor function.
3. Everything's contained
    1. All code that's needed for the class is contained in the class declaration. Instead of having the constructor function in one place, then adding methods to the prototype one-by-one, you can do everything all at once!

Things to look out for when using classes
1. Class is not magic
    1. The `class` keyword brings with it a lot of mental constructs from other, class-based languages. It doesn't magically add this functionality to JavaScript classes.
2. class is a mirage over prototypal inheritance
    1. We've said this many times before, but under the hood, a JavaScript class just uses prototypal inheritance.
3. Using classes requires the use of `new`
    1. When creating a new instance of a JavaScript class, the `new` keyword must be used

For example,
```js
class Toy {
   ...
}

const myToy1 = Toy(); // throws an error
```
> Uncaught TypeError: Class constructor Toy cannot be invoked without 'new'

but, adding the `new` keyword fixes the problem
```js
const myToy2 = new Toy(); // this works!
```
#### 7.17 Super and Extends

##### Subclasses with ES6
Now that we've looked at creating classes in JavaScript. Let's use the new `super` and `extends` keywords to extend a class.
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
Both `Tree` and `Maple` are JavaScript classes. The `Maple` class is a "subclass" of `Tree` and uses the `extends` keyword to set itself as a "subclass". To get from the "subclass" to the parent class, the `super` keyword is used. Did you notice that `super` was used in two different ways? In Maple's constructor method, `super` is used as a function. In Maple's `changeSeason()` method, `super` is used as an object!

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
Like most of the new additions, there's a lot less setup code and it's a lot cleaner syntax to create a subclass using `class`, `super`, and `extends`.

Just remember that, under the hood, the same connections are made between `functions` and `prototypes`.

`super` must be called before `this`
In a subclass constructor function, before `this` can be used, a call to the `super` class must be made.
```js
class Apple {}
class GrannySmith extends Apple {
  constructor(tartnessLevel, energy) {
    this.tartnessLevel = tartnessLevel; // `this` before `super` will throw an error!
    super(energy);
  }
}
```

#### 8.3 Symbols

Previous primite data types:
* numbers
* strings
* booleans
* null
* undefined

Symbol - a unique identifier, most often used to uniquely identify properties within an object.

A symbol is a unique and immutable data type that is often used to identify object properties.

To create a symbol, you write `Symbol()` with an optional string as its description.
```js
const sym1 = Symbol('apple');
console.log(sym1);
Symbol(apple)
```
This will create a _unique_ symbol and store it in sym1. __The description "apple" is just a way to describe the symbol, but it can’t be used to access the symbol itself__.

And just to show you how this works, if you compare two symbols with the same description...
```js
const sym2 = Symbol('banana');
const sym3 = Symbol('banana');
console.log(sym2 === sym3);
```
> false

...then the result is `false` because the description is only used to described the symbol. It’s not used as part of the symbol itself—each time a new symbol is created, regardless of the description.

Still, this can be hard to wrap your head around, so let’s use the example from the previous video to see how symbols can be useful. Here’s the code to represent the `bowl` from the example.
```js
const bowl = {
  'apple': { color: 'red', weight: 136.078 },
  'banana': { color: 'yellow', weight: 183.15 },
  'orange': { color: 'orange', weight: 170.097 }
};
```
The `bowl` contains fruit which are objects that are properties of the `bowl`. But, we run into a problem when the second `banana` gets added.
```js
const bowl = {
  'apple': { color: 'red', weight: 136.078 },
  'banana': { color: 'yellow', weight: 183.151 },
  'orange': { color: 'orange', weight: 170.097 },
  'banana': { color: 'yellow', weight: 176.845 }
};
console.log(bowl);
```
> Object {apple: Object, banana: Object, orange: Object}

Instead of adding another `banana` to the bowl, our previous `banana` is overwritten by the new `banana` being added to the bowl. To fix this problem, we can use symbols.
```js
const bowl = {
  [Symbol('apple')]: { color: 'red', weight: 136.078 },
  [Symbol('banana')]: { color: 'yellow', weight: 183.15 },
  [Symbol('orange')]: { color: 'orange', weight: 170.097 },
  [Symbol('banana')]: { color: 'yellow', weight: 176.845 }
};
console.log(bowl);
```
> Object {Symbol(apple): Object, Symbol(banana): Object, Symbol(orange): Object, Symbol(banana): Object}

By changing the `bowl`’s properties to use symbols, each property is a _unique_ Symbol and the first `banana` doesn’t get overwritten by the second `banana`.

#### 8.4 Iteration and Iterable Protocols

Before you move on, let’s spend some time looking at two new protocols in ES6:
* the iterable protocol
* the iterator protocol
These protocols aren’t built-ins, but they will help you understand the new concept of iteration in ES6, as well as show you a use case for symbols.

##### The Iterable Protocol
The iterable protocol is used for defining and customizing the iteration behavior of objects. What that really means is you now have the flexibility in ES6 to specify a way for iterating through values in an object. For some objects, they already come built-in with this behavior. For example, strings and arrays are examples of built-in iterables.
```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const digit of digits) {
  console.log(digit);
}
```
> 0 \
1 \
2 \
3 \
4 \
5 \
6 \
7 \
8 \
9

If you recall from earlier lesson 1(6), any object that is iterable can use the new `for...of` loop. Later in this lesson, you’ll also learn about _Sets_ and _Maps_ which are other examples of built-in iterables.

##### How it Works
In order for an object to be iterable, it must implement the _iterable interface_. If you come from a language like Java or C, then you’re probably familiar with interfaces, but for those of you who aren’t, that basically means that in order for an object to be _iterable_ it must contain a _default iterator_ method. This method will define how the object should be iterated.

The iterator method, which is available via the constant `[Symbol.iterator]`, is a zero arguments function that returns an _iterator_ object. An iterator object is an object that conforms to the iterator protocol.

##### The Iterator Protocol
The iterator protocol is used to define a standard way that an object produces a sequence of values. What that really means is you now have a process for defining _how an object will iterate_. This is done through implementing the `.next()` method.

##### How it Works
An object becomes an iterator when it implements the `.next()` method. The `.next()` method is a zero arguments function that returns an object with two properties:

1. `value` : the data representing the next value in the sequence of values within the object
2. `done` : a boolean representing if the iterator is done going through the sequence of values
    1. If `done` is true, then the iterator has reached the end of its sequence of values.
    2. If `done` is false, then the iterator is able to produce another value in its sequence of values.
Here’s the example from earlier, but instead we are using the array’s default iterator to step through the each value in the array.
```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrayIterator = digits[Symbol.iterator]();

console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
```
> Object {value: 0, done: false} \
Object {value: 1, done: false} \
Object {value: 2, done: false}

#### 8.5 Sets

##### A Set in Mathematics
If you think back to mathematics, a set is a collection of distinct items. For example, `{2, 4, 5, 6}` is a set because each number is unique and appears only once. However, `{1, 1, 2, 4}` is not a set because _it contains duplicate entries_ (the 1 is in there more than once!).

In JavaScript, we can already represent something similar to a mathematical set using an array.
```js
const nums = [2, 4, 5, 6];
```
However, arrays do not enforce items to be _unique_. If we try to add another 2 to `nums`, JavaScript won't complain and will add it without any issue.
```js
nums.push(2);
console.log(nums);
```
[2, 4, 5, 6, 2]
…and now `nums` is no longer a _set_ in the mathematical sense.

##### Sets
In ES6, there’s a new built-in object that behaves like a mathematical set and works similarly to an array. This new object is conveniently called a _Set_. The biggest differences between a set and an array are:

* _Sets_ are not indexed-based - you do not refer to items in a set based on their position in the set
* Items in a Set can’t be accessed individually
Basically, a Set is an object that lets you store unique items.
  * You can add items to a Set,
  * remove items from a Set,
  * and loop over a Set.
* These items can be either primitive values or objects.

##### How to Create a Set
There’s a couple of different ways to create a Set. The first way, is pretty straightforward:
```js
const games = new Set();
console.log(games);
```
> Set {}

This creates an empty Set `games` with no items.

If you want to create a Set from a list of values, you use an array:
```js
const games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);
console.log(games);
```
> Set {'Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart'}

Notice the example above automatically removes the duplicate entry `"Super Mario Bros."` when the Set is created. Pretty neat!

#### 8.6 Modifying Sets

After you’ve created a Set, you’ll probably want to add and delete items from the Set. So how do you that? You use the appropriately named, `.add()` and `.delete()` methods:
```js
const games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);

games.add('Banjo-Tooie');
games.add('Age of Empires');
games.delete('Super Mario Bros.');

console.log(games);
```
> Set {'Banjo-Kazooie', 'Mario Kart', 'Banjo-Tooie', 'Age of Empires'}

On the other hand, if you want to delete all the items from a Set, you can use the `.clear()` method.
```js
games.clear()
console.log(games);
```
> Set {}

__TIP__: If you attempt to `.add()` a duplicate item to a Set, you won’t receive an error, but the item will not be added to the Set. Also, if you try to `.delete()` an item that is not in a Set, you won’t receive an error, and the Set will remain unchanged.

`.add()` returns the Set if an item is successfully added. On the other hand, `.delete()` returns a Boolean (`true` or `false`) depending on successful deletion.

#### Working With Sets

##### Checking The Length
Once you’ve constructed your Set, there are a couple of different properties and methods you can use to work with Sets.

Use the `.size` property to return the number of items in a Set:
```js
const months = new Set(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
console.log(months.size);
```
> 12

Remember, Sets can’t be accessed by their index like an array, so you use the `.size` property instead of `.length` property to get the size of the Set.

##### Checking If An Item Exists
Use the `.has()` method to check if an item exists in a Set. If the item is in the Set, then `.has()` will return `true`. If the item doesn’t exist in the Set, then `.has()` will return `false`.
```js
console.log(months.has('September'));
```
> true

Retrieving All Values
Finally, use the `.values()` method to return the values in a Set. The return value of the `.values()` method is a `SetIterator` object.
```js
console.log(months.values());
```
> SetIterator {'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'}

More on the `SetIterator` object in a second!

__TIP__: The `.keys()` method will behave the exact same way as the `.values()` method by returning the _values_ of a _Set_ within a new `Iterator` Object. The `.keys()` method is an alias for the `.values()` method for similarity with _maps_. You’ll see the `.keys()` method later in this lesson during the _Maps_ section.

#### Sets & Iterators

The last step to working with Sets is looping over them.

If you remember back to our discussion on the new iterable and iterator protocols in ES6, then you’ll recall that Sets are built-in iterables. This means two things in terms of looping:

You can use the Set’s default iterator to step through each item in a Set, one by one.
You can use the new `for...of` loop to loop through each item in a Set.
Using the `SetIterator`
Because the `.values()` method returns a new iterator object (called `SetIterator`), you can store that iterator object in a variable and loop through each item in the Set using `.next()`.
```js
const iterator = months.values();
iterator.next();
```
> Object {value: 'January', done: false}

And if you run `.next()` again?
```js
iterator.next();
```
> Object {value: 'February', done: false}

And so on until done equals true which marks the end of the Set.

##### Using a for...of Loop
An easier method to loop through the items in a Set is the `for...of` loop.
```js
const colors = new Set(['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'brown', 'black']);
for (const color of colors) {
  console.log(color);
}
```
> red \
orange \
yellow \
green \
blue \
violet \
brown \
black

#### 8.10 WeakSet

##### What is a WeakSet?
A WeakSet is just like a normal Set with a few key differences:

1. a WeakSet can _only contain objects_
2. a WeakSet is _not iterable_ which means it can’t be looped over
3. a WeakSet _does not have a `.clear()` method_

You can create a WeakSet just like you would a normal Set, except that you use the WeakSet constructor.
```js
const student1 = { name: 'James', age: 26, gender: 'male' };
const student2 = { name: 'Julia', age: 27, gender: 'female' };
const student3 = { name: 'Richard', age: 31, gender: 'male' };

const roster = new WeakSet([student1, student2, student3]);
console.log(roster);
```
> WeakSet {Object {name: 'Julia', age: 27, gender: 'female'}, Object {name: 'Richard', age: 31, gender: 'male'}, Object {name: 'James', age: 26, gender: 'male'}}

…but if you try to add something other than an object, you’ll get an error!
```js
roster.add('Amanda');
```
> Uncaught TypeError: Invalid value used in weak set(…)

This is expected behavior because WeakSets _can only contain_ objects. But why should it only contain objects? Why would you even use a WeakSet if normal Sets can contain objects and other types of data? Well, the answer to that question has more to do with why WeakSets do not have a `.clear()` method...

##### Garbage Collection
In JavaScript, memory is allocated when new values are created and is "automatically" freed up when those values are no longer needed. This process of freeing up memory after it is no longer needed is what is known as garbage collection.

WeakSets take advantage of this by exclusively working with objects. If you set an object to `null`, then you’re essentially deleting the object. And when JavaScript’s garbage collector runs, the memory that object previously occupied will be freed up to be used later in your program.
```js
student3 = null;
console.log(roster);
```
> WeakSet {Object {name: 'Julia', age: 27, gender: 'female'}, Object {name: 'James', age: 26, gender: 'male'}}

What makes this so useful is you don’t have to worry about deleting references to deleted objects in your WeakSets, JavaScript does it for you! When an object is deleted, the object will also be deleted from the WeakSet when garbage collection runs. This makes WeakSets useful in situations where you want an efficient, lightweight solution for creating groups of objects.

The point in time when garbage collection happens depends on a lot of different factors. Check out [MDN’s documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#Garbage_collection) to learn more about the algorithms used to handle garbage collection in JavaScript.

#### 8.13 Creating & Modifying Maps

If Sets are similar to Arrays, then Maps are similar to Objects because Maps store key-value pairs similar to how objects contain named properties with values.

Essentially, a Map is an object that lets you store key-value pairs where both the keys and the values can be objects, primitive values, or a combination of the two.

##### How to Create a Map
To create a Map, simply type:
```js
const employees = new Map();
console.log(employees);
```
> Map {}

This creates an empty Map employee with no key-value pairs.

##### Modifying Maps
Unlike Sets, you can’t create Maps from a list of values; instead, you add key-values by using the Map’s .set() method.
```js
const employees = new Map();

employees.set('james.parkes@udacity.com', {
    firstName: 'James',
    lastName: 'Parkes',
    role: 'Content Developer'
});
employees.set('julia@udacity.com', {
    firstName: 'Julia',
    lastName: 'Van Cleve',
    role: 'Content Developer'
});
employees.set('richard@udacity.com', {
    firstName: 'Richard',
    lastName: 'Kalehoff',
    role: 'Content Developer'
});

console.log(employees);
```
> Map {'james.parkes@udacity.com' => Object {...}, 'julia@udacity.com' => Object {...}, 'richard@udacity.com' => Object {...}}

The `.set()` method takes two arguments. The first argument is the `key`, which is used to reference the second argument, the `value`.

To remove key-value pairs, simply use the `.delete()` method.
```js
employees.delete('julia@udacity.com');
employees.delete('richard@udacity.com');
console.log(employees);
```
> Map {'james.parkes@udacity.com' => Object {firstName: 'James', lastName: 'Parkes', role: 'Course Developer'}}

Again, similar to Sets, you can use the `.clear()` method to remove all key-value pairs from the Map.
```js
employees.clear()
console.log(employees);
```
> Map {}

__TIP__: If you `.set()` a key-value pair to a Map that already uses the same key, you won’t receive an error, but the key-value pair will _overwrite what currently exists in the Map_. Also, if you try to `.delete()` a key-value that is not in a Map, you won’t receive an error, and _the Map will remain unchanged_.

The `.delete()` method returns `true` if a key-value pair is successfully deleted from the Map object, and `false` if unsuccessful. The return value of `.set()` is the _Map object_ itself if successful.

#### 8.14 Working with Maps

After you’ve built your Map, you can use the `.has()` method to check if a key-value pair exists in your Map by passing it a _key_.
```js
const members = new Map();

members.set('Evelyn', 75.68);
members.set('Liam', 20.16);
members.set('Sophia', 0);
members.set('Marcus', 10.25);

console.log(members.has('Xavier'));
console.log(members.has('Marcus'));
```
> false \
true

And you can also retrieve values from a Map, by passing a key to the `.get()` method.
```js
console.log(members.get('Evelyn'));
```
> 75.68

#### 8.15 Looping Through Maps

You’ve created a Map, added some key-value pairs, and now you want to loop through your Map. Thankfully, you’ve got three different options to choose from:

1. Step through each _key_ or _value_ using the _Map’s default iterator_
2. Loop through each key-value pair using the new `for...of` loop
3. Loop through each key-value pair using the Map’s `.forEach()` method

##### 1. Using the MapIterator
Using both the `.keys()` and `.values()` methods on a Map will return a new iterator object called `MapIterator`. You can store that iterator object in a _new variable_ and use `.next()` to loop through each _key_ or _value_. Depending on which method you use, will determine if your iterator has access to the Map’s _keys_ or the Map’s _values_.
```js
let iteratorObjForKeys = members.keys();
iteratorObjForKeys.next();
```
> Object {value: 'Evelyn', done: false}

Use `.next()` to the get the next key value.
```js
iteratorObjForKeys.next();
```
> Object {value: 'Liam', done: false}

And so on.
```js
iteratorObjForKeys.next();
```
> Object {value: 'Sophia', done: false}

On the flipside, use the `.values()` method to access the Map’s values, and then repeat the same process.
```js
let iteratorObjForValues = members.values();
iteratorObjForValues.next();
```
> Object {value: 75.68, done: false}

##### 2. Using a for...of Loop
Your second option for looping through a Map is with a `for...of` loop.
```js
for (const member of members) {
  console.log(member);
}
```
>  ['Evelyn', 75.68] \
 ['Liam', 20.16] \
 ['Sophia', 0] \
 ['Marcus', 10.25]

However, when you use a `for...of` loop with a Map, you don’t exactly get back a _key_ or a _value_. Instead, the _key-value pair_ is split up into an array where the first element is the key and the second element is the value.

##### 3. Using a forEach Loop
Your last option for looping through a Map is with the `.forEach()` method.
```js
members.forEach((key, value) => console.log(key, value));
```
>  'Evelyn' 75.68 \
 'Liam' 20.16 \
 'Sophia' 0 \
 'Marcus' 10.25

Notice how with the help of an arrow function, the `forEach` loop reads fairly straightforward. For each `value` and `key` in members, log the `value` and key to the `console`.

#### 8.16 WeakMaps

__TIP__: If you’ve gone through the WeakSets section, then this section should be somewhat of a review. WeakMaps exhibit the same behavior as a WeakSets, except WeakMaps work with key-values pairs instead of individual items.

##### What is a WeakMap?
A WeakMap is just like a normal Map with a few key differences:

1. a WeakMap can _only contain objects_ as keys,
2. a WeakMap is _not iterable_ which means it can’t be looped and
3. a WeakMap _does not have a `.clear()` method_.

You can create a WeakMap just like you would a normal Map, except that you use the WeakMap constructor.
```js
const book1 = { title: 'Pride and Prejudice', author: 'Jane Austen' };
const book2 = { title: 'The Catcher in the Rye', author: 'J.D. Salinger' };
const book3 = { title: 'Gulliver’s Travels', author: 'Jonathan Swift' };

const library = new WeakMap();
library.set(book1, true);
library.set(book2, false);
library.set(book3, true);

console.log(library);
```
> WeakMap {Object {title: 'Pride and Prejudice', author: 'Jane Austen'} => true, Object {title: 'The Catcher in the Rye', author: 'J.D. Salinger'} => false, Object {title: 'Gulliver’s Travels', author: 'Jonathan Swift'} => true}


…but if you try to add something other than an object as a key, you’ll get an error!
```js
library.set('The Grapes of Wrath', false);
```
> Uncaught TypeError: Invalid value used as weak map key(…)

This is expected behavior because WeakMap _can only contain objects_ as keys. Again, similar to WeakSets, WeakMaps leverage garbage collection for easier use and maintainability.

Garbage Collection
In JavaScript, memory is allocated when new values are created and is "automatically" freed up when those values are no longer needed. This process of freeing up memory after it is no longer needed is what is known as garbage collection.

WeakMaps take advantage of this by exclusively working with objects as keys. If you set an object to null, then you’re essentially deleting the object. And when JavaScript’s garbage collector runs, the memory that object previously occupied will be freed up to be used later in your program.
```js
book1 = null;
console.log(library);
```
> WeakMap {Object {title: 'The Catcher in the Rye', author: 'J.D. Salinger'} => false, Object {title: 'Gulliver’s Travels', author: 'Jonathan Swift'} => true}

What makes this so useful is you don’t have to worry about deleting keys that are referencing deleted objects in your WeakMaps, JavaScript does it for you! When an object is deleted, the object key will also be deleted from the WeakMap when garbage collection runs. This makes WeakMaps useful in situations where you want an efficient, lightweight solution for creating groupings of objects with metadata.

The point in time when garbage collection happens is dependent on a lot of different factors. Check out [MDN’s documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#Garbage_collection) to learn more about the algorithms used to handle garbage collection in JavaScript.

#### 8.18 Promises

A JavaScript Promise is created with the new Promise constructor function - `new Promise()`. A promise will let you start some work that will be done asynchronously and let you get back to your regular work. When you create the promise, you must give it the code that will be run asynchronously. You provide this code as the argument of the constructor function:
```js
new Promise(function () {
    window.setTimeout(function createSundae(flavor = 'chocolate') {
        const sundae = {};
        // request ice cream
        // get cone
        // warm up ice cream scoop
        // scoop generous portion into cone!
    }, Math.random() * 2000);
});
```
This code creates a promise that will start in a few seconds after I make the request. Then there are a number of steps that need to be made in the `createSundae` function.

##### Indicate a Successful Request or a Failed Request
But once that's all done, how does JavaScript notify us that it's finished and ready for us to pick back up? It does that by passing two functions into our initial function. Typically we call these `resolve` and `reject`.

The function gets passed to the function we provide the Promise constructor - typically the word "resolve" is used to indicate that this function should be called when the request completes successfully. Notice the `resolve` on the first line:
```js
new Promise(function (resolve, reject) {
    window.setTimeout(function createSundae(flavor = 'chocolate') {
        const sundae = {};
        // request ice cream
        // get cone
        // warm up ice cream scoop
        // scoop generous portion into cone!
        resolve(sundae);
    }, Math.random() * 2000);
});
```
Now when the `sundae` has been successfully created, it calls the `resolve` method and passes it the data we want to return - in this case the data that's being returned is the completed `sundae`. So the resolve method is used to indicate that the request is complete and that it completed successfully.

If there is a problem with the request and it couldn't be completed, then we could use the second function that's passed to the function. Typically, this function is stored in an identifier called "reject" to indicate that this function should be used if the request fails for some reason. Check out the `reject` on the first line:
```js
new Promise(function (resolve, reject) {
    window.setTimeout(function createSundae(flavor = 'chocolate') {
        const sundae = {};
        // request ice cream
        // get cone
        // warm up ice cream scoop
        // scoop generous portion into cone!
        if ( /* iceCreamConeIsEmpty(flavor) */ ) {
            reject(`Sorry, we're out of that flavor :-(`);
        }
        resolve(sundae);
    }, Math.random() * 2000);
});
```
So the `reject` method is used when the request could not be completed. Notice that even though the request fails, we can still return data - in this case we're just returning text that says we don't have the desired ice cream flavor.

A Promise constructor takes a function that will run and then, after some amount of time, will either complete successfully (using the `resolve` method) or unsuccessfully (using the `reject` method). When the outcome has been finalized (the request has either completed successfully or unsuccessfully), the promise is now _fulfilled_ and will notify us so we can decide what to do with the response.

##### Promises Return Immediately
The first thing to understand is that a Promise _will immediately return an object_.
```js
const myPromiseObj = new Promise(function (resolve, reject) {
    // sundae creation code
});
```
That object has a `.then()` method on it that we can use to have it notify us if the request we made in the promise was either successful or failed. The `.then()` method takes two functions:

1. the function to run if the request completed successfully
2. the function to run if the request failed to complete
```js
mySundae.then(function(sundae) {
    console.log(`Time to eat my delicious ${sundae}`);
}, function(msg) {
    console.log(msg);
    self.goCry(); // not a real method
});
```
As you can see, the first function that's passed to `.then()` will be called and passed the data that the Promise's `resolve` function used. In this case, the function would receive the `sundae` object. The second function will be called and passed the data that the Promise's `reject` function was called with. In this case, the function receives the error message "Sorry, we're out of that flavor :-(" that the `reject` function was called with in the Promise code above.

#### 3.21 Proxies

To create a proxy object, we use the Proxy constructor - `new Proxy();`. The proxy constructor takes two items:

1. the object that it will be the proxy for
2. an object containing the list of methods it will handle for the proxied object
The second object is called the handler.

##### A Pass Through Proxy
The simplest way to create a proxy is to provide an object and then an empty handler object.
```js
var richard = {status: 'looking for work'};
var agent = new Proxy(richard, {});

agent.status; // returns 'looking for work'
```
The above doesn't actually do anything special with the proxy - it just passes the request directly to the source object! If we want the proxy object to actually intercept the request, that's what the handler object is for!

The key to making Proxies useful is the handler object that's passed as the second object to the Proxy constructor. The handler object is made up of a methods that will be used for property access. Let's look at the `get`:

##### Get Trap
The `get` trap is used to "intercept" calls to properties:
```js
const richard = {status: 'looking for work'};
const handler = {
    get(target, propName) {
        console.log(target); // the `richard` object, not `handler` and not `agent`
        console.log(propName); // the name of the property the proxy (`agent` in this case) is checking
    }
};
const agent = new Proxy(richard, handler);
agent.status; // logs out the richard object (not the agent object!) and the name of the property being accessed (`status`)
```
> {status: 'looking for work'}
'looking for work'

In the code above, the `handler` object has a `get` method (called a "trap" since it's being used in a Proxy). When the code `agent.status;` is run on the last line, because the `get` trap exists, it "intercepts" the call to get the `status` property and runs the `get` trap function. This will log out the target object of the proxy (the `richard` object) and then logs out the name of the property being requested (the `status` property). And that's all it does! It doesn't actually log out the property! This is important - _if a trap is used, you need to make sure you provide all the functionality for that specific trap._

##### Accessing the Target object from inside the proxy
If we wanted to actually provide the real result, we would need to return the property on the target object:
```js
const richard = {status: 'looking for work'};
const handler = {
    get(target, propName) {
        console.log(target);
        console.log(propName);
        return target[propName];
    }
};
const agent = new Proxy(richard, handler);
agent.status; // (1)logs the richard object, (2)logs the property being accessed, (3)returns the text in richard.status
```
> {status: 'looking for work'}
'looking for work'

Notice we added the `return target[propName];` as the last line of the `get` trap. This will access the property on the target object and will return it.

##### Having the proxy return info, directly
Alternatively, we could use the proxy to provide direct feedback:
```js
const richard = {status: 'looking for work'};
const handler = {
    get(target, propName) {
        return `He's following many leads, so you should offer a contract as soon as possible!`;
    }
};
const agent = new Proxy(richard, handler);
agent.status; // returns the text `He's following many leads, so you should offer a contract as soon as possible!`
```
With this code, the Proxy doesn't even check the target object, it just directly responds to the calling code.

So the `get` trap will take over whenever any property on the proxy is accessed. If we want to intercept calls to change properties, then the set trap needs to be used!

The `set` trap is used for intercepting code that will change a property. The `set` trap receives: the object it proxies the property that is being set the new value for the proxy
```js
const richard = {status: 'looking for work'};
const handler = {
    set(target, propName, value) {
        if (propName === 'payRate') { // if the pay is being set, take 15% as commission
            value = value * 0.85;
        }
        target[propName] = value;
    }
};
const agent = new Proxy(richard, handler);
agent.payRate = 1000; // set the actor's pay to $1,000
agent.payRate; // $850 the actor's actual pay
```
In the code above, notice that the `set` trap checks to see if the `payRate` property is being set. If it is, then the proxy (the `agent`) takes 15 percent off the top for her own commission! Then, when the actor's pay is set to one thousand dollars, since the `payRate` property was used, the code took 15% off the top and set the actual `payRate` property to 850;


##### Other Traps

So we've looked at the `get` and `set` traps (which are probably the ones you'll use most often), but there are actually a total of 13 different traps that can be used in a `handler`!

Check [All methods of a handler](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler).

1. the `get` trap - lets the proxy handle calls to property access
2. the `set` trap - lets the proxy handle setting the property to a new value
3. the `apply` trap - lets the proxy handle being invoked (the object being proxied is a function)
4. the `has` trap - lets the proxy handle the using `in` operator
5. the `deleteProperty` trap - lets the proxy handle if a property is deleted
6. the `ownKeys` trap - lets the proxy handle when all keys are requested
7. the `construct` trap - lets the proxy handle when the proxy is used with the `new` keyword as a constructor
8. the `defineProperty` trap - lets the proxy handle when `defineProperty` is used to create a new property on the object
9. the `getOwnPropertyDescriptor` trap - lets the proxy handle getting the property's descriptors
10. the `preventExtenions` trap - lets the proxy handle calls to `Object.preventExtensions()` on the proxy object
11. the `isExtensible` trap - lets the proxy handle calls to `Object.isExtensible` on the proxy object
12. the `getPrototypeOf` trap - lets the proxy handle calls to `Object.getPrototypeOf` on the proxy object
13. the `setPrototypeOf` trap - lets the proxy handle calls to `Object.setPrototypeOf` on the proxy object

As you can see, there are a lot of traps that let the proxy manage how it handles calls back and forth to the proxied object.

#### 8.22 Proxies vs. ES5 Getter/Setter

Initially, it can be a bit unclear as to why proxies are all that beneficial when there are already getter and setter methods provided in ES5. With ES5's getter and setter methods, you need to know before hand the properties that are going to be `get`/`set`:
```js
var obj = {
    _age: 5,
    _height: 4,
    get age() {
        console.log(`getting the "age" property`);
        console.log(this._age);
        return this._age;
    },
    get height() {
        console.log(`getting the "height" property`);
        console.log(this._height);
        return this._height;
    }
};
```
With the code above, notice that we have to set `get age()` and `get height()` when initializing the object. So when we call the code below, we'll get the following results:
```js
obj.age; // logs 'getting the "age" property' & 5
obj.height; // logs 'getting the "height" property' & 4
```
But look what happens when we now add a new property to the object:
```js
obj.weight = 120; // set a new property on the object
obj.weight; // logs just 120
```
Notice that a `getting the "weight" property` message wasn't displayed like the `age` and `height` properties produced.

With ES6 Proxies, we do not need to know the properties beforehand:
```js
let obj = {age: 5, height: 4};
let objHandler = {
  get(targetObj, property) {
    console.log(`getting the ${property} property`);
    console.log(targetObj[property]);
    return targetObj[property];
  }
}
const objProxy = new Proxy(obj, objHandler);

objProxy.age; // logs 'getting the age property' & 5
objProxy.height; // logs 'getting the height property' & 4
```
All well and good, just like the ES5 code, but look what happens when we add a new property:
```js
objProxy.weight = 120; // set a new property on the object
objProxy.weight; // logs 'getting the weight property' & 120
```
See that?!? A `weight` property was added to the proxy object, and when it was later retrieved, it displayed a log message!

So some functionality of proxy objects may seem similar to existing ES5 getter/setter methods. But with proxies, you do not need to initialize the object with getters/setters for each property when the object is initialized.

#### 8.23 Proxies Recap

A proxy object sits between a real object and the calling code. The calling code interacts with the proxy instead of the real object. To create a proxy:

* use the `new Proxy()` constructor
pass the object being proxied as the first item
  * the second object is a handler object
  * the handler object is made up of 1 of 13 different "_traps_"

A _trap_ is a function that will intercept calls to properties let you run code
  * if a trap is not defined, the default behavior is sent to the target object

Proxies are a powerful new way to create and manage the interactions between objects.

#### 8.24 Generators

Whenever a function is invoked, the JavaScript engine starts at the top of the function and runs every line of code until it gets to the bottom. There's no way to stop the execution of the function in the middle and pick up again at some later point. This "__run-to-completion__" is the way it's always been:
```js
function getEmployee() {
    console.log('the function has started');

    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];

    for (const name of names) {
        console.log(name);
    }

    console.log('the function has ended');
}

getEmployee();
```
Running the code above produces the following output on the console:

> the function has started \
Amanda \
Diego \
Farrin \
James \
Kagure \
Kavita \
Orit \
Richard \
the function has ended

But what if you want to print out the first 3 employee names then stop for a bit, then, at some later point, you want to continue where you left off and print out more employee names. With a regular function, you can't do this since there's no way to "pause" a function in the middle of its execution.

##### Pausable Functions
If we _do_ want to be able to pause a function mid-execution, then we'll need a new type of function available to us in ES6 - generator functions! Let's look at one:
```js
function* getEmployee() {
    console.log('the function has started');

    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];

    for (const name of names) {
        console.log( name );
    }

    console.log('the function has ended');
}
```
Notice the asterisk (i.e. `*`) right after the `function` keyword? That asterisk indicates that this function is actually a generator!

Now check out what happens when we try running this function:
```js
getEmployee();
// this is the response I get in Chrome:
```
> getEmployee {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window}

...umm, what? Where's the "the function has started" text from the top of the function? And why didn't we get any names printed to the console?

#### 8.25 Generators & Iterators

__WARNING:__ We looked at iteration in a previous section, so if you're rusty on it, better check it out again because they're resurfacing here with generators!

When a generator is invoked, it doesn't actually run any of the code inside the function. Instead, it creates and returns an iterator. This iterator can then be used to execute the actual generator's inner code.
```js
const generatorIterator = getEmployee();
generatorIterator.next();
```
Produces the code we expect:

> the function has started \
Amanda \
Diego \
Farrin \
James \
Kagure \
Kavita \
Orit \
Richard \
the function has ended

Now if you tried the code out for yourself, the first time the iterator's `.next()` method was called it ran all of the code inside the generator. Did you notice anything? The code never paused! So how do we get this magical, pausing functionality?

##### The Yield Keyword
The `yield` keyword is new and was introduced with ES6. It can only be used inside generator functions. yield is what causes the generator to pause. Let's add yield to our generator and give it a try:
```js
function* getEmployee() {
    console.log('the function has started');

    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];

    for (const name of names) {
        console.log(name);
        yield;
    }

    console.log('the function has ended');
}
```
Notice that there's now a `yield` inside the `for...of` loop. Let's invoke the generator (which produces an iterator) and then call `.next()`
```js
const generatorIterator = getEmployee();
generatorIterator.next();
```
Logs the following to the console:
> the function has started \
Amanda

It's paused! But to really be sure, let's check out the next iteration:
Logs the following to the console:
> Diego

So it remembered exactly where we left off! It took the next item in the array (Diego), logged it, and then hit the `yield` again, so it paused again.

Now pausing is all well and good, but what if we could send data from the generator back to the "outside" world? We can do this with `yield`.

##### Yielding Data to the "Outside" World
Instead of logging the names to the console and then pausing, let's have the code "return" the name and then pause.
```js
function* getEmployee() {
    console.log('the function has started');

    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];

    for (const name of names) {
        yield name;
    }

    console.log('the function has ended');
}
```
Notice that now instead of `console.log(name);` that it's been switched to `yield name;`. With this change, when the generator is run, it will "yield" the `name` back out to the function and then pause its execution. Let's see this in action:
```js
const generatorIterator = getEmployee();
let result = generatorIterator.next();
result.value // is "Amanda"

generatorIterator.next().value // is "Diego"
generatorIterator.next().value // is "Farrin"
```

##### QUIZ QUESTION
How many times will the iterator's .next() method need to be called to fully complete/"use up" the udacity generator function below:
```js
function* udacity() {
    yield 'Richard';
    yield 'James'
}
```
Answer - 3 times. \
It will be called one more time than there are yield expressions in the generator function.

The first call to `.next()` will start the function and run to the first yield. The second call to `.next()` will pick up where things left off and run to the second yield. The third and final call to `.next()` will pick up where things left off again and run to the end of the function.

#### 8.26 Sending Data into/out of a Generator

So we can get data out of a generator by using the `yield` keyword. We can also send data back into the generator, too. We do this using the `.next()` method:
```js
function* displayResponse() {
    const response = yield;
    console.log(`Your response is "${response}"!`);
}

const iterator = displayResponse();

iterator.next(); // starts running the generator function
iterator.next('Hello Udacity Student'); // send data into the generator
// the line above logs to the console: Your response is "Hello Udacity Student"!
```
Calling `.next()` with data (i.e. `.next('Richard')`) will send data into the generator function where it last left off. \
__It will "replace" the `yield` keyword with the data that you provided__.

So the `yield` keyword is used to pause a generator and used to send data outside of the generator, and then the `.next()` method is used to pass data into the generator. Here's an example that makes use of both of these to cycle through a list of names one at a time:
```js
function* getEmployee() {
    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];
    const facts = [];

    for (const name of names) {
        // yield *out* each name AND store the returned data into the facts array
        facts.push(yield name);
    }

    return facts;
}

const generatorIterator = getEmployee();

// get the first name out of the generator
let name = generatorIterator.next().value;

// pass data in *and* get the next name
name = generatorIterator.next(`${name} is cool!`).value;

// pass data in *and* get the next name
name = generatorIterator.next(`${name} is awesome!`).value;

// pass data in *and* get the next name
name = generatorIterator.next(`${name} is stupendous!`).value;

// you get the idea
name = generatorIterator.next(`${name} is rad!`).value;
name = generatorIterator.next(`${name} is impressive!`).value;
name = generatorIterator.next(`${name} is stunning!`).value;
name = generatorIterator.next(`${name} is awe-inspiring!`).value;

// pass the last data in, generator ends and returns the array
const positions = generatorIterator.next(`${name} is magnificent!`).value;

// displays each name with description on its own line
positions.join('\n');
```
> "Amanda is cool! \
Diego is awesome! \
Farrin is stupendous! \
James is rad! \
Kagure is impressive! \
Kavita is stunning! \
Orit is awe-inspiring! \
Richard is magnificent!"

Generators are a powerful new kind of function that is able to pause its execution while also maintaining its own state. Generators are great for iterating over a list of items one at a time so you can handle each item on its own before moving on to the next one. You can also use generators to handle nested callbacks. For example, let's say that an app needs to get a list of all repositories and the number of times they've been starred. Well, before you can get the number of stars for each repository, you'd need to get the user's information. Then after retrieving the user's profile the code can then take that information to find all of the repositories.

Generators will also be used heavily in upcoming additions to the JavaScript language. One upcoming feature that will make use of them is [async functions](https://github.com/tc39/ecmascript-asyncawait).

#### 9.2 Old and New Browsers

##### Code doesn't work in old browsers
The code we've been looking at in this course is not supported by older browsers. Older browsers that were developed prior to the release of ES6 were developed to support the version of JavaScript at the time (which was ES5.1). If you try running any ES6 code in an older browser, it won't work.

![Alt text](https://d17h27t6h515a5.cloudfront.net/topher/2017/April/59012473_ud356-l4-es6-code-safari-error/ud356-l4-es6-code-safari-error.png)

_An arrow function runs and causes a syntax error in a Safari 9_

It makes sense that code doesn't work in older browsers that were developed prior to the release of ES6, but there are some browsers that have been released after ES6 that don't support the new JavaScript syntax and functionality yet.

Try using an arrow function in your code and opening it up in IE 11, and it won't work. There'll be an error on the console saying that it doesn't recognize the syntax.

![Alt text](https://d17h27t6h515a5.cloudfront.net/topher/2017/April/59012490_ud356-l4-es6-code-ie-error/ud356-l4-es6-code-ie-error.png)

_An arrow function runs and causes a syntax error in a IE11_

Most of us don't think much about the browser and all it can do...until it doesn't work! But really, browser makers have a tough time. Think about HTML, CSS, and JavaScript - these languages are fluid and are always improving. Browser makers have to keep up with all of these changes.

But how do they know about these changes?

They learn (or actually build) the language specifications!

Just like the [World Wide Web Consortium (W3C)](https://www.w3.org/) is the standards body for things like HTML, CSS, and SVG, [Ecma International](https://www.ecma-international.org/) is an industry association that develops and oversees standards like JavaScript and JSON. You can find the specifications for ES6 [here](http://www.ecma-international.org/ecma-262/6.0/index.html).

Further info
Ecma International is an important industry community and definitely worth checking out in more detail:

* https://en.wikipedia.org/wiki/Ecma_International
* http://www.ecma-international.org/memento/index.html

__NOTE__: The code we've been looking at in this course is not supported by older browsers. Older browsers that were developed prior to the release of ES6 were developed to support the version of JavaScript at the time (which was ES5.1). If you try running any ES6 code in an older browser, it won't work.

#### 9.4 Supported Features

With new language specifications coming out every year and with browsers updating every other month, it can be quite challenging to know what browser supports which language features. Each browser maker (except for Safari) has a website that tracks its development status. Checkout the platform feature updates for each browser:

* Google Chrome - https://www.chromestatus.com/features#ES6
* Microsoft Edge - https://developer.microsoft.com/en-us/microsoft-edge/platform/status/?q=ES6
* Mozilla Firefox - https://platform-status.mozilla.org/

__NOTE__: Safari doesn't have it's own platform status website. Under the hood, though, Safari is powered by the open source browser engine, Webkit. The status for Webkit features can be found [here](https://webkit.org/status/).

This can be a lot of information to track down. If you prefer a birdseye view of all the feature support for all JavaScript code, check out the ECMAScript Compatibility Table built by [@kangax](https://twitter.com/kangax):

* http://kangax.github.io/compat-table/es6/

![Alt text](https://d17h27t6h515a5.cloudfront.net/topher/2017/January/5888ff26_es6-compatibility-tables/es6-compatibility-tables.png)

_Compatibility table of browser support for ECMAScript features._

#### 9.6 Polyfills

##### What is a polyfill?
A polyfill, or polyfiller, is a piece of code (or plugin) that provides the technology that you, the developer, expect the browser to provide natively.

Coined by [Remy Sharp](https://twitter.com/rem) - https://remysharp.com/2010/10/08/what-is-a-polyfill

We, as developers, should be able to develop with the HTML5 APIs, and scripts can create the methods and objects that should exist. Developing in this future-proof way means as users upgrade, your code doesn't have to change but users will move to the better, native experience cleanly. From the HTML5 Boilerplate team on polyfills - https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills

##### Further research:
https://en.wikipedia.org/wiki/Polyfill

##### An example polyfill
The code below is a polyfill for the new ES6 String method, `startsWith()`:
```js
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}
```
As you can see, a polyfill is just regular JavaScript.

This code is a simple polyfill (check it out on MDN), but there's also a significantly more robust one, [here](https://github.com/mathiasbynens/String.prototype.startsWith/blob/master/startswith.js)

#### 9.9 Other Uses for Polyfills

##### Polyfills aren't only for patching missing JavaScript features
JavaScript is the language used to create a polyfill, but a polyfill doesn't just patch up missing JavaScript features! There are polyfills for all sorts of browser features:

* SVG
* Canvas
* Web Storage (local storage / session storage)
* Video
* HTML5 elements
* Accessibility
* Web Sockets
* and many more!

For a more-complete list of polyfills, check out [this link](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)

#### 9.11 Transpiling Using Babel

__Transpiling__ - convertion of one language to another, i.e. ES6 to ES5.

The most popular JavaScript transpiler is called [Babel](https://babeljs.io/).

Babel's original name was slightly more descriptive - 6to5. This was because, originally, Babel converted ES6 code to ES5 code. Now, Babel does a lot more. It'll convert ES6 to ES5, JSX to JavaScript, and Flow to JavaScript.

Before we look at transpiling code on our computer, let's do a quick test by transpiling some ES6 code into ES5 code directly on the Babel website. Check out [Babel's REPL](http://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015) and paste the following code into the section on the left:
```js
class Student {
  constructor (name, major) {
    this.name = name;
    this.major = major;
  }

  displayInfo() {
    console.log(`${this.name} is a ${this.major} student.`);
  }
}

const richard = new Student('Richard', 'Music');
const james = new Student('James', 'Electrical Engineering');
```

![Alt text](https://d17h27t6h515a5.cloudfront.net/topher/2017/January/5888fc24_babel-es6-to-es5/babel-es6-to-es5.png)

_ES6 code on the left that's being transpiled to ES5 code on the right._

##### Transpiling project locally
If you check in (clone) the [repo for this project](https://github.com/udacity/course-es6s), inside the Lesson 4 directory is a little project that's all set up for transpiling ES6 code to ES5 code. There's an "ES6" directory that contains the ES6 code we'll be transpiling (using Babel) to ES5 code that will be able to run in every browser.

![Alt text](https://d17h27t6h515a5.cloudfront.net/topher/2017/January/5888fd20_es6-code-in-project/es6-code-in-project.png)

_Code editor with ES6 code that will be transpiled._

The way Babel transforms code from one language to another is through plugins. There are plugins that transform ES6 arrow functions to regular ES5 functions (the [ES2015 arrow function plugin](http://babeljs.io/docs/plugins/transform-es2015-arrow-functions/)). There are plugins that transform ES6 template literals to regular string concatenation (the [ES2015 template literals transform](http://babeljs.io/docs/plugins/transform-es2015-template-literals/)). For a full list, check out [all of Babel's plugins](http://babeljs.io/docs/plugins/).

Now, you're busy and you don't want to have to sift through a big long list of plugins to see which ones you need to convert your code from ES6 to ES5. So instead of having to use a bunch of individual plugins, Babel has presets which are groups of plugins bundled together. So instead of worrying about which plugins you need to install, we'll just use the [ES2015 preset](http://babeljs.io/docs/plugins/preset-es2015/) that is a collection of all the plugins we'll need to convert all of our ES6 code to ES5.

You can see that the project has a `.babelrc` file. This is where you'd put all of the plugins and/or presets that the project will use. Since we want to convert all ES6 code, we've set it up so that it has the ES2015 preset.

![Alt text](https://d17h27t6h515a5.cloudfront.net/topher/2017/January/5888fdb4_es6-preset-in-project/es6-preset-in-project.png)

_Code editor with `.babelrc` file that has ES2015 preset listed._

__WARNING__: Babel uses both [Node](https://nodejs.org/) and [NPM](https://www.npmjs.com/) to distribute its plugins. So before you can install anything, make sure you have both of these tools installed:

Install [Node](https://nodejs.org/) (which will automatically install NPM)

#### Babel installation

Babel installation following instructions can be found [here](http://babeljs.io/docs/setup/#installation) - choose CLI option.

Remember that your `package.json` and `.babalrc` files are already configured.

Briefly you need to perform following steps:
* open a terminal
* navigate to "walk-through-transpiling" folder
* execute `npm install --save-dev babel-cli`
* execute `npm install --save-dev babel-preset-es2015`

##### Babel Usage

Now you can use Babel locally:
* open a terminal
* navigate to "walk-through-transpiling" folder
* execute `npm run build`

Result of a transpiling can be found in "walk-through-transpiling/ES5"

#### 9.13 Transpiling Recap

__NOTE__: As of the creation of this course (circa Winter 2016), most of ES6 is supported by the current set of browsers. But that's "most", not "all", unfortunately. And that's also referring to "current" browsers. There are plenty of older browsers that do not support many, if any, of the new ES6 additions. However, it is safe to say that pretty much every browser supports the previous version of the language (ES5.1).

##### Transpiling Recap
It's important to stay on top of all the changes JavaScript is going through. The best way to do that is to start making use of the new features that are added. The problem is that not all browsers support these new features. So to have your cake and eat it too, you can write in ES6 and then use a transpiler to convert it to ES5 code. This lets you transform your project's code base to the newest version of the language while still letting it run everywhere. Then, once all of the browsers your app has to run on fully support ES6 code, you can stop transpiling your code and just serve the straight ES6 code, directly!

