# React

## React.js: The Documentary (Must watch for framework devs)
- https://www.youtube.com/watch?v=8pDqJVdNa44&t=415s&ab_channel=Honeypot

## React. Custom Reconsiler
- https://www.youtube.com/watch?v=CGpMlWVcHok
    - build PDF, json, xml, or any strange data model that you can imagine, with react.

## React Class Component Long-Term Support
- https://www.robinwieruch.de/react-class-component-deprecated

## display name

https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md

Taken from: https://stackoverflow.com/questions/43356073/how-to-set-displayname-in-a-functional-component-react
```js
// React either needs displayName for functional components when they're defined as arrow functions, or the name of the function itself.
// So for arrow functions:
const SomeComponent = () => <p>I come from an arrow function</p>
SomeComponent.displayName = 'HeyHey'

// If you use a function, it'll use its name as displayName without having to define it separately:
function HeyHey() { return <p>I come from a non-arrow function!</p> }
```

## React.memo
https://reactjs.org/blog/2018/10/23/react-v-16-6.html

If your component renders the same result given the same props, you can wrap it in a call to React.memo for a performance boost in some cases by memoizing the result. This means that React will skip rendering the component, and reuse the last rendered result.

React.memo only checks for prop changes. If your function component wrapped in React.memo has a `useState`, `useReducer` or `useContext` Hook in its implementation, it will still rerender when state or context change.

## RenderToNodeStream
### Research `renderToString` vs `renderToNodeStream`
- https://stackoverflow.com/questions/47572243/react-v16-hydrate-and-rendertonodestream-vs-render-and-rendertostring
Opinion, no prof: stream will be more performant after 10mb

- https://stackoverflow.com/questions/64883004/what-are-benefits-of-rendertonodestream-vs-rendertostring
Outlines benefits of streaming compared to sending whole html as one chunk.

- https://medium.com/expedia-group-tech/profiling-react-server-side-rendering-to-free-the-node-js-event-loop-7f0fe455a901
Performance research.
renderToNodeStream can reduce the event loop lag thus improve over-all performance.

## React Lifecycle Diagram
https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

## React Context
- official docs https://reactjs.org/docs/context.html
- better intro https://www.freecodecamp.org/news/react-context-for-beginners/

```ts
import React, { createContext, useContext } from "react";

interface ContextValue {
  someText: string;
  someFunction: (value: number) => number;
}

const Context = createContext<ContextValue>({
  someText: "default text",
  someFunction: (value: number) => value,
});

```ts
interface ContextValue {
  someText: string;
  someFunction: (value: number) => number;
}
const defaultContext = {
  someText: "default text",
  someFunction: (value: number) => value,
};

const ExampleContext = createContext<ContextValue>(defaultContext);

const ExampleComponent: React.FC = () => {
  const contextValue = useContext(ExampleContext);

  return (
    <div>
      {contextValue.someText} and {contextValue.someFunction(3)}
    </div>
  );
};

const customContext: ContextValue = {
  someText: "custom text",
  someFunction: (value: number) => value + 10,
};

const App: React.FC = () => {
  return (
    <>
      {/* option 1. if a context is used outside of a provider with a custom value then default
      context value is used */}
      <ExampleComponent />

      {/* option 2. provider can supply a custom value for a context */}
      <ExampleContext.Provider value={customContext}>
        <ExampleComponent />
      </ExampleContext.Provider>
    </>
  );
};

export default App;
```

### React Context. How To Use Default Value
- https://stackoverflow.com/questions/49949099/react-createcontext-point-of-defaultvalue
```ts
const App: React.FC = () => {
  return (
    <>
      {/* option 1. if a context is used outside of a provider with a custom value then default
      context value is used */}
      <ExampleComponent />

      {/* option 2. provider can supply a custom value for a context */}
      <ExampleContext.Provider value={customContext}>
        <ExampleComponent />
      </ExampleContext.Provider>
    </>
  );
};
```

## React Context. Is is a singleton?
https://medium.com/@anchen.li/is-react-context-singleton-4c8756b8ad4e

## React Context. How To Avoid 2 Instances When Using Context In Multiple Bundles
Extract an instance of a certain react context into a single package
- https://stackoverflow.com/questions/68639919/make-library-chunks-share-the-same-react-context-with-webpack
