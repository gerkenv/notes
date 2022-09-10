# Progressive Web App (PWA)

## PWA Case Studies
How Progressive Web Apps can drive business success
https://web.dev/drive-business-success
web.dev Progressive Web Apps Case studies
https://web.dev/progressive-web-apps/#case-studies 
A community-driven list of stats and news related to Progressive Web Apps
https://www.pwastats.com/ 
A summary article containing multiple case studies
https://www.linkedin.com/pulse/progressive-web-apps-case-studies-anna-dudar 

## 2022 web.dev course. Learn PWA.
- https://web.dev/learn/pwa/

### Available In App Stores
- app store compatibility https://web.dev/learn/pwa/progressive-web-apps/#bringing-the-best-of-both-worlds
- upgrade an existing app with a pwa https://web.dev/learn/pwa/getting-started/#upgrading-a-store-app

### Cross-Browser Issues
- https://web.dev/learn/pwa/progressive-web-apps/#cross-browser-compatibility

#### Limitations Of Installation And Offline Capabilities
- https://web.dev/learn/pwa/progressive-web-apps/#compatibility

### PWA Checklist
All of the requirements / features of a nice pwa
- https://web.dev/learn/pwa/getting-started/#pwa-checklist

#### Reponsive Design
- as usual https://web.dev/learn/pwa/foundations/#responsive-web-design
- and new mini-mode (200x100)
  - https://web.dev/learn/pwa/foundations/#mini-mode
- and foldable & hybrid devices 
  - https://web.dev/learn/pwa/foundations/#foldables-and-hybrid   

#### Everything-first Approach
- Mobile first, content first, offline first? https://web.dev/learn/pwa/foundations/#everything-first

##### Progressive Enhancement
- term explanation https://web.dev/learn/pwa/foundations/#progressive-enhancement
- avoid device detection - use feature detection https://web.dev/learn/pwa/foundations/#avoid-device-detection
- apply intrinsic design https://web.dev/learn/pwa/foundations/#intrinsic-design

### App Design Suggestiosn
- icon https://web.dev/learn/pwa/app-design/#the-icon
- theme https://web.dev/learn/pwa/app-design/#theming-your-app

#### PWA Display Mode
- possible modes https://web.dev/learn/pwa/app-design/#display-modes
  - Fullscreen https://web.dev/learn/pwa/app-design/#fullscreen-experience
  - Standalone https://web.dev/learn/pwa/app-design/#standalone-experience
  - Minimal User Interface https://web.dev/learn/pwa/app-design/#minimal-user-interface
  - as tab in a browser 

- controlled via manifest `display` property https://developer.mozilla.org/en-US/docs/Web/Manifest/display
- css selectors for display modes, color schemes and animation preference https://web.dev/learn/pwa/app-design/#media-queries

#### App Experience
- https://web.dev/learn/pwa/app-design/#the-app-experience
  - think which text can be selected with default tools https://web.dev/learn/pwa/app-design/#user-selection
  - use `accent-color` + dark/light themes https://web.dev/learn/pwa/app-design/#accent-color
  - optionally use system font https://web.dev/learn/pwa/app-design/#system-fonts
  - optionally disable `pull-to-refresh` https://web.dev/learn/pwa/app-design/#pull-to-refresh
  - use safe areas https://web.dev/learn/pwa/app-design/#safe-areas

### Assets And Data
- assets https://web.dev/learn/pwa/assets-and-data/#app-components

#### Caches And Storage
- https://web.dev/learn/pwa/assets-and-data/#caches-and-storage
- https://web.dev/storage-for-the-web/#recommendation

Prefered: cache storage, indexedDB. \
  - Asynchronous API. 
  - Accessible from page, service worker, web workers.
  - Additional wrappers for IndexedDB API
    - https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API#see_also
Avoid: web storage (local storage & session storage) 
  - API is synchronous (blocking) operations.
  - Not accessible from service workers, web workers.
Avoid due to deprecation: WebSQL, ApplicationCache.

_independently of starage type it is important to sync your critical data with a cloud to avoid data loss on device, also it benefits in way to display new data on other devices_.

### Offline-ready
- https://web.dev/learn/pwa/assets-and-data/#offline-ready

#### Frequently used cache approaches 
- https://web.dev/learn/pwa/assets-and-data/#frequently-used-cache-approaches

#### Updating assets
- https://web.dev/learn/pwa/assets-and-data/#updating-assets

#### Size and Lifespan
- https://web.dev/learn/pwa/assets-and-data/#size-and-lifespan
  - how much can be stored by browser (pwa)?
    - https://web.dev/storage-for-the-web/#how-much

### Service Worker
The PWA course provides very high-level description of a service worker.
- https://web.dev/learn/pwa/service-workers/

To get better idea of how it works and how lifecycle can be managed and get code examples for different scenarios, better follow the article here
- https://web.dev/service-worker-lifecycle/


#### Initial Service Worker
- https://web.dev/service-worker-lifecycle/#the-first-service-worker

##### Scope
- https://web.dev/learn/pwa/service-workers/#scope
- https://web.dev/service-worker-lifecycle/#scope-and-control
    - Service worker registration path determines its activity scope. Try to put closer to the root to avoid surprises.

