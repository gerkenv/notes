### Git Cheatsheet
#### Git-Bash Commands
* `mkdir <path>` - creates a new folder
* `cd <path>` - go to path
* `ls <path>` - shows shortly files and directories at path
* `ll <path>` - shows details of files and directories at path
* `cat <path>` - print out a content of a file
* `pwd` - print working directory
* `diff <path1> <path2>` - compare 2 files

#### Git Commands
##### version
`git --version` - shows the installed version of the Git

##### clone
`git clone <repository> <path>` - creates a local copy of `repository` at `path`.

##### log
`git log` - shows all of the commits made in repository. \
The log can be bigger than the current window size. Then the log view mode will not be not closed automatically.
* To __scroll down__ - press `arrow down` or `page down`. \
* to __exit the log__ view mode - press `q`.

Options:
* git log `-X` - shows only last `X` commits
* git log `--stat` - includes changed files in a log
* git log `--oneline` - minimises a log , so the log shows only:
  * a short form of a commit ID `<SHA1>`,
  * and a commit message
* git log `--graph` - includes the tree structure of branches into a log, so it helps to see merges

##### checkout
`git checkout` - restores one certain state of the repository \
Option:
* git checkout `<SHA1>` - state at the time of a commit ID `<SHA1>`
* git checkout `<branch>` - state of the `<branch>`

##### Setting Up a Custom Editor
* [Associating text editors with Git](https://help.github.com/articles/associating-text-editors-with-git/)
```
git config --global core.editor "'C:/Program Files/Sublime Text 2/sublime_text.exe' -n -w"
git config --global push.default upstream
git config --global merge.conflictstyle diff3
```

#### Vim Text Editor
* vim <path>
  * i - enter 'insert' mode - normal editor mode
  * Esc - leave 'insert' mode
    * :w - write
    * :q - exit
    * :x - equivalent of :wq - write and exit
