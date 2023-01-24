# HTML

## Detect Browsers Not Supporting ES5
- https://stackoverflow.com/questions/74154325/warning-ie11-users-their-browser-is-unsupported-in-react-18
- https://html.spec.whatwg.org/multipage/scripting.html#attr-script-nomodule
```
<script nomodule>
  // this code will be executed only in browsers without ES module support
  // redirect to
  window.location.href = 'a page for non-ES5 browsers or a page where it is explained how to install a modern browser';
</script>
```

## <script> attributes
`<script async>`
- https://html.spec.whatwg.org/multipage/scripting.html#attr-script-async
  
`<script defer>`
- https://html.spec.whatwg.org/multipage/scripting.html#attr-script-defer