#### Registration
- https://web.dev/learn/pwa/service-workers/#registering-a-service-worker
- https://web.dev/service-worker-lifecycle/#download-parse-and-execute
```js
if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register("/serviceworker.js");
}
```

#### Lifecycle
- https://web.dev/learn/pwa/service-workers/#lifecycle
- more precise and with simple code exmaples https://web.dev/service-worker-lifecycle/

##### 'install'

The service worker lifecycle starts with registering the service worker. The browser then attempts to download and parse the service worker file. If parsing succeeds, its install event is fired. The install event only fires once.
More details https://web.dev/service-worker-lifecycle/#install

```js
// This code executes in its own worker or thread
self.addEventListener("install", event => {
   console.log("Service worker installed");
});
```

##### 'activate'
After the installation, the service worker is not yet in control of its clients, including your PWA. 
It needs to be activated first. When `activate` event fires - the service worker is ready to control its clients.
But even if the service worker is in `activated` state - it may not control the page.
    
If your page loads without a service worker, neither will its subresources. 
But If you load the page a second time (in other words, refresh the page after the service-worker was installed and activated) then page will be controlled.
    More details https://web.dev/service-worker-lifecycle/#activate

```js
// This code executes in its own worker or thread
self.addEventListener("activate", event => {
   console.log("Service worker activated");
});
```

##### Manually take control
`clients.claim()`
After `activated` you can enforce control of __uncontrolled clients__ by `clients.claim()`
- https://web.dev/service-worker-lifecycle/#clients.claim
    - If you use your service worker to load pages differently than they'd load via the network, `clients.claim()` can be troublesome, as your service worker ends up controlling some clients that loaded without it.

#### Updating a service worker
- https://web.dev/learn/pwa/service-workers/#updating-a-service-worker
    - do not rename your service worker file, browser detects byte difference between same file and updates if there is a difference.
    - the user needs to close or navigate away from all tabs and windows using the current service worker and then navigate back. Only then will the new service worker take control.
    - more details https://web.dev/service-worker-lifecycle/#updates

##### 'waiting'
After it's successfully installed, the updated service worker delays activating until the existing service worker is no longer controlling clients. This state is called "waiting", and it's how the browser ensures that only one version of your service worker is running at a time.
- https://web.dev/service-worker-lifecycle/#waiting

##### Activating
This fires once the old service worker is gone, and your new service worker is able to control clients. This is the ideal time to do stuff that you couldn't do while the old worker was still in use, such as migrating databases and clearing caches.

