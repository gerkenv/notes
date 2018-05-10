These notes is one of the parts of the ["Configuring Linux Web Servers" course](https://eu.udacity.com/course/configuring-linux-web-servers--ud299) at [Udacity.com](https://www.udacity.com)

Here is the `RegEx` to clean up a video subtitles from a time stamps. The video subtitles are available in lesson resources.
```
\n{0,3}?(\d){1,2}\n[\n\d,: \->]{30}
```

### 1.5 Getting Started with Vagrant
In this course we’ll be working with Ubuntu. It’s an excellent distribution for a variety of use cases, including web servers. We’ll run our Ubuntu server within a virtual machine, which is a special piece of software running on your computer that acts as if it is a stand-alone computer.

To accomplish this requires a bit of setup but will give everyone the same Linux environment to work within, even if you’re on Windows or OSX currently.

#### Required Software
If you've already downloaded and installed these items, perhaps while completing a different course, you do not need to download and install these items again.
1. Download and install [VirtualBox](https://www.virtualbox.org/wiki/Download_Old_Builds_5_1). This is free software that will run the virtual machine.
2. Download and install [Vagrant](https://www.vagrantup.com/). This is an command line utility that makes it easy to manage and access your virtual machines.

__Note:__ Currently (October 2017), the version of VirtualBox you will want is 5.1. Newer versions do not yet support Vagrant.

#### Course Environment
Follow these steps to setup an environment where you can work on this course:
1. Create a new folder on your computer where you’ll store your work for this course, then open that folder within your terminal.
2. Type `vagrant init ubuntu/trusty64` to tell Vagrant what kind of Linux virtual machine you would like to run.
3. Type `vagrant up to` download and start running the virtual machine

### 1.7 Vagrant Commands
We’re now ready to get started working within our Linux virtual machine. If your download hasn’t completed from the initial setup, go ahead and take a break and come back when that has completed. You won’t be able to make further progress until the virtual machine is up and running as much of the course will take place within this environment. \

Before we access our machine, let’s quickly review a few commands that vagrant provides to make managing your virtual machines much simpler. Remember, your vagrant machine lives within this specific folder on your computer so make sure you’re within that same folder your created earlier; otherwise these commands won’t work as expected.
* `vagrant status` -you the current status of the virtual machine. It should currently read “default running (virtualbox)” along with some other information.
* `vagrant suspend` - suspends your virtual machine. All of your work is saved and the machine is put into a “sleep mode” of sorts. The machines state is saved and it’s very quick to stop and start your work. You should use this command if you plan to just take a short break from your work but don’t want to leave the virtual machine running.
* `vagrant up` - gets your virtual machine up and running again. Notice we didn’t have to redownload the virtual machine image, since it’s already been downloaded.
* `vagrant ssh` - connects to and log you into your virtual machine. Once done you will see a few lines of text showing various performance statistics of the virtual machine along with a new command line prompt that reads `vagrant@vagrant-ubuntu-trusty-64:~$`

Here are a few other important commands that we’ll discuss but you do not need to practice at this time:
* `vagrant halt` - halts your virtual machine. All of your work is saved and the machine is turned off - think of this as “turning the power off”. It’s much slower to stop and start your virtual machine using this command, but it does free up all of your RAM once the machine has been stopped. You should use this command if you plan to take an extended break from your work, like when you are done for the day. The command vagrant up will turn your machine back on and you can continue your work.
*`vagrant destroy` - destroys your virtual machine. Your work is not saved, the machine is turned off and forgotten about for the most part. Think of this as formatting the hard drive of a computer. You can always use vagrant up to relaunch the machine but you’ll be left with the baseline Linux installation from the beginning of this course. You should not have to use this command at any time during this course unless, at some point in time, you perform a task on the virtual machine that makes it completely inoperable.

### 1.10 Your Home Directory
`cd` - goes to `/home/user` directory at linux and to `c:/users/user` at windows. \
`ls -al [path]` - shows also hidden files and directories at `path` in _long_ format. \
[Bash manual: Bash Startup Files](http://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html)

### 1.11 Other Important Directories
So you're all comfortable with your home directory, but surely there's more to this computer than just that. Right? Oh yeah, there is a lot more. \
So let's start exploring some of the other areas of the Linux operating system. We'll do this by cding to the top level root folder with `cd /`. \
If we `ls -al` this directory, we'll see that there's a lot of content here.
```
vagrant@vagrant-ubuntu-trusty-64:~$ cd /
vagrant@vagrant-ubuntu-trusty-64:/$ ls -al
total 84
drwxr-xr-x 23 root    root     4096 Apr 28 19:01 .
drwxr-xr-x 23 root    root     4096 Apr 28 19:01 ..
drwxr-xr-x  2 root    root     4096 Apr 23 21:47 bin
drwxr-xr-x  3 root    root     4096 Apr 23 20:49 boot
drwxr-xr-x 13 root    root     3880 Apr 28 20:31 dev
drwxr-xr-x 96 root    root     4096 Apr 28 19:00 etc
drwxr-xr-x  4 root    root     4096 Apr 28 19:00 home
lrwxrwxrwx  1 root    root       34 Apr 23 20:48 initrd.img -> boot/initrd.img-3.13.0-145-generic
drwxr-xr-x 22 root    root     4096 Apr 23 21:47 lib
drwxr-xr-x  2 root    root     4096 Apr 23 20:47 lib64
drwx------  2 root    root    16384 Apr 23 20:50 lost+found
drwxr-xr-x  2 root    root     4096 Apr 23 20:45 media
drwxr-xr-x  2 root    root     4096 Apr 10  2014 mnt
drwxr-xr-x  2 root    root     4096 Apr 23 20:45 opt
dr-xr-xr-x 85 root    root        0 Apr 28 19:00 proc
drwx------  3 root    root     4096 Apr 28 19:00 root
drwxr-xr-x 22 root    root      800 Apr 28 19:43 run
drwxr-xr-x  2 root    root     4096 Apr 23 21:47 sbin
drwxr-xr-x  2 root    root     4096 Apr 23 20:45 srv
dr-xr-xr-x 13 root    root        0 Apr 28 19:00 sys
drwxrwxrwt  4 root    root     4096 Apr 28 20:17 tmp
drwxr-xr-x 10 root    root     4096 Apr 23 20:45 usr
drwxrwxrwx  1 vagrant vagrant     0 Apr 28 18:49 vagrant
drwxr-xr-x 13 root    root     4096 Apr 28 19:01 var
lrwxrwxrwx  1 root    root       31 Apr 23 20:48 vmlinuz -> boot/vmlinuz-3.13.0-145-generic
```
We're definitely not going to cover all of these, but we'll discuss the most important folders. We're already familiar with home, but there are two other important directories where you'll be making lots of changes and editing files. * `etc` is where configuration files live. As we start setting up our web and database server, we'll be modifying some files within this directory.
* `var` is for variable files. Which is kind of an odd name. Variable files are simply files that you expect to grow or change in size over time. You'll  typically find system and application logs within this directory.

There are a few other directories that are that are important for you to know, but you probably won't be modifying or directly interacting with them.
* `bin` is where executable binaries are stored, that are accessible by all users. These are applications that you run, like the `ls` command we've used a few times already. If you were to list the contents of this directory, you would actually see there's a file called `ls` within it.
* `sbin` is very similar to `bin`, except that these binaries are to only be used by the route user for system administration and maintenance purposes. We'll discuss some of the applications within this directory a bit later.
* `lib` is for libraries that support the binaries that are located around the system.
* `usr` is for user programs. This could seem a bit confusing compared to the `bin` directory. The difference isn't that important. The only difference really is that the binaries within `bin` are required for a boot-up and system maintenance processes, and the binaries in `usr` necessarily aren't required for that.

### 1.13 Understanding $PATH
`echo $PATH` - shows the stored pathes to binaries in a system.
```
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
```
[AskUbuntu: How to Update $PATH](http://askubuntu.com/questions/60218/how-to-add-a-directory-to-my-path)

### 2.2 The Rule of Least Privilege
One of the most important rules in security is the __rule of least privilege__. Put simply, this means a user or an application only has enough permission to do its job, nothing extra.\
You've already experienced this within your virtual machine, although you may not be aware of it yet. When we access our virtual machine, using vagrant ssh. We're logged in as a standard user named `vagrant`. \
Let's try running a command only an administrative user would be allowed to run. Let's list all of the files with
in the ubuntu users ssh directory.
```
vagrant@vagrant-ubuntu-trusty-64:/$ ls -al /home/ubuntu/.ssh
ls: cannot open directory /home/ubuntu/.ssh: Permission denied
```
You see, we get this error here, `permission denied`. \
Only the `ubuntu` user or the `root` user can read the files within this directory. You may be thinking, but I am the administrator of this virtual machine. I am `root`. So how do I actually log in as `root`? It's time to learn about `super user`.

### 2.3 Becoming a Super User
Since every Linux machine comes with the user name `root` and that user is super powerful, they can do anything they want on this machine. It's very common to disable the ability to remotely log in as `root`. Instead, we'll log in as a user we create, and then we can run individual commands as `root` by using another command. This is to make any potential attacker's job a little more difficult by eliminating the `username` that they already know exists on this on this box. \
Our vagrant virtual machine has already set up the security pattern for us and many other cloud providers will do this for you, as well. If not, it's highly advised that this be one of the very first things you do when you're setting up a new server. We'll cover exactly how to do that a bit later. Let's run that same command again, except this time we'll prepend the command with this pseudo command `sudo` here.
```
vagrant@vagrant-ubuntu-trusty-64:/$ sudo ls -al /home/ubuntu/.ssh
total 8
drwx------ 2 ubuntu ubuntu 4096 Apr 28 19:00 .
drwxr-xr-x 3 ubuntu ubuntu 4096 Apr 28 19:00 ..
-rw------- 1 ubuntu ubuntu    0 Apr 28 19:00 authorized_keys
```
Now we see the results. The pseudo command ran this command as if we were root.

### 2.4 `sudo` vs. `su`
It's typically regarded as a best practice that you not use the `su` command. Why? The rule of least privilege that we discussed earlier. Do you really need to switch your entire working context over to the `root` user to run a single, or even a few, commands? What happens if you forget that you are currently within `su`? You could potentially do some extremely damaging operations, and there's no safety net there to warn you when doing so. \
Now, not every user has the ability to work as the superuser. You have to give that user those permissions specifically. We'll cover that in more detail when we start adding new users. For now, you know how to perform operations as the `root` user, and that's all we need to start managing software known as packages on this machine. So let's dive into that a bit.

### 2.5 Package Source Lists
When you need new software, what do you typically do? You might visit an app store like this and download it or you could actually walk into a store and buy a physical copy. You have a lot of different options. You might even say you have a list of options. \
Now how often have you seen software for Linux sitting up on a store shelf? Not very often, if at all. \
But we still have a list of various places we can go to get software. This is called a __package source list__. Let's take a look. \
All of your available package sources are listed in this file `/etc/app/sources.list`. \
Remember when we were discussing distributions, we said each one approves and releases packages in their own way and that's one of the big ways in which they differ. \
```
vagrant@vagrant-ubuntu-trusty-64:/$ cat /etc/apt/sources.list
## Note, this file is written by cloud-init on first boot of an instance
## modifications made here will not survive a re-bundle.
## if you wish to make changes you can:
## a.) add 'apt_preserve_sources_list: true' to /etc/cloud/cloud.cfg
##     or do the same in user-data
## b.) add sources in /etc/apt/sources.list.d
## c.) make changes to template file /etc/cloud/templates/sources.list.tmpl
#

# See http://help.ubuntu.com/community/UpgradeNotes for how to upgrade to
# newer versions of the distribution.
deb http://archive.ubuntu.com/ubuntu trusty main restricted
deb-src http://archive.ubuntu.com/ubuntu trusty main restricted

## Major bug fix updates produced after the final release of the
## distribution.
deb http://archive.ubuntu.com/ubuntu trusty-updates main restricted
deb-src http://archive.ubuntu.com/ubuntu trusty-updates main restricted

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team. Also, please note that software in universe WILL NOT receive any
## review or updates from the Ubuntu security team.
deb http://archive.ubuntu.com/ubuntu trusty universe
deb-src http://archive.ubuntu.com/ubuntu trusty universe
deb http://archive.ubuntu.com/ubuntu trusty-updates universe
deb-src http://archive.ubuntu.com/ubuntu trusty-updates universe

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team, and may not be under a free licence. Please satisfy yourself as to
## your rights to use the software. Also, please note that software in
## multiverse WILL NOT receive any review or updates from the Ubuntu
## security team.
deb http://archive.ubuntu.com/ubuntu trusty multiverse
deb-src http://archive.ubuntu.com/ubuntu trusty multiverse
deb http://archive.ubuntu.com/ubuntu trusty-updates multiverse
deb-src http://archive.ubuntu.com/ubuntu trusty-updates multiverse

## Uncomment the following two lines to add software from the 'backports'
## repository.
## N.B. software from this repository may not have been tested as
## extensively as that contained in the main release, although it includes
## newer versions of some applications which may provide useful features.
## Also, please note that software in backports WILL NOT receive any review
## or updates from the Ubuntu security team.
deb http://archive.ubuntu.com/ubuntu trusty-backports main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu trusty-backports main restricted universe multiverse

## Uncomment the following two lines to add software from Canonical's
## 'partner' repository.
## This software is not part of Ubuntu, but is offered by Canonical and the
## respective vendors as a service to Ubuntu users.
# deb http://archive.canonical.com/ubuntu trusty partner
# deb-src http://archive.canonical.com/ubuntu trusty partner

deb http://security.ubuntu.com/ubuntu trusty-security main
deb-src http://security.ubuntu.com/ubuntu trusty-security main
deb http://security.ubuntu.com/ubuntu trusty-security universe
deb-src http://security.ubuntu.com/ubuntu trusty-security universe
# deb http://security.ubuntu.com/ubuntu trusty-security multiverse
# deb-src http://security.ubuntu.com/ubuntu trusty-security multiverse
```
This is the package's list for your current version of Ubuntu. As you skim through the file, you'll see some pretty recognizable parts. We see a URL here and the word trusty looks familiar. That's the code name for the version of Ubuntu we're running. We know Ubuntu is also based off of Debian, so that's probably what this deb stands for here. \

This is a list of software repositories
that Ubuntu set up for us automatically. There are a lot in this list and
each of these would be referenced when you try to update or
install new software. Speaking of which, let's go ahead and make sure that all of our
software is up to date.

### 2.6 Updating Available Package Lists
One of the most important and simplest ways to ensure your system is secure is to keep your software up to date with new releases. Because Linux systems focus on reliability and they run a variety of complex applications that have numerous dependencies of their own, most Linux distributions do not auto-update the software installed on the system. \
You'll need to do this yourself and test your apps to make sure any recent updates don't break your application. \
The first step to upgrading your installed software is to update your package source list. We do this with the command
`sudo apt-get update`. See the `sudo` there? We have to run this as the `root` user. The update command will run through all of the repositories we saw within our `etc/app/sources.list` file, and it will check to see what all software is available and what those version numbers are.\
This command doesn't actually perform any changes to the software on your system. It just makes sure your system is aware of the latest information stored within all of these repositories that you're making use of.

### 2.7 Upgrading Installed Packages
Now that our system is aware of what all software is available, and the most recent version numbers, it's now time for us to actually update the software. \
We do this with the command, `sudo apt-get upgrade`. Once again, we have to use `sudo`. Remember this is an administrative task that we have to run as the `root` user. \
```
vagrant@vagrant-ubuntu-trusty-64:/$ sudo apt-get upgrade
Reading package lists... Done
Building dependency tree
Reading state information... Done
Calculating upgrade... Done
The following packages will be upgraded:
  apt apt-transport-https apt-utils libapt-inst1.5 libapt-pkg4.12
5 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
Need to get 1,847 kB of archives.
After this operation, 0 B of additional disk space will be used.
Do you want to continue? [Y/n]
```
After a few seconds, you'll be presented with a list of everything that's going to change on your system. And this question, `do you want to continue, yes or no?` We'll say yes in a second, but let's review this information real quick. \
Here we have a list of packages that will be upgraded. Some of these names look familiar. But others, not so much. This early in setting up a new machine, you can be pretty safe in just accepting that the system is always making the best decisions for you. \
Later on, when you actually have your web application running on this system, and it's serving your users. You're going to want to take more care in reviewing this list. And testing everything in a non-production environment before performing similar operations on your production server. \
For now, we'll just hit yes and we'll go take a coffee break as all of these new versions are downloaded and installed.
```
Do you want to continue? [Y/n] y
Get:1 http://archive.ubuntu.com/ubuntu/ trusty-updates/main libapt-pkg4.12 amd64 1.0.1ubuntu2.18 [638 kB]
Get:2 http://archive.ubuntu.com/ubuntu/ trusty-updates/main apt amd64 1.0.1ubuntu2.18 [954 kB]
Get:3 http://archive.ubuntu.com/ubuntu/ trusty-updates/main libapt-inst1.5 amd64 1.0.1ubuntu2.18 [58.6 kB]
Get:4 http://archive.ubuntu.com/ubuntu/ trusty-updates/main apt-utils amd64 1.0.1ubuntu2.18 [172 kB]
Get:5 http://archive.ubuntu.com/ubuntu/ trusty-updates/main apt-transport-https amd64 1.0.1ubuntu2.18 [25.0 kB]
Fetched 1,847 kB in 2s (824 kB/s)
(Reading database ... 63125 files and directories currently installed.)
Preparing to unpack .../libapt-pkg4.12_1.0.1ubuntu2.18_amd64.deb ...
Unpacking libapt-pkg4.12:amd64 (1.0.1ubuntu2.18) over (1.0.1ubuntu2.17) ...
Setting up libapt-pkg4.12:amd64 (1.0.1ubuntu2.18) ...
Processing triggers for libc-bin (2.19-0ubuntu6.14) ...
(Reading database ... 63125 files and directories currently installed.)
Preparing to unpack .../apt_1.0.1ubuntu2.18_amd64.deb ...
Unpacking apt (1.0.1ubuntu2.18) over (1.0.1ubuntu2.17) ...
Processing triggers for man-db (2.6.7.1-1ubuntu1) ...
Setting up apt (1.0.1ubuntu2.18) ...
Processing triggers for libc-bin (2.19-0ubuntu6.14) ...
(Reading database ... 63125 files and directories currently installed.)
Preparing to unpack .../libapt-inst1.5_1.0.1ubuntu2.18_amd64.deb ...
Unpacking libapt-inst1.5:amd64 (1.0.1ubuntu2.18) over (1.0.1ubuntu2.17) ...
Preparing to unpack .../apt-utils_1.0.1ubuntu2.18_amd64.deb ...
Unpacking apt-utils (1.0.1ubuntu2.18) over (1.0.1ubuntu2.17) ...
Preparing to unpack .../apt-transport-https_1.0.1ubuntu2.18_amd64.deb ...
Unpacking apt-transport-https (1.0.1ubuntu2.18) over (1.0.1ubuntu2.17) ...
Processing triggers for man-db (2.6.7.1-1ubuntu1) ...
Setting up libapt-inst1.5:amd64 (1.0.1ubuntu2.18) ...
Setting up apt-utils (1.0.1ubuntu2.18) ...
Setting up apt-transport-https (1.0.1ubuntu2.18) ...
Processing triggers for libc-bin (2.19-0ubuntu6.14) ...
```

### 2.8 Other Package Related Tasks
The `apt-get` application is your main interface to a ton of package related functionality. \
We can check out everything you can do by reading the man page for it with this command, `man apt-get`. \
We see here it can install packages, it can even remove packages, it can do all sorts of stuff. \
For now, let's see if there are some packages that are no longer required that we can just automatically remove. We'll do this with the command `apt-get autoremove`. And once again, it's an administrative task that has to be run as `root`. So we use `sudo`.
```
vagrant@vagrant-ubuntu-trusty-64:/$ sudo apt-get autoremove
Reading package lists... Done
Building dependency tree
Reading state information... Done
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
```
After a few seconds, we're returned back to our prompt to let us know everything is all done. \
Now let's use `apt-get` to install new software. We'll install an application called `finger`. It's something we'll use a little bit later on when working with users. We do this by typing the command `apt-get install finger`, and once again using `sudo`.

### 2.9 Discovering Packages
* [Ubuntu Package Search](https://packages.ubuntu.com/)
* [Trusty Packages](https://packages.ubuntu.com/trusty/)

### 2.11 Using Finger
Now that we've installed Finger, let's use it. \
This application will look up various pieces of information about a user, and display it in an easy to read format.If I type `finger`, the command will output information about all of the users currently logged into the system.
```
vagrant@vagrant-ubuntu-trusty-64:/$ finger
Login     Name       Tty      Idle  Login Time   Office     Office Phone
vagrant              pts/0          Apr 28 19:43 (10.0.2.2)
```
You can see the `vagrant` user here, that's us, and the last time we logged in. \
You can also pass a username to the Finger application to see additional information about a specific user. Type `finger vagrant`.
```
vagrant@vagrant-ubuntu-trusty-64:/$ finger vagrant
Login: vagrant                          Name:
Directory: /home/vagrant                Shell: /bin/bash
On since Sat Apr 28 19:43 (UTC) on pts/0 from 10.0.2.2
   3 seconds idle
No mail.
No Plan.
```
And you'll see some additional information including our home directory and what shell we're using.

### 2.12 Introduction to /etc/passwd
So where is finger retrieving all of this information such as our user name, our home directories, the shell? Much of this information is found within a file that stores information about each user. This file is called __etc/passwd__. \
Let's take a look at that file using the `cat` command. Each line within this file is an entry for a single user, and each entry has a number of fields that are separated by colon characters. \
Each line is organized in this format:
```
username:password:UID:GID:UID info:home directory:command/shell
```
Let's find the entry for our current user, `vagrant`. \
```
vagrant:x:1000:1000::/home/vagrant:/bin/bash
```
These two numbers `1000:1000` might be different on your system, but that's okay. It's nothing to worry about.
1. __username__ reads `vagrant` and that's this users login name.
2. __password__ stores an encrypted passwords. Historically storing encrypted passwords in this file wasn't an issue as the hardware was too slow to crack a well chosen password. These days, almost every distribution will just insert a character that is ignored in this field. In this case, ubuntu uses an `x`.
3. __user ID (UID)__ is the user’s ID number in the system. 0 is `root`, 1-99 are for predefined users, and 100-999 are for other system accounts
4. __group ID (GID)__ is the primary group ID, stored in `/etc/group`.
5. __user ID info__ contains metadata about the user like phone, email, name, etc. This field is used to store a better description about this user. Field is empty for the `vagrant`. You can see one user does have a better description here. `gnats` has the description `Gnats Bug-Reporting System (admin)`.
6. __home directory__ - where the user is sent upon login. Generally `/home/user`. Our home directory is `/home/vagrant` as we already knew.
7. __command/shell__ is the absolute path of a command or shell (usually /bin/bash). Does not have to be a shell though. Our default shell is `bin/bash`.

### 2.15 Introduction to User Management
If you recall, when we were discussing `sudo`, we mentioned that it's a common pattern to disable the ability to log in as `root`, and to only log in as a different user that has the ability to use `sudo`. \
This is a security measure, since every bad guy out there knows every Linux box has a user named `root`. \
By disabling this account from remote log, in we remove a very easy attack vector. Now vagrant took care of this for us. They created a user name `vagrant` and we just type `vagrant ssh` from our terminal to automatically connect. \
But not every hosting provider is going to set something like this up for you. \
So let's do this ourselves.

### 2.16 Creating a New User
We can create a new user by using the `adduser` command. This is an administrator feature, so we'll have to use `sudo` as well. \
Let's go ahead and create a new user named `student`.
```
vagrant@vagrant-ubuntu-trusty-64:/etc$ sudo adduser student
Adding user `student' ...
Adding new group `student' (1002) ...
Adding new user `student' (1002) with group `student' ...
Creating home directory `/home/student' ...
Copying files from `/etc/skel' ...
```
We'll then be asked to enter a password for the `student`. I just used the word `student`, but as you can see, in these password fields, you don't see what you're typing. \
```
Enter new UNIX password:
Retype new UNIX password:
passwd: password updated successfully
```
We're then asked the number of additional questions about the user. All of these are optional, so you can ignore them. But I'm going to go ahead, and add a bit more additional information here in the `Full Name` section.
```
Changing the user information for student
Enter the new value, or press ENTER for the default
        Full Name []: FirstName
        Room Number []:
        Work Phone []:
        Home Phone []:
        Other []:
Is the information correct? [Y/n] y
```
And that's all there is to it. We can confirm this user was created by using the finger command.
```
vagrant@vagrant-ubuntu-trusty-64:/etc$ finger student
Login: student                          Name: FirstName
Directory: /home/student                Shell: /bin/bash
Never logged in.
No mail.
No Plan.
```
Later you can change user information about the user with command `sudo /usr/bin/chfn student`.

### 2.17 Connecting as the New User
Now, that we've created `student` user. Let's go ahead and connect to our server as that user. \
I've opened a new terminal here, and this terminal is on my local machine. I have not connected to the server yet. \
I can connect to the server using this command, `ssh student@127.0.0.1 -p 2222`. \
Let's break this command down a little bit. We've been connecting to our
server using `vagrant ssh` which is just a shortcut for all of this.
* `ssh` is the application we use to remotely connect to the server.
* And `127.0.0.1` is the `IP address` we want to connect to. This is a `standard IP address` that always means `localhost` or the same computer I'm currently on.
* The `student@` is the user we want to log in as. We want to log in as `student@` this IP address.
* Finally, the `-p 2222` flag tells us to connect using port 2222. When Vagrant set up our virtual machine, it automatically set up this port on our local machine to forward to the virtual machine.

After hitting `Enter`, you may be asked an authenticity verification question. Just hit yes, and then you're asked for the user's password. Enter that, and you'll be logged in as the `student`.

### 2.18 Introduction to etc sudoers
Now that we're logged into our server as the `student` user, let's try and run a `sudo` command. \
We'll try and run `sudo cat /etc/passwd`.
```
student@vagrant-ubuntu-trusty-64:~$ sudo cat /etc/passwd
[sudo] password for student:
```
We're asked for a `sudo` password for the `student` which is just the standard password we set for the user when we initially made the user. \
We now get this warning:
```
student is not in the sudoers file.  This incident will be reported.
```
Our `student` does not have permission to use the `sudo` command. So, let's fix that. \
I switch back to my other terminal where I'm logged in as `vagrant`. This is a user we know can run `sudo` commands. They can perform administrative tasks. \
Now, the list of users that are allowed to do this is within the `etc/sudoers` file. \
Let's read that file using `sudo cat /etc/sudoers`.
```
vagrant@vagrant-ubuntu-trusty-64:/$ sudo cat /etc/sudoers
Defaults        env_reset
Defaults        mail_badpass
Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"

# User privilege specification
root    ALL=(ALL:ALL) ALL

# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL

# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL

# See sudoers(5) for more information on "#include" directives:

#includedir /etc/sudoers.d
```
Here we can see that the `root` user is listed along with a few groups using `%` and then the name of the group. \
On some systems you would just add the `student` user just like this, using a special program called `visudo`, that's allowed to edit this file. But on Ubuntu, it handles it a bit differently. \
If you look at the very bottom of this file, there's a directive here that says
`includedir /etc/sudoers.d`.\
This command tells the system to also look through any files in `etc/sudoers.d` directory and include those as if they were written directly within this file. \
This is a common pattern since distribution updates could overwrite this file. And if that were to happen, you would lose all of the users you added. \
By keeping your customizations in this other directory, the system eliminates that risk. \
Let's see what files are currently included in that directory by running `sudo ls etc/sudoers.d`.
```
vagrant@vagrant-ubuntu-trusty-64:/$ sudo ls /etc/sudoers.d
90-cloud-init-users  README  vagrant
```
We see a file here called `vagrant` and that makes sense since we're actually using `sudo` here. Even though `vagrant` wasn't within our `/etc/sudoers` file itself, this file is being included by this directory, giving this user the permissions it needs.

### 2.19 Giving Sudo Access
Let's go ahead and give our `student` user access to pseudo themselves. \
I'll first copy the `vagrant` file and name it `student`.
```
sudo cp /etc/sudoers.d/vagrant /etc/sudoers.d/student
```
I'll then need to make a small edit to this file and I'll just use `nano` to do that.
```
sudo nano /etc/sodoers.d/student
```
This second line here is actually what's doing all of the work.
```
vagrant ALL=(ALL) NOPASSWD:ALL
```
The file name doesn't mean anything, so we'll change the word `vagrant` here to `student`. There are a few more options here. And if you'd like to understand them all, I've placed a link in the instructor notes for more information.
* [Ubuntu Documentation: Sudoers](https://help.ubuntu.com/community/Sudoers)

For now, we just want `student` users pseudo access to function exactly as the `vagrant` users currently does. \
After saving that file, I've switched back to my terminal where I'm logged in as the `student` and we'll try to run pseudo command `sudo cat etc/passwd` again. And there we go, we see the results. Our student user now has access to use pseudo.

### 2.20 Resetting Password
The user themselves could reset their password using the `passwd` command, but you can't rely on that user to do so all the time. As a super user, you can force users password to expire. \
To force the `student` user to reset their password the next time they login use the following command
```
sudo passwd -e student
```
`student` is the user and this `-e` sets that password to expire.

### 2.21 Another Authentication Method
You just added a powerful user to your server that authenticates using a user name and password. Hopefully, you chose a strong password since attackers will soon start running bots against your server attempting to guess any valid usernames and passwords. \
This is going to cause all sorts of issues for your server. Your logs are going to be filled with invalid login attempts, and if one of these hackers manages to gain access, well that's about the worst thing we could possibly imagine. \
There's another way to perform user authentication that's much more secure. It doesn't rely on passwords, which we're pretty horrible at making secure, since we have to make them simple enough to memorize. \
Instead, this form of authentication, called __key based authentication__, relies on physical files located on the server and your personal machine, the one you're logging in from. Before we get into key based authentication, let's demonstrate how public key encryption generally works.

### 2.22 Public Key Encryption
Let's imagine I wanted to send a message to Cameron without anyone else being to see that message. \
If I were to just place this note on Cameron's desk, anyone could come by and read it. \
I could find a box with a lock and lock the message away but then I have to somehow get this key to Cameron. That's not going to work because anyone will be able to come by and grab the key. \
But what if Cameron already had a box set up on his desk, with his own lock, and the key to unlock that box is always in Cameron's pocket? He never shares that key with anyone. I can then come by his desk, place my message in the box, and lock it. And no one else can ever see that message. \
In this example, the box is called the public key. The box can be left out in the open, shared around without any consequence. \
The key in Cameron's pocket is called a private key. Cameron never lets anybody else
borrow that key or see it. \
This combination of public and private keys allows me to securely communicate with Cameron. This same cryptography trick can be used to authenticate a client with a server. \
The server will send a random message to the client. The client will encrypt that message with their private key, and then send that encrypted message back to the server. The server will decrypt this message with their public key and if that value equals the same value they sent, then everything checks out and the client has authenticated.

### 2.23 Generating Key Pairs
We'll generate our key pair on our local machine, not on our server. Remember, you never, ever want to share your private key with anyone else. It should remain firmly in
your possession at all times. For this reason, you always generate key pairs locally. \
If you were to generate the key pair on the server, you cannot claim that the private
key has always been private. \
We'll generate our key pair using an application called `ssh-keygen`.
You will first be asked to give a file name for the key pair. I've given this one the name `users/udacity/.ssh/linuxcourse`. This suggested directory is the default directory that key pairs should exist in, so I advise you to keep that the same. But you can name a file what you'd like. \
```
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/L/.ssh/id_rsa): /c/Users/L/.ssh/linuxServer
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```
We'll then add a pass phrase to our key pair, just in case someone does happen to get these files. This pass phrase will prevent them from actually using them. \
```
Your identification has been saved in /c/Users/L/.ssh/linuxServer.
Your public key has been saved in /c/Users/L/.ssh/linuxServer.pub.
The key fingerprint is:
SHA256:z1SWiA6VT9wkjaS/gmaKyqnYm1bFkMMfmr4HgUOmtbU L@N5110
The key's randomart image is:
+---[RSA 2048]----+
|   . .  .+o=.    |
|  + * ...o+oo.   |
| = + O..oo. +    |
|. + E +o ..o     |
|   o o  S o      |
|    +  . + .     |
|   . o+ . +      |
|o.oo.+.  .       |
|===...           |
+----[SHA256]-----+
```
Once done, you'll see that ssh-keygen has generated two files, `linuxCourse` and `linuxCourse.pub`. This file, `linuxCourse.pub`, is what we'll place on our server to enable key based authentication.

### 2.25 Installing a Public Key
Now that we've generated our key pair locally, we still need to place the public key on our remote server, so `ssh` can use it to log in. There are multiple ways to do this and there are even some applications that will do most of the work for you, but we're going to do it the manual way. \
First we want to make sure we're logged into our server as the `student`. I'll first create a directory called `.ssh` using the `mkdir` command _within my home directory_.
```
student@vagrant-ubuntu-trusty-64:~$ mkdir .ssh
```
This is a special directory where all of your key related files must be stored. I'll then create a new file within this directory called `authorized_keys`.
```
student@vagrant-ubuntu-trusty-64:~$ touch .ssh/authorized_keys
```
This is another special file that will store all of the public keys that this account is allowed to use for authentication, with one key per line in that file. \
Now, back on my local machine I've read out the contents of `linuxcourse.pub`, and I just want to copy that. \
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDE4vXNPPulWYWPgKW2B2enxatFFbMUreGhh6MbWKSf6sC5ZnhVQIHxAH9o+ogm5NHWt6rS05OklI5c0HZzZT0PGpj2hTMWs5KUemc3oq0/dAnBzLX75CMGF0HttfuhwBW4txxujDBTJqiv7oEb/s7WuRngZa1qdKysRPpD+YoPZGVO1aS4wE8QgVaSoE/suYrUdht58l/S7tcUT1tHaK9/vVX1hM6Vh85Vk1TqxYNzlOfgNierNKScdA9CvaxtlCd1dLZyoHO8etVj+zfAzKsL6ox7/1+wWtUSLCSOC5vyKFRVuPu9J9B9nH8D0Fz2WTavr2AOZOBTf/pc7pRrjOMv L@N5110
```
Then, back on my server as the student user, I am going to edit this authorized key file. And in here I'll just paste in that content and save it.
The final thing we need to do is set up some specific file permissions on the `authorized_keys` file and the `.ssh` directory. This is a security measure that `SSH` enforces to ensure other users cannot gain access to your account. \
We'll discuss file permissions in a lot more detail shortly. For now we'll set the permissions using the following commands. We'll run `chmod 700` on our `.ssh` directory and `chmod 644` on the `authorized_keys` file.
```
student@vagrant-ubuntu-trusty-64:~$ chmod 700 .ssh
student@vagrant-ubuntu-trusty-64:~$ chmod 644 .ssh/authorized_keys
```
Finally we're all done and we can now log in as the `student` user, but instead of using user name and password we set `-i` flag and a path to private key after.
```
$ ssh student@127.0.0.1 -p 2222 -i ~/.ssh/linuxServer
Enter passphrase for key '/c/Users/L/.ssh/linuxServer':

```
If you set a passphrase for your key pair, you'll be asked to enter that. But, once you're done, you'll see you've logged into the server and __you did not have to enter your remote password for this user__.

### 2.26 Forcing Key Based Authentication
The final thing you'll want to do to secure the authentication process is to disable the password base logins. This will force all of your users to only be able to login using a key pair. \
To do this, you'll have to edit the configuration file for `SSHD`. Which is the service that's running on the server listening for all of your `SSH` connections. This  configuration file is located at `etc/ssh/sshd_config`. And you can edit it using `sudo nano`. \
```
student@vagrant-ubuntu-trusty-64:~$ sudo nano /etc/ssh/sshd_config
```
There are a lot of options in here, and you can read through them all to get a better understanding of how `SSH` is configured. The comment lines start with the hash symbol `#` here. And they're pretty good at explaining what everything does.
The line we're looking for is right here, `PasswordAuthentication yes`. We just want to change that to `no`, and then we'll save the file.
```
# Change to no to disable tunnelled clear text passwords
PasswordAuthentication yes
```
Now, the SSHD service is currently running, and it only reads its configuration file when it's initially started up. So we need to restart the service so it runs with the new configuration option we just made. \
We restart the service by `sudo service ssh restart` and that's all there is to it.
```
student@vagrant-ubuntu-trusty-64:~$ sudo service ssh restart
ssh stop/waiting
ssh start/running, process 29347
```
Now all users will be forced to log in using a key pair. `SSH` will not allow users to log in with a user name and password any longer.

### 2.27 Introduction to File Permissions


