# CSS

## Replace An Image
https://css-tricks.com/replace-the-image-in-an-img-with-css/
https://developer.mozilla.org/en-US/docs/Web/CSS/content#element_replacement
https://codepen.io/gerkenv/pen/MWmNYVN

## Center Content Inside <div>
https://stackoverflow.com/questions/7926540/css-center-content-inside-div
Set any `width` and `margin:auto`.
```css
.center {
  width: 655px;
  margin: auto;
}
```

## Vertically Center Content Inside Div Using `flex-box`
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_center-flex_btn
```jsx
<div
  style={{
    display: "flex",
    backgroundColor: "bisque",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    // height: "200px",
    // border: "3px solid bisque",
    width: "33%",
    marginBottom: "20pt",
  }}
>
```

## Safe Area
To avoid displaying something in unreachable area (due to camera location on mobile screen or not rectangle shape)
- https://developer.mozilla.org/en-US/docs/Web/CSS/env
