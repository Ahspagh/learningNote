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

---
## flat函数的实现 ES10新增Array内置方法 数组扁平化

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
---
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
## 生成a-b之间的n个随机数并排序返回到目标数组
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
## aa-bb-cc转成驼峰式aaBbCc
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
## 提取 URL 中的各个 GET 参数并返回key-value格式
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
---
## 深度clone 
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
## JS去重方法
1. 利用for嵌套for，然后splice去重（ES5中最常用）
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
//双层for循环添加数组元素法
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

## 实现Promise
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

```
- Class实现：
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
## Set结构，打印出的size值
```
let s = newSet();
s.add([1]);s.add([1]);
console.log(s.size);//2
解析：两个数组[1]并不是同一个值，它们分别定义的数组，在内存中分别对应着不同的存
储地址，因此并不是相同的值
都能存储到Set结构中，所以size为2
```


## Sticky footer 布局 

1. 利用flex布局对视窗高度进行分割。footer的flex设为0，这样footer获得其固有的高度;content的flex设为1，这样它会充满除去footer的其他部分。
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
2. 负margin方式 

content元素的padding-bottom与footer元素的高度以及footer元素的margin-top值必须要保持一致。

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
这种负margin的布局方式，是兼容性最佳的布局方案，各大浏览器均可完美兼容，适合各种场景，但使用这种方式的前提是必须要知道footer元素的高度，且结构相对较复杂

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

##  类型判断的坑
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