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
`app/models/menu.json`.
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
The service is now being injected into the controller as an argument, to use the service though the controller needs to store it in a variable.
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
We will need to create a service that will be responsible for managing the orders. This service will need to keep track of what is being ordered for each day. \
To do that we need to create a simple object to keep track of each days items. \
We also need to keep track of the currently selected day, so the user will know which day to order in the menu item for. \
For this service to be usefull:
* It's need to manage this data
* Consumers of this service should be able to get the current list of orders.
* They also should be able to get and set the active day.
* And last, they should be able to choose an item for a meal and then remove an item for a meal.

The order manager is now is capablbe of tracking anything the user wants to eat for any meal. \
Let's create a template and controller to let the users keep track of their menu items. \
We need a template that will display our orders and the controller that will set the initial state for the template expressions.
```
yo angular:view order
yo angular:controller order
```
Now let's add that template to a page `app/index.html`
```html
<div class="container">
  <div ng-include="'views/order.html'" ng-controller="OrderCtrl as order"></div>

  <div ng-include="'views/menu.html'" ng-controller="MenuCtrl as menu"></div>
</div>
```
To get the data to our template we need to inject the `orderManager` service into the controller.
```js
angular.module('udaciMealsApp')
  .controller('OrderCtrl', ['orderManager', function (orderManager) {
    this.list = orderManager.getOrders();
  }]);
```
Now we can set the list property of the controller to get orders returned by the `orderManager` service.

In the controller is all set. So we can now start modyfing the template.
We want to show the orders for each meal and we want to repeat this list for every day. That means we need th `ng-repeat` directive. The first time through the `day` will be `Monday` and `MenuCategory` will be `this` object, so now let's add the data to our template `app/views/order.html`.
```html
<div class="row">
  <div class="col-md-2" ng-repeat="(day, menuCategory) in order.list">
    {{day}}
    <dl>
      <dt>Breakfast</dt>
      <dd>
        {{menuCategory.breakfast}}
      </dd>
      <dt>Lunch</dt>
      <dd>
        {{menuCategory.lunch}}
      </dd>
      <dt>Dinner</dt>
      <dd>
        {{menuCategory.dinner}}
      </dd>
    </dl>
  </div>
</div>
```
So we can now track orders but the user doen not have any way to track items.

In the `menu` template we will add `select` section
```html
<div class="row">
  <div class="item-container" ng-repeat="item in menu.items">
    <div class="col-md-4">
      <img class="item__image" style="width:100%;" ng-src="images/{{item.img}}" alt="{{item.name}}" />
      <h4>{{item.name}}</h4>
      <p>
        Rating: {{item.rating}} <span ng-if="item.rating > 4" ng-class="{highlight: item.rating > 4.5}"> - People love this item!</span>
        <button ng-click="menu.increment(item)">+</button>
        <button ng-click="menu.decrement(item)">-</button>
      </p>
      <div class="well">
        <select ng-model="item.meal" name="">
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>
    </div>
  </div>
</div>
```
where the user can pick when he wants to eat this menu item. \
And we will need a `button` to let them actually pick the meal.
```html
  </select>
  <button ng-click="menu.chooseItem(item.meal, item.name)">Select Item</button>
</div>
```
When the user clicks on this button we will send along the items name and when they want to eat it.
We will need to create this `chooseItem` function.
So in the `app/scripts/controllers/menu.js` we will create it. \
Order information is managed by the `orderManager` service so we need to inject it into this controller so we can pass along the data. \
`orderManager` already has a method that allows us to add an item so we will just pass the data to it.
```js
angular.module('udaciMealsApp')
  .controller('MenuCtrl', ['$scope', 'foodFinder', 'orderManager', function ($scope, menu, orderManager) {
    var vm = this;

    menu.getMenu().then(function(data) {
      $scope.$apply(function() {
        vm.items = data;
      });
    });

    this.increment = function(item) {
      // item.rating +=0.1
      item.rating = ((item.rating * 10) + 1) / 10;
    };
    this.decrement = function(item) {
      // item.rating -=0.1
      item.rating = ((item.rating * 10) - 1) / 10;
    };
    this.chooseItem = function(menuCategory, itemName) {
      orderManager.chooseMenuOption(menuCategory, itemName);
    };

  }]);
```
Now we can select an item and choose when to eat it and add it to the `orderManager`. \
But we can only pick item for Monday. Let's fix that in the `order` template we need to make it so that when we click on the specific day we will update the `orderManager` active day to that one.
```html
  <div class="col-md-2" ng-repeat="(day, menuCategory) in order.list" ng-click="order.setActiveDay(day)">
```
```js
angular.module('udaciMealsApp')
  .controller('OrderCtrl', ['orderManager', function (orderManager) {
    this.list = orderManager.getOrders();

    this.setActiveDay = function(day) {
      orderManager.setActiveDay(day);
    };
  }]);
```

