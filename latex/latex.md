# LaTeX

## Reference
- https://latex-programming.fandom.com/wiki/List_of_LaTeX_symbols
- https://en.wikibooks.org/wiki/LaTeX/Mathematics
- http://tug.ctan.org/info/latex-refsheet/LaTeX_RefSheet.pdf


## Horizontal Spaces
https://en.wikibooks.org/wiki/LaTeX/Mathematics#Controlling_horizontal_spacing
```
\,    small space    3/18 of a quad
\:    medium space   4/18 of a quad
\;    large space    5/18 of a quad
\!    negative space -3/18 of a quad 
\quad                1 quad
```

## Multiple Equations
- [how to split lines](https://tex.stackexchange.com/questions/3782/how-can-i-split-an-equation-over-two-or-more-lines)
```
\begin{equation}
a = b + c \\
d = e + f
\end{equation}
```

## Enlarge Equation Text
https://www.quora.com/How-can-I-increase-the-font-size-of-mathematical-equations-in-Latex
Use `\huge`, `\large`, `\small`...
```
\begin{equation} 
\large
a = b + c
\end{equation} 
```

## Math Symbols
- [average `\overline{x}`](https://tex.stackexchange.com/questions/347804/average-symbol-for-showing-a-math-variable-is-the-outcome-of-an-average)
- fraction `\frac{1}{x}`
- subscript `x_i` or long subscript `x_{i+y}`
```
\begin{equation} \large
\frac{1}{N} \sum_{i=1}^{N} \vert \; \overline{y_i} - y_i \; \vert
\end{equation}
```
