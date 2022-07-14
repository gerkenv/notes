# Web Push notifications overview
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
  
## How do push notifications work?
- https://web.dev/push-notifications-overview/#how

1. Adding client logic to ask the user for permission to send push notifications, 
   and then sending client identifier information to your server for storage in a database.
2. Adding server logic to push messages to client devices.
3. Adding client logic to receive messages that have been pushed to the device and displaying them as notifications.

### 1. Get permission to send push notifications
- https://web.dev/push-notifications-overview/#permission

`Notification.requestPermission()` - https://developer.mozilla.org/docs/Web/API/Notification/requestPermission
It will trriger a browser-specific confirmation prompt

### 2. Subscribe the client to push notifications and store client data in your backend database 
- https://web.dev/push-notifications-overview/#subscription

After you get permission, your website needs to initiate the process of subscribing the user to push notifications. 
This is done through JavaScript, using the Push API. - https://developer.mozilla.org/docs/Web/API/Push_API
You'll need to provide a public authentication key during the subscription process. - https://web.dev/push-notifications-overview/#sign

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

### 3. Send a push message
- https://web.dev/push-notifications-overview/#send

Your server doesn't actually send the push message directly to a client. 
A __push service__ does that. A push service is a web service controlled by your user's browser vendor. 
When you want to send a push notification to a client you need to make a web service request to a push service. 
The web service request that you send to the push service is known as a __web push protocol request__.

The push service receives your request and authenticates it.
then push service keeps your request queued until one of the following events happens:
- The client comes online and the push service delivers the push message to the appropriate client.
- The message expires.

Each browser uses whatever push service it wants. You as a website developer have no control over that.

#### 3.1. Encrypt Message
- https://web.dev/push-notifications-overview/#encrypt

#### 3.2. Sign your web push protocol requests
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

#### 3.3. Customize the delivery of the push message
- https://web.dev/push-notifications-overview/#customize
  - set TTL, Urgency, Topic.

### 4. Receive and display the pushed messages as notifications
- https://web.dev/push-notifications-overview/#notification
  - When a client browser receives a pushed message, it decrypts the push message data 
    and dispatches a `push` event to your service worker.
  - In your service worker's `push` event handler you call `ServiceWorkerRegistration.showNotification()` 
    to display the information as a notification.


## F.A.Q.
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

- Chrome and Application Sever Keys do not need any kind of project to be set up with Google or Firebase. It'll just work.
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
  to work with in existing projects.

This uses web push behind the scenes, but its goal is to abstract it away.

Like in the previous question, if you consider web push as just a browser and a push service, 
then you can consider the Messaging SDK in Firebase as a library to simplify implementing web push.