#### 3.30 A couple of ways to inject in Angular
As you're probably coming to learn, there are several ways to do things in Angular. But, some ways have more pros than others. In the previous video, we injected a Service into a Controller using the array-style syntax. Notice that `.controller()`'s second argument is an array:
```js
angular.module('udaciMealsApp')
    .controller('MenuCtrl', ['foodFinder', function (menu) {
        this.count = menu.count;
        this.chef = menu.chef;
        this.priceRange = menu.priceRange;
    }]);
```
Another way to inject a Service is by passing a variable with a name that exactly matches the Service's name to directly inject the Service. With this approach, .controller()'s second argument is just the function:
```js
angular.module('udaciMealsApp')
    .controller('MenuCtrl', function (foodFinder) {
        this.count = foodFinder.count;
        this.chef = foodFinder.chef;
        this.priceRange = foodFinder.priceRange;
    });
```
There are a couple differences between these two, and __the recommended approach is to use the array-style of injection__. The array-style of injection let's you name the function's parameters anything you want. So if you don't like the name of the Service, you can still inject it but use a different variable name.

The array-style of injection is also required for minification. Minification takes all variables and makes them as small as possible. So it would convert every instance of `foodFinder` to just the letter `a`, for example. The direct injection approach reads the name of the parameter and injects the Service with that name. So when a Service named `UserService` is used, it might get minified to `c`, but Angular doesn't know of any Service with the name `c`. The minifier won't minify strings, so the array-style of injection is safe.

It can be very confusing reading information on the web that provides totally different ways to create Services. But now you know the different formats to create a Service and when one format might be better than another.

