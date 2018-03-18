### Backbone Demo Application

#### Required Initial Software

1. Git
2. Git Bash
3. Npm

#### 2.3 Setup

1. Get a local copy of a project repository:
```
git clone https://github.com/gerkenv/FEF-UdaciMeals-Backbone
```
2. Install bower from [bower.io](bower.io)

3. Go to a project directory and run:
```
bower install
```
4. Clone a server repository:
```
git clone https://github.com/gerkenv/FEF-UdaciMeals-Backbone-Server
```
5. Go to a server directory and run:
```
cd ./binaries
./server_windows_amd64.exe --www=projectDirectory
```
Where `projectDirectory` is a path to project folder like `../../FEF-UdaciMeals-Backbone` - above example is valid if the server folder and the project folder located together in the same folder.

#### 2.5 Constructor Functions

Literal format has more benefits than constructor format:
* It is more readable
* It is faster

```js
var obj1 = {};  // A new object via Object literal
var arr1 = [];  // A new array via Array literal
var func1 = function() {};  // A new function via Function literal

var obj2 = new Object();  // A new object via Object constructor
var arr2 = new Array();  // A new array via Array constructor
var func2 = new Function() {};  // A new function via Function constructor
```

##### Function Constructor

But a construction function has one benefit over a function literal - it can __dynamically create a function at runtime__.

```js
// Literal function format:
var adder1 = function(num1, num2) {
  return num1 + num2;
}

// Constructor function format:
var adder2 = new Function("num1", "num2", "return num1 + num2");
```

This constructor can be used inside of another function which is returning a new function instanses:
```js
function make(adjective) {
  return new Function('noun', "return noun[0].toUpperCase() + noun.slice(1) + ' is " + adjective + "!'");
}

var isFun = make('fun');

isFun('biking');  // 'Biking is fun'
isFun('climbing');  // 'Climbing is fun'
isFun('brocolli');  // 'Broccoli is fun'

// If you need to use a created function only once then a call can be performed in this way:
make('cool')('rain'); // 'Rain is cool'
```

#### 2.6 Constructor Function Quiz

1. Solution without the _string concantenation_
```js
function numLetters(letter) {
    return new Function("number", "\
        if (number === 0) return ''; \
        number = Math.round(number); \
        let output = ''; \
        while(number--) output += '" + letter + "'; \
        console.log(output); "
    );
}
numLetters("a")(4); // 'aaaa'
```

2. Solution with a _literal template_
```js
function numLetters(letter) {
    return new Function("number", `
        if (number === 0) return '';
        number = Math.round(number);
        let output = '';
        while(number--) output += '${letter}';
        console.log(output); `
    );
}
numLetters("a")(4); // 'aaaa'
```

#### 2.7 Walk Through a Template Function

```js
_.template($('#menuItem-template').html(), {variable: 'menuItem'})
```
First argument represented by a string returned by a method `html()` applied to the DOM element with `id="menuItem-template"`.

If you call a first argument in a console:
```js
$('#menuItem-template').html()
// it logs a string out
"
    <td><a href="#detail/<%= menuItem.id %>"><%= menuItem.name %></a></td>
    <td><%= menuItem.rating %></td>
    <td><%= menuItem.calories %></td>
    <td>
      <button class="select-item">Select Item</button>
    </td>
  "
```

#### 2.10 Template `variables` and JS's `with`

Reading blog posts and tutorials online you'll see a lot of templates like this:
```html
// index.html
<script type="text/template" id="menuItem-template">
    <td><a href="#item/<%= id %>"><%= name %></a></td>
    <td><%= rating %></td>
    <td><%= calories %></td>
    <td>
        <button class="select-item">Select Item</button>
    </td>
</script>
```
Notice that inside the template delimiters, first class variables are being used. This is different from what we just looked at where the data came from the properties of the menuItem object, like this:
```html
// index.html
<script type="text/template" id="menuItem-template">
    <td><a href="#item/<%= menuItem.id %>"><%= menuItem.name %></a></td>
    <td><%= menuItem.rating %></td>
    <td><%= menuItem.calories %></td>
    <td>
        <button class="select-item">Select Item</button>
    </td>
</script>
```
The reason that we have access to the menuItem object and then use its properties is because we passed it along in the settings.
```js
// app.js
...
template: _.template($('#menuItem-template').html(), {variable: 'menuItem'}),

render: function(id) {
    this.$el.html(this.template(this.model.attributes));
    return this;
},
...
```
See how a settings object is being passed to the template function? This settings object is used in the creation of the constructor function.