##### Skip the waiting phase
```js
self.skipWaiting()
```
This causes your service worker to __kick out the current active worker and activate itself__ as soon as it enters the waiting phase (or immediately if it's already in the waiting phase). It doesn't cause your worker to skip installing, just waiting. - https://web.dev/service-worker-lifecycle/#skip-the-waiting-phase

##### Manual Update
- https://web.dev/service-worker-lifecycle/#manual-updates
  - As it was mentioned earlier, the browser checks for updates automatically after navigations and functional events, but you can also trigger them manually:
    ```js
    navigator.serviceWorker.register('/sw.js').then(reg => {
      // sometime later…
      reg.update();
    });
    ```
#### Avoid changing the URL of your service worker script
- https://web.dev/service-worker-lifecycle/#avoid-url-change

#### Making development easy
- https://web.dev/service-worker-lifecycle/#devtools
  - you can set `update on reload` option in dev tools to replace service worker on reload (here it doesn't matter if other tabs use old service worker or not)
  - you can force reload with `cmd+shift+r` - it will remove previously installed service worker, but if you have previous service worker in other tabs running, then it will be activated again (even if your tab wants to install a new one).

#### Handling updates 
It is possible to observe service worker state updates and replacement of a service worker with a new one.
- https://web.dev/service-worker-lifecycle/#handling-updates

#### Avoid In-Memory State
- https://web.dev/learn/pwa/service-workers/#service-worker-lifespan

The service worker works even before or after your PWA is open. While service workers run on their own thread, there is no guarantee that in-memory state will persist between runs of a service worker, so make sure anything you want to reuse on each run is available either in IndexedDB or some other persistent storage.

#### Lifespan
- https://web.dev/learn/pwa/service-workers/#service-worker-lifespan

If not already running, a service worker will start whenever a network request in its scope is asked for, or when a triggering event, like periodic background sync or a push message, is received.

#### Capabilities
- https://web.dev/learn/pwa/service-workers/#capabilities

Service worker's capabilities are not just for proxy or serving HTTP requests; other features are available on top of it for other purposes, such as background code execution, web push notifications, and process payments. We'll discuss these additions in the capabilities chapter - https://web.dev/learn/pwa/capabilities.

### Cache Storage API `caches`
- https://web.dev/learn/pwa/caching/

#### Context
The Cache Storage API is available from different contexts:
- The window context (your PWA's main thread).
- The service worker.
- Any other workers you use.

_Be aware that to use the Cache Storage API most of these contexts have to be under a TLS connection._

#### What to Cache
- https://web.dev/learn/pwa/caching/#what-to-cache

#### Offline-ready 
- https://web.dev/learn/pwa/caching/#offline-ready
  - Essential to understand that not every PWA needs a full offline experience.
  - Your PWA should not render a browser's error message saying that the web rendering engine couldn't load the page. Instead use your service worker to show your own messaging, avoiding a generic and confusing browser error
  - If you publish your PWA to Google Play Store, your PWA should never render an HTTP error message from the browser to avoid penalizations within the store listings

#### Storage Scope
The cache storage content and eviction rules are set per origin and not per PWA, since it's possible to have more than one in a single origin. If you share your origin for many PWAs, it's a good idea to add a prefix to your cache names to avoid collision problems between each PWA's data storage.

#### Using API

##### Create Or Open Existing Cache Entry
```js
caches.open("pwa-assets")
.then(cache => {
  // you can download and store, delete or update resources with cache arguments
});
```

##### Downloading and storing assets
- https://web.dev/learn/pwa/caching/#downloading-and-storing-assets
  - The `add` method makes a request and stores one HTTP response, and `addAll` a group of HTTP responses as a transaction based on an array of requests or URLs.
  - To download and store the assets, you must specify all the URLs explicitly. Otherwise the API cannot know all the assets you need or want to cache.
```js
caches.open("pwa-assets")
.then(cache => {
  cache.add("styles.css"); // it stores only one resource
  cache.addAll(["styles.css", "app.js"]); // it stores two resources
});
```

##### When to cache
- https://web.dev/learn/pwa/caching/#when-to-cache
  - You don't need to cache all the assets at once, you can cache assets many times during the lifecycle of your PWA
  - Also you can request caching new files in the main thread or within the service worker context

##### Caching assets in a service worker
- https://web.dev/learn/pwa/caching/#caching-assets-in-a-service-worker

One of the most common scenarios is to cache a minimum set of assets when the service worker is installed.

Because the service worker thread can be stopped at any time, you can request the browser to wait for the addAll promise to finish to increase the opportunity of storing all the assets and keeping the app consistent.
```js
const urlsToCache = ["/", "app.js", "styles.css", "logo.svg"];
self.addEventListener("install", event => {
   event.waitUntil(
      caches.open("pwa-assets")
      .then(cache => {
         return cache.addAll(urlsToCache);
      });
   );
});
```
The `waitUntil()` method receives a promise and asks the browser to wait for the task in the promise to resolve (fulfilled or failed) before terminating the service worker process.
- https://developer.mozilla.org/docs/Web/API/ExtendableEvent/waitUntil

##### Cross-domain requests and opaque responses
- https://web.dev/learn/pwa/caching/#cross-domain-requests-and-opaque-responses
  - With a cross-domain app, the cache interaction is very similar to same-origin requests. The request is executed and a copy of the response is stored in your cache. As with other cached assets it is only available to be used in your app's origin.
  - The asset will be stored as an opaque response, which means your code won't be able to see or modify the contents or headers of that response.
    - https://fetch.spec.whatwg.org/#concept-filtered-response-opaque
  - Remember that when you cache opaque responses from cross-domains, `cache.add()` and `cache.addAll()` will fail if those responses don't return with a 2xx status code.

##### Updating and deleting assets
- https://web.dev/learn/pwa/caching/#updating-and-deleting-assets

You can update assets using `cache.put(request, response)` and delete assets with `delete(request)`.
Check https://developer.mozilla.org/docs/Web/API/Cache for more details.

##### Debugging Cache Storage
- https://web.dev/learn/pwa/caching/#debugging-cache-storage

### Serving
- Using the service worker's fetch event, you can intercept network requests and serve a response using different techniques

#### The `fetch` event
- https://web.dev/learn/pwa/serving/#the-fetch-event

The `fetch` event lets us intercept every network request made by the PWA in the service worker's scope, for both same-origin and cross-origin requests. 
```js
self.addEventListener("fetch", event => {
    console.log(`URL requested: ${event.request.url}`);
});
```

While you can have more than one fetch event handler per service worker, only one can respond per request. For example, you can have different handlers that will act on different URL patterns. They are executed in the order they were registered until one of them calls `respondWith()`.

#### Responding to a request 
- https://web.dev/learn/pwa/serving/#responding-to-a-request

To respond to an incoming request, call event.respondWith() from within a fetch event handler, like this:
```js
// fetch event handler in your service worker file
self.addEventListener("fetch", event => {
    const response = .... // a response or a Promise of response
    event.respondWith(response);
});
```

### Workbox Caching Strategies
- https://developer.chrome.com/docs/workbox/caching-strategies-overview/

__TODO ...continue here (chapter 8 - 10)__

__TODO ...continue here (chapter 8 - 10)__

__TODO ...continue here (chapter 8 - 10)__




### Installation
- https://web.dev/learn/pwa/installation

Once the user installs your PWA, it will:
- Have an icon in the launcher, home screen, start menu, or launchpad.
- Appear as a result when a user searches for the app on their device.
- Have a separate window within the operating system.
- Have support for specific capabilities.

#### Installation Criteria
Every browser has a criterion that marks when a website or web app is a Progressive Web App and can be installed for a standalone experience.
The metadata for your PWA is set by a JSON-based file known as the Web App Manifest.
  - more details about manifest https://web.dev/learn/pwa/web-app-manifest/

As a minimum requirement for installability, most browsers that support it use the Web App Manifest file and certain properties such as the name of the app, and configuration of the installed experience. An exception to this is Safari for macOS, which does not support installability.

Chromium-based browsers on desktop and Android, including Google Chrome, Samsung Internet, and Microsoft Edge, have additional requirements, such as:

- Serving the web app on HTTPS.
- At least one icon in the correct format and size.
- A registered service worker.
- A `fetch` event handler in the service worker to provide a basic offline experience.

Because the test that a PWA meets installability requirements can take several seconds, installability itself may not be available as soon as a URLs response is received.

#### Uninstalling
The process for uninstalling a PWA is different on each combination of operating system and browser. In most situations, the app can be uninstalled the same as any other platform-specific app; in other situations, the PWA window offers a menu with an uninstall option. Deleting the icon may not clear the storage that a PWA is using.

#### Desktop installation
- https://web.dev/learn/pwa/installation/#desktop-installation

Desktop PWA installation is currently supported by Google Chrome and Microsoft Edge on Linux, Windows, macOS, and Chromebooks. These browsers will show an install badge (icon) in the URL bar (see the image below), stating that the current site is installable.

_Only standalone and minimal-ui display modes are supported on desktop operating systems_.

#### iOS and iPadOS installation
- https://web.dev/learn/pwa/installation/#ios-and-ipados-installation

A browser prompt to install your PWA doesn't exit On iOS and iPadOS. In these platforms PWAs are also known as home screen web apps. These apps have to be added manually to the home screen via a menu that is available only in Safari.

_It's important to understand that PWA installation is only available if the user browses your website from Safari_. 

Other browsers available in the App Store, such as Google Chrome, Firefox, Opera, or Microsoft Edge, cannot install a PWA on the home screen.

_On iOS and iPadOS, only the standalone display mode is supported_

When users use the PWA, they are not using an instance of the Safari app (like they use an instance of Chrome when doing so), they are using something known as Web.app, so you should expect slight differences between your PWA rendered in Safari and a PWA window. Both Safari and Web.app use the same core from WebKit and the same JavaScript runtime, but they run in different processes and may have different implementations, such as having isolated storage.

#### Android installation
- https://web.dev/learn/pwa/installation/#android-installation

Depending on the device and browser, your PWA will either be installed as a WebAPK, a shortcut, or a QuickApp.

https://web.dev/learn/pwa/installation/#prompting-for-installation

#### Prompting for installation
In Chromium-based browsers on desktop and Android devices, it's possible to trigger the browser's installation dialog from your PWA. 
More details here https://web.dev/learn/pwa/installation/#prompting-for-installation

#### App catalogs and stores
- https://web.dev/learn/pwa/installation/#app-catalogs-and-stores


### Installation prompt
- https://web.dev/learn/pwa/installation-prompt/

#### Enhancing the install dialog
- https://web.dev/learn/pwa/installation-prompt/#enhancing-the-install-dialog

Browsers provide default installation prompts when PWAs pass the install criteria. The browser uses the `name` and `icons` properties from your Web App Manifest to build the prompt.
Some browsers enhance the installation prompt experience using the promotional fields in the manifest, including `description`, `categories`, and `screenshots`.
  - https://web.dev/learn/pwa/web-app-manifest/#promotional-fields

#### The `beforeinstallprompt` event
- https://web.dev/learn/pwa/installation-prompt/#the-beforeinstallprompt-event 
  1. Listen for the `beforeinstallprompt` event.
  2. Save it (you'll need it later).
  3. Trigger it from your UI.
  
Current support is around 75%. https://caniuse.com/?search=beforeinstallprompt

#### The best place to prompt
Where to prompt depends on your application and when your users are most engaged with your content and services. When you capture the beforeinstallprompt, you can guide users through the reasons to keep using your app and the advantages they will gain from installing it. You can choose to display install hints anywhere in your app. Some common patterns are: in the side menu, after a critical user journey such as completing an order, or after a sign-up page. You can read more about this in Patterns for promoting PWA installation - https://web.dev/promote-install/

#### Gathering analytics
- https://web.dev/learn/pwa/installation-prompt/#gathering-analytics

Using analytics will help you to understand better where and when to present your prompts. You can use the `userChoice` property from the `beforeinstallprompt` event; `userChoice` is a promise that will resolve with the action the user took.

#### Fallback
- https://web.dev/learn/pwa/installation-prompt/#fallback
If the browser doesn't support the `beforeinstallprompt` or the event does not fire, there is no other way to trigger the browser's installation prompt. However, on platforms that allow the user to install PWAs manually, like iOS, you can display these instructions to the user.

You should only render these instructions in browser mode; other display options, such as `standalone` or `fullscreen` mean the user has already installed the app.

### Updating The App
- https://web.dev/learn/pwa/update/

#### Updating Metadata
- https://web.dev/learn/pwa/update/#updating-metadata


__TODO ...continue here (chapter 14)__

__TODO ...continue here (chapter 14)__

__TODO ...continue here (chapter 14)__


### Check If Related (Same PWA Or Alternative Native) App Is Already Installed

#### Get List Of Related Apps With `getInstalledRelatedApps`
- https://web.dev/get-installed-related-apps/
- https://web.dev/learn/pwa/detection/#detecting-related-installed-apps

##### Browser Support
- 45% of users - https://caniuse.com/mdn-api_navigator_getinstalledrelatedapps

##### Supported App Types / On Platforms / From Browser
- https://web.dev/get-installed-related-apps/#supported-app-types-you-can-check

- Android App (Android only, from Chrome 80)
- Windows (UWP) App (Windows only, from Chrome / Edge 85)
- Prgressive Web App (Android only, Chrome 84)


#### Use `related_applications` Manifest Field To Redirect Installation To An App Store
- https://web.dev/learn/pwa/detection/#related-applications

##### Browser Support
- 46% of users - https://caniuse.com/mdn-html_manifest_related_applications

#### How To Check On iOS?
- no way - https://stackoverflow.com/questions/60837896/is-there-a-method-to-detect-native-apps-from-mobile-safari

But there is an alternative:

##### Redirect To The App As A Test
If redirect to app fails - redirect to the store / open the installation prompt.

- before iOS 9 - https://stackoverflow.com/a/30793222
- from iOS 9 - probably universal links - https://stackoverflow.com/a/32647480

__TODO ...continue here (chapter 14 - 22)__

__TODO ...continue here (chapter 14 - 22)__

__TODO ...continue here (chapter 14 - 22)__


### Capabilities
There are a lot of capabilities that can be used currently.
List of widely supported capabilities https://web.dev/learn/pwa/capabilities/
Demo PWA with built-in capabilities https://whatpwacando.today/

#### App Shortcuts
- https://web.dev/app-shortcuts/

__TODO ...continue here (chapter 24)__

__TODO ...continue here (chapter 24)__

__TODO ...continue here (chapter 24)__


## 2016 Service Worker Performance Study
https://developers.google.com/web/showcase/2016/service-worker-perf

## 2016 Udacity Course. Progressive Web Apps
Based on https://www.udacity.com/course/intro-to-progressive-web-apps--ud811

### App Shell
It is minumum html, css, js and images.
And first load should fast and response should be cached.
On repeat visit shell is served from cache.

Typically app shell should not contain any applciation data.

## 2017 Udacity Course. Builing Offline Experience With Service Worker
Based on https://www.udacity.com/course/offline-web-applications--ud899

#### 2.8 Installing the Demo App

install node v4.2.1

git clone https://github.com/jakearchibald/wittr

if not avilable use

git clone https://github.com/gerkenv/wittr

#### 2.9 Running the Demo App

npm install

npm run serve

#### 3.3 Fetching event

git reset --hard master

wittr/public/js/sw/index.js

Event is called every time a page fetches an request
self.addEventListener('fetch', function(event) {
  console.log(event.request)
  });

#### 3.4 Register a service worker

git checkout task-register-sw

wittr/public/js/main/indexController.js

IndexController.prototype._registerServiceWorker = function() {
  if (!navigator.serviceWorker) return;
  navigator.serviceWorker.register( "./sw.js" ).then(function() {
    console.log('Registration of service worker was successfull')
  }).catch(function() {
    console.log('Registration of service worker has failed')
  })
};

#### 3.10 Hijacking request

git checkout task-custom-response

wittr/public/js/sw/index.js

self.addEventListener('fetch', function(event) {
  event.respondWith(
    new Response('Hello <b class="a-winner-is-me">World</b>', {
      headers: {
        'foo':'bar',              // check deb tools / network
        'Content-Type':'text/html'
      }
    })
  )
});

#### 3.12 Hijacking requests 2

git checkout gif-response

wittr/public/js/sw/index.js

self.addEventListener('fetch', function(event) {
  if ( event.request.url.endsWith('.jpg') )
  {
    event.respondWith(
      fetch('/imgs/dr-evil.gif')
    );
    // .then(function() {
    //   console.log('okay')
    // }).catch(function(){
    //   console.log('not really')
    // });
  }
});

#### 3.14 Hijacking requests 3

git checkout error-handling

wittr/public/js/sw/index.js

Example:

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response){
      if (response.status == 404) {
        return new Response("Whoops, not found");
      }
      return response;
    }).catch(function() {
      return new Response("Uh oh, that totally failed!")
    })
  );
});