#### 3.21 Routing via UI-Router
Single page application typically have many different views or screens that you can interact with. \
A router handles loading this views based on the URL.
When we generate an Angular app with Yeoman it asks us if we want to include a number of modules. One of the options is `angular-route.js`. This routing module works well but it is kind of limited since it does not allowed for the nested views. \
We want to have a specific sections of the page update and change while the rest is stays the same.
So instead of using this Angular router module we will use the community build route module called `ui-router`. The documentation for `ui-router` is incredibly detailed. \
Make sure to also check out the website and the sample app to see all of the functionality that `ui-router` offers.
* [ui-router on GitHub](https://github.com/angular-ui/ui-router)
* [ui-router's website](http://angular-ui.github.io/ui-router/site/#/api/ui.router)

Since `ui-router` does not come as a part of the default installation we need to add it to our project. \
The angular generator uses bower to install angular. so let use bower to install `ui-roter`.
```
bower install -S angular-ui-router
```
Do not forgert to `-S` to save `ui-router` to bower config file. \
One of the files that is created when we generate app with `yo angular` command is a `Gruntfile.js`. This file manages a lot of the development process. From watching files for changes to reloading the browser. One of the cool things that it can pair with other commands like the bower command that we just used. \
When we installed the `ui-router` with bower, grunt saw that and included it in our `index.html` file.
```html
<!-- build:js(.) scripts/vendor.js -->
<!-- bower:js -->
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
<script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
<!-- endbower -->
```
Everything that we have been building up to this point has all been inside of our `udaciMeals` module.
We created the module and then attached controllers and services to it. \
'ui-router' is a module itself and contains its own inner components. Back when we created our modules we passed an empty array of dependencies. Now we have to add the `ui-router` to that list so we can use it. \
Just like injecting a service to a controller we just add a name as a string so this is injecting `ui-router` module into our `udaciMeals` app module.
```js
// app/scripts/app.js
angular
  .module('udaciMealsApp', ['ui.router']);
```
A word of caution now: \
__When you including it is 'ui.router'__.
A dash has to replaced by a dot.

#### 3.32 Managing Application State
Before the module is created we can use a `.config` method to configure how it gets set up. \
The `.config` method takes a function.
`ui-router` includes a lot of functionality. Two componenets will be using our _state proider_ and _URL provider_. We will inject both of this into the `.config` function. \
Providers are like services but only providers can be used for module configuration.
We can now use the `$stateProvider` to set up different states of our app. Let's start up with the `default` state and call it `home`. To add a state to our app we call `.state`, give a state a name (1st argument), give it a configuration object (2nd argument) with the URL for this state, the template to use and the controller look for that template.
```js
angular
  .module('udaciMealsApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/menu.html',
        controler: 'MenuCtrl as menu'
      });
  }]);
```
We used a `stateProvider` to set up the state for the app. We need to use `urlRouterProvider` to load the `home` state by default.
```js
angular
  .module('udaciMealsApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/menu.html',
        controler: 'MenuCtrl as menu'
      });
  }]);
```
So the app state management is all set up. But there is one last thing we nee to tell `ui-router` where to insert this template. \
We can do that with a directive `ui-view`.
```html
<div class="container">
  <div ng-include="'views/order.html'" ng-controller="OrderCtrl as order"></div>

  <div ui-view></div>
</div>
```
We have access to this directive because we have included `ui-router` module in our project. \
`ui-router` is now handling our app's state let's add a new state for an individual menu item.

Check out: \
`ui-router` [configuration example](https://github.com/angular-ui/ui-router/wiki/Quick-Reference#configure-your-states-in-your-modules-config-method)

Let's create an `item` state, we also need to create the template and the controller for this item.
```js
angular
  .module('udaciMealsApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl as menu'
      })
      .state('item', {
        url: '/item/:id',
        templateUrl: 'views/item.html',
        controller: 'ItemCtrl as item'
      });
  }]);
```
Pay attention to `:id` - we can include dynamic content in our router. \
Let's create a template and a controller for the `item`.
```
yo angular:view item
yo angular:controller item
```
We need also to create a few .json model files with more information for each item.
```json
// app/models/item/chicken-pomegranate-salad.json
{
  "id" : "chicken-pomegranate-salad",
  "name" : "Chicken Pomegranate Salad",
  "img" : "chicken-pomegranate-salad.jpg",
  "calories" : 430,
  "rating" : 4.1,
  "description" : "A simple, sweet and delicious salad of chicken, pomegranates, spinach, and spiced candied walnuts. Served with a side of citrus vinaigrette."
}
```
```json
// app/models/item/ham-goat-cheese-croissant.json
{
  "id" : "ham-goat-cheese-croissant",
  "name" : "Ham Goat Cheese Croissant",
  "img" : "ham-goat-cheese-croissant.jpg",
  "calories" : 670,
  "rating" : 3.9,
  "description" : "A savory slice of ham topped with a wedge of goat cheese, all on a buttery, flaky croissant."
}
```
```json
// app/models/item/strawberry-pudding.json
{
  "id" : "strawberry-pudding",
  "name" : "Strawberry Pudding",
  "img" : "strawberry-pudding.jpg",
  "calories" : 280,
  "rating" : 5,
  "description" : "A sweet and tasty pudding filled with strawyberries, blueberries, and raspberries."
}
```
When the URL is `item/some menu id` the id will be accesible in `item` controller by using the `$stateParams` service. \
We will also add the `foodFinder` service so we can retreive the item. We will use the `getItem` function and look up the item by uts `id`. Then when it will return a .json file we will set it to `item.data` property.
```js
angular.module('udaciMealsApp')
  .controller('ItemCtrl', ['$stateParams', 'foodFinder', function ($stateParams, foodFinder) {
    var vm = this;

    foodFinder.getItem($stateParams.id).then(function(data) {
      vm.data = data;
    });
  }]);

```
The `getItem` function it is very similar to `getMenu` function except that it gets a single item specified by the id.
```js
// app/scripts/services/foodfinder.js
angular.module('udaciMealsApp')
  .service('foodFinder', function () {
    this.getMenu = function() {
      return $.get('./models/menu.json');
    };

    // this.getItem = function(id) {
    //   let item = `./models/item/${id}.json`;
    //   return $.get(item);
    // };

    this.getItem = (id) => $.get(`./models/item/${id}.json`);
  });
```
Let's make the name a link to that item details page.
`ui-router` gives us the `ui-sref` directive to switch between states. We want to switch to the `item` state an pass along the value. The state expects an id which will sets to the items id. \
In `app/vies/menu.html` instead of
```html
<h4>{{item.name}}</h4>
```
we set a link with directive
```html
<h4><a ui-sref="item({id:item.id})">{{item.name}}</a></h4>
```
Now let's just fill up the template for the `item`.
We will show the item's name, the image of the item, its rating and description.
```html
<h3>{{item.data.name}}</h3>

<img class="item__name" style="width:100%;" ng-src="images/{{item.data.img}}" alt="item.data.name">

<dl>
  <dt>Rating</dt>
  <dd>{{item.data.rating}}</dd>
  <dt>Description</dt>
  <dd>{{item.data.description}}</dd>
</dl>
```

##### Angular Context Issue #2
Now we have the same troubes as before due to the fact that current `item` controller implements a function `getItem` that changes `item` data property outside of the angular context.
So we need to inject `$scope` service into our controller and surround the outer context with the `$apply` method.
```js
angular.module('udaciMealsApp')
  .controller('ItemCtrl', ['$scope','$stateParams', 'foodFinder', function ($scope, $stateParams, foodFinder) {
    var vm = this;

    foodFinder.getItem($stateParams.id).then(function(data) {
      $scope.$apply(function() {
      vm.data = data;
      });
    });
  }]);
```

#### 3.33 Nested Views
The true power of the `ui-router` is a nested views.
Let's add a nested view to the `item`'s detail page.
Let's add one state to see an item's reviews and one more for its nutrition facts.
To add the nested view we need the same name as the main view, where it will be nested inside, so that is `item`, then we need a dot `.` and then it's the nested view name.
```js
angular
  .module('udaciMealsApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl as menu'
      })
      .state('item', {
        url: '/item/:id',
        templateUrl: 'views/item.html',
        controller: 'ItemCtrl as item'
      })
      .state('item.nutrition', {
        url: '/nutrition',
        templateUrl: 'views/item-nutrition.html'
      })
      .state('item.reviews', {
        url: '/reviews',
        templateUrl: 'views/item-reviews.html'
      });
  }]);
```
We need to generate the `item-nutrition` and the `item-reviews` templates. But we do not need controller because the templates will just inherit the `item`'s data from the parent `router`'s scope.
```
yo angular:view item-nutrition
yo angular:view item-reviews
```
Now let's fill up the `item-nutrition` template
```html
<h3>Nutrition facts</h3>
<dl>
  <dt>Calories</dt>
  <dd>{{item.data.calories}}</dd>
</dl>
```
and the `item-reviews` template.
```html
<h3>Reviews</h3>
<ul class="reviews-container">
  <li class="review" ng-repeat="review in item.data.reviews">{{review}}</li>
</ul>
```
Also we have to extend our `item`'s model files and add the `reviews` property to a model.
```json
// app/models/item/chicken-pomegranate-salad.json
{
  "id" : "chicken-pomegranate-salad",
  "name" : "Chicken Pomegranate Salad",
  "img" : "chicken-pomegranate-salad.jpg",
  "calories" : 430,
  "rating" : 4.1,
  "description" : "A simple, sweet and delicious salad of chicken, pomegranates, spinach, and spiced candied walnuts. Served with a side of citrus vinaigrette.",
  "reviews" : [
    "Lots of good flavor, filling.",
    "Pomegranate were tasty and the overall salad was great.",
    "Would get it again!",
    "Very good. Lots of lettuce.",
    "Not bad, not super filling."
  ]
}
```
```json
// app/models/item/ham-goat-cheese-croissant.json
{
  "id" : "ham-goat-cheese-croissant",
  "name" : "Ham Goat Cheese Croissant",
  "img" : "ham-goat-cheese-croissant.jpg",
  "calories" : 670,
  "rating" : 3.9,
  "description" : "A savory slice of ham topped with a wedge of goat cheese, all on a buttery, flaky croissant.",
  "reviews" : [
    "Delisious, I love goat cheese!",
    "Very good.",
    "Lots of flavor.",
    "The croissant was dry and kind of chewy."
  ]
}
```
```json
// app/models/item/strawberry-pudding.json
{
  "id" : "strawberry-pudding",
  "name" : "Strawberry Pudding",
  "img" : "strawberry-pudding.jpg",
  "calories" : 280,
  "rating" : 5,
  "description" : "A sweet and tasty pudding filled with strawyberries, blueberries, and raspberries.",
  "reviews" : [
    "Perhaps too sweet.",
    "Would get it again!",
    "Lots of strawberries!",
    "One of the best pudddings i have ever eaten."
  ]
}
```
So `ui-router` knows of the nested items and the templates to use. We need to tell `ui-router` where we want these views to apper thougth.
We need a view `ui-view` directive again but since we wnat them to display on the item's page we need to add them to `app/views/item.html`.
Finally we need to create a link for each view.

`ui-router` documentation:
* [Nested States & Nested Views](https://github.com/angular-ui/ui-router/wiki/Nested-States-%26-Nested-Views)

#### 3.34 Routing Quiz
##### State Declaration Trick #1
Let's imagine you need a __several controllers for a one view__, then you can provide a following declaration:
```js
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/instructions.html',
    })
    .state('redBrick', {
      url: '/bricks/red',
      templateUrl: 'views/bricks.html',
      controller: 'RedBricksCtrl as brick'
    })
    .state('blueBrick', {
      url: '/bricks/blue',
      templateUrl: 'views/bricks.html',
      controller: 'BlueBricksCtrl as brick'
    })
    .state('greenBrick', {
      url: '/bricks/green',
      templateUrl: 'views/bricks.html',
      controller: 'GreenBricksCtrl as brick'
    });
```
Using the `controllerProvider` above definition can be replaced by
```js
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/instructions.html',
    })
    .state('brick', {
      url: '/bricks/:color',
      controllerProvider: function($stateParams) {
        let color = $stateParams.color;
        color = color[0].toUpperCase() + color.slice(1);
        let ctrlName = color + 'BricksCtrl';
        return ctrlName;
      },
      controllerAs: 'brick'
      })
    });
```
##### Substate Reference Trick #1
If you have a substate which is connected to several states and you want to use a common template to be able to go into the substate from every controller then you can refer to it without controller name:
```html
<a ui-sref="controllerName.property">Cart</a>
<a ui-sref=".property">Cart</a>
```

