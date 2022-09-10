# 2022 Web Push notifications overview
- https://web.dev/push-notifications-overview

## What are web push notifications?
- https://web.dev/push-notifications-overview/#what
Web push messages and notifications are two separate but complementary technologies. 
Push is the technology for sending messages from your server to users even 
when they're not actively using your website. 

Notifications is the technology for displaying the pushed information on the user's device. 
It's possible to use notifications wihtout push messages (to display local notifications).

So push notification is a combination of both technologies.

## Why use push notifications?
- https://web.dev/push-notifications-overview/#why 
  - For users, push notifications are a way to receive timely, relevant, and precise information.
  - For you (a website owner), push notifications are a way to increase user engagement.
  
## How to implement push notifications?
- https://web.dev/push-notifications-overview/#how

1. Adding client logic to ask the user for permission to send push notifications, 
   and then sending client identifier information to your server for storage in a database.
2. Adding server logic to push messages to client devices.
3. Adding client logic to receive messages that have been pushed to the device and displaying them as notifications.

## How do push notifications work?
- https://web.dev/push-notifications-overview/#how

### 1. Get permission to send push notifications
- https://web.dev/push-notifications-overview/#permission

`Notification.requestPermission()` - https://developer.mozilla.org/docs/Web/API/Notification/requestPermission
It will trigger a browser-specific confirmation prompt

### 2. Create Application Server Keys (VAPID keys)
- https://web.dev/push-notifications-subscribing-a-user/#how-to-create-application-server-keys

You can create a public and private set of application server keys by visiting web-push-codelab.glitch.me or you can use the web-push command line https://github.com/web-push-libs/web-push#command-line to generate keys by doing the following:
```
$ npm install -g web-push
$ web-push generate-vapid-keys
```
You only need to create these keys once for your application, just make sure you keep the private key private. It will be something like
```
const vapidKeys = {
 publicKey: 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
 privateKey: 'UUxI4O8-FbRouAevSmBQ6o18hgE4nSG3qwvJTfKc-ls',
}
```

More details:
- authorization scheme for the application keys
  - https://web.dev/push-notifications-overview/#sign
  - https://web.dev/push-notifications-subscribing-a-user/#applicationserverkey-option

### 3. Subscribe the client to push notifications and store client data in your backend database 
- https://web.dev/push-notifications-overview/#subscription

After you get permission, your website needs to initiate the process of subscribing the user to push notifications. 
This is done through JavaScript, using the Push API. - https://developer.mozilla.org/docs/Web/API/Push_API
You'll need to provide a public authentication key during the subscription process - here is why https://web.dev/push-notifications-overview/#sign

API to subscribe:
https://web.dev/push-notifications-subscribing-a-user/#subscribe-a-user-with-pushmanager
```
function subscribeUserToPush() {
  return navigator.serviceWorker
    .register('/service-worker.js')
    .then(function (registration) {
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
        ),
      };

      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then(function (pushSubscription) {
      console.log(
        'Received PushSubscription: ',
        JSON.stringify(pushSubscription),
      );
      return pushSubscription;
    });
}
```

Assuming that the subscription was successful, the browser returns a `PushSubscription` object. - https://developer.mozilla.org/docs/Web/API/PushSubscription
```js
{
  "endpoint": "https://fcm.googleapis.com/fcm/send/c1KrmpTuRm…",
  "expirationTime": null,
  "keys": {
    "p256dh": "BGyyVt9FFV…",
    "auth": "R9sidzkcdf…"
  }
}
```
You'll need to store this data long-term. Usually this is done by sending the information 
to a server that you control, and then having the server store it in a database.

The domain of the `endpoint` is essentially the push service (you need to target later). The path of the `endpoint` 
is client identifier information that helps the push service determine exactly which client to push the message to.

The `keys` are used for encryption, which is explained here https://web.dev/push-notifications-overview/#sign

### 4. Send a push message
- https://web.dev/push-notifications-overview/#send

Your server doesn't actually send the push message directly to a client. 
A browser-specific push service does that. 
A push service is a web service controlled by your user's browser vendor. 
When you want to send a push notification to a client you need to make a web service request to a push service. 
The web service request that you send to the push service is known as a web push protocol request.

https://web.dev/sending-messages-with-web-push-libraries/#sending-push-messages
You may send a request using the `web-push` package.
```
npm install web-push --save
```
Then in the code we can set VAPID keys.
```
const webpush = require('web-push');

const vapidKeys = {
 publicKey:
   'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
 privateKey: 'UUxI4O8-FbRouAevSmBQ6o18hgE4nSG3qwvJTfKc-ls',
};

webpush.setVapidDetails(
 'mailto:web-push-book@gauntface.com',
 vapidKeys.publicKey,
 vapidKeys.privateKey,
);
```
Note that we also included a "mailto:" string. This string needs to be either a URL or a mailto email address. This piece of information will actually be sent to the web push service as part of the request to trigger a push. The reason this is done is so that if a web push service needs to get in touch with the sender, they have some information that will enable them to.


With this, the web-push module is ready to use, the next step is to trigger a push message.

An example function is
```
function (subscription, dataToSend) {
  return webpush.sendNotification(subscription, dataToSend).catch((err) => {
    if (err.statusCode === 404 || err.statusCode === 410) {
      console.log('Subscription has expired or is no longer valid: ', err);
      return deleteSubscriptionFromDatabase(subscription._id);
    } else {
      throw err;
    }
  });
};
```


The call to `webpush.sendNotification()` will return a promise. If the message was sent successfully the promise will resolve and there is nothing we need to do. If the promise rejects, you need to examine the error as it'll inform you as to whether the `PushSubscription` is still valid or not.

