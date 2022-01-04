# React
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
