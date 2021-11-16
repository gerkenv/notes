# Date Time

## Intl
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

### Options
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options

### Example 1
```js
let date = new Date("Nov 25 2019 12:34:56 GMT+0100");
let options = { timezone: "Europe/Berlin", day: 'numeric', weekday: 'long', month: 'numeric', year: 'numeric'};
console.log(new Intl.DateTimeFormat('en-US', options).format(date));
console.log(new Intl.DateTimeFormat('de-DE', options).format(date));
```
> Monday, 11/25/2019 \
> Montag, 25.11.2019

### Example 2
```js
let date = new Date("Tue Nov 25 2019 12:34:56 GMT+0100");
let options = { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'numeric', 
  day: 'numeric', 
  hour: 'numeric', 
  minute: 'numeric'
};
// berlin time in DE format
console.log(new Intl.DateTimeFormat('de-DE', {...options, timeZone: "Europe/Berlin", }).format(date));
// berlin time in US format
console.log(new Intl.DateTimeFormat('en-US', {...options, timeZone: "Europe/Berlin", }).format(date));
// los-angeles time in US format
console.log(new Intl.DateTimeFormat('en-US', {...options, timeZone: "America/Los_Angeles"}).format(date));
// sydney time in AU format
console.log(new Intl.DateTimeFormat('en-AU', {...options, timeZone: 'Australia/Sydney'}).format(date));
```
> Montag, 25.11.2019, 12:34 \
> Monday, 11/25/2019, 12:34 PM \
> Monday, 11/25/2019, 3:34 AM \
> Monday, 25/11/2019, 10:34 pm 

### All Timezones
https://stackoverflow.com/questions/38399465/how-to-get-list-of-all-timezones-in-javascript/54500197

## Moment.js Alternatives
- https://medium.com/swlh/best-moment-js-alternatives-5dfa6861a1eb
- https://vhudyma-blog.eu/the-best-momentjs-alternatives/
