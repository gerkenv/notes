# Makefile

## Available By Default On Mac / Lunix
```
# run to check availability
which make
```

## Allowed File Names
- https://stackoverflow.com/a/58852176
`makefile`, `Makefile`, `GNUmakefile`.
Otherwise call `make -f <file_name>`

## Example File
```make
test:
    echo "test - first command"
    echo "test - next command"

another-test: 
    echo "another test - first command"
    echo "another test - next command"
```

## Default Command `make`
If you call `make` from the same directory where `makefile` is located.
It will take the first command from a file ( in the [example above](#example-file) it is `test` ) and execute it.

## Dependencies
You can also combine commands in any order by declaring them as dependencies.
https://makefiletutorial.com/#beginner-examples

## Run Custom Command
If you have multiple command which are nor related - it is totally fine, 
you can call each of them individually with their names.
For [example](#example-file) those are:
```shell
make test
make another-test
```

## Execute Command From A Directory
- https://stackoverflow.com/a/1789616
```makefile
test:
    cd directory && command
```

## Combining Commands
- https://makefiletutorial.com/#command-execution
Each line is executed in, kind of, a new shell. So to execute few commands in the same context you need to explicitely combine those.
```
all: 
	cd ..
	# The cd above does not affect this line, because each command is effectively run in a new shell
	echo `pwd`

	# This cd command affects the next because they are on the same line
	cd ..;echo `pwd`

	# Same as above
	cd ..; \
	echo `pwd`
```
You cna also apply `&&`, `||`.
