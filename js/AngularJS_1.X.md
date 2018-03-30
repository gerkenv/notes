### AngularJS

These notes is one of the parts of the ["Front End Frameworks" course](https://www.udacity.com/course/front-end-frameworks--ud894) at [Udacity.com](https://www.udacity.com)

#### 3.3 Quiz Repos & Feedback Chrome Extension

##### Quiz Setup
The majority of quizzes in this lesson will be built and graded outside of the Udacity classroom, so get ready to clone a bunch of projects. You might want to set up a folder for this class to keep everything organized.

The quizzes are Angular projects, and you'll be given instructions on how to complete each one to pass the quiz. Since these quizzes are not in the Udacity classroom, you'll need to install the Udacity Feedback Chrome Extension so it can grade your work in the browser. To get everything set up:

1. [Install the Udacity Feedback Chrome Extension](https://chrome.google.com/webstore/detail/udacity-front-end-feedbac/melpgahbngpgnbhhccnopmlmpbmdaeoi)
2. Click on the extension and make sure "Allow feedback on this domain" is checked:

![alt text](http://lh3.googleusercontent.com/GPFSlZ9i28R88S7Pk3f7aaGOHVfU1CN1IDziG8Y3nivfoAKOTPbM6NXjW9-DhEm19ud1VX9DM8f4MNSW5a0=s1280)

([Click here](http://labs.udacity.com/udacity-feedback-extension/) to learn more about the Udacity Feedback Chrome Extension!)

#### 3.9 Installing Yeoman
##### Yeoman
[Yeoman](http://yeoman.io/) is tool for project scaffolding. You can use it to quickly generate an entire project's file structure. Yeoman is not specific to Angular but works by using [generator plugins](http://yeoman.io/generators/). For the rest of this lesson we'll be using Yeoman along with the [Angular Generator plugin](https://github.com/yeoman/generator-angular).

![alt text](https://raw.githubusercontent.com/udacity/course-front-end-frameworks/master/lesson3/images/yeoman-website.png)

##### Installation Yeoman and the Angular Generator
For detailed information on how to install the AngularJS Generator for Yeoman, check out the project's [Usage instructions](https://github.com/yeoman/generator-angular#usage). For a quick install:

* make sure you have [Node](https://nodejs.org/) and [NPM](https://www.npmjs.com/) installed (and updated!)
* install Yeoman, Bower, the Angular generator plugin which you can do by running the following command: `$ npm install -g grunt-cli bower yo generator-karma generator-angular`

##### Project Setup
Now that we've installed Yeoman and the Angular generator, we can generate an Angular app. Let's create a directory called UdaciMeals. Don't run it yet, but the command to run is:
```
yo angular udaciMeals
```
This will generate all of the project files in the __current directory__! `udaciMeals` is just a name of application here. So make sure to cd into the directory where you want your project to live. Now that you know what it will do, go ahead and run that command have to Yeoman generate an Angular app with the name UdaciMeals.

#### Setup Options
Yeoman offers us some optional tools that can be bundled into our project. We're going to pick the following options:
![alt text](https://raw.githubusercontent.com/udacity/course-front-end-frameworks/master/lesson3/images/project-installation-options.png)
* Gulp instead of Grunt - No
* Sass (with Compass) - No
* Bootstrap - Yes
* Modules - deselect all

Deselect a module by using the arrow keys and pressing space bar. Then, press enter to confirm the installation options and to start downloading dependencies and building the app's file structure.

If your terminal gets to this point and it looks like everything's frozen, the prompt is just hidden. Press enter to continue.

![alt text](https://raw.githubusercontent.com/udacity/course-front-end-frameworks/master/lesson3/images/project-installation-frozen.png)

#### 3.10 A Structured App

[Grunt](http://gruntjs.com/) is a JavaScript Task Runner and has thousands of [plugins](http://gruntjs.com/plugins) in its ecosystem. Taken from the http://gruntjs.com/ site:

##### Why use a task runner?
In one word: automation. The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, linting, etc, the easier your job becomes.

Here's the page for the [AngularJS generator](https://github.com/yeoman/generator-angular#angularjs-generator--).

#### 3.10 - 3.19

##### Structure
Example module 'udaciMealsApp' includes
* A controller (app/scripts/controllers/menu.js)
  * Use command `yo angular:controller menu`
* A view (app/views/menu.html)
  * Use command `yo angular:view menu`
* A test (test/spec/controllers/menu.js)
  * Use command `yo angular:controller menu`

##### Connection
They both has to be connected at app/index.html to a `container` div element.
```html
<!-- ng-app determines an module scope -->
<body ng-app="udaciMealsApp">

  <div class="header">
    < ... >
  </div>
  <div class="container">
    <div ng-include="'views/menu.html'" ng-controller="MenuCtrl"></div>
  </div>
  <div class="footer">
    < ... >
  </div>

  <!-- controller has to be included at the end of the page after jquery, angular and bootstrap -->
  <script src="scripts/controllers/menu.js"></script>
</body>
```

##### Controller Definition
All required properties of the object has to defined in the controller file (app/scripts/controllers/menu.js)
```js
'use strict';

angular.module('udaciMealsApp')
  .controller('MenuCtrl', function ($scope) {
    $scope.id = 'strawberry-pudding';
    $scope.name = 'Strawberry Pudding';
    $scope.img = 'strawberry-pudding.jpg';
    $scope.rating = 5;
  });
```

##### View Definition
All necessary properties can be used in the view (app/views/menu.html)
```html
<p>This is the menu view.</p>
<div class="row">
  <div class="item-container">
    <div class="col-md-4">
      <h4>{{name}}</h4>
      <p>Rating: {{rating}}</p>
      <p>Image: {{img}}</p>
    </div>
  </div>
</div>
```

Read this one:
* Article about [writing your controller with as syntax.](https://toddmotto.com/digging-into-angulars-controller-as-syntax/)

##### Connection 2
```html
<div class="container">
    <div ng-include="'views/menu.html'" ng-controller="MenuCtrl as menu"></div>
  </div>
```
##### Controller Definition 2
```js
'use strict';

angular.module('udaciMealsApp')
  .controller('MenuCtrl', function () {
    this.id = 'strawberry-pudding';
    this.name = 'Strawberry Pudding';
    this.img = 'strawberry-pudding.jpg';
    this.rating = 5;
  });
```
##### View Definition 2
```html
<p>This is the menu view.</p>
<div class="row">
  <div class="item-container">
    <div class="col-md-4">
      <h4>{{menu.name}}</h4>
      <p>Rating: {{menu.rating}}</p>
      <p>Image: {{menu.img}}</p>
    </div>
  </div>
</div>
```

#### 3.19 Angular Controllers Quiz

Download the [Angular Controller quiz!](https://github.com/udacity/FEF-Quiz-Angular-Controllers) This quiz has two parts:

1. Setting up the controller
2. Updating the view to use the controller's data
3. If you use Yeoman to generate the controller, use the name `brick` to satisfy the test code. This will apper as `BrickCtl` in Angular.
4. Documentation for Yeoman's [Angular generators](https://github.com/yeoman/generator-angular#angularjs-generator--)
5. Angular's documentation for [Controllers](https://docs.angularjs.org/guide/controller)
6. Article about [writing your controller with as syntax.](https://toddmotto.com/digging-into-angulars-controller-as-syntax/)

#### 3.21 Scope/$scope in Controllers

Scope has changed a little bit as the Angular project has matured. You don't interact directly with the scope object as much as you used to. I want to point this out because some articles and tutorials can make it a bit confusing to see a `$scope` object used in some examples, but not in others.

For example, this is the controller we've been using (the recommended way!):
```js
angular.module('udaciMealsApp')
    .controller('MenuCtrl', function () {
        this.id = 'chipotle-shrimp-wrap';
        this.name = 'Chipotle Shrimp Wrap';
        this.img = 'chipotle-shrimp-wrap.jpg';
        this.rating = 4.2;
    });
```
The following is an older way to write this same controller (the old way!):
```js
angular.module('udaciMealsApp')
    .controller('MenuCtrl', function ($scope) {
        $scope.id = 'chipotle-shrimp-wrap';
        $scope.name = 'Chipotle Shrimp Wrap';
        $scope.img = 'chipotle-shrimp-wrap.jpg';
        $scope.rating = 4.2;
    });
```
Doing it this way, though, where a `$scope` object is passed to the controller and used in the body, changes the way a template needs to be written. Using `$scope` directly in a controller causes it to directly modify the Scope object. Directly modifying the Scope object makes the template end up like this:
```html
<div class="container">
    <div class="row" ng-controller="MenuCtrl">
        <div class="items-container">
            <h4>{{name}}</h4>
            <p>{{rating}}</p>
            <p>{{img}}</p>
        </div>
    </div>
</div>
```
Notice that the `ng-controller` attribute is just `MenuCtrl` instead of `MenuCtrl as menu`. An instance of the Menu Controller is created with `ng-controller="MenuCtrl as menu"` (which is why the template has `{{menu.color}})` while `ng-controller="MenuCtrl"` just calls the function and directly modifies the scope object (which is why the template will need `{{color}}`).

We shouldn't fiddle with the scope object, but let Angular handle it as much as possible. So when you make your controllers and templates, make sure you do __not__ use `$scope` in your controller but make sure to use `this` and the [controller as syntax](https://toddmotto.com/digging-into-angulars-controller-as-syntax/).

#### 3.24 The Long Awaited Directives
Check out all of the built-in Directives that Angular offers - [Angular Directives](https://docs.angularjs.org/api/ng/directive).

Directives:
* `ng-app` - to bootstrap the entire application
* `ng-controller` - ties the controller and scope to an element
* `ng-include` - fetches, compiles and includes an external html template

##### `ng-if`
```html
<p>This is the menu view.</p>
<div class="row">
  <div class="item-container">
    <div class="col-md-4">
      <h4>{{menu.name}}</h4>
      <p> Rating: {{menu.rating}} <span ng-if="menu.rating > 4.5"> - People love this item!</span> </p>
      <p>Image: {{menu.img}}</p>
    </div>
  </div>
</div>
```
The `span` element will be shown only if `menu.rating` is higher than 4.
Otherwise you will only see comment in a page source:
```html
<!-- ngIf: menu.rating > 4.0 -->
```
##### `ng-class`
```html
<p>This is the menu view.</p>
<div class="row">
  <div class="item-container">
    <div class="col-md-4">
      <h4>{{menu.name}}</h4>
      <p> Rating: {{menu.rating}} <span ng-class="{highlight: menu.rating > 4.5}"> - People love this item!</span> </p>
      <p>Image: {{menu.img}}</p>
    </div>
  </div>
</div>
```
The `span` tag is assigned to class `highlight` only if the `menu.rating` is higher than 4.5.

##### Combinations of Directives
It is possible to combine directives in order to create a custom view logic. Let's change the existing rating element.
```html
      <p> Rating: {{menu.rating}} <span ng-if="menu.rating > 4.0" ng-class="{highlight: menu.rating > 4.0}"> - People love this item!</span> </p>
```

##### `ng-model`
This directive applies to `<input/>`, `<select/>` and `<textarea/>` elements.
To see this in action let's add a new section for reviews.
Insert following code right after `image` property.
```html
      <p>
        <textarea ng-model="menu.newReview" name="menu.reviewTextArea" rows="3" cols="40"></textarea>
      </p>
      <p>
        {{menu.newReview}}
        <span ng-if="!menu.newReview">Why not write a review!</span>
      </p>
```
We used `ng-if` to display some text while the `reviewTextArea` box is empty.
Typing something in a text box will create a new property on a `menu` object in a scope.

`ng-model` has a lot of moving parts to it and can do a lot, so definitely check-out its [documentation](https://docs.angularjs.org/api/ng/directive).

##### `ng-repeat`
This directive is incredibly usefull if you need to loop over the item in an array.

Let's update our controller and create the array `items` containing a multiple property for a certain objects.
```js
// app/controllers/menu.js

angular.module('udaciMealsApp')
  .controller('MenuCtrl', function () {
    // old item
    this.id = 'strawberry-pudding';
    this.name = 'Strawberry Pudding';
    this.img = 'strawberry-pudding.jpg';
    this.rating = 4.6;
    // new items
    this.items = [
      {
        id : 'chicken-pomegranate-salad',
        name : 'Chicken Pomegranate Salad',
        img : 'chicken-pomegranate-salad.jpg',
        calories : 430,
        rating : 4.1
      },
      {
        id : 'apple-pudding',
        name : 'Apple Pudding',
        img : 'apple-pudding.jpg',
        calories : 220,
        rating : 4.3
      },
      {
        id : 'ham-goat-cheese-croissant',
        name : 'Ham Goat Cheese Croissant',
        img : 'ham-goat-cheese-croissant.jpg',
        calories : 280,
        rating : 3.9
      },
    ];
  });
```
Now to display all of the new items we need to specify an additional element at the menu view.
```html
<div class="row">
  <div class="item-container" ng-repeat="item in menu.items">
    <div class="col-md-4">
      <h4>{{item.name}}</h4>
      <p>Rating: {{item.rating}} <span ng-class="{highlight: item.rating > 4.5}"> - People love this item!</span></p>
      <p>Image: {{item.img}}</p>
      <p>
        <textarea ng-model="item.rating" name="item.ratingTextArea" rows="1" cols="10"></textarea>
      </p>
    </div>
  </div>
</div>
```

##### `ng-src`
Because angular expressions are compiled after the html is downloaded and parsed by browser just sticking an image path in a following manner
```html
<img src="images/{{item.img}}" alt="{{item.name}}" />
```
will not make any sence because the `src` is resolved before the property itself.

So we should use `ng-src` directive instead, it waits to add an image to the `src` after a compilation step.
```html
<img class="item__image" src="images/{{item.img}}" alt="{{item.name}}" />
```

##### `ng-click`
Let's add two buttons to our view template, one to increment the rating and second one to decrement it.
```html
<button ng-click="menu.increment(item)">+</button>
<button ng-click="menu.decrement(item)">-</button>
```
We need also to create the corresponding function in our controller:
```js
this.increment = function(item) {
  // item.rating +=0.1
  item.rating = ((item.rating * 10) + 1) / 10;
};
this.decrement = function(item) {
  // item.rating -=0.1
  item.rating = ((item.rating * 10) - 1) / 10;
};
```
We have to use this type of calculation in order to avoid the JavaScript issue connected with a floating calculations: \
```js
1 + 0.1 = 1.0999999999999996
```

#### 3.26 Dependency Injection
Dependency Injection is a way to design software so the code like function does not have its dependencies hard coded into it. Instead the information that the function needs is given to a function when it is called. \
There are numbers of reasons for this:
* It decreases a coupling between a function and its dependencies.
* It can decrease the complexity of that function.
* It makes it easier to configure the function if it needs a new or different dependency.


#### 3.27 Service
Service - is a place where you can put a view independent logic. At first services are seem very similar to controllers. Both of them provide a data to an application. A major difference is that services are not intended for just one view. \
A service is not tied to a specific controller. It can be used by any number of controllers.

We can generate a service use the command:
```
yo angular:service foodFinder
```
The service is implemented in `app/scripts/services/foodfinder.js`.

The service starts out exactly like a controller:
```js
'use strict'
angular.module('udaciMealsApp')
  .service('foodFinder', function () {
    // Service properties and methods
    }
  });
```
Just like with controllers when we call service on the module, the name `foodFinder` and the function are being stored with angular injector.

When the controller asks for the service with name `foodFinder` - angular knows where is it located and how to create it.

The `foodFinder` service will be in charge of all menu information - let's move menu items data to a .json file.
First we need to create the file here
`app/model/menu.json`.
```json
[
  {
    "id" : "chicken-pomegranate-salad",
    "name" : "Chicken Pomegranate Salad",
    "img" : "chicken-pomegranate-salad.jpg",
    "calories" : 430,
    "rating" : 4.1
  },
  {
    "id" : "strawberry-pudding",
    "name" : "Strawberry Pudding",
    "img" : "strawberry-pudding.jpg",
    "calories" : 280,
    "rating" : 5
  },
  {
    "id" : "ham-goat-cheese-croissant",
    "name" : "Ham Goat Cheese Croissant",
    "img" : "ham-goat-cheese-croissant.jpg",
    "calories" : 670,
    "rating" : 3.9
  }
]
```
We will use a `foodFinder` service to fetch this file.
Let's create a `getMenu` function and use the jquery to fetch the .json file.
```js
angular.module('udaciMealsApp')
  .service('foodFinder', function () {
    this.getMenu = function() {
      return $.get('/models/menu.json');
    }
  });
```
Now we need to extract the menu out of the `menu` controller.
```js
angular.module('udaciMealsApp')
  .controller('MenuCtrl', function (foodFinder) {
    this.items = '';

    this.increment = function(item) {
       item.rating +=0.1
      //item.rating = ((item.rating * 10) + 1) / 10;
    };
    this.decrement = function(item) {
       item.rating -=0.1
      //item.rating = ((item.rating * 10) - 1) / 10;
    };
  });
```
So we extracted the menu to json file and set up the service - now we need to hook up the service in the controller.

The format to inject the service in to a controler looks a little odd. So let's take a look:
To inject something in to the controller we need to pass an array of things to inject as the second argument in controller constructor.
```js
angular.module('udaciMealsApp')
  .controller('MenuCtrl', ['foodFinder', function () {

  }]);
```
The service is now being injected into the controller as an argument, to use the service thou the controller needs to store it in a variable.
```js
angular.module('udaciMealsApp')
  .controller('MenuCtrl', ['foodFinder', function (menu) {
    var vm = this;  // view model

    menu.getMenu().then(function(data) {
        vm.items = data;
    });
  }]);
```
We have to use a context variable `vm` since `this` inside of `controller` and `this` inside of anonymous function `function(data)` are refer to two different objects.

Since we refer `vm` in anonimous scope - the change to the model made there is not visible to `$scope`, so we need to trigger the `$scope` synchronisation manually.

##### Manual `$scope` Refreshment
We can update the view model within the context of Angular using the `$scope.$apply` [method](https://docs.angularjs.org/guide/scope). In this way, only the `menu` controller requires an update. We can wrap the current contents of the `.then` function with the `$scope.$apply` function so the update is made within the context of Angular.
```js
angular.module('udaciMealsApp')
  .controller('MenuCtrl', ['$scope', 'foodFinder', function ($scope, menu) {
    var vm = this;

    menu.getMenu().then(function(data) {
      $scope.$apply(function() {
        vm.items = data;
      });

      // Further implementation
    });
```
##### Another Way to Get .json File
We could also take another way to solve the view update caused by change made out of angular context. Instead of fixing the scope, we could replace the jquery request by angular `$http` [service](https://docs.angularjs.org/api/ng/service/%24http).
The `foodFinder` service implementation stays mostly the same, however, we need to inject the `$http` service in order to use it (this is done the same way we injected our service into the `menu` controller) and then make the request with it rather than jQuery.
```js
angular.module('udaciMealsApp')
  .service('foodFinder', ['$http', function ($http) {
    this.getMenu = function() {
      return $http({ method: 'GET', url: '/menu/menu.json' });
    };
  }]);
```
The data available in the `.then` callback of `$http` service is a little different and would also require us to update the `menu` controller. The first parameter is no longer the `data` rather it is an object holding more information about the request. You can refer to the `$http` service [documentation](https://docs.angularjs.org/api/ng/service/%24http)to see that the first parameter is actually an object and the `data` is a property of that object. So we could rename the variable from `data` to `response` and set our `vm.items` property to `response.data`.
```js
angular.module('udaciMealsApp')
  .controller('MenuCtrl', ['foodFinder', function (menu) {
    var vm = this;

    menu.getMenu().then(function(response) {
      vm.items = response.data;
    });
    // Rest of the implementation...
```
##### Using Several Services

If you need to implement more than one service then you can add more of them into array and create an argument for each of those services.
```js
angular.module('udaciMealsApp')
  .controller('MenuCtrl', ['service1', 'service2', 'service3', function (service1, service2, service3) {
    var vm = this;  // view model

    // service usage

  }]);
```

#### 3.29 Order Manager Feature
Let's create an `orderManager` to track what we are eating each day.
First we need to create a service using the Yeoman.
```
yo angular:service orderManager
```






