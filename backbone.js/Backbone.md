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