Solution:

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response){
      if (response.status == 404) {
        return fetch('/imgs/dr-evil.gif').catch(function() {
          return new Response("Gif fetching is failed");
        })
      }
      return response;
    }).catch(function() {
      return new Response("Uh oh, that totally failed!");
    })
  );
});

#### 3.16 Caching and Serving Assets

Prototype: Open (create) a cache storage
returns Promise<Cache>
caches.open('cache-name').then(function(cache) {
    //
});

Information in cache is stored in pairs "request - respond"
Method: put staff in a cache
cache.put(request, response);
cache.addAll([      // method calls all request and fetches all
    'request 0',    // responses automatically ( fetch under the hood )
    'request 1'     // Atomic operation: if any request fails - nothing is saved
]);                 // Warning!!! All fetch operations are going through browser cache

Method: get response out of a cache
cache.match(request) : Promise<response>;

Prototype: get response out of all caches
caches.match(request) : Promise<response>;

Add a listener for the "install" event - this event happens in a background when
a new service worker is available and an old one is still running.

self.addEventListener('install', function(event)) {
  event.waitUntil(    // signal of progress of the install
                      // if a promise resolves - the process is complete
                      // if a promise rejects - the install is failed

  );
}

#### 3.17 Install and Cache Quiz

self.addEventListener('install', function(event) {
  //...
  // An event is fired when a brower sets up a service worker for a first time
})