Without this function, Backbone resorts to using JavaScript's with block. A with block extends the scope chain for the statements that are within its block. with blocks are not recommended and are not allowed in strict mode.

When creating Backbone templates, make sure to access your data as properties on an object, and to pass that object name in with the template's settings.

##### Further Research:
 * [`with` statement on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with)
 * [`with` statement from Google's styleguide](https://google.github.io/styleguide/javascriptguide.xml#with___%7B%7D)
 * [`with` statement](http://www.2ality.com/2011/06/with-statement.html)

#### 2.12 Build your own templating function quiz
Solution:
```js
function template( text, options) {

  let delimeters = {
    open : '*(',
    close : ')*'
  };

  for (let property in options) {
    if (options.hasOwnProperty(property)) {
      if (delimeters[property] !== undefined) {
        delimeters[property] = options[property];
      }
    }
  }

  let strings = text.split( delimeters.open );

  let source = [], args = [];
  for ( let i = 0; i < strings.length; i++ ) {
    let end = strings[i].indexOf(delimeters.close);
    if ( -1 !== end) {
      let argument = strings[i].slice(0, end);
      source.push( argument );
      args.push( argument );
      plainText = strings[i].slice(end + delimeters.close.length);
    } else {
      plainText = strings[i];
    }
    if (plainText) {
      source.push("'" + plainText + "'");
    }
  }

  let temp = `num = num || 1; while(num--) { console.log(${source.join(" + ")}); } return;`;
  let fun = undefined;
  if ( 0 !== args.length ) {
    fun =  new Function( args.join(','), 'num', temp );
  } else {
    fun =  new Function( 'num', temp );
  }

  return fun;
}
```

#### 2.13 addEventListener

###### The Browser's Event System

The browser has an event system that announces everything you do on the page. An important step in learning how frameworks handle user interaction is to understand this event system and how developers can hook into it.

The `addEventListener` method is an incredibly important part of the DOM API. This method allows you to listen in on the browser's event system. Here's its signature:
```js
target.addEventListener( type, listener );
```
The `target` can be anything that implements the `EventTarget` interface. This could be element on the page, the document object, the window object, even an XHR object. `addEventListener` can be used as a hook on any of these elements to listen in on the events that are occurring on them.

The type is a string of the kind of event `addEventListener` will listen for. An example might be `click`,`animationend`, or `keyup`. Make sure to look through the list of standard events.

The `listener` is anything that implements the `EventListener` interface or just a function.

For example:
```js
document.addEventListener( 'keydown', function () {
    console.log( 'A keyboard button was pressed.' );
});
```
or
```js
document.querySelector('#orderForm').addEventListener( 'submit', function () {
    console.log( 'The form has been submitted.' );
});
```
##### Event Object
What if we wanted to set up an event listener to listen for when the escape key is pressed, verify the contents in a form before it is sent to the server, or check the status of an XHR call? The browser passes an event object when it calls the listener function. We can use this event object to gather information about the event that occurred.

If we want to listen for when the escape key is pressed we would use the event object:
```js
document.addEventListener( 'keydown', function ( eventObject ) {
    if (eventObject.keyCode == 27) {
        // the escape key was pressed
    }
});
```
##### Custom Events
The type of event we've looked at so far are the standard events that are built into the browser. What if we wanted to create our own kind of event, like the `partyTime` event? We use the CustomEvent API to do this!
```js
// create the custom `partyTime` event
var myCustomEvent= new CustomEvent( 'partyTime', {timeToParty: true, partyYear: 1999} );

// listen to the `document` for the `partyTime` event
document.addEventListener('partyTime', function(evt) {
    if (evt.partyYear) {
        console.log( "Partying like it's " + evt.partyYear + "!");
    }

    document.body.style.backgroundImage = 'linear-gradient(90deg, orange, blue)';
});

// trigger the custom event
document.dispatchEvent( myCustomEvent );
```
The browser's event system, `addEventListener`, and custom events give us a ton of power in dealing with interactions and events that occur in our web apps.

##### Further Research
* [`element.addEventListener()` on MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
* [Creating and triggering events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)

#### 2.14 Setting Up Backbone Events

```js
var obj = [];
_.extend( obj, Backbone.Events );
obj.on( 'log', function(message) {
  console.log( 'Triggered ' + message );
});
obj.on( 'log', 'an event' );
// 'Triggered an event'
```
#### 2.16 Adding Events Quiz

Backbone's [event documentation](http://backbonejs.org/#Events)

##### Available Code:
```js
function purchase( present ) {
  console.log('buying ' + present);
}
function build( gift ) {
  console.log('Building ' + gift);
}
var jack = {};
_.extend(jack, Backbone.Events);
```
##### Task:
Use only two function to add the following events to the `jack` object:
```js
jack._events = {
  birthday: [{callback: purchase}],
  party: [{callback: purchase}],
  presents: [
    {callback: purchase},
    {callback: build}
  ]
}
```
##### Solution:
```js
jack.on('birthday party presents', purchase);
jack.on('presents', build);
```

#### 2.19 Build Your Own Event System Quiz

##### Task:
Create your own Event Tracker system:
1. create an `EventTracker` object
   • it should accept a name when constructed
2. extend the `EventTracker` prototype with:
   • an `on` method
   • a `notify` method
   • a `trigger` method

##### Example data:
```js
function purchase(item) { console.log( 'purchasing ' + item); }
function celebrate() { console.log( this.name + ' says birthday parties are awesome!' ); }

var nephewParties = new EventTracker( 'nephews ');
var richard = new EventTracker( 'Richard' );

nephewParties.on( 'mainEvent', purchase );
richard.on( 'mainEvent', celebrate );
nephewParties.notify( richard, 'mainEvent' );

nephewParties.trigger( 'mainEvent', 'ice cream' );
```

##### Solution 1:
```js
// Create an object
function EventTracker( name ) {
  this.name = name || '';
  this.notifications = []; // store pairs { 'event' : object }
  this.events = []; // store pairs { 'event' : callback }
}
// Define 'on' method
EventTracker.prototype.on = function( event , callback ) {
  this.events.push( {event : event, callback : callback} );
}
// Define 'notify' method
EventTracker.prototype.notify = function( object, event ) {
  this.notifications.push( {event : event, object : object} );
}
// Define '' method
EventTracker.prototype.trigger = function( event, argument ) {
  if ( this.events !== undefined ) {
    this.events.forEach( function( entry ) {
      if ( event === entry.event ) {
        // '.call(this, ...)' can be applied to a function to change 'this' in the scope
        entry.callback.call(this, argument );
      }
      // second argument 'this' here is required to save the initial object in scope
    }, this);
  }
  if ( this.notifications !== undefined ) {
    this.notifications.forEach( function( entry ) {
      if ( event === entry.event ) {
        entry.object.trigger( event, argument );
      }
    });
  }
}
```

##### Solution 2 (Memory effective):
```js
function EventTracker( name ) {
  this.name = name || '';
  this._events = {};
  this._notify = {};
}

EventTracker.prototype.on = function(event, callback) {
  if (this._events[event] === undefined ) {
    this._events[event] = [];
  }
  this._events[event].push(callback);
}

EventTracker.prototype.notify = function(object, event) {
  if (this._notify[event] === undefined ) {
    this._notify[event] = [];
  }
  this._notify[event].push(object);
}

EventTracker.prototype.trigger = function( event, data ) {
  var callbacks = this._events[event] || 0;
  var objects = this._notify[event] || 0;
  var i;

  for ( i = 0; i < callbacks.length; i++ ) {
    callbacks[i].call(this, data);
  }

  for ( i = 0; i < objects.length; i++ ) {
    objects[i].trigger(event, data);
  }
}
```

#### 2.20 A Router & The Backbone.history Object

#### 2.21 Routing Quiz

Check out Backbone's documentation on [route parameters](http://backbonejs.org/#Router-routes)
```js
var MountainRouter = Backbone.Router.extend({

  routes: {
    '': 'home',
    'mountain/:id': 'mountain', // ':param' to catch an argument for a `montain` function
    'download/*brochure': 'download' // '*splat' to get everything that stands after 'download/' as one parameter
  },

  home:function() { ... },
  mountain: function(id) { ... },
  download: function(brochure) { ... }

});
```

#### 2.22 hashchange & pushState
A common URL can be broken down into several parts:

[https://en.wikipedia.org/wiki/Udacity#History](https://en.wikipedia.org/wiki/Udacity#History)

1. `https://` - protocol
2. `en.wikipedia.org` - domain
3. `/wiki/Udacity` - path
4. `#History` - fragment identifier

Whenever the protocol, domain, or path parts are altered, the whole page is refreshed with new content. However, if the _fragment identifier_ is changed, an event is fired but the page __does not refresh__. To learn more about these parts of a URL, check out Mozilla's article on Understanding URLs and their structure.

##### hashchange
The event that's fired when the fragment identifier is added or changed is the `hashchange` event. Frameworks use this event to power routing in single page apps.
```html
<!-- new.html -->

<h1>New Page Heading</h1>
<p>New page content. Lorem ipsum...</p>
```

...and then in a JavaScript file:
```js
// app.js
// when the fragment changes, update the page's content with new data

$(window).on('hashchange', function() {
    var newPageUrl = getFragmentIdentifier();

    $.get( newPageUrl, function( pageContents ) {
        $('#content').html( pageContents );
    })
});
```
If our website were located at http://example.com/, changing the URL to http://example.com/#page.html will load the new page's content into #content element.

##### pushState
With the advancement of HTML5, the `window.history.pushState()` object was created. This method will update the contents of the browser's history stack. The signature for pushState is:
```js
window.history.pushState( state, title, url );
```
The `state` is an object containing information that will be associated with the new entry on the history stack.

The `title` is a string. This field is currently ignored.

The `url` is a string. The provided URL can be an absolute or relative URL but must be of the same origin as the current page.

Let's assume the following about a recent browser session:
* the current page is: https://developer.mozilla.org/en-US/docs/Web/API/History_API
* your browser's history stack is:
  * https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
  * https://developer.mozilla.org/
  * New Tab

...where #3 is the new tab you started from and #1 is the page you were just on before navigating to the current page.

Running the following code in the console:
```js
var state = { 'userId': 13579, 'secret': 'HTML5 is awesome' };
var title = 'A secret page!';
var url = 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5';

history.pushState(state, title, url);
```
...will change the URL to be https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5. It does this silently, meaning the page does not reload. The updated history stack is now:

1. https://developer.mozilla.org/en-US/docs/Web/API/History_API (← notice this one)
2. https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
3. https://developer.mozilla.org/
4. New Tab

Notice that the URL for the page that you are on is the most recent one in the stack. If you navigate to the `window.history` page, the HTML5 URL will be added to the history stack even though the page was never actually visited. The usefulness of this is that if you press the Back button, the browser will actually load MDN's HTML5 page since that was the most recent location in its history.

The way frameworks handle URL management using pushState is that they listen for clicks on links in the application, load new content into the page, and use pushState to update the URL to match the information the page is now displaying.

Further Research
* [Manipulating the browser history](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
* [History.pushState()](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)
* [WindowEventHandlers.onhashchange](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onhashchange)

#### 2.23 Stepping through Backbone.history.start()

Backbone.hystory.start() set ups an event listener to watch the URL for changes. When it does change backbone cycles through a list of handlers looking for a one that matches the URL, when it finds one it executes the callback function associated with this URL.
