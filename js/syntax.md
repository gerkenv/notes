# JS

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
text = `Some ${text}`;
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


### Arrays
```js
let array = ['1', '2', '3', '4'];
console.log('first element is ', a[0]);
console.log('last element is ', a[a.length - 1]);
array.push(5);                      // Append 3 to the end of the array
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

### Classes
```js
function Person(firstName, lastName, age) { // create an object  - option # 3
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.getFirstName = getPersonFirstName; // use external fun. as method [1/2]
    this.getAge = () => this.age;           // define methode with fun.exp.
}
function getPersonFirstName() { return this.firstName; }  // use external fun. [2/2]
let chuck = new Person('Chuck', 'Norris', 'iternal');
console.log(chuck);
console.log(chuck.getAge());
console.log(chuck.getFirstName());

Person.prototype.getLastName = () => this.lastName;
console.log(chuck.getLastName());
```