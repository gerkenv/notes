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



