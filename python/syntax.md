# Python syntax

## Comments
```py
# one-line comment
''' multi-line comment '''
""" multi-line comment """
```

## strings
### definitions
```py
one_line_string = "one line string"
multi_line_string = """multi line string"""
string = '%s and %s', ( one_line_string, multi_line_string )
```
### operatios
```py
one_line_string = "one line string"
one_line_string.split('e') # ['on', ' lin', ' string']
one_line_string.index('e') # 2
one_line_string.endswith('e') # False
```

## print
```py
print "Hello world"  # python 2.x
print("Hello world") # python 3.x
```

## get type
```
some_string = "some string"
type(some_string)
```
> str