git checkout task-install

wittr/public/js/sw/index.js

  event.waitUntil(
    caches.open('wittr-static-v1').then( function(cache){
      cache.addAll(urlsToCache);
    }).catch( function(){
      console.log("Caching is failed!");
    })
  );

#### 3.18 Cache Response Quiz

git checkout task-cache-response

wittr/public/js/sw/index.js

  event.respondWith(
    caches.match(event.request).then(function(response){
      if (response) return response;
      return fetch(event.request);
    })
  )

#### 3.20 Update your CSS Quiz

self.addEventListener('activate', function(event) {
  //...
  // An event is fired when a service worker becomes active, when it is ready to
  // control pages and a previous service worker is gone
  // event.waitUntil() can be used to signal the length of the process
  // While you are activating a browser will queue of a service worker events such
  // as fetch, so by the time your service worker receives its first fetch you know
  // you have the caches how you want them
})

Prototype: delete a cache storage
caches.delete(cacheName) : Promise<Cache>

Prototype: get the names of your caches
caches.keys() : Promise<Caches>

git checkout task-handling-updates

wittr/public/js/sw/index.js

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.delete('wittr-static-v1')
  );
});

#### 3.21 Quiz: Update your CSS 2

var staticCacheName = 'wittr-static-v14';

self.addEventListener('install', function(event) {
  event.waitUntil(
    // TODO: change the site's theme, eg swap the vars in public/scss/_theme.scss
    // Ensure at least $primary-color changes
    // TODO: change cache name to 'wittr-static-v2'
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
      ]);
    }).catch(function() {
      console.log('installation of a new service worker has failed');
    })
  )
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    // TODO: remove the old cache
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('wittr-') &&
                cacheName != staticCacheName
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

