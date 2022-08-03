# Shell Syntax (Common Utilities)
## Cheat Sheet
https://devhints.io/bash

## `ls` check directory content
```
ls    # prints files, folders
ls -a # including hidden files
ls -l # in table format with properties
ls -h # provides human-readable file size

ls -alh # all of above

ls -R # applies `ls` recursively to folders
```

## `touch` (create file) and `rm` (remove file)
```
touch abc1
rm abc1
```

## print current directory `pwd`
```
~ pwd
/Users/username
```

## echo
```
echo "some" # prints 'some' to terminal
```
```
echo "some" > abc1 # writes 'some' to a file
cat acb1 # prints content of 'abc1'
rm abc1
```

## exist on error `set -e`
```sh
# exit on any command non-zero exit code / on any failing command
# please set in the begging of the script
set -e
# go to non-existing directory
cd ./abc3
# this line is not reached
echo 'message after error'
```

Example output:
> sh ./test.sh \
> ./test.sh: line 6: cd: ./abc3: No such file or directory

## write (append) to protected files
- https://stackoverflow.com/questions/84882/sudo-echo-something-etc-privilegedfile-doesnt-work
```
touch abc1
echo "some" | sudo tee -a abc1 # with `-a` it will append
echo "some" | sudo tee -a abc1 # with `-a` it will append
echo "some2" | sudo tee abc1 # without `-a` it will overwrite the content (be careful with system files)
rm abc1
```

### redirect output `>` to protected files
- https://stackoverflow.com/questions/82256/how-do-i-use-sudo-to-redirect-output-to-a-location-i-dont-have-permission-to-wr
- https://stackoverflow.com/questions/84882/sudo-echo-something-etc-privilegedfile-doesnt-work


## cd
Go to a previous directory
```
➜  ~ cd projects
➜  ~/projects cd ~
➜  ~ cd -
~/projects
➜  ~/projects cd -
~
➜  ~
```

## grep

### From Stdout Of Another Process
```shell
echo "catch" | grep "ca"
```

### From File
https://swcarpentry.github.io/shell-novice/07-find/index.html
```shell
grep "pattern" filename > matched-lines
```

### With Regex
```shell
grep -i -E "rendering-engine.*(89|95)"
```

## ps
displays running processes (including environment `-E` (`-e`))
```shell
ps -e | grep "node"
```

## kill
Kill an application by a process id
```shell
kill 23909
```

## Command substitution
https://wiki-dev.bash-hackers.org/syntax/expansion/cmdsubst
https://unix.stackexchange.com/questions/188182/how-can-i-get-the-current-working-directory/188191
```shell
$( <COMMANDS> )
# or
` <COMMANDS> `
```

## Sed
```

```

## printf or echo `$`
https://unix.stackexchange.com/questions/162476/how-can-i-echo-dollar-signs
```shell
printf '\44PATH\n'
echo \$PATH
```

## Combining Conditions
https://stackoverflow.com/questions/3826425/how-to-represent-multiple-conditions-in-a-shell-if-statement/3826462
```shell
if [ $CLUSTER == "fashion-store-test" ] && [ -z "${NAMESPACE}" ]; then
  echo "[ERROR] NAMESPACE is not provided. For the test cluster it should be something like 'rendering-engine-pr-5305'"
fi
```

## Date
```sh
date
```

## Replay The Previous Command
```shell
!! # hit `tab` button
```

## Set
## Exist Immediately After A Single Command Fails
https://stackoverflow.com/questions/19622198/what-does-set-e-mean-in-a-bash-script
```shell
#!/bin/bash
set -e
```

## Debug Bash Script / Print out every bash command
https://stackoverflow.com/questions/2853803/how-to-echo-shell-commands-as-they-are-executed

1. Configure in a script
```shell
#!/bin/bash -x
```

2. Run any script with debug option `-x`.
```shell
./some-script.sh -x
```

3. Configure in a script
```shell
set -x
```

## Execute Commands In Sequence
```shell
command1 && command2
```

## Execute Commands In Parallel
https://stackoverflow.com/questions/3004811/how-do-you-run-multiple-programs-in-parallel-from-a-bash-script

If you want to kill later parent process and all started child process then 
the longest or non-ending child process has to be the last in the chain of parallel processes
```shell
command1 & command2
# or
command1 &
command2 &
# ...
# or use scopes to combine commands
command1 &
(sleep 5 && command2)
```

