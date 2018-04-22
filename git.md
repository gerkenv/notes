### Git Cheatsheet
#### Git-Bash Commands
* `mkdir [path]` - creates a new folder at `path`.
* `cd [path]` - goes to `path`.
* `ls [path]` - shows shortly files and directories at `path`.
* `ls -a [path]` - shows also hidden files and directories at `path`.
* `ll [path]` - shows details of files and directories at `path`.
* `cat [path]` - shows a content of a file at `path`.
* `pwd` - prints a working directory.
* `diff [path1] [path2]` - compare 2 files at `pathes`.
* `rm [path]` - removes a file at `path`.
* `rm -r [path]` - removes a directory and all its content recursively at `path`.

#### Git Commands
##### version
`git --version` - shows the installed version of the Git.

##### configurutaion
`git config --global user.name "[name]"` - sets an author's `name` for your commits. \
`git config --global user.email "[email]"` - sets an author's `email` for your commits.

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
`git show` - the same as above. \
`git diff [SHA1-before] [SHA1-after]` - shows a difference since commit ID `SHA1-before` up to commit ID `SHA1-after`. \
`git diff [branch-1] [branch-2]` - shows a difference since `branch-1` up to `branch-2`.

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
`git branch` - shows current branches.
`git branch [name]` - creates a new branch with a `name`.
`git checkout -b [name]` - creates a new branch with a `name` and checks it out.
`git branch -d [name]` - deletes a branch with a `name`.


##### Setting Up a Custom Editor
* [Associating text editors with Git](https://help.github.com/articles/associating-text-editors-with-git/)
```
git config --global core.editor "'C:/Program Files/Sublime Text 2/sublime_text.exe' -n -w"
git config --global push.default upstream
git config --global merge.conflictstyle diff3
```

#### Vim Text Editor
Usage:
* `vim [path]` - opens a file at `path` in editor
  * `i` - enters the 'insert' mode - editor mode.
  * `Esc` - leaves the 'insert' mode - view mode.
    * `:w` - write - saves the file.
    * `:q` - exit.
    * `:x` - equivalent of `:wq` - write and exit.
