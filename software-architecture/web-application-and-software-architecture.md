# Web Application And Software Architecture

## What is a tier?
A tier is a a logical and physical separation of components in an application or service.
This separation is at component level, not code level.

## Single-tier Application
In a single-tier application, the user interface, backend business logic, and the database reside in the same machine.

### Single-tier Application. Upsides
- No network latency. Every component is located on the same machine
    - In n-tier apps have to send data requests to the backend server often. This adds network latency to the system making the user experience slow compared to single-tier apps. In single-tier apps, the data is readily available since all the components are located in the same machine.
- Great for data privacy and safety, since the user’s data always stays in their machine and doesn’t need to be transmitted over a network for persistence.

### Single-tier Application. Downsides
- Application’s publisher has no control over the application. Once the software is shipped, no code or feature updates can be made until the customer manually updates it.
- The product security for the app publisher is minimal. The code in single-tier applications is also vulnerable to being tweaked and reversed engineered.
- Applications’ performance and look and feel can be inconsistent as the app rendering largely depends on the configuration of the user’s machine.

### Two-tier Application. Examples
Games, microsoft office products, picture/phote editing software.

## Two-Tier Applications
A two-tier application involves a client and a server. The client contains the user interface with the business logic in one machine. Meanwhile, the backend server includes the database running on a different machine. The database server is hosted by the business and has control over it.

### The need for two-tier applications

### Two-tier Application. Upsides
- Less server calls
    - Since the business logic and the user interface reside in the same machine, there are fewer network calls to the backend server. This keeps the latency of the application low.
    - Additionally, it mean less money spent to keep the servers running, which is naturally economical.

### Two-tier Application. Downsides
- Obvious downside is that the code is vulnerable.
    - However, there are use cases where two-tier applications come in handy for simple applications, for example, a to-do list app or a planner.

### Two-tier Application. Examples
- To-do lists, calendars, etc.
- Another good example of two-tier apps is the browser and mobile app-based games. The game files are pretty heavy, and they only get downloaded on the client once when the user uses the application for the first time. And they make the network calls to the backend only to persist the game state.

## Three-Tier Applications
In a three-tier application, the user interface, business logic, and the database all reside on different machines and, thus, have different tiers. They are physically separated.

### Three-Tier Applications. Examples
Let’s take the example of a simple blog. The user interface will be written using HTML, JavaScript, and CSS, the backend application logic will run on a server like Apache and the database will be MySQL. A three-tier architecture works best for simple use cases.

## N-Tier Applications / Distributed Systems
An n-tier application is an application that has more than three components (user interface, backend server, database) involved in its architecture.
What are those components?

### N-Tier Applications. Components
- Cache
- Message queues for asynchronous behavior
- Load balancers
- Search servers for searching through massive amounts of data
- Components involved in processing massive amounts of data
- Components running heterogeneous tech commonly known as web services, microservices, etc.

### N-Tier Applications. Examples
All the social applications like Instagram, Facebook, TikTok, large-scale consumer services like Uber, Airbnb, online massive multiplayer games like Pokémon Go, Roblox, etc., are n-tier applications.

__n-tier applications are more popularly known as distributed systems.__

### N-Tier Applications. Separation Of concerns
Separation of concerns means - being concerned about one thing only and ignore the rest.
This principle act at all the levels of the service. It should be applied in the tier level and in the code level.

Keeping the components separate makes them reusable.
Different services can use the same database, messaging server or any other component as long as they are not tightly coupled with each other.

Having loosely coupled components is the way to go. This approach enables us to scale our service easily when things grow beyond a certain scale in the future.

### N-Tier Applications. Difference between layers & tiers
Don’t confuse tiers with the layers of the application. Some prefer to use them interchangeably.
However, in the industry, application layers typically mean the user interface, business, service and the data access layers.

These layers are at the code level. The difference between layers and tiers is that layers represent the conceptual/logical organization of the code, whereas tiers represent the physical separation of components.

## What is Web Architecture?
Web architecture involves multiple components like a database, message queue, cache, user interface, etc., all running in conjunction to form an online service.

## Client-Server Architecture
The architecture works on a request-response model. The client sends the request to the server for information and the server responds with it.

A very small percentage of business websites and applications use the peer-to-peer architecture, which differs from the client-server.

### Client-Server Architecture. Client
The client holds our user interface. The user interface is the presentation part of the application. It’s written in HTML, JavaScript, CSS and is responsible for the look and feel of the application.

The user interface runs on the client. In very simple terms, a client is a gateway to our application. It can be a mobile app, a desktop or a tablet like an iPad. It can also be a web-based console, running commands to interact with the backend server.

### Client-Server Architecture. Technologies used to implement clients in web applications
https://survey.stackoverflow.co/2022/#section-most-loved-dreaded-and-wanted-web-frameworks-and-technologies

### Client-Server Architecture. Types of Clients
There are primarily two types of clients:
- Thin client
- Thick client (sometimes also called the Fat client)

### Client-Server Architecture. Thin client
- A thin client is a client that holds just the user interface of the application. It contains no business logic of any sort. For every action, the client sends a request to the backend server, just like in a three-tier application.

