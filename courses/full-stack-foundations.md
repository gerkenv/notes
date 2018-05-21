These notes is one of the parts of the ["Full Stack Foundations" course](https://eu.udacity.com/course/full-stack-foundations--ud088) at [Udacity.com](https://www.udacity.com)

Here is the `RegEx` to clean up a video subtitles from a time stamps. The video subtitles are available in lesson resources.
```
\n{0,3}?(\d){1,2}\n[\n\d,: \->]{30}|\n
```

## Working with CRUD
### 1.2 Prerequisites & Preparation
#### Resources for Pre-Requisites and Preparation.
Udacity offers additional courses that cover the pre-requisites to this course:
* [Object-Oriented Python](https://www.udacity.com/course/ud036)
* [SQL](https://www.udacity.com/course/ud197)
* [HTML & CSS](https://www.udacity.com/course/ud304)

#### Installing Git, Virtual Box, and Vagrant
In this course, you'll use a virtual machine (VM) to run a web server and a web app that uses it. The VM is a Linux system that runs on top of your own machine. You can share files easily between your computer and the VM.

__Note__: The VM for this course is the same as the one for the Relational Databases course. If you've completed that course, feel free to keep using the same VM; you do not need to reinstall it.

We're using the Vagrant software to configure and manage the VM. Here are the tools you'll need to install to get it running:

#### Git
If you don't already have Git installed, download Git from https://www.git-scm.com. Install the version for your operating system.

On Windows, Git will provide you with a Unix-style terminal and shell (Git Bash). (On Mac or Linux systems you can use the regular terminal program.)

You will need Git to install the configuration for the VM. If you'd like to learn more about Git, take a look at [our course about Git and Github](https://www.udacity.com/course/how-to-use-git-and-github--ud775).

#### VirtualBox
VirtualBox is the software that actually runs the VM. You can download it from https://www.virtualbox.org. Install the platform package for your operating system. You do not need the extension pack or the SDK. You do not need to launch VirtualBox after installing it.

__Note__: Currently (October 2017), the version of VirtualBox you should install is 5.1. Newer versions are not yet compatible with Vagrant.

__Ubuntu 14.04 Note__: If you are running Ubuntu 14.04, install VirtualBox using the Ubuntu Software Center, not the virtualbox.org web site. Due to a [reported bug](https://ubuntuforums.org/showthread.php?t=2227131), installing VirtualBox from the site may uninstall other software you need.

#### Vagrant
Vagrant is the software that configures the VM and lets you share files between your host computer and the VM's filesystem. You can download it from https://www.vagrantup.com. Install the version for your operating system.

__Windows Note__: The Installer may ask you to grant network permissions to Vagrant or make a firewall exception. Be sure to allow this.

#### Fetch the Source Code and VM Configuration
Windows: Use the Git Bash program (installed with Git) to get a Unix-style terminal.

Other systems: Use your favorite terminal program.

##### Fork the starter repo
Log into your personal Github account, and fork the [fullstack-nanodegree-vm](https://github.com/udacity/fullstack-nanodegree-vm) so that you have a personal repo you can push to for backup. Later, you'll be able to use this repo for submitting your projects for review as well.

##### Clone the remote to your local machine
From the terminal, run the following command (be sure to replace <username> with your GitHub username): `git clone http://github.com/<username>/fullstack-nanodegree-vm fullstack`

This will give you a directory named `fullstack` that is a clone of your remote `fullstack-nanodegree-vm` repository.

#### Run the virtual machine!
Using the terminal, change directory using the command `cd fullstack/vagrant`, then type `vagrant up` to launch your virtual machine.

Once it is up and running, type `vagrant ssh`. This will log your terminal into the virtual machine, and you'll get a Linux shell prompt. When you want to log out, type `exit` at the shell prompt. To turn the virtual machine off (without deleting anything), type `vagrant halt`. If you do this, you'll need to run `vagrant up` again before you can log into it.

Now that you have Vagrant up and running type `vagrant ssh` to log into your virtual machine (VM). Change directory to the `/vagrant` directory by typing `cd /vagrant`. This will take you to the shared folder between your virtual machine and host machine.

#### Sharing files between the vagrant virtual machine and your home machine.
Be sure to change to the `/vagrant` directory by typing `cd /vagrant` before creating new files or pasting files that you want to be shared between your host machine and the VM.

### 1.3 Project Introduction - CRUD
Let's create a web application that allows us to create multiple restaurant menus without having to change the source code. \
We want to be able to
* create menu items,
* read the items we've created,
* update our menu items,
* and delete items from time to time.

Hm, sounds like we need to make some CRUD. \
What's so special about CRUD, you ask? Well, this four letter acronym encapsulates all of the actions a user does on a data-driven website. \
Each time we make a new profile, post a new status, write a new blog entry, upload a new pic, or add a new item to a menu, we are creating new data to be stored in our database. \
Whenever we look through a friend's latest tweets and pics, or skim through our news feed, we are reading data that was already stored in an application's database. \
When we correct the typo on a blog post we already made, modify the item quantity in our shopping cart, or change our profile information, we are performing an update on existing information in the database. \
And when it's time to erase that embarrassing baby pic from our profile or get rid of those items in our shopping cart, we're deleting information in the database. \
Virtually everything we do on the web can be summarized with one little acronym, CRUD. I want you to take a look at a few common website actions and then decide what the CRUD is going on.

### 1.13 Creating a Database and ORMs
So for this menu project, I want to create an application where I can make various restaurant menus with various items, often within one application. \
All restaurant menus in the general sense contain the same thing. Some have a few appetizers, some entrees, a few desserts, and of course some beverages. \
To keep things simple, let's call all of these things menu items. And all of my menu items belong to a specific restaurant menu. I\
t also would be helpful to have a price and brief description for each of our menu items. An important early design decision to make is how to model my database. \ There is more than one correct way to structure a database, but there is no need to make things too complicated. Let's walk through the process of making a database layout together. \
1. We have a restaurant table to represent all of the restaurants in our database, along with a corresponding name and ID number. \
2. Then we have a table of menu items. Each menu item will have a name, an ID, a description, a price, and a course to categorize whether it is an appetizer, entree, dessert or beverage. We will also provide a restaurant ID to assign a foreign key relationship with our restaurant table. \

Okay. So we've planned out how we will design our database. Now let's get to coding it up. If you've used SQL before you might be used to writing something like this.
```py
import sqllite3
conn = sqllite3.connect('restaurantmenu.db')

c = conn.cursor()
c.execute('''
          CREATE TABLE restaurant (
              id INTEGER PRIMARY KEY ASC,
              name varchar(250) NOT NULL
          )
''')

c.execute('''
          CREATE TABLE menu_item (
              id INTEGER PRIMARY KEY ASC,
              name varchar(250),
              price varchar(250),
              description varchar(250) NOT NULL,
              restaurant_id INTEGER NOT NULL,
              FOREIGN KEY(restaurant_id) REFERENCES restaurant(id)
          )
''')
```
If you're not an SQL expert it might be a little hard to understand though. Now there is nothing wrong with this code, but let's take a look at it for a second. Using raw SQL we have this inquiries to the database as strings. This works, but our Python compiler has no way of helping me if I make a typo or reference a table that doesn't exist. \
Every other data structure we use in Python is some type of object. So why not treat our database queries, tables, and rows as objects as well. Well this concern isn't a unique one, and developers have created tools for this very problem. \
__Object-Relational Mappers__, or __ORM__'s, can be thought of like a translator. Converting our code from one form to another. If we send off code written in Python or any other preferred programming language, it is transformed by the ORM into SQL and sent off to our database. \
The ORM also gets results from an SQL statement and allows us to use it as an object from within our Python code.

### 1.14 Introducing SQLAlchemy
SQL Alchemy is an open source ORM for Python with a slew of features. Not to mention this awesome [Getting Started tutorial](http://www.sqlalchemy.org/library.html#tutorials). There's a lot of information on this page. \
But let's just focus on setting up our database and tables for now. If you're using the Vagrantfile, SQLAlchemy is already installed on your virtual machine. \
If you are not using Vagrant, you can install SQLAlchemy from the link below to follow along.
* [Link for SQLAlchemy](http://www.sqlalchemy.org/)

### 1.18 Putting It All Together
First we are navigating to `~/vargant` directory with command `cd /vagrant`. \
Then we can create a subdirectory for our project, let's call it `menu`, we create it with command `mkdir menu` and jump into it `cd menu`. \
Create a file named `database_setup.py` with `touch database_setup.py`.
Copy the following code inside:
```py
import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()

class Restaurant(Base):
    __tablename__ = 'restaurant'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)


class MenuItem(Base):
    __tablename__ = 'menu_item'

    name = Column(String(80), nullable=False)
    id = Column(Integer, primary_key=True)
    description = Column(String(250))
    price = Column(String(8))
    course = Column(String(250))
    restaurant_id = Column(Integer, ForeignKey('restaurant.id'))
    restaurant = relationship(Restaurant)


engine = create_engine('sqlite:///restaurantmenu.db')

Base.metadata.create_all(engine)
```
Run this code __from the same directory__ where it is located.
```
vagrant@vagrant:/vagrant/menu$ python database_setup.py
```
Looking in the same folder, where we have our code, we see a new `restaurantmenu.db` file. This is our empty database. \
Now that we have an empty database, let's figure out how to populate it with some information.

### 1.21 CRUD Create
Now that we have an empty database, let's populate it with some information. With SQL, we would need to execute
an insert command with all of the information we want it to populate into our database. \
Using SQLAlchemy, creating a new database is as easy as creating a new object in Python. \
I will be executing these operations from the Python shell, but they could also be done from within a Python script. We must first import the following dependencies from SQLAlchemy and the empty database we created into our environment. We will see what they do in just a second.
```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
```
From our `database_setup.py` file that we created, let's import our base restaurant, and menu classes. \
```py
from database_setup import Base, Restaurant, MenuItem
```
The `create_engine` function lets our program know which database engine we want to communicate with.
```py
engine = create_engine('sqlite:///restarauntmenu.db')
```
Then let's bind the `engine` to the `Base` class with the following command.
```py
Base.metadata.bind = engine;
```
This command just makes the connections between our class definitions and the corresponding tables within our database. \
The next thing I'm going to do is create a `sessionmaker` object.
```py
DBSession = sessionmaker(bind=engine)
```
This establishes a link of communication between our code executions and the engine we just created. \
In order to create, read, update or delete information on our database, SQLAlchemy executes database operations via an interface. It's called a session. A session allows us to write down all the commands we want to execute, but not send them to the database until we call a commit. \
Here, I'll show you what I mean. I'm going to create an instance of a `DBSession` and call it session for short.
```py
session = DBSession()
```
From now on, when I want to make a change to my database, I can do it just by calling a method from within session. The `DBSession` object gives me a staging zone for all of the objects loaded into a database session object. Any change made to the objects in the session won't be persisted into the database until I call `session.commit`. \
Now as I promised, making a new entry in our database is as easy as making a new object in Python. \
Take a look at these three lines of example code and watch as I implement them to create a new restaurant in my database.
```py
newEntry = ClassName(property="value", ...)
session.add(newEntry)
session.commit()
```
Following this example, I'll make my first restaurant like so. As you can see, it's just an instance of my restaurant class with a name attribute that I decided to give it, `Pizza Palace`. \
```py
myFirstRestaurant = Restaurant(name="Pizza Palace")
```
To persist my new restaurant into the database, I must do two more session operations.
* First by calling `session.add` my first restaurant, my restaurant object is in the staging zone to be added to the database.
```py
session.add(myFirstRestaurant)
```
* Then with `session.commit` it's now stored to my database.
```py
session.commit()
```
But how do I know it worked? \
Well, I can also use the `session` to interact with my database and see what's inside of it. \
If I execute `session.query(Restaurant).all()`, I'm asking my session to go into the database, find the table that corresponds to the `restaurant` class and find all the entires in that table and return them in a list. \
```py
print session.query(Restaurant).all()
```
When I run this, I get a response with something like, `database_setup.Restaurant object at and some hexadecimal number`. \
> <bound method Query.all() of <sqlalchemy.orm.query.Query object at 0xb6a44d6c>>

This just lets us know that Python found a restaurant in our database and represents it as an object at this location in memory. I'm sure you're thinking, well that's great but how's it useful to me? \
We'll go into more detail about the query method when we focus on reading data out of our database. \
So now, let's add a `MenuItem` to our `Pizza Palace` menu. Since our `MenuItems` all belong to a Restaurant, and have a few more attributes, we have to provide a bit more information in our declaration. \
I can create a `Cheese Pizza` by executing the following command.
```py
cheesePizza = MenuItem(name="Cheese Pizza", description="Some description", course="Entree", price="$8.99", restaurant=myFirstRestaurant)
session.add(cheesePizza)
session.commit()
```
Notice that I provided all of the fields of information for a `MenuItem` here and specify the foreign key relationship
to the object name of my restaurant. \
In order for this operation to work, I didn't have to fill out every entry unless I specified it as nullable equal
to false in our `database_setup.py` file. \
Now let's run `session.query(MenuItem).all()` to see that an object now exists for our `cheesePizza` item, as well.
```py
session.query(MenuItem).all()
```
Now that you know how to add data to a database, it's your turn to get some practice at it.

### 1.23 CRUD Read
Now that we have a database that's not empty, let's start reading from it. In the last video, you saw me call
`session.query(Restaurant).all()`. \
If I create a variable called `firstResult` and set it equal to `session.query(Restaurant)` and
use `.first()` this time, I now have a variable that corresponds to a single row in my database.
```py
firstResult = session.query(Restaurant).first()
```
These single row references allow me to extract column entries as method names. So if I were to write `firstResult.name`...
```py
print firstResult
print firstResult.name
```
... I'm given the name of my `Restaurant` object as it is stored in the database.
> <database_setup.Restaurant object at 0xb6962dac> \
> Pizza Palace

Currently, I only have one restaurant and one `MenuItem` stored in my database. \
Well that's kind of boring, but with the help from some fellow Udations I've created a Python script that will populate my database with several different `Restaurant`s and `MenuItem`s popular amongst the Udasity team. \
Download the `lotsofmenus.py` script into your working directory and execute it from the command line as so. \

Now when we perform executions like `session.query(Restaurant).all()` ...
```
print session.query(Restaurant).all()
```
... we get back a whole list of results. \
So what happens when I have a query that returns a collection of results and we want to display column information for each item? \
For this, we can use a python for loop to return the data that we want to see. \
Here, let's do an example. \
I will make a variable called `items` and set it equal to a query that retrieves all of my menu items. \
Now, I can `say for item in items`, `print item.name`.
```py
items = session.query(MenuItem).all()
for item in items:
    print item.name
```
Now I get back a printed line of each item name in our database. \
SQL Alchemy has an extensive collection of queries we can perform on our database. \
Take some time to explore the [query documentation here](http://docs.sqlalchemy.org/en/rel_0_9/orm/query.html) and play around with the database for a while. \
When you're ready, move on to some of the challenge problems in the next section.

### 1.25 CRUD Update
So, we know how to create and read from our database entries, but how do we update existing data within our database? \
It seems we have a situation on our hands that calls for this. \
Veggie burgers across town have been all the rage, causing rapid price competition amongst our restaurants. Urban Burger wants to cut the price of their veggie burger to $2.99. \
With SQLAlchemy, performing an update like this is a pretty simple, four-step process.
1. First, we execute a query to find the veggie burger we want and store it in a variable.
2. Second, we declare the new price of the variable.
3. Next, we add the variable to our session.
4. And, finally, we commit the session to the database.

Follow along as I do this from the Python shell.
So, the first step in our update process is to find the exact item we want to update. \
Looking at the SQLAlchemy documentation for queries, I see we have a `filter_by` feature that lets us filter queries based on attribute entries, like `name`. Let's go to our Python shell and give it a try. \
So, let's use the `filter_by` function to find all the veggie burgers in our `restaurant` menu database. \
Following the syntax from the documentation, I append `.filter_by` to my query on `MenuItem`s and set the `Veggie Burger` as the name of the menu item I want to search for.
```py
veggieBurgers = session.query(MenuItem).filter_by(name='Veggie Burger')
```
Then, I store it in the variable named `veggieBurgers`. The `filter_by` function always returns a collection of objects. So, let's create a for loop to iterate over each object and retrieve the information about each of these veggie burgers. Inside our for loop, let's print out the ID of each veggie burger, its current price, and the restaurant it belongs to. \
I'm also going to print a new line character to make our results a little bit easier to read. \
```py
for veggieBurger in veggieBurgers:
    print veggieBurger.id
    print veggieBurger.price
    print veggieBurger.restaurant.name
    print "\n"
```
When I close my for loop and execute, I get back a list of all the veggie burgers in my database. \
>
4 \
$5.99 \
Urban Burger

23 \
$9.50 \
Panda Garden

29 \
$6.80 \
Thyme for That Vegetarian Cuisine

39 \
$7.00 \
Andala's

45 \
$9.50 \
Auntie Ann's Diner'

The first one here is from `Urban Burger` and has an ID of eight (__can be different on your machine__). \
Now, I will create another query where I only return the menu item with an `ID` of eight. \
I will store it as `UrbanVeggieBurger`. If I append the `.one()` function to the end of my query, I make sure SQLalchemy only gives me the one object I want, instead of a list that I would have it iterate over. \
Just to double check we have the right burger, let me go ahead and check its price.
```py
# step 1
urbanVeggieBurger = session.query(MenuItem).filter_by(id=4).one()
print urbanVeggieBurger.name
print urbanVeggieBurger.price
```
> Veggie Burger \
$5.99

Yep, the veggie burger costs $5.99, just like it did in our first query. \
Now, let's reset the price of the Urban Veggie Burger to $2.99.
```py
# step 2
urbanVeggieBurger.price = '$2.99'
```
We can then add the `UrbanVeggieBurger` object to our session and commit it to the database.
```py
# step 3. add object back to DB model
session.add(urbanVeggieBurger)
# step 4. commit cahnges to database
session.commit()
```
So now, if we execute the same original query `veggieBurgers = session.query(MenuItem).filter_by(name='Veggie Burger')` to see all the veggie burgers in our database, we see that Urban Burger's veggie burger now has a price of $2.99. \
Now, let's assume all the other restaurants have reacted to Urban Burger's audacious price drop and want to set their burger prices to $2.99 as well. \
Let's use our same for loop and modify it a bit to change the price of all the veggie burgers in our database to $2.99. \
I'm going to use this if statement to avoid unnecessary database updates to an entry that already has a price of $2.99, and just update the other veggie burger menu items.
```py
for veggieBurger in veggieBurgers:
    if veggieBurger.price != '$2.99':
        veggieBurger.price = '$2.99'
        session.add(veggieBurger)

session.commit()
```
Now, querying a third time, I see all the veggie burgers in our menu have the same price. \
Let's get a little more practice with updates by answering the following quiz questions.

Links:
* Check out the [documentation](http://docs.sqlalchemy.org/en/rel_0_9/orm/query.html) for queries with SQLAlchemy

### 1.27 CRUD Delete
Most of the times, having data in our database is a good idea. But sometimes, we make a few bad ideas that we may want to delete, later. \
`Auntie Ann's Diner` just realized, that their spinach ice cream wasn't a hit, and wants to remove it from their menu. \
Deleting an item is a three step process similar to updating.
1. First, we want to execute the query to find the `spinach ice cream`, and store it in a variable.
2. Then we want to call `session.delete()` on that variable.
3. And finally, we'll commit the session.

Let's go back to the Python shell, and walk through this together. \
Let's assume, Auntie Anne's was the only restaurant with `spinach ice cream`, and use the `.one()` function, to grab this entry in the database. \
To double check, I will print out the name of the restaurant, this menu item belongs to and all other parameters.
```py
spinach = session.query(MenuItem).filter_by(name='Spinach Ice Cream').one()
for field in spinach.__dict__:
    print '%s = %s' % (field, spinach.__dict__[field])
```
And see that it is indeed, `Auntie Ann's` creation. \
We will call `session.delete()` to stage this item for removal from the database, and then call `session.commit()` to persist this change.
```py
session.delete(spinach)
session.commit()
```
If we search for spinach now, the sqlalchemy gives us, a `No row was found for One()` error, letting us know that this data is no longer in our database.

### 2.2 Review of Clients, Servers and Protocols
Clients and servers can be most simply understood as computers communicating across the Internet. \
We define the client as the computer that wants information, and the server as the computer that has information that can be shared with clients. \
This means that a client has to initiate communication to request information, while the server constantly stays listening for any clients to communicate with it, and responds with the data that the client requested. \
Let's briefly discuss some of the important concepts in order to better understand how this actually happens. \
So we know that clients and servers can communicate with each other, but how do we know that they're all speaking the same language? Well, protocols are like the grammatical rules that we use to make sure all machines on the Internet are communicating in the same way. There are several protocols that computers on the Internet adhere to.  \
The most common three are
* the __Transmission Control Protocol__, or __TCP__,
* the __Internet Protocol__, __IP__,
* and the __HyperText Transfer Protocol__ or __HTTP__.

The Transmission Control Protocol or __TCP__ enables information to be broken into small packets and sent between clients and servers. If a packet is lost somewhere along the way the sender and receiver have a way of figuring out which of the packets is missing and request that they be resent. \
The __counterpart to TCP__ is __UDP__, __User Datagram Protocol__, which is good for streaming content like music or video. \
Similar to postal addresses, __IP__ addresses allow messages to be properly routed to all participants on the Internet. For simplicity's sake, we can assume that every device on the Internet gets an IP address that is either statically or dynamically assigned by the Internet service provider. \
Here's the IP address of my laptop, and here is the IP address for Google. When I type google.com into my browser, my computer first figures out the IP address of Google by looking it up in a __Domain Name Server__, or __DNS__. \
Think of DNS as a big online phonebook that finds the IP address of web URLs. Once DNS gives my computer the IP address, it uses that address to initiate communication with the server for Google. \
Since multiple applications using the Internet can run on one machine, operating systems use ports to designate channels of communication on the same IP address. Placing a colon after an IP address, with another number indicates that we want to communicate on a specific port on the device using that IP address. On most machines, port numbers can range from 0 to 65,536. The first 10,000 ports are often times reserved by the operating system for a specific use. \
Port 80 is the most common port for web servers. So most websites we use every day are hitting port 80 when they reach a server. 8080 is also a common port for web communications. When client and server applications are on the same machine we indicate this with the term __localhost__. Localhost also has a special IP address of 127.0.0.1. Whenever we type localhost, or this special IP address into a browser or web application, the operating system knows to look for this resource locally and not go out to the Internet.

### 2.3 HTTP and Response Codes
The main concept of HTTP is that clients tell servers what they want by using an HTTP verb, also know as an HTTP method. There are nine HTTP verbs in the current HTTP specification. \
The two most commonly used methods for websites though, are `GET` and `POST`. \
A `GET` request can be thought of as the client telling the server, get me some information that you have. \
Or, a `POST` can be thought of as the client saying, I want to modify some information that you have. \
`GET`s are sometimes called safe methods, since they are only used to retrieve existing data from the database, whereas `POST`s call for data to be added, removed, or changed on a server. \
We know that the client prefixes requests to the server with HTTP verbs. So, how does the server reply? \
Status codes are the server's reply to a client as to what happened after a specific request. In addition to a status code, a server can also supply any requested resources the client requested, such as HTML, CSS and JavaScript, and media files such as images and audio. \
Some common __response codes__ are `200`, which indicates a successful `GET` request, `201` or `203`, which is a successful `POST` request, and `404`, which indicates that we were looking for a file on the server, and the server couldn't find it. \
For much more information, see [MDN on HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). \
In the next section, we'll put all of these concepts together as we create our own web server in Python.

### 2.4 Building a Server with HTTPBaseServer
In the previous video, I introduced a lot of new concepts that may or may not be familiar to you. To see all of these concepts in action, in this section we're going to build our own web server in Python that not only renders web pages in a browser, but by processing data submitted by the user, can create a unique web page each time a user modifies the input. \
To get started let's create a new Python file called `webserver.py` and save it in the same directory as your `restaurantmenu.db`. And `databasesetup.py` files so we can access it from our vagrant machine. \
Follow along with me using Sublime or your favorite text editor. One of the cool things about Python is that it comes with a large collection of libraries we can use right out of the box. We will be using the HTTP base server library extensively to create this project. \
Take a minute to skim over the `HTTPBaseServer` [documentation](https://docs.python.org/2/library/basehttpserver.html) on the official Python documentation website. I will add
```py
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
```
to the first line of my `webserver.py` file to be able to take advantage of this `BaseHTTPServer` functionality. \
Our web server code will have two main sections, the `main` method and the `handler` class. \
In `main` we instantiate our server and specify what port it will listen on. \
Our `handler` code indicates what code to execute based on the type of HTTP request that is sent to the server. \
I will start by coding a `main` method as the entry point of my code.
```py
def main():
```
I'll add next block of code at the end of my file to immediately run the `main` method when the Python interpreter executes my script. \
```py
if __name__ == '__main__':
    main()
```
Inside this `main` method, I will add a `try except` block. The Python interpreter will try to attempt the code inside the `try` block. And if a defined event occurs, we can exit out of the code with an `exception`. \
The `exception` I want to handle is `KeyboardInterrupt`.  This is a built-in exception in Python that can be triggered when the user holds `Ctrl+C` on the keyboard.
```py
def main():
    try:

    except KeyboardInterrupt:

```
Going back inside my `try` block, I will create an instance of an `HTTPServer` class. \
Looking at the documentation for `HTTPServer`, I see that I can create a web server like so. In the documentation we also see that `HTTPServer` is built off of a `TCPServer` class, indicating the transmission protocol that this server will use. \
Server address is a tuple that contains the `host` and `port` number for our server. I will leave `host` as an empty string and specify our `port` number with an integer. I will define port in a separate variable, and create my server instance as so. \
Notice that I just made up a name, `webServerHandler`, for the request handler class. I will define my `webServerHandler` in the next section of code. But first, let me add some finishing code to the `main` method. After I create the server I'll add a `print` statement to know that my server is running. Then I will use this `serve_forever` function built into my `HTTPServer` to keep it constantly listening until I call `Ctrl+C` or exit the application. \
```py
    try:
        port = 8080
        server = HTTPServer(('', port), WebServerHandler)
        print "Web Server running on port %s" % port
        server.serve_forever()
```
Inside my `KeyboardInterrupt` exception I will shut down the server by calling `server.socket.close`. And I have another `print` statement, just letting me know that the server was properly stopped.
```py
    except KeyboardInterrupt:
        print " ^C entered, stopping web server...."
        server.socket.close()
```
Above my `main` method, I will now define the `webServerHandler` class that I called in my `HTTPServer`, and have it extend from a class called `BaseHTTPRequestHandler`. The `do_GET` function handles all get requests our web server receives. In order to figure out which resource we are trying to access, we will use a simple pattern matching plan that only looks for the ending of our URL path. Let's create another `try except` block for our `do_GET` method. \
The `BaseHTTPRequestHandler` provides us a variable called `path` that contains the URL sent by the client to the server as a string. I will make an `if` statement that looks for the URL that ends with `/hello`. \
I will tell my web server to send a response code of `200` indicating a successful `GET` request. \
I will use the `send_header` function to indicate that I'm replying with `text` in the form of `HTML` to my client along with this `end_headers` command which just sends a blank line indicating the end of our HTTP headers in the response. Now that I've created the response I can include some content to send back to the client. I'll create an empty string for now and name it `output`. In the next line I will add a message with some HTML and body tags to my output stream. I can use the `self.wfile.write` function to send a message back to the client. So I'll go ahead and put my `output` string there. I'm going to add a `print` statement for now, just so I can see my `output` string in the terminal. This might come in handy for debugging. Then I can exit my `if` statement with the `return` command.
I will also write an exception for `IOErrors`, and use the following line of code to notify me of a `404` or `file not found` error. Now, I think I'm ready to test and see what I've written thus far in the browser.
```py
class WebServerHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path.endswith("/hello"):
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            output = ""
            output += "<html><body>Hello!</body></html>"
            self.wfile.write(output)
            print output
            return
        else:
            self.send_error(404, 'File Not Found: %s' % self.path)


def main():
```

### 2.5 Running a Web Server
I will save the `webserver.py` file, navigate to it from within my vagrant machine, and execute it writing `python webserver.py`. \
The Vagrant environment for this course is already configured to forward port 8080 requests from the host machine to port 8080 on the Vagrant machine. So if we open up a browser and visit the URL `localhost8080/hello` look, our server recognized the `GET` request and responded with the code that we wrote. From the Vagrant machine, we can also see the `GET` request it received from the browser and the code we sent as a reply. Try and create this code on your own. If you run in to any problems, a functioning version of this python code, can be found in the instructor notes.

### 2.6 Port Forwarding
Your Vagrant File for this course looks something like this:
```
Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-16.04-i386"
  config.vm.box_version = "= 2.3.5"
  config.vm.network "forwarded_port", guest: 8000, host: 8000, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 8080, host: 8080, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 5000, host: 5000, host_ip: "127.0.0.1"
```
Port forwarding allows us to open pages in our browser from the web server from our virtual machine as if they were being run locally. See which ports are being used for this class. If you want to use another port you can add another line to the vagrant file and run "vagrant reload" from a terminal in the directory of your vagrant file on your host machine. More information about port forwarding is available [here](https://docs.vagrantup.com/v2/networking/forwarded_ports.html).

### 2.7 Responding to Multiple GET Requests
We have a server that can say hello, so now let's add some more functionality to it. Most modern websites have more than just one page, so let's figure out how to add this feature to our web server. \
In this section we will see that our server can handle different types of `GET` requests, and respond with different types of messages. \
Instead of replying with `hello`, let's make a page that also replies in Spanish when we visit the `hola` URL. \
I'm going to copy my `if` block from before and paste it below. I will change the message that said `hello` in English, to `hola` in Spanish, using this special entity code that HTML will render as an upside-down exclamation point. I will also add an anchor tag to link back to my original `hello` page, just so we can see how that's done here.
```py
if self.path.endswith("/hola"):
    self.send_response(200)
    self.send_header('Content-type', 'text/html')
    self.end_headers()
    output = ""
    output += """
    <html>
        <body>
            &#161 Hola!
            <a href = '/hello'>Hello?</a>
        </body>
    </html>
    """
    self.wfile.write(output)
    print output
    return
```
Now, I'm ready to try and run this and see what happens.

### 2.9 Adding POST to Web Server
So now that I have a good understanding of `do_GET`, let's take this web server to the next level with some `POST` functionality. `GET`s are good for viewing information all ready on the server, but `POST`s are what allow the user to customize their web experience. `GET` requests happen simply by visiting the URL in a browser, but `POST` requests from a browser require data to be submitted, like with a form. I'm going to add a `POST` method such that our server doesn't just say hello or hola, but whatever the user prompts as a salutation. \
On the same level as my `do_GET` method, I will create another method called `do_POST`, which overrides the method in the `BaseHTTPRequestHandler` super class, just like `do_GET`. I'll make another `try except` block, similar to my `do_GET` method. When I receive a `POST` request, I'll send off the response code that indicates a successful `POST`. Next, I need to decipher the message that was sent from the server. In order to do this, I'm going to use some message from the __CGI__, or __common gateway interface__, library in Python. So I'll add `import cgi` to the top of my file.
Let's take a look at the following chunk of code I'm going to add.
```py
def do_POST(self):
    try:
        self.send_response(301)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

        ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
        if ctype == 'multipart/form-data':
            fields = cgi.parse_multipart(self.rfile, pdict)
            messagecontent = fields.get('message')
        # ...1
        # ...
    except:

```
This `cgi.parse_header` function parses an HTML form header, such as `content type`, into a main value and dictionary of parameters. \
After that, we check and see if this is form data being received. I then make a variable called `fields`, which we use the `cgi.parse_multipart` to collect all of the fields in a form. \
Then I will make a variable called `messagecontent` to get out the value of a specific field or set of fields and store them in an array. I will call this field `message` here, and when I create my HTML form. So now that I've received a `POST` request, I can decide what to tell the client with the new information I've received. \
I will create an empty string named `output` again and then add some opening HTML tags to it. I'll have my server respond with, okay, how about this. And then return the first value of the array that was created when I submitted the form. Hm? \
```py
        # ...1
        output = ""
        output += "<html><body>"
        output += " <h2> Okay, how about this: </h2>"
        output += "<h1> %s </h1>" % messagecontent[0]
        # ...2
```
Well you might be thinking, hey, you haven't even created an HTML form, but keep talking about it in the `POST` handler. And you'd be right. So I'll go ahead and do that now. In this line of HTML code, I'm adding a `POST` request along with the header tag, to `prompt` the user to input some data. \
```py
        # ...2
        output += '''
        <form method='POST' enctype='multipart/form-data' action='/hello'>
            <h2>What would you like me to say?</h2>
            <input name="message" type="text" >
            <input type="submit" value="Submit">
        </form>'''
        # ...3
    except:
```
Here, I wrote the name of my input field as `message`, to coincide with the `message` field I'm extracting data from in the `POST` request. I'm going to copy this line of code and paste it into my hello and hola get requests, so this form will be present on their pages as well.
```py
def do_GET(self):
    try:
        if self.path.endswith("/hello"):
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            output = ""
            output += "<html><body>"
            output += "<h1>Hello!</h1>"
            output += '''
            <form method='POST' enctype='multipart/form-data' action='/hello'>
                <h2>What would you like me to say?</h2>
                <input name="message" type="text" >
                <input type="submit" value="Submit">
            </form>'''
            output += "</body></html>"
            self.wfile.write(output)
            print output
            return

        if self.path.endswith("/hola"):
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            output = ""
            output += "<html><body>"
            output += "<h1>&#161Hola</h1>"
            output += '''
            <form method='POST' enctype='multipart/form-data' action='/hello'>
                <h2>What would you like me to say?</h2>
                <input name="message" type="text" >
                <input type="submit" value="Submit">
            </form>'''
            output += "</body></html>"
            self.wfile.write(output)
            print output
            return
```
I will also separate out my opening and closing `html` tags on their own line of code. Let me not forget to close the `body` and `html` tags in my `POST` handler. Send the output out to the server and `print` out the output for debugging. In my exception block, I will just leave it as `pass` for now.
```py
        # ...3
        output += "</body></html>"
        self.wfile.write(output)
        print output

    except:
        pass
```
Let's see these new changes in action from the web browser.

## 3. Developing with Frmeworks
### 3.2 Overview
In this lesson, you'll create a menu app, using the __Flask__ framework. \
I will start by showing you the basic components of a Flask application, with a simple hello world program, which you will then create on your own. \
Then we will connect to our database via SQL Alchemy to view all of the items in each restaurant menu. \
Next, you will learn about templates, and how they allow you to write HTML code, separately from Python code. Keeping your application more organized. \
After that, I will introduce a special function in Flask called `url_for`, which builds the URLs that you will use to navigate through your new Flask application. \
We will then create forms to capture data from users, and use message flashing to notify the user each time they successfully change information in the database. \
I will discuss a way to use flash to add the option to send JSON messages instead of HTML. \
And finally, take some time to style our app with some CSS.

### 3.3 Running Your First Flask Application
Let's go ahead and create our first application in Flask. \
Create a file named `project.py` in the same directory as the `database_setup.py` file. \
A minimal Flask application looks something like this.
```py
from flask import Flask
app = Flask(__name__)

@app.route('/')
@app.route('/hello')
def HelloWorld():
    return "Hello World"

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
```
Let's take a look at this code together and see what's going on. \
1. First, I imported this `Flask` class `from` the `flask` library.
2. Next, I create an instance of this class with the `__name__` of the running application as the argument. Anytime we run an application in Python, a special variable called `__name__` gets defined for the application and all of the imports it uses. The application run by the Python interpreter gets a name variable set to `__main__` whereas all the other imported Python files get a `__name__` variable set to the actual name of the Python file.
3. Next, I have this thing that looks like a function, but starts with an `@` symbol. This is called a __decorator__ in Python. This decorator essentially wraps our function inside the `app.route` function that Flask has already created. So if either of these `route`s get sent from the browser, the function that we define here gets executed. If this is difficult to follow, it's okay. I'll provide a [link in the instructor notes](http://simeonfranklin.com/blog/2012/jul/1/python-decorators-in-12-steps/) if you're interested in learning more about decorator functions. Just know that this `@app.route` piece of code will call the function that follows it whenever the web server receives a request with a URL that matches its argument. So in this case, if we visit the root of my site at `localhost:5000/` or `localhost:5000/hello`, this `HelloWorld` function will be invoked. Inside my `HelloWorld` function, I return the message I want to display to the user's browser.
4. Jumping to the last line of our code, I use the run function to run the local server with our application. The if statement here makes sure the server only runs if the script is executed directly from the Python interpreter, and not used as an imported module. So basically, this line of code says, if you're executing me with the Python interpreter, then do this. But if you're importing me into another Python file don't do this, but you still have access to the rest of the code. By default, the server is only accessible from the host machine and not from any other computer. This is the default because in debugging mode, a user of the application can execute arbitrary Python code on your computer. Since we're using a vagrant environment for this course, we must make our server publicly available by changing the call of the run method to look like this.
```py
    app.run(host='0.0.0.0', port=5000)
```
This tells the web server on my vagrant machine to listen on all public IP addresses. \
Restarting our server each time we make a modification to our code can get pretty annoying but Flask can take care of this for us. If you enable `app.debug` support the server will reload itself each time it notices a code change. It will also provide you a helpful debugger in the browser if things go wrong. \
I'll save this code as `project.py` in the same directory as my `restaurantmenu.db` file and execute it with the Python interpreter. Visiting `localhost:5000`, or `localhost:5000/hello`, I see the output of my code. To stop the server, I hit `Ctrl+C`. \
So we see that with much fewer lines of code, I executed a similar version of our `Hello World` from lesson two. \
Notice that with Flask we don't have to explicitly write out response codes anymore. You will soon see that this is just one of the several features frameworks take care of automatically for the developer.

### 3.5 Adding Database to Flask Application
So now that we have a functioning Flask application, let's bring our CRUD functionality into it. \
I will import the code for SQLAlchemy and the database engine in sessionmaker like in Lessons 1 and 2. \
Now I'm going to change my `HelloWorld` function such that it performs this following query to grab the first restaurant out of my database. And list out all of the menu items and stored in a string called output. I'll also add a break line tag to make my output a bit easier to read. I will return this output string so that my user sees it from the browser.
 ```py
from flask import Flask
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, MenuItem
app = Flask(__name__)

engine = create_engine('sqlite:///restaurantmenu.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

@app.route('/')
@app.route('/hello')
def HelloWorld():
    restaurant = session.query(Restaurant).first()
    items = session.query(MenuItem).filter_by(restaurant_id=restaurant.id)
    output = ''
    for item in items:
        output += item.name
        output += '</br>'
    return output

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
 ```
When I save my Python file my flask server instantly refreshes itself. So when I refresh the page I now see all of my menu items listed

### 3.7 Routing
Most modern web applications have elegant URLs. This helps people remember links which then can be easily bookmarked or shared with others. As we saw in previous videos, the `app.route` decorator is used to bind a function to a URL, but there is more to it than just static paths. We can make certain paths of the URL dynamic and attach multiple rules to a function. To add variables to a URL, I can specify a rule with `<type: variable_name>`, where `type` can be an `int`eger, `str`ing, or another `path`.
```
"path/<type:variable_name>/path"
```
I will make a new route for my menu app as so, and use the `restaurant_id` to specify which menu I want to see.
```py
from flask import Flask
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, MenuItem
app = Flask(__name__)

engine = create_engine('sqlite:///restaurantmenu.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
single_session = DBSession()

@app.route('/')
@app.route('/restaurants/<int:restaurant_id>/')
def RestaurantMenu(restaurant_id=12, session=single_session):
    restaurant = session.query(Restaurant).filter_by(id=restaurant_id).one()
    print restaurant_id
    items = session.query(MenuItem).filter_by(restaurant_id=restaurant.id)
    output = ''
    for item in items:
        output += item.name
        output += '</br>'
        output += item.price
        output += '</br>'
        output += item.description
        output += '</br>'
        output += '</br>'
    return output

if __name__ == '__main__':
app.debug = True
app.run(host='0.0.0.0', port=5000)
```
Note that it's handy to leave in this trailing slash, and Flask will render the page, even when it's not there in the URL. I will now save my changes and visit `localhost:5000/restaurants/1/` and see my first restaurant menu there. If I change the integer after `/restaurants/`, I can see other restaurants in my database as well.

Flask Documentation on Routing :
http://flask.pocoo.org/docs/0.10/quickstart/#routing

### 3.9 Templates
Generating HTML from within Python isn't all that fun. I am sure you're getting pretty tired of having to create these strings we've called `output` over and over and over. This can get pretty cumbersome as our application gets more and more complex. Because of that, Flask configures a template engine for you to store your HTML code. \
To render a template you can use this cleverly named method called `render_template`. All you have to do is provide the name of the template and the variables you want to pass to the template engine as keyword arguments.
```py
render_template(templateName.html, keyword = variable)
```
Here I will render a template for my menu items page. Flask will look for my templates in a folder named `templates`. So I'll make a directory called `templates` in the same folder as my Flask application, and from within it I'll create an HTML document and call it `menu.html`. \
But what about when we need to get information from our database or Python code into our HTML? This retrieval of data is called [HTML escaping](http://en.wikipedia.org/wiki/HTML#Character_and_entity_references). Templates in Flask are already pre-configured to handle escape code.
That is, the code that we are retrieving from our application and database, and putting it into our html. With HTML escaping we have access to python variables and functions, and can even get the results added directly into our HTML code.

### 3.11 Template Explanation
```html
<html>
  <body>
    <h1>{{restaurant.name}}</h1>

    {% for i in items %}
    <div>
      <p>{{i.name}}</p>
      <p>{{i.description}}</p>
      <p> {{i.price}} </p>
    </div>
    {% endfor %}

  </body>
</html>
```
All right, so we see that the code with the single bracket and a percent sign on either side `{% ... %}` is the logical code that we want to execute in our HTML, like a `for` loop. \
The double brackets `{{ ... }}` indicate the code that we want it's results printed into the html document itself. \
Since, from within HTML codes, we cannot use indentations to mark the beginning and ending of statements and loops, we must use keywords, like `endfor`, and `endif`, to indicate the end of a loop, or statement. \
Going back to my menu.html, I can see how I'm obtaining the result of a query and executing the output here in my HTML page. I will also need to substitute the code I had in my restaurant menu method, so that instead of returning a string, we will return a rendered template with the new `menu.html` file. \
Since I'm querying on my `Restaurant` and `MenuItems` table, I will path my queries into the template, so that my escape code has access to these variables. I will also need to import the `render_template` function `from` my `flask` library. \
```py
@app.route('/')
@app.route('/restaurants/<int:restaurant_id>/')
def RestaurantMenu(restaurant_id=12, session=single_session):
    restaurant = session.query(Restaurant).filter_by(id=restaurant_id).one()
    items = session.query(MenuItem).filter_by(restaurant_id=restaurant.id)
    return render_template('menu.html', restaurant=restaurant, items=items)
```
By saving and refreshing the page, I see the same code with a few stylistic modifications I added inside of my template. You'll be building your own templates very soon. I just want to talk about two more topics to help you get the most out of them first.

### 3.11 URL Bilding
`url_for` accepts the name of the function as the first argument, and a number of keyword arguments each corresponding to the variable part of the URL rule. So if my URL needs a variable for a restaurant ID and a menu item ID, my `url_for` statement needs to look something like this.
```py
url_for('editMenuItem', restaurant_id = restaurant.id, menu_item_id = item.id)
```
Taking in three arguments for the function it will call and the variables to pass into that function. So back in my template I can add this code inside my anchor tags right after the href equals. Since this is a method in Python and I want the output printed on to my HTML document, I will enclose it with a double brackets.
```html
<html>
  <body>
    <h1>{{restaurant.name}}</h1>

    {% for item in items %}
    <div>
      <p>{{item.name}}</p>
      <p>{{item.description}}</p>
      <p> {{item.price}} </p>
      <p><a href='{{ url_for('editMenuItem', restaurant_id = restaurant.id, menu_item_id = item.id) }}'>Edit</a></p>
      <p><a href = '{{ url_for('deleteMenuItem', restaurant_id = restaurant.id, menu_item_id = item.id) }}'>Delete</a></p>
    </div>
    {% endfor %}

  </body>
</html>
```
When I save my code now, I see that there are edit and delete links for each menu item below. So you may be wondering why you would ever want to build URLs instead of hard coding them into your templates. Well, now if you ever need to change a URL path, with URL building, you can change your URLs all in one place without having to remember to change URLs all over the place from within your application.

### 3.12 Form Requests and Redirects
We know that with HTTP, there are various types of requests that we can send along with URL. \
By default a route in Flask only answers to get requests. But that can be changed by providing the `methods` argument inside the `route` decorator. I will change my `route` to create a new menu item. Such as a response to `GET` and `POST` requests like so.
```py
@app.route('/restaurant/<int:restaurant_id>/new/', methods=['GET', 'POST'])
```
Now that I can respond to `POST` requests, I can make forms for creating and updating menu items. I will make a new template called `newMenuItem.html` like so. Take a second to look over the code.
```html
<html>
  <body>
    <h1>Create a New Menu Item</h1>

    <form action="{{ url_for('newMenuItem',restaurant_id=restaurant_id) }}" method="POST">
      <p>Name:</p>
      <input type="text" size="30" name="item_name" placeholder="new menu item">
      <input type="submit" value="Create">
    </form>

  </body>
</html>
```
Here, I'm making a small `form` with only one entry to create a new menu item name. In order to get data from a `form`, I will input `request`s `from` my `flask` package like so, inside my `project.py` file. \
Inside my `newMenuItem` function, I will create an `if` statement that looks for a `POST` request. \
I can create a `newMenuItem` like so. And extract the `item_name` field from my `form` using the `request.form['item_name']`. After I create the menu `item`, I can then add it to my `session` and `commit()` the `session` to the database. To `redirect` the user back to the main user page I can use a helper function called `redirect` like so. I should remember to import `redirect`, and `url_for`, in order to enable this functionality in my project. \
Now, I need to properly handle the `GET` request, for creating a new menu item. If my server didn't receive a `POST` request, it's going to go ahead and render the template, for the new HTML template that I created, to create a new menu item, passing in the `restaurant_id` as well.
```py
if request.method == 'GET':
        return render_template('newmenuitem.html', restaurant_id=restaurant_id)
    if request.method == 'POST':
        session()
        new_item = MenuItem(name=request.form['name'],
                            restaurant_id=restaurant_id)
        session.add(new_item)
        session.commit()
        session.remove()
        return redirect(url_for('RestaurantMenu', restaurant_id=restaurant_id))
```
Now when I click create new item it takes me to the New Menu Item page and I have successfully created a new menu item

### 3.15 Message Flashing
Good applications and user interfaces, incorporate feedback throughout the user experience. If the user does not get enough feedback they'll probably, end up hating the application. \
We should add a feature, that explicitly notifies the user that the system has responded to their input. \
Flask provides a really simple way to give feedback to a user. Message Flashing is a feature that will prompt a message to the user immediately, after a certain action has taken place, and then disappear the next time the page is requested. We can use our templates to reveal a flash message, wherever and however we want, from within the application. \
To get started, let's import `flash` `from` our `flask` module. Flashing works in Flask by using a concept, called `session`s. This course does not go too, in depth with `session`s. But just know that `session`s are a way, a server can store information across multiple Web pages, to create a more personalized user experience. \
In the bottom of our `project.py` file , let's first add a secret key `app.secret_key`, which flask will use to create sessions for our users. Normally, this should be a very secure password, if our application was live on the Internet but for development purposes, let's just set our key to `super_secret_key`. \
```py
if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
```
To flash the message within our application, we simply use the `flash` function like this.
```py
flash("insert message here")
```
To get a hold of all of the flash messages, we can use `get_flash_messages()`, which will also work from within our templates. So, from within my `newMenuItem` method, I will create a `flash` message, right after I call, `session.commit()`. I will add the message, `"new" menu item created!"`.
```py
        flash("The item '" + request.form['name'] +
              "' is successfully added to database")
```
Now, in my `menu.html` template, I will add the following code.
```html
    {% with messages = get_flashed_messages() %}
    {% if messages %}

    <ul>
      {% for message in messages %}
      <li><strong>{{message}}</strong></li>
      {% endfor %}
    </ul>
    {% endif %}
    {% endwith %}
```
If you are not familiar, with this `with` construct in Python, don't worry. It's just a block that does some automatic clean-up, when the block is exited, that we don't really have to concern ourselves with. If you are curious about the `with` method in Python, I will provide [some resources in the instructor notes](http://effbot.org/zone/python-with-statement.htm). \
The `get_flashed_messages`, is returning an array of messages, that's going to get stored in this variable, called messages. We then loop through the array of message, if it's not empty, and print it out to our HTML document inside an Unordered List. Now, when I save my code, and try making a new item, and flashed with a new confirmation message on my main menu screen.

### 3.17. Styling
So we have a working application now, but we should probably add some style to it, if we want it to be appealing to users. Flask can automatically look for CSS, JavaScript, and media files, if we put them in a folder called `static`. So I will create a folder `static`, in the same directory as my `project.py` file, as so. \
I will create a CSS file, and name it `styles.css`, and store it inside of this directory. By adding this following link to my template files, I will tell Flask to use this `styles.css` file when it renders this template. When I refresh my browser, I turn my old unstyled menu page into one that looks like this. Take some time to add some styles to your menu app. My CSS file and templates can be found in the [instructor notes](https://github.com/udacity/Full-Stack-Foundations/tree/master/Lesson-3/18_Styling).

### 3.18 Responding With JSON
Responding with web pages is great, but sometimes all that needs to be communicated is information. \
For example, let's say that there's a web application out there called Yum that wants to collect our restaurant menus and advertise them to mobile clients based on their location. Free advertising, all right! This app wants to see the restaurants and menus available in our database but doesn't really need to parse through HTML or waste bandwidth receiving CSS files. It just wants the data. \
For this reason, developers have created __API__s, or __Application Programming Interfaces__, that allow external applications to use public information our apps want to share, without all the bells and whistles. \
When an API is communicated over the Internet, following the rules of HTTP, we call this a __RESTful API__. Or __API for the Representational State Transfer__. \
One of the most popular ways of sending data with a restful architecture is with a format called __JSON__, which stands for __JavaScript object notation__. \
JSON uses `"attribute":"value"` pairings which are delimited by a colon. Brackets `{ }` are used to encapsulate individual objects. \
Let's start coding to add this JSON feature to our application. Before we write the JSON function in our Flask menu app, let's first open up the `database_setup.py` and add a decorator `serialize` method tp our `MenuItem` class.
```py
@property
def serialize(self):

    return {
        'name': self.name,
        'description': self.description,
        'id': self.id,
        'price': self.price,
        'course': self.course,
    }
```
This serializable function will help define what data we want to send across, and put it in a format that Flask can easily use. Flask has a built-in package, called `jsonify`, that will allow us to easily configure an API endpoint for our application. I will go ahead and import this package now in my `project.py` file. \
For this lesson we are only going to focus on using a `GET` request to get a collection of restaurant menu items. \
But know that other types of requests can be implemented as well. I will now create a route similar to my restaurant menu page with `/json` at the end. I then create a function and name it `get_restaurant_menu_json` and then perform the same query as in my restaurant menu class. But instead of returning a template, I will return this `jsonify` class and use this loop to serialize all of my database entries.
```py
@app.route('/restaurants/<int:restaurant_id>/json')
def get_restaurant_menu_json(restaurant_id, session=SESSION):
    '''docstring'''
    session()
    restaurant = session.query(Restaurant).filter_by(id=restaurant_id).one()
    items = session.query(MenuItem).filter_by(restaurant_id=restaurant.id)
    session.remove()
    return jsonify(MenuItems=[item.serialize for item in items])
```
Now, if I save and go to `localhost:5000/restaurants/1/menu/json`, I return with the pure data form of my menu in a format that can easily be read by humans and easily parsed by other computers
Links:
* [RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer)
* [JSON](http://en.wikipedia.org/wiki/JSON)

