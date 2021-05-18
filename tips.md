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

- 暗黑模式： 反转配色，主题颜色包括图片色相旋转 180 度

```
html[theme='dark-mode'] img{
    filter: invert(1) hue-rotate(180deg);
}
```

---

## 每次打开子组件弹窗都进行初始化

:visible.sync 与 v-if 同时使用即可。

---

## flat 函数的实现 ES10 新增 Array 内置方法 数组扁平化

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

- 递归法 （一次性扁平所有）

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
   return arr1.reduce((acc, val) => {Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val)}, []);
   //ES6简写：{Array.isArray(val)?[...acc,...flattenDeep(val)]:[...acc,val] }   ,[]
}
```

```
.join(',').split(',').map(item=>Number(item))
```

实现 flat 功能（指定层数）

```
function flat(arr, depth = 1) {
    return depth > 0
        ? arr.reduce((acc, cur) => {
        if(Array.isArray(cur)) {
            return [...acc, ...flat(cur, depth-1)]
        }
        return [...acc, cur]
    } , [])
      : arr

function flat(arr, depth = 1) {
    return depth > 0
        ? arr.reduce((acc, cur) => {
        Array.isArray(cur)? [...acc, ...flat(cur, depth-1)]:[...acc, cur]
    } , [])
      : arr
}


```

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

---

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

---

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

---

## 获得所有 checkbox 节点方法

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

---

## 延迟加载 JS——动态创建 DOM

function downloadJSAtOnload(){
var element = document.createElement("script");
element.srv= "defer.js"//需要延迟加载的 js 文件
document.body.appendChild(element);

}
if(window.addEventListener)
window.addEventListener("load",downloadJSAtOnload)
else if(window.attachEvent) //兼容浏览器-但绑定多个事件执行顺序是随机的
window.attachEvent("onload,downloadJSAtOnload)
else window.onload = downloadJSAtOnload;

```
<!-- 放置在</body>标签之前 HTML文档底部 -->
<script>

</script>

```

---

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

---

## 实现冒泡排序

```
//升序算法
function sort(arr){
	for (var i = 0; i <arr.length-1; i++) {
		//外层 将最大交换到最后一位
		//-1：最后一轮即最大最小，可防止角标越界
		for (var j = 0; j <arr.length-1-i; j++) {
			//内层 将最大交换到倒数位 每轮比较需要排序的长度减小轮数
			if(arr[j]>arr[j+1]){
			<!-- var c=arr[j];//交换两个变量的位置
			arr[j]=arr[j+1];
			arr[j+1]=c; -->
			[arr[j],arr[j+1]]=[arr[j+1],arr[j]]
			}
		};
	};
	return arr.toString();
}
```

---

## 生成 a-b 之间的 n 个随机数并排序返回到目标数组

```
function randomNub(aArray=[], len, min, max) {
	if (len >= (max - min)) {
		return `超过${min}-${max}之间的个数范围${max - min - 1}个的总数`
	}
	if (aArray.length >= len) {
		aArray.sort(function(a, b) {
		return a - b
		});
		return aArray;
	}
	var nowNub = parseInt(Math.random() * (max - min - 1)) + (min + 1);

	for (var j = 0; j < aArray.length; j++) {
		if (nowNub == aArray[j]) {
		randomNub(aArray, len, min, max);
		return;
		}
	}

	aArray.push(nowNub);
	randomNub(aArray, len, min, max);
	return aArray;
}

var arr=[];
randomNub(arr,n,a,b);

```

---

## aa-bb-cc 转成驼峰式 aaBbCc

```
function combo(msg){
//首先划分为单词数组
var arr=msg.split("-");
for(var i=1;i<arr.length;i++){
	//i=1 从第二个单词开始首字母大写
	arr[i]=arr[i].charAt(0).toUpperCase()+arr[i].substr(1,arr[i].length-1);
	}
msg=arr.join("");
return msg;
}

```

---

## 提取 URL 中的各个 GET 参数并返回 key-value 格式

例http://item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e

返回{a: "1", b: "2", c: "", d: "xxx", e: undefined}

```
function serilizeUrl(url) {
	var urlObject = {};
	if (/\?/.test(url)) {
		//正则/\?/检验是否存在地址请求参数
		var urlString = url.substring(url.indexOf("?") + 1);
		//截取参数部分字符串 （？字符后的部分）
		var urlArray = urlString.split("&");
		//分割参数字段 （每个参数由字符&分割）
		for (var i = 0, len = urlArray.length; i < len; i++) {
			var urlItem = urlArray[i];
			var item = urlItem.split("=");
			urlObject[item[0]] = item[1];
		}
		return urlObject;
	}
	return null;
}
```

## 清除字符串前后空格 trim（）

```
用自带接口 trim()考虑兼容性：

if (!String.prototype.trim) {
	String.prototype.trim = function() {
		//依次匹配替换前空格和后空格为""
	return this.replace(/^\s+/, "").replace(/\s+$/,"");
	}
}
```

---

## 统计字符串中字符的个数

```
var str = 'asdfssaaasasasasaa';
var json = {};
for (var i = 0; i < str.length; i++) {
	if(!json[str.charAt(i)]){
		json[str.charAt(i)] = 1;
	}else{
		json[str.charAt(i)]++;
	}
};
//json {a: 9, s: 7, d: 1, f: 1}
<!-- var iMax = 0;
var iIndex = '';
for(var i in json){
	if(json[i]>iMax){
		iMax = json[i];
		iIndex = i;
	}`
} -->
```

---

## 将金额数字从后每三位增加一个逗号

```
15732426 => 15,732,426

num.
//思路：先将数字转为字符， str= str + '' ;
//利用反转函数，每三位字符加一个 ','最后一位不加； re()是自定义的反转函数，最后再反转回去！str.split("").reverse().join("")

for(var i = 1; i <= re(str).length; i++){
	tmp += re(str)[i - 1];
	if(i % 3 == 0 && i != re(str).length){
	tmp += ',';
	}
}
```

```
function format1(num){
    return num&& num.replace(/(?!^)(?=(\d{3})+\.)/g,",")
}

function format2 (num){
    return Intl.NumberFormat().format(num)
}

function format3 (num){
    return num.toLocaleString('en')
}
```

---

## 深度 clone 深拷贝简易实现

```
function clone(obj)
{
	if(typeof obj==‘object‘)
	{
		if(obj instanceof Array)
		{
			var result=[];
			for(var i=0;i<obj.length;i++)
			{
			result[i]=clone(obj[i]);
			}
			return result;
		}
		else
		{
			var result={};
			for(var i in obj)
			{
			result[i]=clone(obj[i]);
			}
		return result;
		}
	}
	else
	{
	return obj;
	}
}

```

---

## JS 去重方法

1. 利用 for 嵌套 for，然后 splice 去重（ES5 中最常用）

```
function unique(arr){
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i]===arr[j]){         //第一个等同于第二个，splice方法删除第二个
                    arr.splice(j,1);
                    j--;
                }
            }
        }
return arr;
}
```

//双层 for 循环添加数组元素法
function unique(arr,res=[]){
for(var i = 0 ; i< arr.length; i++)
{
for(var j = 0 ; j < res.length ; j++) {
if( arr[i] === res[j]){
break;
};
};
if(j == res.length){
res.push(arr[i]);
};
};
return res
}

```
////NaN和{}没有去重，null使用全等兼容处理
```

2. includes API

```
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var array =[];
    for(var i = 0; i < arr.length; i++) {
            if( !array.includes( arr[i]) ) {//includes 检测数组是否有某个值
                    array.push(arr[i]);
              }
    }
    return array
}
//高阶  return arr.reduce((prev,cur) => prev.includes(cur) ? prev : [...prev,cur],[]);
//{}没有去重
```

3. Filter

```
Map数据结构
let unique = (arr)=> {
	let seen = new Map();
	return arr.filter((item) => {
	return !seen.has(item) && seen.set(item,1);
	});
};
```

```
indexof
let unique = (arr) => {
	return arr.filter((item,index) => {
	return arr.indexOf(item) === index;
	})
};
//NaN、{}没有去重
```

4. splice API

```
function unique(arr){
	for(vari=0; i<arr.length;i++)
	{
		for(varj=i+1; j<arr.length; j++){
			if(arr[i]==arr[j]){	//第一个等同于第二个，splice方法删除第二个
			arr.splice(j,1); j--;
			}
		}
 	}
	returnarr;
}
```

5. 递归

```
function unique(arr) {
        var array= arr;
        var len = array.length;

    array.sort(function(a,b){   //排序后更加方便去重
        return a - b;
    })

    function loop(index){
        if(index >= 1){
            if(array[index] === array[index-1]){
                array.splice(index,1);
            }
            loop(index - 1);    //递归loop，然后数组去重
        }
    }
    loop(len-1);
    return array;
}
```

6. ES6 [...new Set(arr)]

```
function unique (arr) {
  return Array.from(new Set(arr))
}
//无法去掉“{}”空对象
```

---

## 计算字符串字符数

```
function strNum(s){
	if(!arguments.length||!s) return null;
	if(""==s) return 0;
	var l=0;
	for(var i=0;i<s.length;i++){
	if(s.charCodeAt(i)>255)
	l+=2;  //charCodeAt()得到的是 unCode 码
	else l+=1;   //汉字的 unCode 码大于 255bit 就是两个字节
	 }
	return l
}

```

---

## 实现一个类模板字符串的功能

```
let name = 'sunny';
let age = 21;
let str = '你好，${name} 已经 ${age}岁了'
str = str.replace(/\$\{([^}]*)\}/g,function(){
return eval(arguments[1]);
})
```

---

## 实现 Promise

```
var Promise = new Promise((resolve, reject) => {
if (操作成功) {
resolve(value)
} else {
reject(error)
}
})
Promise.then(function (value) {
// success
}, function (value) {
// failure
})

//面试手写基础版：
function myPromise(constructor){
    let self=this;
    self.status="pending" //定义状态改变前的初始状态
    self.value=undefined;//定义状态为resolved的时候的状态
    self.reason=undefined;//定义状态为rejected的时候的状态
    function resolve(value){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.value=value;
          self.status="resolved";
       }
    }
    function reject(reason){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.reason=reason;
          self.status="rejected";
       }
    }
    //捕获构造异常
    try{
       constructor(resolve,reject);
    }catch(e){
       reject(e);
    }
}
// 定义链式调用的then方法
myPromise.prototype.then=function(onFullfilled,onRejected){
   let self=this;
   switch(self.status){
      case "resolved":
        onFullfilled(self.value);
        break;
      case "rejected":
        onRejected(self.reason);
        break;
      default:
   }
}
```

- Class 实现：

```
//创建一个Promise的类
class Promise{
	constructor(executer){//构造函数constructor里面是个执行器
		this.status = 'pending';//默认的状态 pending
		this.value = undefined//成功的值默认undefined
		this.reason = undefined//失败的值默认undefined
		//状态只有在pending时候才能改变
		let resolveFn = value =>{
			//判断只有等待时才能resolve成功
			if(this.status == pending){
				this.status = 'resolve';
				this.value = value;
			}
		}
		//判断只有等待时才能reject失败
		let rejectFn = reason =>{
			if(this.status == pending){
				this.status = 'reject';
				this.reason = reason;
			}
		}
		try{
			//把resolve和reject两个函数传给执行器executer
			executer(resolve,reject);
		}catch(e){
			reject(e);//失败的话进catch
		}
	}
	then(onFufilled,onReject){
		//如果状态成功调用onFufilled
		if(this.status = 'resolve'){
			onFufilled(this.value);
		}
		//如果状态失败调用onReject
		if(this.status = 'reject'){
			onReject(this.reason);
		}
	}
}
```

```
1. Promise 的状态：一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。

2. 状态迁移：等待态可以迁移至执行态或者拒绝态；执行态和拒绝态不能迁移至其他状态，且必须有一个不可变的终值

3. then 方法：一个 promise 必须提供一个 then 方法以访问其当前值、终值和据因，then 方法可以被同一个 promise 调用多次。then 方法接收两个参数 onFulfilled, onRejected，onFulfilled 和 onRejected 必须被作为函数调用，且调用不可超过1次。then 方法需返回 Promise 对象

function MPromise(executor) {
    this.status = 'pending'; // pending ， fulfilled ， rejected
    this.data = '' // 当前promise的值，主要用于 then 方法中的 fulfilled ， rejected 两种状态的处理
    this.resolveFuncList = []; //  使用数组的原因是，一个promise可以同时执行多个 then 方法， 也就会同时存在多个then回调
    this.rejectFunc;
    const self = this;
    function resolve(value) {
        // 使用 setTimeout 实现异步
        setTimeout(() => {
            if (self.status === 'pending') {
                self.status = 'fulfilled';
                self.data = value;
                // 执行 resolve 函数
                self.resolveFuncList.forEach(func => {
                    func(value)
                });
            }
        })
    }

    function reject(reason) {
        setTimeout(() => {
            if (self.status === 'pending') {
                self.status = 'rejected';
                self.data = value;
                self.rejectFunc && self.rejectFunc(reason);
            }
        })
    }
    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}

MPromise.prototype.then = function (onFulfilled, onRejected) {
    let promise2;
    // 区分不同状态下的处理
    if (this.status === 'pending') {
        return promise2 = new MPromise((res, rej) => {
            this.resolveFuncList.push(function (value) {
                let x = onFulfilled(value);
                resolvePromise(promise2, x, res, rej)
            })

            this.rejectFunc = function (reason) {
                let x = onRejected(reason);
                resolvePromise(promise2, x, res, rej)
            }
        })
    }
    if (this.status === 'fulfilled') {
        return promise2 = new MPromise((res, rej) => {
            setTimeout(() => {
                let x = onFulfilled(this.data) // 输出将上一次执行结果
                resolvePromise(promise2, x, res, rej)
            })
        })
    }
    if (this.status === 'rejected') {
        return promise2 = new MPromise((res, rej) => {
            setTimeout(() => {
                let x = onRejected(this.data)
                resolvePromise(promise2, x, res, rej)
            })
        })
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (x instanceof MPromise) {
        if (x.status === 'pending') {
            x.then(value => {
                resolvePromise(promise2, value, resolve, reject)
            }, reason => {
                reject(reason)
            })
        } else {
            x.then(resolve, reject)
        }
    } else {
        resolve(x)
    }
}
```

```
 /**
 * Promise.all Promise进行并行处理
 * 参数: promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 当这个数组里的所有promise对象全部进入FulFilled状态的时候才会resolve。
 */

 Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        let values = []
        let count = 0
        promises.forEach((promise, index) => {
            promise.then(value => {
                console.log('value:', value, 'index:', index)
                values[index] = value
                count++
                if (count === promises.length) {
                    resolve(values)
                }
            }, reject)
        })
    })
}
/**
 * Promise.race
 * 参数: 接收 promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
 */
 Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((promise) => {
            promise.then(resolve, reject);
        });
    });
}
```

---

## Set 结构，打印出的 size 值

```
let s = newSet();
s.add([1]);s.add([1]);
console.log(s.size);//2
解析：两个数组[1]并不是同一个值，它们分别定义的数组，在内存中分别对应着不同的存
储地址，因此并不是相同的值
都能存储到Set结构中，所以size为2
```

## Sticky footer 布局

1. 利用 flex 布局对视窗高度进行分割。footer 的 flex 设为 0，这样 footer 获得其固有的高度;content 的 flex 设为 1，这样它会充满除去 footer 的其他部分。

```

wrapper {
    display: flex;
    flex-flow: column;
    min-height: 100vh;
}
.content {
    flex: 1;
}
.footer{
    flex: 0;
}
```

2. 负 margin 方式

content 元素的 padding-bottom 与 footer 元素的高度以及 footer 元素的 margin-top 值必须要保持一致。

```
.wrapper {
    min-height: 100%;
}

.wrapper .content{
    padding-bottom: 50px; /* footer区块的高度 */
}

.footer {
    position: relative;
    margin-top: -50px;  /* 使footer区块正好处于content的padding-bottom位置 */
    height: 50px;
    clear: both;
}

.clearfix::after {
    display: block;
    content: ".";
    height: 0;
    clear: both;
    visibility: hidden;
}
```

这种负 margin 的布局方式，是兼容性最佳的布局方案，各大浏览器均可完美兼容，适合各种场景，但使用这种方式的前提是必须要知道 footer 元素的高度，且结构相对较复杂

---

## 事件循环与微队列

```
console.log('script start')
async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {console.log('async2 end')}
async1()
setTimeout(function () {console.log('setTimeout')}, 0)
new Promise(resolve => {
    console.log('Promise')
    resolve()
}).then(function () {
        console.log('promise1')
    }).then(function () {
        console.log('promise2')
    })
console.log('script end')
// 结果如下
// script start
// async2 end
// Promise
// script end
// async1 end
// promise1
// promise2
// setTimeout
```

---

## 异步任务并发

```
可不断的添加异步任务（异步任务都是Promise），但只能同时处理5个任务，5个一组执行完成后才能执行下一组，任务队列为空时暂停执行，当有新任务加入则自动执行

class RunQune{
    constructor(){
        this.list = []; // 任务队列
        this.target = 5; // 并发数量
        this.flag = false; // 任务执行状态
        this.time = Date.now()
    }
    async sleep(time){
        return new Promise(res=>setTimeout(res,time))
    }
    // 执行任务
    async run(){
        while(this.list.length>0){
            this.flag = true;
            let runList = this.list.splice(0,this.target);
            this.time = Date.now()
            await this.runItem(runList)
            await this.sleep(300) // 模拟执行时间
        }
        this.flag = false;
    }
    async runItem(list){
        return new Promise((res)=>{
            while(list.length>0){
                const fn = list.shift();
                fn().then().finally(()=>{
                    if(list.length === 0){
                        res()
                    }
                })
            }
        })
    }
    // 添加任务
    push(task){
        this.list.push(...task);
        !this.flag && this.run()
    }
}

不需要等待一组完成在执行下一组，只要并发量没有满，就可以加入新的任务执行，实现的思路没太大变化，在 finally 中改为新增任务。
```

## 类型判断的坑

```
console.log((2).constructor === Number); // true
console.log((true).constructor === Boolean); // true
console.log(('str').constructor === String); // true
console.log(([]).constructor === Array); // true
console.log((function() {}).constructor === Function); // true
console.log(({}).constructor === Object); // true

创建一个对象，更改它的原型，constructor就会变得不可靠了

function Fn(){};

Fn.prototype=new Array();  //！！！

var f=new Fn();

console.log(f.constructor===Fn);    // false
console.log(f.constructor===Array); // true

```

## 实现 Array.prototype.map、filter 和 reduce

```

function map(arr, mapCallback) {
  // 首先，检查传递的参数是否正确。
  if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') {
    return [];
  } else {
    let result = [];
    // 每次调用此函数时，我们都会创建一个 result 数组
    // 因为我们不想改变原始数组。
    for (let i = 0, len = arr.length; i < len; i++) {
      result.push(mapCallback(arr[i], i, arr));
      // 将 mapCallback 返回的结果 push 到 result 数组中
    }
    return result;
  }
}


function filter(arr, filterCallback) {
  // 首先，检查传递的参数是否正确。
  if (!Array.isArray(arr) || !arr.length || typeof filterCallback !== 'function')
  {
    return [];
  } else {
    let result = [];
     // 每次调用此函数时，我们都会创建一个 result 数组
     // 因为我们不想改变原始数组。
    for (let i = 0, len = arr.length; i < len; i++) {
      // 检查 filterCallback 的返回值是否是真值
      if (filterCallback(arr[i], i, arr)) {
      // 如果条件为真，则将数组元素 push 到 result 中
        result.push(arr[i]);
      }
    }
    return result; // return the result array
  }
}

function reduce(arr, reduceCallback, initialValue) {
  // 首先，检查传递的参数是否正确。
  if (!Array.isArray(arr) || !arr.length || typeof reduceCallback !== 'function')
  {
    return [];
  } else {
    // 如果没有将initialValue传递给该函数，我们将使用第一个数组项作为initialValue
    let hasInitialValue = initialValue !== undefined;
    let value = hasInitialValue ? initialValue : arr[0];
   、

    // 如果有传递 initialValue，则索引从 1 开始，否则从 0 开始
    for (let i = hasInitialValue ? 1 : 0, len = arr.length; i < len; i++) {
      value = reduceCallback(value, arr[i], i, arr);
    }
    return value;
  }
}
```

## 手写最终版深拷贝

```
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];


function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

function getType(target) {
    return Object.prototype.toString.call(target);
}

function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            if (param) {
                const paramArr = param[0].split(',');
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}

function cloneOtherType(targe, type) {
    const Ctor = targe.constructor;
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe);
        case regexpTag:
            return cloneReg(targe);
        case symbolTag:
            return cloneSymbol(targe);
        case funcTag:
            return cloneFunction(targe);
        default:
            return null;
    }
}

function clone(target, map = new WeakMap()) {

    // 克隆原始类型
    if (!isObject(target)) {
        return target;
    }

    // 初始化
    const type = getType(target);
    let cloneTarget;
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target, type);
    } else {
        return cloneOtherType(target, type);
    }

    // 防止循环引用
    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    // 克隆set
    if (type === setTag) {
        target.forEach(value => {
            cloneTarget.add(clone(value, map));
        });
        return cloneTarget;
    }

    // 克隆map
    if (type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value, map));
        });
        return cloneTarget;
    }

    // 克隆对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = clone(target[key], map);
    });

    return cloneTarget;
}

module.exports = {
    clone
};

```

---

## Object、Set、Array、Map 相互转换

- 原理

  Object.entries 获取对象的键值对

  Object.FromEntries 把键值对列表转成对象

  Object.entries 和 Object.fromEntries 之间是可逆的。

```
1，Object转Map

let arr={foo:'hello',bar:100};

let map=new Map(Object.entries(arr));

console.log(map)

2,Map转Object

let map=new Map([['foo','hello'],['bar',100]]);

let obj=Object.fromEntries(map);

console.log(obj);

3,Object转Array

let obj={'foo':'hello','bar':100};

let arr=Object.entries(obj);

console.log(arr);

4,Array转成Object

let arr=[['foo','hello'],['bar',100]];

let obj=Object.fromEntries(arr);

console.log(obj);

5,Object转Set

let obj={'foo':'hello','bar':100};

let set=new Set(obj);

6,Set转Object

let obj={'foo':'hello','bar':100};

let set=new Set(obj);

let newObj=Object.formEntries(set);

console.log(newObj);

7,Array转Set

let arr=[['foo','hello'],['bar',100]];

let set=new Set(arr);

console.log(set)
```

---

## 时间订阅和发布的设计模式

收集事件名，对应的方法体；当触发对应事件名时，把事件名对应的全部方法体执行一遍。

## 空间复杂度优化

function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
if( n <= 1 ) {return ac2};

return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

for (let i = 2; i <= n; i++) {
dp[i] = dp[i-1] + dp[i-2];
}

dp[i] = dp[i-1] + dp[i-2]; ==>

因为 dp[i]只与 dp[i-1] 和 dp[i-2] 有关，没有必要存储所有出现过的 dp 项，只用两个临时变量去存储这两个状态即可。
<<<<<<< HEAD
[a1, a2] = [a2, a1 + a2];

const climbStairs = function(n) {
let a1 = 1;
let a2 = 1;
for (let i = 2; i <= n; i++) {
[a1, a2] = [a2, a1 + a2];
}
return a2;
}
时间复杂度：O(n)
空间复杂度：O(1)
=======
[a1, a2] = [a2, a1 + a2];

for (let i = 2; i <= n; i++) {
[a1, a2] = [a2, a1 + a2];
}
时间复杂度：O(n)
空间复杂度：O(1)

## Vue 踩坑案例

> > > > > > > 7d2b5f4b484106105492af62d5e5846dcb6ff7f5

## Vue 踩坑案例

1. 直接给 data 里面的对象添加属性然后赋值，新添加的属性不是响应式的。 解决办法： 通过 Vue.set(对象，属性，值)这种方式添加对象属性为响应式的

2. 在 created 操作 DOM 时，会报错，获取不到 DOM，实则为 Vue 实例没有挂载 解决办法：通过 Vue.nextTick(回调函数获取)

## is 特性

动态组件：

```
<component :is="componentName"></component>

```

componentName 可以是在本页面已经注册的局部组件名和全局组件名,也可以是一个组件的选项对象。 当控制 componentName 改变时就可以动态切换选择组件
ps.

```
<ul>
<card-list></card-list>
</ul>
限定HTML的ul元素内只能出现li元素时 所以上面<card-list></card-list>会被作为无效的内容提升到外部，并导致最终渲染结果出错
这时使用 is 特性

<ul>
<li is="cardList"></li>
</ul>


```

## 数组元素包含对象等类型，又该如何去重

```
JSON.stringify+map结构去重

const removeDuplicates = (arr) => {
    let map = new Map()
    arr.forEach(item => {
        map.set(JSON.stringify(item), item)
    })
    return [...map.values()]
}
// 测试
removeDuplicates([123, "meili", "123", "mogu", 123])
// [123, "meili", "123", "mogu"]
removeDuplicates([123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"])
// [123, [1, 2, 3], [1, "2", 3], "meili"]
removeDuplicates([123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"])
// [123, {a: 1}, a: {b: 1}, {a: "1"}, "meili"]

```

<<<<<<< HEAD

- # 如果数组元素是 object 类型且里面键的顺序不同则会认为是两个不同放入数组元素

比较：

首先判断类型是否一致，类型不一致则返回认为两个数组元素是不同的，否则继续
如果是数组类型，则递归比较数组中的每个元素是否相等
如果是对象类型，则递归比较对象中的每个键值对是否相等
否则，直接 === 比较
去重：

采用 reduce 去重，初始 accumulator 为 []
采用 findIndex 找到 accumulator 是否包含相同元素，如果不包含则加入，否则不加入
返回最终的 accumulator ，则为去重后的数组

=======

```
// 获取类型
const getType = (function() {
    const class2type = { '[object Boolean]': 'boolean', '[object Number]': 'number', '[object String]': 'string', '[object Function]': 'function', '[object Array]': 'array', '[object Date]': 'date', '[object RegExp]': 'regexp', '[object Object]': 'object', '[object Error]': 'error', '[object Symbol]': 'symbol' }

    return function getType(obj) {
        if (obj == null) {
            return obj + ''
        }
        // javascript高级程序设计中提供了一种方法,可以通用的来判断原始数据类型和引用数据类型
        //ps.Object.prototype.toString.call不能准确判断person是Person类的实例，而只能用instanceof 操作符来进行判断
        const str = Object.prototype.toString.call(obj)
        return typeof obj === 'object' || typeof obj === 'function' ? class2type[str] || 'object' : typeof obj
    };
})();

/**
 * 判断两个元素是否相等
 * @param {any} o1 比较元素
 * @param {any} o2 其他元素
 * @returns {Boolean} 是否相等
 */
const isEqual = (o1, o2) => {
    const t1 = getType(o1)
    const t2 = getType(o2)

    // 比较类型是否一致
    if (t1 !== t2) return false


    // 类型一致
    if (t1 === 'array') {
        // 首先判断数组包含元素个数是否相等
        if (o1.length !== o2.length) return false
=======

    // 类型一致
    if (t1 === 'array') {
        // 首先判断数组包含元素个数是否相等
        if (o1.length !== o2.length) return false
        // 比较两个数组中的每个元素
        return o1.every((item, i) => {
            // return item === target

            return isEqual(item, o2[i])
        })
    }

    if (t2 === 'object') {
        // object类型比较类似数组
        const keysArr = Object.keys(o1)
        if (keysArr.length !== Object.keys(o2).length) return false
        // 比较每一个元素
        return keysArr.every(k => {
            return isEqual(o1[k], o2[k])
        })
    }

    return o1 === o2
}

// 数组去重
const removeDuplicates = (arr) => {
    return arr.reduce((accumulator, current) => {
        const hasIndex = accumulator.findIndex(item => isEqual(current, item))
        if (hasIndex === -1) {
            accumulator.push(current)
        }
        return accumulator
    }, [])
}

// 测试
removeDuplicates([123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili", {a:1, b:2}, {b:2, a:1}])
// [123, {a: 1}, a: {b: 1}, {a: "1"}, "meili", {a: 1, b: 2}]
```

## 手写 Array.splice

=======

```
Array.prototype._splice = function(start, deleteCount) {
    // 入参元素个数
    let argumentsLen = arguments.length
    // 数组
    let array = Object(this)
    // 数组长度
    let len = array.length
    // 添加元素个数
    let addCount = argumentsLen > 2 ? argumentsLen -2 : 0
    // 计算有效的 start
    let startIndex = computeSpliceStartIndex(start, array)
    // 计算有效的 deleteCount
    let delCount = computeSpliceDeleteCount(startIndex, deleteCount, len)
    // 记录删除的数组元素
    let deletedElements = new Array(delCount)


    // 将待删除元素记录到 deletedArray
    recordDeleteElements(startIndex, delCount, array, deletedElements)

=======

    // 将待删除元素记录到 deletedArray
    recordDeleteElements(startIndex, delCount, array, deletedElements)


    // 密封对象
    if(delCount !== addCount && Object.isSealed(array)) {
        throw new TypeError('the array is sealed')
    }
    // 冻结对象
    if(delCount > 0 && addCount > 0 && Object.isFrozen(array)) {
        throw new TypeError('the array is frozen')
    }


    // 移动数组元素
    moveElements(startIndex, delCount, array, addCount)

    let i = startIndex
    let argumentsIndex = 2

=======

    // 移动数组元素
    moveElements(startIndex, delCount, array, addCount)

    let i = startIndex
    let argumentsIndex = 2

>>>>>>> 7d2b5f4b484106105492af62d5e5846dcb6ff7f5
    // 插入新元素
    while (argumentsIndex < argumentsLen) {
        array[i++] = arguments[argumentsIndex++]
    }


=======

    array.length = len - delCount + addCount

    // 返回删除元素数组
    return deletedElements;
}

// 计算真实的 start
function computeSpliceStartIndex(start, len) {
    // 处理负值，如果负数的绝对值大于数组的长度，则表示开始位置为第0位
    if(start < 0) {
        start += len
        return start < 0 ? 0 : start
    }
    // 处理超出边界问题
    return start > len - 1 ? len - 1: start

}

}


// 计算真实的 deleteCount
function computeSpliceDeleteCount(startIndex, deleteCount, len) {
    // 超出边界问题
    if(deleteCount > len - startIndex) deleteCount = len - startIndex
    // 负值问题
    if(deleteCount < 0) deleteCount = 0
    return deleteCount
}

// 记录删除元素，用于 Array.prototype.splice() 返回
function recordDeleteElements(startIndex, delCount, array, deletedElementd) {
    for(let i = 0; i < delCount; i++) {
        deletedElementd[i] = array[startIndex + i]
    }
}

// 移动数组元素，便于插入新元素
function moveElements(startIndex, delCount, array, addCount) {
    let over = addCount - delCount
    if(over) {
        // 向后移
        for(let i = array.length - 1; i >= startIndex + delCount; i--) {
            array[i+over] = array[i]
        }
    } else if (over < 0) {
        // 向前移
        for(let i = startIndex + delCount; i <= array.length - 1; i++) {
            if(i + Math.abs(over) > array.length - 1) {
                // 删除冗于元素
                delete array[i]
                continue
            }
            array[i] = array[i + Math.abs(over)]
        }
    }
}

const months = ['Jan', 'March', 'April', 'June']
console.log(months._splice(1, 0, 'Feb'))
// []
console.log(months)
// ["Jan", "Feb", "March", "April", "June"]

console.log(months._splice(4, 1, 'May'))
// ["June"]
console.log(months)
// ["Jan", "Feb", "March", "April", "May"]
```

## 尾递归 和 尾调用

递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。

阶乘函数

```
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5) // 120
```

尾递归阶乘函数 只保留一个调用记录，复杂度 O(1) 。

```
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5, 1) // 120


function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

function factorial(n) {
  return tailFactorial(n, 1);
}

factorial(5) // 120

柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。

function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}

function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

const factorial = currying(tailFactorial, 1);

factorial(5) // 120


第二种 使用 ES6 的函数默认值。
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5) // 120
```

非尾递归的 Fibonacci 数列

```
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 超时
Fibonacci(500) // 超时
```

尾递归优化过的 Fibonacci 数列

```
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity

```

## params 对象中的 value 为 null，''，undefined 的 key

```
function filterParams(obj) {
  const keys = Object.keys(obj)
  keys.forEach(key => {
    const value = obj[key]
    if (isObject(value)) filterParams(value)
    if (isEmpty(value)) delete obj[key]
  })
  return obj
}

function isEmpty(input) {
  return ['', undefined, null].includes(input)
}

function isObject(input) {
  return input !== null && (!Array.isArray(input)) && typeof input === 'object'
}
```

## length

({}+{}).length === 30 Object.prototype.toString() //"[object Object]"[object object]+[object object]）.length =30
([]+[]).length === 0 Array.prototype.toString() 不同于 Object.prototype.tostring()将得到空字符串
(function(){}).length === 0 函数的长度其实是形参的长度

## 闭包的问题

function box(){
var arr = [];
for(var i=0;i<5;i++){
arr[i] = (function(num){ //自我执行，并传参(将匿名函数形成一个表达式)(传递一个参数)
return num; //这里的 num 写什么都可以  
 })(i); //这时候这个括号里面的 i 和上面 arr[i]的值是一样的都是取自 for 循环里面的 i  
 }  
 return arr;
}
在 for 循环里面的匿名函数执行 return i 语句的时候，由于匿名函数里面没有 i 这个变量，所以这个 i 他要从父级函数中寻找 i，而父级函数中的 i 在 for 循环中，当找到这个 i 的时候，是 for 循环完毕的 i，也就是 5，所以这个 box 得到的是一个数组[5,5,5,5,5]。

for 循环在主线程执行完毕后才开始执行宏任务（Task） 此时 i 已经在同一个内存地址储存五次（堆栈）
for(var i=1;i<5;i++){
setTimeout(function(){console.log(i)},i\*1000);
}
改 1：立即执行函数创建闭包以保存其作用域内部变量
for(var i=1;i<5;i++){
(function(i){
setTimeout(function(){console.log(i)},i\*1000);
})(i)
}
改 2 ES6 let 关键字创建块级变量，在不同地址储存
for(let i=1;i<5;i++){
setTimeout(function(){console.log(i)},i\*1000);
}
var li = document.getElementsByTagName('li');
var len = li.length;
for (var i = 0; i < len; i++) {
li[i].onclick = function () {
console.log(i); //此处没有变量 i，因此需要向逐级向上寻找。
}
}

//方法一
var li = document.getElementsByTagName('li');
var len = li.length;
for (var i = 0; i < len; i++) {
(function (j) {
li[j].onclick = function () {
console.log(j);
}
})(i);
}

//方法二
var li = document.getElementsByTagName('li');
var len = li.length;
for (var i = 0; i < len; i++) {
li[i].index = i;
li[i].onclick = function () {
console.log(this.index);
}
}

//方法三
var ul=document.getElementsByTagName('ul')[0];
ul.onclick=function(e){
var ev = ev || window.event;
var target = ev.target || ev.srcElement;
if(target.nodeName.toLowerCase() == "li"){
var li=this.querySelectorAll("li");
var index = Array.prototype.indexOf.call(li,target);
console.log(index);
}
}

## 任务队列陷阱题

```
console.log("start")
setTimeout(() => {    //加入第二轮宏任务
  console.log('children2');
  Promise.resolve().then(() => {
    console.log('children3');//加入第二轮微任务
  })
}, 0);
new Promise(function (resolve, reject) {
  console.log('children4');
  setTimeout(() => { //第三轮宏任务
    console.log("children5")
    resolve("children6") //加入第三轮微任务 .then被延时执行
  }, 0);
}).then((res) => {  //第一轮宏任务并未resolve不会加入微任务队列 //加入第二轮微任务
  console.log('children7');
  setTimeout(() => {//第三轮宏任务
    console.log(res);//
  }, 0);

})
//start
  //children4
  //第一轮宏任务结束，第一轮并无微任务，开始第二轮宏任务
  //children2
   //第二轮宏任务结束 开始清空微任务
  //children3
  //第三轮宏任务开始
  //children5
  //清空第三轮微任务
  //children7
  //开始第四轮宏任务
  //children6


```

before NodeV11 children2，children5，children3，children7，children6

```

```

- 数组类型的原型链

```
a=[]
a.__proto__===Array.prototype//true
Array.prototype.__proto__===Object.prototype//true
Object.prototype.__proto__===null//true
Array.prototype.constructor===Array
Object.prototype.constructor===Object
```

- 多维数组初始化

dim( d1 [,d2 [,d3 [... ]]], value )
d1,d2,d3 代表各个维度数组所引用的元素个数，value 代表初始值
dim( 3,3,"x" ) // => [['x','x','x'],['x','x','x'],['x','x','x']]
这里一位数组引用了 3 个二维数组，每个二维数组引用了 3 个初始化值’x’
dim( 2,2,2,0 ) // => [[[0,0],[0,0]],[[0,0],[0,0]]]
dim( 3, true ) // => [true,true,true]

var xxx = function(){ return "xX" }
dim( 2,5,xxx ) // => [['xX','xX','xX','xX','xX'],['xX','xX','xX','xX','xX']]

1

```

function dim(){

    var len = arguments.length;

    var args = Array.prototype.slice.call(arguments,0,len-1);

    var content = arguments[len-1];

    var result = [];



    var traverse = function foo(from,deep){

        var arg = args[deep];

        if(deep < args.length - 1){

            for(var i=0;i
                var array = [];

                from.push(array);

                foo(array,deep+1);

            }

        }

        else{

            for(var i=0;i
                if(typeof content === "function"){

                    from.push(content());

                }

                else{

                    from.push(content);

                }

            }

        }

    };

    traverse(result,0);

    return result;

}
```

- 使用 settimeout 实现 setInterval

```
function interval (fn，timeout=300){
    let timer={flag:true}
    function recursion(){
        if(timer.flag){
            fn.call(null)
            setTimeout(recursion,timeout)
        }

    }
    setTimeout(recursion,timeout)
    return timer
}

```

setInterval 并不是真的每隔一定时间立即执行一次回调函数，而是将函数加入到事件队列，只有当执行栈为空时才会取出事件执行，所以可能会出现执行栈执行时间超过设定的间隔时间
导致事件队列中累计多个定时器加入，这时便会依次执行而没有达到间隔时间的效果

额外增加一个计次参数

```
function mySetInterval(fn, millisec,count){
  function interval(){
    if(typeof count===‘undefined’||count-->0){
      setTimeout(interval, millisec);
      try{
        fn()
      }catch(e){
        count = 0;
        throw e.toString();
      }
    }
  }
  setTimeout(interval, millisec)

```