#### 3.22 Adding UX to the Update Process

When you registering for a service worker it returns promise, this promise fullfils
with a service worker registration object, this object has a methods and properties realted to a service worker registration
navigator.serviceWorker.register('/sw.js').then(function(reg)) {
  reg.uregister()
  reg.update()
  reg.installing;
  reg.waiting;
  reg.active;
  reg.addEventListener('updatefound', function() {
    // reg.installing has changed
  })
}
Dev view just looking to these object properties and methods

var sw = reg.installing;
console.log(sw.state); // ..logs "installing"
// state can also be:
// "installed"
// "activating"
// "activated"
// "redundant" - a service worker has being thrown away, it happens when a service
worker has been replaced by a newer service worker and it also happens when a service
worker has being failed to install.

sw.addEventListener('statechanged', function() {
  // sw.state has changed
})

navigator.serviceWorker.controller - refers to a service worker and controlls this
page, it wants to tell a user when an update is ready, but because the service worker
update is happens in a background, here update could be "ready and waiting", "in
progress" or might not started yet. This means we need to look at the state of the
things when the page loads, but we may also need to listen for a future changes, for
instance, if there is no controller this means...
if (!navigator.serviceWorker.controller) {
  // page didn't load using a service worker
  // a content was loaded from a network
}
otherwise we need to look at the registration...
if (reg.waiting) {
  // there is an update ready and waiting
  // we can teel a user about it
}
if (reg.installing) {
  // there's an update in progress
  // of course an update may failed so we listen to a state change
  reg.installing.addEventListener('statechange', function() {
    if (reg.installing.state == 'installed') {
      // there is an update ready!
    }
  })
}
// otherwise we listen for an update found event
reg.addEventListener('updatefound', function() {
  // if that fires we track the state of the installing worker and if it reaches
  // the installed state we tell a user
  reg.installing.addEventListener('statechange', function() {
    if (reg.installing.state == 'installed') {
      // there is an update ready!
    }
  })
})

#### 3.23 Quiz: Adding UX

git checkout task-update-notify

wittr/public/js/main/indexController.js

IndexController.prototype._registerServiceWorker = function() {
  if (!navigator.serviceWorker) return;

  var indexController = this;

  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    // TODO: if there's no controller, this page wasn't loaded
    // via a service worker, so they're looking at the latest version.
    // In that case, exit early
    if (!navigator.serviceWorker.controller) {
      return;
    }

    // TODO: if there's an updated worker already waiting, call
    // indexController._updateReady()
    if (reg.waiting) {
      indexController._updateReady('1');
    }

    // TODO: if there's an updated worker installing, track its
    // progress. If it becomes "installed", call
    // indexController._updateReady()
    if (reg.installing) {
      indexController._trackInstalling(reg.installing, "2");
    }

    // TODO: otherwise, listen for new installing workers arriving.
    // If one arrives, track its progress.
    // If it becomes "installed", call
    // indexController._updateReady()
    reg.addEventListener('updatefound', function() {
      indexController._trackInstalling(reg.installing, "3");
    })
  });
};

IndexController.prototype._trackInstalling = function(worker, text) {
  var indexController = this;

  worker.addEventListener('statechange', function() {
    if (worker.state == 'installed') {
      indexController._updateReady(text);
    }
  })
}

IndexController.prototype._updateReady = function(text) {
  var toast = this._toastsView.show("New version available", {
    buttons: ['whatever '+text]
  });
};

#### 3.24 Triggering an Update

Service worker can call a self.skipWaiting() while it is waiting or installing, that
signals that it shoudn't queue behind another service worker, it should take over
straight away. You want to call it when a user hits "refresh" button in our "update"
notification.

