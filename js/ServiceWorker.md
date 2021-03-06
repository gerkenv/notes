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

