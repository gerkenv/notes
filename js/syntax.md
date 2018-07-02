# JS

### Strict Mode
Always place it in the beginning of the file or the world will collapse.
```js
'use strict'
```

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

### Faulsy Values
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
let text = String('text');
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
    identation is included also.`;
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
part 1 ${10}     part 2 ${20}`    // you don't need paranthesis around the template
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
[1,0,NaN,-Infinity,Infinity.sort(); // Sort in ascending lexicographical order using
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

https://www.hackerrank.com/challenges/js10-class/topics

### Mathematic Operation
```js
console.log(Math.pow(2, 3));  // > 8
console.log(Math.sqrt(16));   // > 4
console.log(Math.random());   // returns random number between 0 and 1
console.log(Math.ceil(0,5));  // > 1
console.log(Math.floor(0,5)); // > 0

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