How to send a signal from a page to a waiting service worker?
Your page may send messages to any service worker using "post messages".
// from a page
reg.installing.postMessage({foo: 'bar'})
You can listen for a messages in a service worker, using a meassage event:
// in a service worker
self.addEventListener('messsage', function(event) {
  event.data; // {foo: 'bar'}
})
So when the user clics the "refresh" button we will call the method self.skipWaiting()

There is an event when a new controller taking over a page
navigator.serviceWorker.addEventListener('controllerchange', function() {
  // navigator.serviceWorker.controller has changed
})
So this one can be used as a signal to reload the page

#### 3.25 Quiz: Triggering an update

git checkout task-update-reload

wittr/public/js/main/indexController.js

  // TODO: listen for the controlling service worker changing
  // and reload the page
  navigator.serviceWorker.addEventListener('controllerchange', function() {
    window.location.reload();
  })

  toast.answer.then(function(answer) {
    if (answer != 'refresh') return;
    // TODO: tell the service worker to skipWaiting
    worker.postMessage({action:'skipWaiting'});
  });

wittr/public/js/sw/index.js

  // TODO: listen for the "message" event, and call
  // skipWaiting if you get the appropriate message
  self.addEventListener('message', function(event) {
    if (event.data.action == 'skipWaiting') {
      self.skipWaiting();
    }
  });

#### 3.26 Quiz: Catching a Page Skeleton

git checkout task-page-skeleton

wittr/public/js/sw/index.js

