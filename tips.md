## 全站黑白效果
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
- 暗黑模式： 反转配色，主题颜色包括图片色相旋转180度
```
html[theme='dark-mode'] img{
    filter: invert(1) hue-rotate(180deg);
}
```
---

## 每次打开子组件弹窗都进行初始化

:visible.sync 与 v-if同时使用即可。

## flat函数的实现

https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/flat

- 迭代法：
```
const flatten = (arr, list=[])=>{
	for (let i =0;i<arr.length; i++){
		if(Array.isArray(arr[i])){
			arr = arr.slice(0,i).concat(arr[i]).concat(arr.slice(i+1))
			i--
		}else{
			list.push(arr[i])
		}
	}
	return list
}
```
- 递归法
```
const flat = (arr,list=[])=>{
	if(!Array.isArray(arr)) 
	return list.push(arr)
	arr.forEach(item = >flat(item,list))
	return list
}
```
```
function flattenDeep(arr1) {
   return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
   //ES6简写：Array.isArray(val)?[...acc,flattenDeep(val)]:[...arr,val]    ,[]
}
```
```
.join(',').split(',').map(item=>Number(item)) 
```
---

## 数组元素随机排序
```
let arr =[1,2,3,4,5,6,7,8,9]
arr.sort(()=>{
	return Math.random() - 0.5
})
```
```
function randSort1(arr){
	for(var i = 0,len = arr.length;i <len; i++ ){
	var rand = parseInt(Math.random()*len);
	//var temp = arr[rand];
	//arr[rand] = arr[i];
	//arr[i] = temp; 
	//结构赋值交换数组元素位置
	[arr[i],arr[rand]]=[arr[rand],arr[i]]
	}
return arr;
}
```
```
function randSort2(arr){
var mixedArray = [];
	while(arr.length > 0){
	var randomIndex = parseInt(Math.random()*arr.length);
	mixedArray.push(arr[randomIndex]);
	arr.splice(randomIndex, 1);
	}
return mixedArray;
}
```

## 
```