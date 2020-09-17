全站黑白效果
```
html,
body {
	filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
	-webkit-filter: grayscale(100%);
	-moz-filter: grayscale(100%);
	-ms-filter: grayscale(100%);
	-o-filter: grayscale(100%);
	filter: grayscale(100%);
	filter: gray;
}
```
确保过渡不会过于花哨
```
html {
    transition: color 300ms, background-color 300ms;
}
```
暗黑模式： 反转配色，主题颜色包括图片色相旋转180度
```
html[theme='dark-mode'] img{
    filter: invert(1) hue-rotate(180deg);
}
```