self.addEventListener('fetch', function(event) {
  // TODO: respond to requests for the root page with
  // the page skeleton from the cache
  var requestUrl = new URL(event.request.url);
  if (requestUrl.origin == location.origin) {
    if (requestUrl.pathname == '/') {
      event.respondWith(caches.match('/skeleton'));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

#### 4.3 Quiz: Getting Started with IDB

wittr/public/js/idb-test/index.js

import idb from 'idb';

var dbPromise = idb.open('test-db', 1, function(upgradeDb) {
  var keyValStore = upgradeDb.createObjectStore('keyval');
  keyValStore.put("world", "hello");
});

// read "hello" in "keyval"
dbPromise.then(function(db) {
  var tx = db.transaction('keyval');
  var keyValStore = tx.objectStore('keyval');
  return keyValStore.get('hello');
}).then(function(val) {
  console.log('The value of "hello" is:', val);
});

// set "foo" to be "bar" in "keyval"
dbPromise.then(function(db) {
  var tx = db.transaction('keyval', 'readwrite');
  var keyValStore = tx.objectStore('keyval');
  keyValStore.put('bar', 'foo');
  return tx.complete;
}).then(function() {
  console.log('Added foo:bar to keyval');
});

git checkout page-skeleton

wittr/public/js/idb-test/index.js

var dbPromise = idb.open('test-db', 3, function(upgradeDb) {
  switch(upgradeDb.oldVersion) {
    case 0:
      var keyValStore = upgradeDb.createObjectStore('keyval');
      keyValStore.put("world", "hello");
    case 1:
      upgradeDb.createObjectStore('people', { keyPath: 'name' });
    case 2:
      var peopleStore = upgradeDb.transaction.objectStore('people');
      peopleStore.createIndex('animal', 'favoriteAnimal');
  }
});

dbPromise.then(function(db) {
  var tx = db.transaction('keyval', 'readwrite');
  var keyValStore = tx.objectStore('keyval');
  keyValStore.put('cat', 'favoriteAnimal');
  return tx.complete;
}).then(function() {
  console.log('Added favoriteAnimal:cat to keyval');
});

// add people to "people"
dbPromise.then(function(db) {
  var tx = db.transaction('people', 'readwrite');
  var peopleStore = tx.objectStore('people');

  peopleStore.put({
    name: 'Sam Munoz',
    age: 25,
    favoriteAnimal: 'dog'
  });

  peopleStore.put({
    name: 'Susan Keller',
    age: 34,
    favoriteAnimal: 'cat'
  });

  peopleStore.put({
    name: 'Lillie Wolfe',
    age: 28,
    favoriteAnimal: 'dog'
  });

  peopleStore.put({
    name: 'Marc Stone',
    age: 39,
    favoriteAnimal: 'cat'
  });

  return tx.complete;
}).then(function() {
  console.log('People added');
});

// list all cat people
dbPromise.then(function(db) {
  var tx = db.transaction('people');
  var peopleStore = tx.objectStore('people');
  var animalIndex = peopleStore.index('animal');

  return animalIndex.getAll('cat');
}).then(function(people) {
  console.log('Cat people:', people);
});

#### 4.4 Quiz: More IDB

git checkout task-idb-people

wittr/public/js/idb-test/index.js

  // TODO: create an index on 'people' named 'age', ordered by 'age'
  case 3:
    var peopleStore = upgradeDb.transaction.objectStore('people');
    peopleStore.createIndex('age', 'age');

  // TODO: console.log all people ordered by age
  dbPromise.then(function(db) {
    var tx = db.transaction('people');
    var peopleStore = tx.objectStore('people');
    var ageIndex = peopleStore.index('age');

    return ageIndex.getAll();
  }).then(function(people) {
    console.log('People sorted by age:', people);
  });

  Or you can use a cursor...

  // TODO: console.log all people ordered by age
dbPromise.then(function(db) {
  var tx = db.transaction('people');
  var peopleStore = tx.objectStore('people');
  var ageIndex = peopleStore.index('age');

  return ageIndex.openCursor();
}).then(function(cursor) {
  if (!cursor) return;
  return cursor.advance(2); // skip 2 items
}).then(function logPerson(cursor) {
  if (!cursor) return;
  console.log('Cursored at: ', cursor.value.name);
  // some functions can be used to modify a records in a storage
  // when you're using a cursor
  // cursor.update(newValue)
  // cursor.delete()
  return cursor.continue().then(logPerson);
}).then(function() {
  console.log('Done cursoring');
});

Get last state of idb-test.js

git checkout idb-cursoring

#### 4.6 Quiz: Using IDB Cache

git checkout task-idb-store

wittr/public/js/main/indexController.js

Use indexedDB.deleteDatabase('wittr') if your database is corrupted.

  this._dbPromise.then(function(db) {
    if (!db) return;

  // TODO: return a promise for a database called 'wittr'
  // that contains one objectStore: 'wittrs'
  // that uses 'id' as its key
  // and has an index called 'by-date', which is sorted
  // by the 'time' property
  var dbPromise = idb.open('wittr', 1, function(upgradeDb) {
    switch(upgradeDb.oldVersion) {
      case 0:
        var wittrStore = upgradeDb.createObjectStore('wittrs', {keyPath: 'id'});
        wittrStore.createIndex('by-date','time');
    }
  });
  return dbPromise;

  // TODO: put each message into the 'wittrs'
  // object store.
  var tx = db.transaction('wittrs', 'readwrite');
  var wittrStore = tx.objectStore('wittrs');
  messages.forEach(function(message) {
    wittrStore.put(message);
  });


#### 4.7 Quiz: Using IDB 2

git checkout task-show-stored

wittr/public/js/main/indexController.js

  // TODO: get all of the wittr message objects from indexeddb,
  // then pass them to:
  // indexController._postsView.addPosts(messages)
  // in order of date, starting with the latest.
  // Remember to return a promise that does all this,
  // so the websocket isn't opened until you're done!
  var byTimeIndex = db.transaction('wittrs').objectStore('wittrs')
                    .index('by-date');
  return byTimeIndex.getAll().then(function(messages) {
    indexController._postsView.addPosts(messages.reverse());
  })

#### 4.8 Quiz: Cleaning IDB

git checkout task-clean-db

wittr/public/js/main/indexController.js

  // TODO: keep the newest 30 entries in 'wittrs',
  // but delete the rest.
  //
  // Hint: you can use .openCursor(null, 'prev') to
  // open a cursor that goes through an index/store
  // backwards.
  store.index('by-date').openCursor(null, 'prev').then(function(cursor) {
    if (!cursor) return;
    return cursor.advance(30); // skip 30 items
  }).then(function deleteEntry(cursor) {
    if (!cursor) return;
    cursor.delete();
    return cursor.continue().then(deleteEntry);
  }).then(function() {
    console.log('Only 30 items are let in a database');
  });

#### 4.9 Cache Photos

The body of the response can be used only once, when response.json() is called once,
response.blob() cannot be called because the original data is already gone.
Also event.respondWith(response) using the original body of the response, so
you cannot later read it again.

This problem an be solved if you're cloning the original request:

event.respondWith(
  caches.open('wittr-content-imgs').then(function(cache) {
    return fetch(request).then(function(response) {
      cache.put(request, response.clone()); // A clone of response is cached
      return response;                      // An original response is returned
    })
  })
)

#### 4.10 Quiz: Cache Photos

git checkout task-cache-photos

wittr/public/js/sw/index.js

  // HINT: cache.put supports a plain url as the first parameter
  return caches.open(contentImgsCache).then(function(cache) {
    return cache.match(storageUrl).then(function(cacheResponse) {
      if (cacheResponse) return cacheResponse;
      return fetch(request).then(function(networkResponse) {
        cache.put( storageUrl, networkResponse.clone() );
        return networkResponse;
      });
    });
  });

#### 4.11 Cleaning Photo Cache

cache.delete(request) // delete specific entry
cache.keys().then(function(requests) {
  // ... all requests for entries in a cache
});

#### 4.12 Quiz: Cleaning Photo Cache

git checkout task-clean-photos

wittr/public/js/main/indexController.js

  var imagesNeeded = [];

  var tx = db.transaction('wittrs');
  return tx.objectStore('wittrs').getAll().then(function(messages) {
    messages.forEach(function(message) {
      if (message.photo) {
        imagesNeeded.push(message.photo);
      }
      imagesNeeded.push(message.avatar);
    });

    return caches.open('wittr-content-imgs');
  }).then(function(cache) {
    return cache.keys().then(function(requests) {
      requests.forEach(function(request) {
        var url = new URL(request.url);
        if (!imagesNeeded.includes(url.pathname)) cache.delete(request);
      });
    });
  });

#### 4.13 Quiz: Caching Avatars

git checkout task-cache-avatars

wittr/public/js/sw/index.js

  return caches.open(contentImgsCache).then(function(cache) {
    return cache.match(storageUrl).then(function(cacheResponse) {
      var networkFetch = fetch(request).then(function(networkResponse) {
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });

      return cacheResponse || networkFetch;
    });
  });