### Client-Server Architecture. Thick client
On the contrary, the thick client holds all or some part of the business logic. These are the two-tier applications. The typical examples of fat clients are utility apps, online games, and so on.

### Client-Server Architecture. Server
The primary task of a web server is to receive the requests from the client and provide the response after executing the business logic based on the request parameters received from the client.
Servers running web applications are commonly known as __application servers__.

### Client-Server Architecture. Servers With Specific Tasks
Besides the application servers, there are also other kinds of servers with specific tasks assigned. These include:
- Proxy server
- Mail server
- File server
- Virtual server
- Data storage server
- Batch job server and so on

### Client-Server Architecture. Each Components Needs A Server
All the components of a web application need a server to run, be it a database, a message queue, a cache, or any other component. In modern application development, even the user interface is hosted separately on a dedicated server.

### Client-Server Architecture. Server-side rendering
Often the developers use a server to render the user interface on the backend and then send the generated data to the client. This technique is known as server-side rendering. We will discuss the pros and cons of client-side vs. server-side later on.

### Client-Server Architecture. Request-response model
The client and the server have a request-response model. The client sends the request and the server responds with the data.
If there is no request, there is no response.

### Client-Server Architecture. HTTP protocol
The entire communication happens over the HTTP protocol. It is the protocol for data exchange over the World Wide Web. HTTP protocol is a request-response protocol that defines how information is transmitted across the web.

It’s a stateless protocol, and every process over HTTP is executed independently and has no knowledge of previous processes.

If you want to read more about the protocol - here is [Mozilla article](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview).

### Client-Server Architecture. REST API and API Endpoints
Speaking from the context of modern n-tier web applications, every client has to hit a REST endpoint to fetch the data from the backend.

The backend application code has a REST-API implemented. This acts as an interface to the outside world requests. Every request, be it from the client written by the business or the third-party developers, those who consume our API data have to hit the REST endpoints to fetch the data

### Client-Server Architecture. What is REST?
REST stands for Representational State Transfer. It’s a software architectural style for implementing web services. Web services implemented using the REST architectural style are known as the RESTful web services.

### Client-Server Architecture. 6 REST architectural constraints.
- complete https://codewords.recurse.com/issues/five/what-restful-actually-means
- (incomplete) https://www.geeksforgeeks.org/rest-api-architectural-constraints/
- (incomplete) https://www.codecademy.com/article/what-is-rest
- (incomplete) https://www.toolsqa.com/rest-assured/what-is-rest/
- (incomplete) https://www.toolsqa.com/rest-assured/rest-architectural-elements/

Constraints:
1. Uniform interface - allows each client/server to be swapped out or modified without breaking the entire system. A single backend should be able to support multiple different clients.
    1. Identification of resources
        - Each resource must be uniquely identified by a stable identifier. A “stable” identifier means that it does not change across interactions, and it does not change even when the state of the resource changes. If a resource does get moved to another identifier, the server should give the client a response indicating that the request was bad, and give it a link to the new location of the resource
    2. Manipulation of resources through representations
        - When a client wishes to make changes to resources, it sends the server a representation of what it would like the resulting resource to look like. The server takes the request as a suggestion, but still has ultimate control.
    3. Self-descriptive Messages:
        - A self-descriptive message is one that contains all the information that the recipient needs to understand it. There should not be additional information in a separate documentation or in another message.
        - It means that client request contains enough information so that server could process it. And server response should contain enough information so that client could process it.
    4. Hypermedia as the Engine of Application State (HATEOAS)
        - Hypermedia is a fancy word for data sent from the server to the client that contains information about what the client can do next–in other words, what further requests it can make. In REST, servers should be sending only hypermedia to clients.
2. Client–server
    - in N-tier system all components in the request flow should communicate as client-server. For example, event-based system does not fit here.
3. Stateless
    - stateless does not mean that servers and clients do not have state, it simply means that they do not need to keep track of each other’s state.
4. Cacheable
    - response should note if it is cachable (and for how long) or not.
5. Layered system
    - This means there can be more than one layer in the system. However, each component is constrained to only see and interact with the very next layer
6. Code on demand (optional)
    - back in the days JS was rare, so it was to support `<script>` tag in html which would emit a request to fetch a piece of code.

### Client-Server Architecture. REST API
A REST API is an API implementation that adheres to the REST architectural constraints.

It acts as an interface. The communication between the client and the server happens over HTTP. A REST API takes advantage of the HTTP methodologies to establish communication between the client and the server. REST also enables servers to cache the response that improves the application’s performance.

The communication between the client and the server is a stateless process. By that, I mean every communication between the client and the server is like a new one.

There is no information or memory carried over from the previous communications. So, every time a client interacts with the backend, the client has to send the authentication information to it as well. This enables the backend to figure out whether the client is authorized to access the data or not.

When implementing a REST API, the client communicates with the backend endpoints. This entirely decouples the backend and the client code.

### Client-Server Architecture. API Gateway
The REST-API acts as a gateway or a single-entry point into the system. It encapsulates the business logic and handles all the client requests, taking care of the authorization, authentication, sanitizing the input data, and other necessary tasks before providing access to the application resources.
