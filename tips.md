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

## 绑定与解除绑定事件的封装

```
function addEvent(obj,sEv,fn){
if(obj.addEventListener){
	obj.addEventListener(sEv,fn,false); 
	//支持ie9+ chrom firfox,false(冒泡)
	}else{
	obj.attachEvent('on'+sEv,fn);
	//兼容ie 6-8
	}
};

function removeEvent(obj,sEv,fn){
if(obj.removeEventListener){
obj.removeEventListener(sEv,fn,false);
}else{
obj.detachEvent('on'+sEv,fn);
}
```

## 运动函数的封装 
```
function startMove(obj,json,fnEnd){
clearInterval(obj.timer); //先清除之前的定时器
obj.timer = setInterval(function(){
var bStop = true; // 假设所有的值都到了
for( var attr in json ){ //遍历json属性
	var cur = (attr == 'opacity') ? Math.round(parseFloat(getStyle(obj,attr))*100) :
	parseInt(getStyle(obj,attr)); //对opacity 特殊处理
	var speed = (json[attr] - cur)/6;
	speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //speed 数字转化，防止不能到达目标的bug
	if( cur != json[attr]) bStop = false; //如果没有达到目标值，则bStop设为false;
	if(attr == 'opacity'){
		obj.style.filter = 'alpha(opacity='+ (cur + speed) +')';
		obj.style.opacity = (cur + speed)/100;
	}else{
	obj.style[attr] = cur + speed + 'px';
	}
}
	if(bStop){
		clearInterval(obj.timer);
		if(fnEnd) fnEnd(); //执行回调函数
	}
},30);
}

function getStyle(obj,name){
return obj.currentStyle ? obj.currentStyle[name] : window.getComputedStyle(obj,null)[name]; //浏览器兼容性处理，注意getComputedStyle为只读属性
}

function getByClass(oParent,sClass){
var aEle = oParent.getElementsByTagName('*');
var aResult =[];
var re = new RegExp('\\b' + sClass + '\\b','i');
for(var i=0; i<aEle.length;i++ ){
	if(re.test(aEle[i].className)) aResult.push(aEle[i]);
	}
return aResult;
}

```
## 获得所有checkbox节点方法
```
		var domList = document.getElementsByTagName(‘input’);
		var checkBoxList = [];
		var len = domList.length;//缓存到局部变量
		while (len--) {//使用while的效率会比for循环更高
		if (domList[len].type == ‘checkbox’) {
			checkBoxList.push(domList[len]);
			}
		}
```
## 延迟加载JS——动态创建DOM

function downloadJSAtOnload(){
	var element = document.createElement("script");
	element.srv= "defer.js"//需要延迟加载的js文件
	document.body.appendChild(element);

}
if(window.addEventListener) 
	window.addEventListener("load",downloadJSAtOnload)
else if(window.attachEvent)  //兼容浏览器-但绑定多个事件执行顺序是随机的
	window.attachEvent("onload,downloadJSAtOnload)
else window.onload = downloadJSAtOnload;

```
<!-- 放置在</body>标签之前 HTML文档底部 -->
<script>

</script>

```

## 条件语句书写建议

1. 多重判断时使用 Array.includes
```
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (redFruits.includes(fruit)) {
    console.log('red');
  }
```

2. 更少的嵌套，尽早 return
```
const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  // 条件 1: 尽早抛出错误
  if (!fruit) throw new Error('No fruit!');
  // 条件 2: 当水果不是红色时停止继续执行
  if (!redFruits.includes(fruit)) return; 
  //倒置判断
  console.log('red');

  // 条件 3: 必须是大质量的
  if (quantity > 10) {
    console.log('big quantity');
  }
```

3. 使用默认参数和解构
```
默认参数：function test(fruit, quantity = 1)
解构： function test({name} = {})
```
4. 倾向于遍历对象而不是 Switch 语句
```
1、
const fruitColor = {
  red: ['apple', 'strawberry'],
  yellow: ['banana', 'pineapple'],
  purple: ['grape', 'plum']
};

function test(color) {
  return fruitColor[color] || [];
}

2、
  const fruitColor = new Map()
    .set('red', ['apple', 'strawberry'])
    .set('yellow', ['banana', 'pineapple'])
    .set('purple', ['grape', 'plum']);

function test(color) {
  return fruitColor.get(color) || [];
}
3、
 const fruits = [
    { name: 'apple', color: 'red' }, 
    { name: 'strawberry', color: 'red' }, 
    { name: 'banana', color: 'yellow' }, 
    { name: 'pineapple', color: 'yellow' }, 
    { name: 'grape', color: 'purple' }, 
    { name: 'plum', color: 'purple' }
];

function test(color) {
  return fruits.filter(f => f.color == color);
}
```

5. 对 所有/部分 判断使用 Array.every & Array.some

```
条件：所有水果都是红色
	const isAllRed = fruits.every(f => f.color == 'red');

条件：任何一个水果是红色
	const isAnyRed = fruits.some(f => f.color == 'red');
```