## Execute Commands Sequentually
https://dev.to/0xbf/run-multiple-commands-in-one-line-with-and-linux-tips-5hgm
```shell
command1 ; command2 # no matter if `command1` fails or not - `command2` is always executed
command1 && command2 # if `command1` succeeds then `command2` is executed
command1 || command2 # if `command1` fails then `command2` is executed
```

## Spawn Multiple Child Processes And Kill Them Simultaneously
- Good idea https://unix.stackexchange.com/a/204619
- Simpler solution https://unix.stackexchange.com/a/204721
- Also simple https://stackoverflow.com/a/52033580

If you want to kill later parent process and all started child process then 
the longest or non-ending child process has to be the last in the chain of parallel processes.
```shell
sh -c 'command1 & command2 & command3 & wait'
# Press Ctrl+C to kill them all
```

## Redirect Output Of Multiple Commands 
- https://unix.stackexchange.com/a/204619
```
command1 | tee 1.log | sed -e 's/^/[Command1] /' & 
command2 | tee 2.log | sed -e 's/^/[Command2] /' & 
command3 | tee 3.log | sed -e 's/^/[Command3] /'
```

## trap
- https://www.shellscript.sh/trap.html

## mkdir
create folders
```
mkdir one
mkdir two/three # will fail, `two` does not exist

mkdir -p two/three # will pass
```

## rm
```shell
rm some-file
rm -r folder-with-nested-folders
```
https://stackoverflow.com/questions/31318068/shell-script-to-remove-a-file-if-it-already-exist/31318262
```
rm -f some-file-that-not-exist
```

## cp
- https://unix.stackexchange.com/questions/56084/how-do-i-copy-a-symbolic-link#:~:text=Use%20cp%20%2DP%20(capital%20P,all%20symbolic%20links%20as%20such.
```shell
cp file1 file2
cp -R dir1 dir2
# copy symbolic link as it is
cp -P symlink1 symlink2
# copy directory with nested symbolic links
cp -RP dir1 dir2
```

## streams

### merge error stream into standard stream
- https://stackoverflow.com/questions/818255/in-the-shell-what-does-21-mean
```shel
2>&1
```

## functions

### return
https://bash.cyberciti.biz/guide/Returning_from_a_function
```shell
touch abc1

echoNumberIfFileExists() {
    if [[ -f abc1 ]]; then
        echo 'exist'
        return 0
    fi

    echo 'not exist'
}
echoNumberIfFileExists  # `exist`
rm abc1
```

## array
- https://devhints.io/bash
```shell
ARRAY=( one two three )
# print first element of the array
echo ${ARRAY[0]}   # abc1
# print all elements of the array
echo ${ARRAY[@]}   # abc1 abc2
# print array length
echo ${#ARRAY[@]}  # 2
```

## file search by wildcard pattern
```shell
touch abc1
touch abc2

WILDCARD_PATTERN='ab*'

echo WILDCARD_PATTERN       # WILDCARD_PATTERN
echo $WILDCARD_PATTERN      # abc1 abc2
echo ${WILDCARD_PATTERN}    # abc1 abc2
echo "${WILDCARD_PATTERN}"  # ab*

rm abc1
rm abc2
```

## get first file matching to a wildcard

### [valid] use wildcard expansion, `find` and `head`
- https://stackoverflow.com/questions/45143529/check-if-file-exists-using-full-paths-and-wildcard-for-filename-bash
```shell
touch abc1
touch abc2

WILDCARD_PATTERN='ab*'

# match will include provided directory path as well
# in this case it is './'
FIRST_MATCH=`find . -name "${WILDCARD_PATTERN}" | head -1`
echo $FIRST_MATCH  # ./abc

rm abc1
rm abc2
```

### [valid] use wildcard expansion, `ls`, and `head`
```shell
touch abc1
touch abc2

WILDCARD_PATTERN='ab*'

# redirect error `ls: acb*: No such file or directory`
# from error stream `2>` to `/dev/null` nowhere
FIRST_MATCH=`ls $WILDCARD_PATTERN 2> /dev/null | head -1`
echo FIRST_MATCH

rm abc1
rm abc2
```

### [invalid] use wildcard expansion and array 
- https://unix.stackexchange.com/questions/156205/how-can-i-get-the-first-match-from-wildcard-expansion
```shell
touch abc1
touch abc2

WILDCARD_PATTERN='ab*'

# expand wildcard to matching files from current directory 
# and create an array of those files
ARRAY_OF_MATCHES=( $WILDCARD_PATTERN )
# print first element of the array
echo ${ARRAY_OF_MATCHES[0]}   # abc1

rm abc1
rm abc2
```
__Don't use__. If pattern doesn't match first element will be `ab*`. Seems to do somehting with `nullglob`.

