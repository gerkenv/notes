# Typescript

## Official Docs. Creating Types From Types
- https://www.typescriptlang.org/docs/handbook/2/types-from-types.html

## Official Docs. Cheat Sheet
- https://www.typescriptlang.org/cheatsheets

## Courses
- https://www.totaltypescript.com/
- Learning. Basic course https://www.executeprogram.com/courses/typescript-basics
- Learning. Advanced course https://www.executeprogram.com/courses/advanced-typescript/
- Best practices. Everyday typescript https://www.executeprogram.com/courses/everyday-typescript

## Collection Of Typescript Tricks
- https://catchts.com/

## Challenges
https://github.com/type-challenges/type-challenges

## `infer`
- https://dev.to/aexol/typescript-tutorial-infer-keyword-2cn
- https://blog.logrocket.com/understanding-infer-typescript/

## Extract Type From A union 
- https://stackoverflow.com/questions/64527150/in-typescript-how-to-select-a-type-from-a-union-using-a-literal-type-property

## Get Size Of A Union As A Type
- https://www.peterkroener.de/wie-gross-ist-meine-typescript-union/
- https://www.typescriptlang.org/play?ts=4.1.0-dev.20200924#code/C4TwDgpgBAqgdgSwPZwCpIJJ2BATgZwgGNhk4AeVAPigF4AoKJqAClSggA8c4ATfKAEM4IKAH5WnAFxRUASjo1homXAgA3PAq49+jZi2lQEcAGZ4oAJQW0lI8VaiqNeevVCRYiFOgBiAVzgSMnIYGlovMnQsHAJiUhRyfSYYDm4IPgFlZOYmCRZTGRgbGnUkBF4c3OdNXCoAbjcPaHgopFR-MAAbCFDwnNafJACghIowtN0BFhZBGRNzXCgAQRKoMoq5KuYJAG0AOkPBtHbOnvIAUU4iLv9eXpgAGhWqKmflgF1tphldj8b3OBoABlBAALwgAHlTMcoJRwpEhh1ur1qLsAEQ9OAAc2AAAt0f8mkCrBB8P4usA6FBQRDocdyAAmADMUAAPlAACyM9lQACMzOZAHYqPQAPRi0nkynGfBU5lAA

## Type Aliases
- https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases

## Mapped Types
- https://www.typescriptlang.org/docs/handbook/2/mapped-types.html

## Generics
- https://www.typescriptlang.org/docs/handbook/2/generics.html

- Generic Function Parameter
    - https://betterprogramming.pub/typescript-generic-objects-1eecc13dca93
- Can You Specify Multiple Type Constraints For TypeScript Generics
    - https://stackoverflow.com/questions/17125764/can-you-specify-multiple-type-constraints-for-typescript-generics

## TS in 5 minutes
https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html

## Extract Object Values As Type Union
```ts
export type Values<T> = T[keyof T];
```

## Recommended Base Configurations
https://github.com/tsconfig/bases#centralized-recommendations-for-tsconfig-bases

## Configuration Options
https://www.typescriptlang.org/tsconfig#target

## Ignore Errors In A Whole File
https://stackoverflow.com/questions/55632954/ignore-all-errors-in-a-typescript-file
Add at the top of the file.
```ts
// @ts-nocheck
```

## Variable Assignment By Nested Destructuring
```ts
interface B{
  b1: number;
  b2: number;
}

interface A {
  b: B,
  c: string
}

const a: A = {
  b: {
    b1: 1,
    b2: 2
  },
  c: 'c1'
};

const { c, b: { b1 }} = a;

// a.c
console.log(c);  // 'c1'
// a.b.b1
console.log(b1); // 1
// a.b
console.log(b);  // b is not defined, but ...
```
... if we add one more variable declaration, we can unpack `b` as well.
```ts
const { c, b, b: { b1 }} = a;

console.log(c);  // 'c1'
console.log(b1); // 1
console.log(b);  // {"b1": 1, "b2": 2}
```

## Convert Optional To Defined
```ts
interface OptionalChild {
  someDigit: number;
}
interface SomeObject {
  optionalChild?: OptionalChild;
}
var someObject: SomeObject = {};

const definedChild: OptionalChild = ((someObject: SomeObject) => {
  // const optionalChild = someObject.optionalChild;
  if (someObject.optionalChild == undefined) {
    throw "ups";
  }
  return someObject.optionalChild;
})(v1);
```

## Library Is Missing Types Definition
https://github.com/microsoft/TypeScript-Node-Starter#what-if-a-library-isnt-on-definitelytyped


## Public And Private Properties
```ts
class Example {
  publicByDefaultText: string;
  private explicitPrivateText: string;
 
  constructor(
    text: string, 
    private privateText: string = "hiddenText", 
    anotherPrivateText: string = "anotherHiddenText"
  ) {
    this.publicByDefaultText = text;
    this.explicitPrivateText = anotherPrivateText;
  }
 
  logProperties() {
    console.log(
      "this.publicByDefaultText: " + this.publicByDefaultText + "\n" 
      + "this.privateText: " + this.privateText + "\n"
      + "this.explicitPrivateText: " + this.explicitPrivateText
    );
  }
}
 
let example = new Example("text");
example.logProperties();
console.log(example.publicByDefaultText)
console.log(example.privateText) // TS will complain during compilation, but in runtime property value can be accessed !!!
console.log(example.explicitPrivateText) // TS will complain during compilation, but in runtime property value can be accessed !!!
```
## Conditional Types
https://www.typescriptlang.org/docs/handbook/2/conditional-types.html

```ts
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
 
type Example1 = Dog extends Animal ? number : string;
        
// type Example1 = number
 
type Example2 = RegExp extends Animal ? number : string;
        
// type Example2 = string
```
