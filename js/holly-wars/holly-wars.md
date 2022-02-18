# Holly Wars

## `null` vs `undefined`

### Some Opinios
#### For `undefined` Instad Of Both
https://basarat.gitbook.io/typescript/recap/null-undefined#final-thoughts
https://www.youtube.com/watch?v=NPB34lDZj3E#t=12m23s

#### For Using `null` To Explicetely Set A Detectable Absence Of A Value
https://www.geeksforgeeks.org/undefined-vs-null-in-javascript/#:~:text=Definition%3A,not%20exist%20in%20the%20compiler
https://github.com/DavidBruant/ECMAScript-regrets/issues/26
https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/ch2.md#special-values

#### For A Single Value Instead Of Both
https://github.com/DavidBruant/ECMAScript-regrets/issues/29

### Deep Dive
https://2ality.com/2021/01/undefined-null-revisited.html#the-ecmascript-language-specification-on-undefined-vs.-null

### JS Design Flaws
- `String.prototype.match` returns `null` when there is no match.
- [`undefined` is a global object that can be mutated](https://2ality.com/2013/04/check-undefined.html)
- `typeof null = 'object'`
