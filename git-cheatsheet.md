### Git Cheatsheet
#### Bash Commands
* `clear` - clean up the terminal
* `mkdir [path]` - creates a new folder at `path`.
* `cd [path]` - goes to `path`.
* `cd` - goes to `/home/user` directory at linux and to `c:/users/user` at windows.
* `ls [path]` - shows shortly files and directories at `path`.
* `ls -a [path]` - shows also hidden files and directories at `path`.
* `ls -al [path]` - shows also hidden files and directories at `path` in _long_ format.
* `ll [path]` - shows details of files and directories at `path`.
* `ll -a [path]` - shows also hidden files and directories at `path`.
* `cat [path]` - shows a content of a file at `path`.
* `pwd` - prints a working directory.
* `diff [path1] [path2]` - compare 2 files at `pathes`.
* `echo [var]` - prints out a variable `var`, like `$PATH` that stores pathes to sytem binaries.
* `touch [path]` - creates an empty file at `path`.
* `echo [text] > [path]` - saves the `text` in a file stored at `path`.
* `echo [text] >> [path]` - adds the `text` in a file stored at `path`.
* `rm [path]` - removes a file at `path`.
* `rm -r [path]` - removes a directory and all its content recursively at `path`.
* `cp [path1] [path2]` - copies a file at `pathfrom` to `pathto`.

#### Vim Text Editor
Usage:
* `vim [path]` - opens a file at `path` in editor
  * `i` - enters the 'insert' mode - editor mode.
  * `Esc` - leaves the 'insert' mode - view mode.
    * `:w` - write - saves the file.
    * `:q` - exit.
    * `:x` - equivalent of `:wq` - write and exit.

#### Git Commands
##### version
`git --version` - shows the installed version of the Git.

