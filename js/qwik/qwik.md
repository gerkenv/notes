# Qwik
https://qwik.builder.io/

## 2022.12 JavaScript Frameworks - Heading into 2023
https://dev.to/this-is-learning/javascript-frameworks-heading-into-2023-nln

## 2022.03 Conquering JavaScript Hydration
https://dev.to/this-is-learning/conquering-javascript-hydration-a9f

## Tutorial
https://qwik.builder.io/tutorial/welcome/overview/

## Tricky Parts. $ Sign (Used For Code Splitting)
https://qwik.builder.io/docs/advanced/dollar/

## Getting Started. Setup
https://qwik.builder.io/docs/getting-started/

## Qwik City. Routing
https://qwik.builder.io/qwikcity/overview/

## Resumable vs. Hydration
https://qwik.builder.io/docs/concepts/resumable/

## 2022.09 Qwik-ifying React SPA to create the fastest possible website
https://www.youtube.com/watch?v=dbxP9FX5j2o 

## 2022.10 Intro to Qwik: A superfast JavaScript framework
https://www.infoworld.com/article/3676577/intro-to-qwik-a-superfast-javascript-framework.html

## 2022.12 How to extract a handler
```js
import { component$, $ } from '@builder.io/qwik';

// export is obligatory here
export const onClick1 = $(() => alert('Hello World!'));

export default component$(() => {
  return <button onClick$={onClick1}>Click Me</button>; 
});
```
or
```
import { component$, $, useOn } from '@builder.io/qwik';

const onClick1 = $(() => alert('Hello World!'));

export default component$(() => {
  useOn(
    'click',
    onClick1
  );
 return <button>Click Me</button>;
});
```

## 2021.12 [Partially Obsolete] Old Qwik Demo App
https://stackblitz.com/edit/qwik-todo-demo-dsts1f?file=server.ts

## 2021.12 [Syntax Is Obsolete, But Main Ideas Are Still The Same] Qwik Overview In 8 Blog Post

### part 1. https://dev.to/builderio/a-first-look-at-qwik-the-html-first-framework-af
- nodejs demo app https://stackblitz.com/edit/qwik-todo-demo?file=README.md
    - small initial size: html, css and 1kb of js by default
    - event handlers are loaded on interactions only
        - awesome setup for a later optimization
            - it is possible to gather general statistic from CDN which handlers or views are used (downloaded) most often  - and ship those with default chunks
            - it is possible to gather personal statistic in a certain browser to ship bundles (handlers, views) that a certain user mostly uses.

### part 2. https://dev.to/builderio/death-by-closure-and-how-qwik-solves-it-44jj
- how to get fastest TTI - Remove hydration and initial JS loading.

### part 3. https://dev.to/builderio/html-first-javascript-last-the-secret-to-web-speed-4ic9
- the state is kept in the DOM in the form of attributes. No need to load it in memory to update the state on the client.
- state has an instance id. Each component is marked with an attribute of a state it depends on (what can cause a re-render).
- component re-rendering is marked in the DOM in the form of attributes
- re-rendering queue is also in the dom in form of an attribute
- Resumability of applications is the obvious benefit of storing all framework state in DOM elements.
- Skipping rendering for components which are outside of the visible viewport.

### part 4. https://dev.to/builderio/qwik-the-answer-to-optimal-fine-grained-lazy-loading-2hdp
- serialize event name and event action as URL into the DOM attribute. A top-level global event handler can then listen to events and download the code associated with the event
- to ensure that the first interaction does not cause a full application download and bootstrap, it is necessary to rehydrate the components asynchronously and out of order 
- serialization of component state
- serialization of app/shared state
- reactive connections between app state and components to minimize re-rendering
- component isolation - to know that the component needs to be rehydrated/rendered all components need to list their dependencies in the component's properties explicitly.

### part 5. https://dev.to/builderio/how-to-score-100-on-google-pagespeed-insights-on-mobile-2e0i
- how renderer only HTML above the fold (and since the state is in the dom and handlers are pulled on demand -  it is interactive)
    - example page https://www.builder.io/?render=qwik (initially html is rendered up to `Measure and analyze engagement to guide your content and digital strategies`) - whole page is interactive, and lower part of html is rendered when you scroll to bottom
- third-party scripts
    - inline statically rendered html
    - on interaction pull the code and replace with JS and create interactive widget
    - use party-town

### part 6. https://dev.to/builderio/your-bundler-is-doing-it-wrong-ic0
- Very nice blog explaining code splitting by default in qwik.
    - Point is that when we write code we have no idea what the final bundles should look like and, therefore, don't have sufficient information to decide where to put the dynamic imports. On the other hand, by the time we collect sufficient data on what ideal chunks should look like the source code is already written. Inserting dynamically imports retroactively may be a huge undertaking
    - Qwik guides the developer to break up the application into the smallest possible chunks, and then rely on tooling to find the optimal bundle chunks. This way Qwik can provide optimal performance for applications of all sizes
    - by default, split code into view, handlers and state 
        - __you don't need all of it all the time__
            - code splitting by default - to enable configurable bundle management later when you know how a user uses your code

### part 7. https://dev.to/builderio/how-we-cut-99-of-our-javascript-with-qwik-partytown-3i3k
  - core web vitals comparison between next.js and qwik in builders.io page
  - small summary of all above

