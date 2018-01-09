#### 3.3 Fetching event

git reset --hard master

self.addEventListener('fetch', function(event) {
  console.log(event.request)
  });

#### 3.4 Register a service worker

git checkout task-register-sw

IndexController.prototype._registerServiceWorker = function() {
  if (!navigator.serviceWorker) return;
  navigator.serviceWorker.register( "./sw.js" )
};

#### 3.5