##### configuration
`git config --list` - shows the complete configuration. \
`git config --edit` - opens an editor to change the configuration. \
`git config --global user.name "[name]"` - sets an author's `name` for your commits. \
`git config --global user.email "[email]"` - sets an author's `email` for your commits. \
`git config --global core.editor "[editor]"` - sets up a [custom editor](https://help.github.com/articles/associating-text-editors-with-git/) for commits, merges, edits, etc.
`git config --global push.default upstream` - sets up a ['push' mode](http://www.fleekitsolutions.com/git/difference-between-push-default-matching-simple) \
`git config --global merge.conflictstyle diff3` - sets up a ['merge conflicts' mode](https://stackoverflow.com/questions/27417656/should-diff3-be-default-conflictstyle-on-git)

##### init
`git init [path]` - creates a repository at `path`.

##### clone
`git clone [repository] [path]` - creates a local copy of `repository` at `path`.

##### status
`git status` - shows current state of repository.

##### difference
`git diff` - shows a difference between a working directory and _stage area_. _If nothing is staged then stage area looks like the last commited snapshot of repository_. \
`git diff --staged` - shows a difference between a stage area and last commited snapshot of repository \
`git diff HEAD ./` - the same as above. \
`git diff @ ./` - the same as above. \
`git diff @~1 @` - shows a difference since previous commit `@~1` up to last commit `@`, where `HEAD` is attached. \
`git diff [SHA1-before] [SHA1-after]` - shows a difference since commit ID `SHA1-before` up to commit ID `SHA1-after`. \
`git diff [branch-1] [branch-2]` - shows a difference since `branch-1` up to `branch-2`.
`git diff master origin/master` - can be usefull after `git fetch origin master`

##### show
`git show` - the same as `git diff @~1 @`. Show difference between a last commit and its parent. \
`git show [SHA1]` - shows the difference between the commit with ID `SHA1` and its parent.

##### rename file
`git move [pathfrom] [pathto]` - moves and renames file at `pathfrom` to `pathto`.

##### stage file
`git add [path]` - adds a file or directory to staging area at `path`.

##### unstage file
`git reset [path]` - removes a file or directory at `path` from staging area but __preserving its content__. \
Options:
* git reset `--hard` - unstages all files and __discards all local changes__, so a repository is reset to the __last checked out state__.

##### commit
`git commit [path]` - opens your `core` editor to enter a commit message
* and if the commit message is empty - a commit will be aborted,
* or if it is not empty - the commit will occure for the files at `path`.

`git commit [path] -m'commit message'` - works the same way as the previous command but without opening an editor.

##### merge
`git merge [branch-1] [branch-2]` - merges two `branches`, creating a new commit with merged changes __on the currently checked out branch__. Order of branches in command is not relevant, so \
`git merge [branch-2] [branch-1]` - produces the same results.

##### Resolving Conflicts
* edit all diverged (conflicted) files
* add them to staging area
* commit the merged version

##### log
`git log` - shows all of the commits made in repository. \
If a log is bigger than a current window size then the _log view mode_ will not be not closed automatically.
* To __scroll down__ - press `arrow down` or `page down`. \
* to __exit the log__ view mode - press `q`.

Options:
* git log `-X` - shows only last `X` commits.
* git log `--stat` - includes changed files in a log.
* git log `--oneline` - minimises a log , so the log shows only:
  * a short form of a commit ID `[SHA1]`,
  * and a commit message.
* git log `--graph` - includes the tree structure of branches into a log, so it helps to see merges.
* git log `--graph [branch-1] [branch-2]` - includes the tree structure with both `branches` in it.
* git log `--graph --oneline master origin/master` - can be usefull after `git fetch origin master`

##### checkout
`git checkout` - restores one certain snapshot (state)) of the repository. \
Option:
* git checkout `[SHA1]` - snapshot of a commit ID `[SHA1]`.
* git checkout `HEAD` - detach `HEAD` from a branch.
* git checkout `@` - the same as the previous one.
* git checkout `@~1` - snapshot of a previous commit.
* git checkout `@~2` - snapshot of a commit before a previous one.
* git checkout `[branch]` - snapshot of the `[branch]`.

##### branch
`git branch` - shows current local branches.
`git branch - a` - shows current local and remote branches.
`git branch [name]` - creates a new branch with a `name`.
`git checkout -b [name]` - creates a new branch with a `name` and checks it out.
`git branch -d [name]` - deletes a branch with a `name`.
`git branch -f [name]` - moves a branch called `name` to a currently checked out commit.
`git branch -f [name] [SHA1]` - moves a branch called `name` to a commit ID `SHA1`.
`git branch -m [name]` - rename a current branch to `name`.
`git branch -m [old_name] [new_name]` - rename the `old_name` branch to `new_name`.

##### remote
`git remote` - shows all remote repositories connected to a current one. \
`git remote -v` - shows all remote repositories more detailed. \
`git remote add [name] [https]` - used to set a remote reository for a current one. The initial remote is usually called `origin`.
* [rename local & remote branch](https://stackoverflow.com/questions/30590083/how-to-rename-a-remote-git-branch-name)
* [rename remote branch](https://stackoverflow.com/questions/4753888/git-renaming-branches-remotely/21302474#21302474)

##### fetch
`git fetch [name] [branch]` - fetches all commits up to the `branch` from the remote repository called `name` to a local repository _without merging the conficts_.
> `git pull origin master` = `git fetch origin master` + `git merge master origin/master`

`git fetch [branch]` - fetches all commits up to the `branch` from the remote repository called `origin` to a local repository _without merging the conficts_. \
`git fetch` - fetches all commits up to the current branch from the remote repository called `origin` to a local repository _without merging the conficts_. \

##### push
`git push [name] [branch]` - sends all commits up to the `branch` from a local repository to the remote repository called `name` _merging the conficts_. \
`git push [branch]` - sends all commits up to the `branch` from a local repository to the remote repository called `origin` _merging the conficts_. \
`git push` - sends all commits up to the current branch from a local repository to the remote repository called `origin` _merging the conficts_.

##### pull
`git pull [name] [branch]` - fetches all commits up to the `branch` from the remote repository called `name` to a local repository _merging the conficts_.
> `git pull origin master` = `git fetch origin master` + `git merge master origin/master`

`git pull [branch]` - fetches all commits up to the `branch` from the remote repository called `origin` to a local repository _merging the conficts_. \
`git pull` - fetches all commits up to the current branch from the remote repository called `origin` to a local repository _merging the conficts_.

##### Collaboration using Github
Workflow to get a feedback on your changes before you update a `master` branch.
1. Fork a repository from `upstream`
2. `Clone` to local machine your `origin`
3. Create a new branch `name-of-change`
4. `Push` the new branch into `origin`
5. Use `pull request` to point to exact changes
  * base fork: `fork/repository`
  * base: `master`
  * head fork: `fork/repository`
  * head: `name-of-change`
6. Ask for a feedback, repository's collaborators can leave comments
7. When consent is reached - merge `master` and `name-of-change`
8. Create a pull request to `upstream`

##### Rewriting History
* [Git Magic. Chapter 5. Lessons of History](http://www-cs-students.stanford.edu/~blynn/gitmagic/ch05.html)
* https://stackoverflow.com/questions/1994463/how-to-cherry-pick-a-range-of-commits-and-merge-into-another-branch/1994491#1994491

1. Add range of commits [oldest commit...newest commit] from one branch `source` to another one `target`.
```
git checkout target
git rebase --onto target <SHA1 of oldest commit>~1 <SHA1 of newest commit>
git branch -f target
git checkout target
```

##### Garbage Collection
If a branch is deleted and leaves some commits unreachable from existing branches, those commits will continue to be accessible by commit id, until Git’s garbage collection runs. This will happen automatically from time to time, unless you actively turn it off. You can also run this process manually with `git gc`.