To determine the type of error from a push service it's best to look at the status code. Error messages vary between push services and some are more helpful than others.

In this example, it checks for status codes 404 and 410, which are the HTTP status codes for 'Not Found' and 'Gone'. If we receive one of these, it means the subscription has expired or is no longer valid. In these scenarios, we need to remove the subscriptions from our database.

If all went well then push service receives your request and authenticates it.
then push service keeps your request queued until one of the following events happens:
- The client comes online and the push service delivers the push message to the appropriate client.
- The message expires.

Each browser uses whatever push service it wants. You as a website developer have no control over that.

Also it is worth checking the section ‘POST Request’ in the Sencha blog https://www.sencha.com/blog/using-push-notifications-for-web-applications/ to better understand additional properties of POST requests of the push protocol.

#### 4.1. Encrypt Message
- https://web.dev/push-notifications-overview/#encrypt

#### 4.2. Sign your web push protocol requests
- https://web.dev/push-notifications-overview/#sign

This workflow involves a private key and public key that are unique to your application. 
The authentication process roughly works like this:
1. You generate the private and public key as a one-off task. 
  - The combination of the private and public key is known as the application server keys. 
  - You might also see them called the VAPID keys. VAPID is the spec that defines this authentication process.
  - https://tools.ietf.org/html/draft-thomson-webpush-vapid-02
2. When you subscribe a client to push notifications from your JavaScript code, you provide your public key. 
   - When the push service generates an `endpoint` for the device, it associates the provided public key with the `endpoint`.
3. When you send a web push protocol request, you sign some JSON information with your private key.
4. When the push service receives your web push protocol request, it uses the stored public key 
   to authenticate the signed information. If the signature is valid then the push service knows 
   that the request came from a server with the matching private key.

#### 4.3. Customize the delivery of the push message
- https://web.dev/push-notifications-overview/#customize
  - set TTL, Urgency, Topic.

### 5. Receive and display the pushed messages as notifications
- https://web.dev/push-notifications-overview/#notification
  - When a client browser receives a pushed message, it decrypts the push message data 
    and dispatches a `push` event to your service worker.
  - In your service worker's `push` event handler you call `ServiceWorkerRegistration.showNotification()` 
    to display the information as a notification.


## Push Notifications F.A.Q.
- https://web.dev/push-notifications-faq/

### Why is this any better than web sockets?
- https://web.dev/push-notifications-faq/#why-is-this-any-better-than-web-sockets

A service worker can be brought to life when the browser window is closed. 
A web socket will only live as long as the browser and web page is kept open.

### What is the deal with Google Cloud Messaging (GCM), Firebase Cloud Messaging (FCM), Web Push and Chrome?
- https://web.dev/push-notifications-faq/#what-is-the-deal-with-gcm-fcm-web-push-and-chrome

#### 2014 Google Cloud Messaging (GCM)
- GCM requires developers to set up an account on the Google Developers Console.
- Chrome and GCM needed a special sender ID to be shared by a web app to be able to set up messaging correctly.
- GCM's servers accepted a custom API request that wasn't a web standard.

#### 2016 Firebase Cloud Messaging (FCM) + VAPID
In July a new feature in web push landed - Application Server Keys (or VAPID, as the spec is known). 
When Chrome added support for this new API, it used Firebase Cloud Messaging (also known as FCM) 
instead of GCM as a messaging service. This is important for a few reasons:

- Chrome and Application Server Keys do not need any kind of project to be set up with Google or Firebase. It'll just work.
- FCM supports the web push protocol, which is the API that all web push services will support. 
  This means that regardless of what push service a browser uses, you just make the same kind of request and it'll send the message.

More details about VAPID - https://tools.ietf.org/html/draft-thomson-webpush-vapid-02

#### Firebase has a JavaScript SDK. What and Why?
The messaging SDK (known as Firebase Cloud Messaging (FCM) JS SDK) does a few tricks 
behind the scenes to make it easier to implement web push.

- Instead of worrying about a `PushSubscription` and its various fields, 
  you only need to worry about an FCM Token (a string).
- Using the tokens for each user, you can use the proprietary FCM API 
  to trigger push messages. __This API doesn't require encrypting payloads.__ 
  You can send a plain text payload in a POST request body.
- FCM's proprietary API supports custom features, for example FCM Topics 
  (It works on the web push too, though it's poorly documented).
- Finally, FCM supports Android, iOS and web, so for some teams it is easier 
  to work with existing projects.

This uses web push behind the scenes, but its goal is to abstract it away.

Like in the previous question, if you consider web push as just a browser and a push service, 
then you can consider the Messaging SDK in Firebase as a library to simplify implementing web push.

## Push Notification Code Examples

### Codelab: Build a push notification client
- https://web.dev/push-notifications-client-codelab/

### Codelab: Build a push notification server
- https://web.dev/push-notifications-server-codelab/

### Server: sending messages with web push libraries
- https://web.dev/sending-messages-with-web-push-libraries/

## Further web.dev articles
- https://web.dev/push-notifications-faq/#where-to-go-next

## Push Notification Permission
There is one pitfall related to the default permission rendered by a browser.
If a user cancels it, then it is quite cumbersome to unblock it later since it can be done only through browsers settings.
But there is a common practice to provide double notification to avoid the risk of being permanently blocked.

More details:
- Double Permission https://web.dev/push-notifications-permissions-ux/#double-permission
- Different Permission UX https://web.dev/push-notifications-permissions-ux
Push Notification Size
Currently size of a single message is limited up to 4 KB.

Video Tutorials
- Web Push Notifications - Simplest Implementation
  - https://www.youtube.com/watch?v=2zHqTjyfIY8
- Sencha Summary Article
  - https://www.sencha.com/blog/using-push-notifications-for-web-applications/ 

