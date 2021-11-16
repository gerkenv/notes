# Shell
https://devhints.io/bash

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

## Debug Bash Script
https://stackoverflow.com/questions/2853803/how-to-echo-shell-commands-as-they-are-executed

Print out every bash command (configure in a script)
```shell
#!/bin/bash -x
```

Run any script with debug option `-x`.
```shell
./some-script.sh -x
```
## Execute Commands In Sequence
```shell
command1 && command2
```

## Execute Commands In Parallel
https://stackoverflow.com/questions/3004811/how-do-you-run-multiple-programs-in-parallel-from-a-bash-script
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