### [invalid] use wildcard expansion, `compgen` and `head`
- https://stackoverflow.com/questions/6363441/check-if-a-file-exists-with-a-wildcard-in-a-shell-script
```shell
touch abc1
touch abc2

WILDCARD_PATTERN='ab*'

# compgen is used to search commands, but works for files as well
FIRST_MATCH=`compgen -G "${WILDCARD_PATTERN}" | head -1`
echo $FIRST_MATCH  # abc2

rm abc1
rm abc2
```
__Don't use__. Note that compgen is a bash-specific built-in command and is not part of the POSIX standard Unix shell specified built-in commands
https://stackoverflow.com/a/34195247

## check if a file exist matching a wildcard pattern

### use `find` and `head`
[- https://stackoverflow.com/a/6364244](https://stackoverflow.com/questions/45143529/check-if-file-exists-using-full-paths-and-wildcard-for-filename-bash)
```shell
touch abc1
touch abc2

WILDCARD_PATTERN='acb*'

# match will include provided directory path as well
# in this case it is './'
FIRST_MATCH=`find . -name "${WILDCARD_PATTERN}" | head -1`
if [[ -n $FIRST_MATCH ]]; then
    echo 'exist'
else
    echo 'not exist'
fi

rm abc1
rm abc2
```

### use wildcard expansion, `ls`, and `head`
```shell
touch abc1
touch abc2

WILDCARD_PATTERN='acb*'

# redirect error `ls: acb*: No such file or directory`
# from error stream `2>` to `/dev/null` nowhere
FIRST_MATCH=`ls $WILDCARD_PATTERN 2> /dev/null | head -1`
if [[ -n $FIRST_MATCH ]]; then
    echo 'exist'
else
    echo 'not exist'
fi

rm abc1
rm abc2
```

## add comment to a file
- https://unix.stackexchange.com/questions/190118/uses-of-hash-in-shell-scripting
```shell
touch abc1
COMMENT="# some comment"
echo "$COMMENT" >> abc1
```

## add newline and a comment to a file
- https://stackoverflow.com/questions/20536112/how-to-insert-a-new-line-in-linux-shell-script
```shell
touch abc1
COMMENT="# some comment"
echo "" >> abc1
echo "$COMMENT" >> abc1
```

## check if a line is already presented in a file
```shell
touch abc1

STRING="some-string"
echo "$STRING" >> abc1
echo "$STRING"2 >> abc1

MATCHING_LINES=`grep $STRING abc1` # MATCHING_LINES=some-string some-string2

# -x, --line-regexp
# Only input lines selected against an entire fixed string or regular expression are considered to be matching lines

MATCHING_LINES_X=`grep -x "$STRING" abc1` # MATCHING_LINES_X=some-string

# -q, --quiet, --silent
# Quiet mode: suppress normal output.  grep will only search a file until a match has been found, making searches potentially less expensive.

FOUND=`grep -q $STRING abc1 && echo 1 || echo 0` # FOUND=1

rm abc1
```

## Request Root Privilege From Within A Script
- https://askubuntu.com/questions/746350/request-root-privilege-from-within-a-script

## Pass Command Line Arguments To A Script
- https://www.baeldung.com/linux/use-command-line-arguments-in-bash-script
```shell
# call
sh ./script.sh value1 value2
```
```shell
# inside script.sh
echo $1   # value1
echo $2   # value2
```

## Temporary Folder
It is useful to use `trap` to execute a clean up the temporary folder on script `EXIT`.
It might be the end of the script or any intermediate exception.
```shell
TEMPORARY_FOLDER=$(mktemp -d)
# Clean temporary directory on exit
trap '[[ -d $TEMPORARY_FOLDER ]] && rm -rf -- "$TEMPORARY_FOLDER"' EXIT

cd $TEMPORARY_FOLDER

rm -rf -- "$TEMPORARY_FOLDER"
```

## If Conditions
```shell
touch abc1

test -f abc1 && echo 1 || echo 0    # 1

[[ -f abc1 ]] && echo 1 || echo 0   # 1

if [[ -f abc1 ]]; then               # 1
    echo 1
else
    echo 0
fi

rm -f abc1

test -f abc1 && echo 1 || echo 0    # 0

[[ -f abc1 ]] && echo 1 || echo 0   # 0

if [[ -f abc1 ]]; then              # 0
    echo 1
else
    echo 0
fi
```

## screen
The `screen` program allows you to use multiple windows (virtual VT100 terminals) in Unix.
https://kb.iu.edu/d/acuy
