## 1.typeof 和 instanceof 的区别：

typeof 可以判断所有变量的类型，判断对象时只能返回 Object。instanceof 可以对不同的对象实例进行判断。

typeof 判断所有变量的类型，返回值有 number，boolean，string，function，object，undefined

---

## 2. 最近浏览的新技术等等

- 2.1 CSS 自定义属性 动态变量 替代预处理器https://segmentfault.com/a/1190000015948538
- 2.2 vite vue3.0 支持 TS 的按需编译工具--前端在开发环境下一种新的打包工具
  https://zhuanlan.zhihu.com/p/220603467

- 2.3 deno http://www.ruanyifeng.com/blog/2020/01/deno-intro.html

https://mp.weixin.qq.com/s/J7qX9j-II19Am4RwUTUiBQ

- 2.4 Sticky footer 布局 

https://segmentfault.com/a/1190000015123189

## 3. flex 可以做的事

- 3.1 双飞翼布局 左右固定中间自适应

父元素设置 display：flex 左右固定宽高

子元素设置 flex: 1; === flex: 1 1 auto;

第一个参数表示: flex-grow 定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大

第二个参数表示: flex-shrink 定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小

第三个参数表示: flex-basis 给上面两个属性分配多余空间之前, 计算项目是否有多余空间, 默认值为 auto, 即项目本身的大小

- 3.2 垂直居中

父元素 display：flex;
子元素 justify-content：center；align-items:center

等效的有父元素 display：table-cell;vertical-align：middle;

等同 img 标签 text-align:center 子元素 display：inline-block

---

## 4. 闭包的理解

### 闭包就是能够读取其他函数内部变量的函数

```
js并不是为了创造闭包而创造，完全只是因为js允许函数嵌套，还能return返回子函数，以及js特有的事件循环机制，导致这些子函数不是立即调用，让父函数不敢注销自己作用域中的数据，才会产生所谓闭包。

也正因为这个闭包这个特性，闭包函数可以让父函数的数据一直驻留在内存中保存，从而这也是后来js模块化的基础。

闭包可以理解成“定义在一个函数内部的函数“。在本质上，闭
包是将函数内部和函数外部连接起来的桥梁。”

创建闭包最常见方式，就是在一个函数内部创建另一个函数。
function func(){
  var a =1 ,b = 2;
  funciton closure(){ return a+b; } return
  closure; 
}
```

---

## 5. 利用 bfc 块级格式化上下文, 实现两侧固定中间自适应

左右固定宽高然后浮动，中间 overflow：hidden

！！！且 left 和 right 必须放在 center 前面

---

## 6. 内联元素与块级元素的边距问题

块级元素垂直方向 margin 折叠问题 两个相邻取较大值；水平方向相邻边距正常相加

内联元素可以设置左右 padding 垂直 padding 无效，以及设置 width 和 height 属性的值是无效的

---

## 7. 文本的居中

水平居中 div 中 text-align：center
垂直居中 div 的 height 值与 line-height 相同

---

## 8. CSS3 中 em 和 rem 单位

em 为相对父元素 font-size 大小，rem（root）为相对 html 标签 font-size 大小

---

### 9. 向上的箭头

```
 .up{
 width:0px;
 height:0;
 border-width:0 28px 28px;
 border-style:solid;
 border-color:transparent transparent red
 }
```

---

## 10. rem 适配方法中浏览器最小字体兼容处理：

    html{font-size:625%} body{font-size:0.16rem}

再使用媒体查询 media screen(){}兼容每个屏幕的根 font-size

- 原因：若设为 62.5% ，font-size:62.5%刚好是 10 像素 chrome 在字体小于 12px 时都当 12px 处理 rem 的根字体大小参照实际则变为 75%（12px）

即设置 1rem 为 100px 条件下，最小字体 16px

定义一个设计稿能整除的系数，设计稿尺寸除以该系数得到相对值 rem 单位，动态获得屏幕宽度来设置 html.style.fontSize：当前屏幕宽度/该系数同为一单位的 rem 此时使用设计稿换算后的 rem 单位即可

- 图片适配情况：

如果是 Img 标签， 可以设置宽度为切出的图片尺寸，换算成 rem，

是 background-img，用 background-size 属性，设置设计图尺寸宽高，换算成 rem 进行图片的缩放适配

---

## 浮动的一些问题

浮动定位也是脱离文档流，不占据空间，停留在包含元素边框或浮动元素边框

浮动影响：

1. 父元素高度无法被撑开，影响父元素统计结构

2. 同级非浮动（内联）元素会紧随

3. 浮动相邻元素同样需要浮动

- 1.父元素影响解决方案：

```
.clearfix:after{content: ".";display: block;height: 0;clear: both;visibility: hidden;}
.clearfix{ zoom:1;display: inline-block;} /* for IE/Mac */
```

- 2.浮动元素同级影响解决方案：
  放置一个空 div 设置 clear:both;

- 3.给父级元素设置 overflow：hidden；或 overflow：auto；本质是构建一个 BFC

---

## 12. align-content 与 align-items 区别：

content 只适用于多行 flex 容器（设置在父元素上），当容器交叉轴存在多余空间时，所有子项作为一个整体对竖直方向的对齐设置

items 应用于所有 flex 容器，设置 flex 子项在每一个 flex 行的交叉轴竖直对齐方式

选择父元素下对应的子元素，

一个是:nth-child 另一个是:nth-of-type。

区别是：

ele:nth-of-type(n)是指父元素下第 n 个 ele 元素，

ele:nth-child(n)是指父元素下第 n 个元素且这个元素为 ele，若不是，则选择失败

```
 <ul class="demo">
    <p>zero</p>
    <li>one</li>

	//.demo li:nth-child(2):<li>标签的父元素的第二个子元素

    <li>two</li>

	//.demo li:nth-of-type(2) <li>标签的父元素的第二个<li>子元素

  </ul>
```

ps. 不指定标签类型时，:nth-type-of(2)会选中所有类型标签的第二个。

---

## 13. BFC:块级格式化上下文

它规定了内部的 Block-level-box 如何布局，以及对该区域外部毫不相干

- 布局规则：

1. 内部的 BOX 会在垂直方向，一个接一个地放置

2. Box 垂直方向的距离有 margin 规定，属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠（margin collapse）

3. 每个元素的 margin box 左边，与包含块 border box 的左边接触（同方向接触的格式化）。即使存在浮动也如此

4. BFC 区域不会和 Float Box 重叠

5. BFC 就是一个隔离的独立容器，容器里面的子元素不会影响到外面

6. 浮动元素也参与计算 BFC 高度

- 生成 BFC 的元素：

  根元素、float 不为 none、position 为 absolute 或 fixed、display 为 inline-block，table-cell，table-caption,flex，inline-flex、overflow 非默认即不为 visible

---

## 14. IE11 / Safari 9 support with polyfill

---

## 15. 大屏幕适配思路：

1. 初始化时候获得大屏幕比例

2. 得到比例设置给 CSS 的 scale 变量

3. 监听浏览器窗口大小，将新的比例赋给 scale 变量

   ps. vue 中实现：

```
<div ref="scaleBox">
mounted(){
	this.setScale();
	window.addEventListener("resize",this.setScale
	)}

getScale(){
	const{width,height}=this;
	let ww= window,innerWidth/width;
	let wh=window.innerHeight/height;
	return ww<wh?ww:wh;
	}

setScale(){
	this.scale= this.getScale();
	this.$refs.scaleBox.style.setProperty("--scale",this.scale);
	}

#scaleBox{--scale:1;}
.scaleBox{transform:scale(var(--scale));}

```

ps.

1. CSS 中变量定义: --XXX:XXX;

2. CSS 中变量使用: var(--XXX)

3. vue 中的 dom 应该用 ref 来定义, 然后在在函数中用 this.\$refs.XXX 来调用,这里的 ref 相当于 id

4. 缩放后的垂直水平集中 CSS：

   ```
   {
   transform: scale(var(--scale)) translate(-50%, -50%);
   position: absolute;
   left: 50%;
   top: 50%;
   }
   ```

5. 最后使用节流（throttle）函数控制触发 限定时间执行一次

---

## 16. 节流与防抖（debounce）函数

防抖函数为频繁触发的函数，在规定时间内，只让最后一次生效 应用场景如调用接口请求频繁触发则执行最后一次结果

节流函数为触发函数的限定时间执行一次，应用场景一般是 onrize，onscroll 等这些频繁触发的函数

- 函数节流器  
   //定时响应 高频操作限定时间内首次执行

  //只有大于设定的执行周期才会执行第二次

```
function throttle(fn, delay) {
    //记录上次函数触发的时间
    let lastTime = 0;
    return function () {
        //记录当前函数触发的时间
        let nowTime = Date.now();
        if (nowTime - lastTime > delay) {
            fn();
            //同步时间
            lastTime = nowTime
            //可以让局部变量不被重置，通常来说 这是需要一个全局变量的。但是通过一个闭包也能完成。
        }
    }
}
```

- 函数防抖器  
  //多次事件一次响应 高频操作限定时间内最后一次执行

  //一个需要频繁触发的函数，在规定时间内，只让最后一次生效，前面的不生效 (再次被触发，则重新计算延迟时间)

```
function debounce(fn, delay) {
    let delays = delay || 500;
    //清除上一次的延时器
    let timer = null
    clearInterval(timer)
    timer = setTimeout(() => {
        fn();
    }, delays);
}
```

---

## 17.自适应网页的一些要点:

- 17.1 流式布局 fluid grid：

流式布局的含义是，各个区块的位置都是浮动的，不是固定不变的。 .main{float:right;width:70%;} .leftBar{float:left;width:25%;},float 的优点是不会在水平方向 overflow（溢出），避免了水平滚动条的出现

- 17.2 选择加载 CSS

自适应网页核心就是 CSS3 引入的 Media Query 模块，自动探测屏幕宽度，加载相应 CSS 文件 。有三种使用方式：

1.  用 html 标签加载 CSS 文件

```
<link rel="stylesheet" type="text/css" media="screen and (min-width: 400px) and (max-devicewidth:
600px)" href="smallScreen.css"/>

如果屏幕宽度在400像素到600像素之间，则加载smallScreen.css文件
```

2. 在现有 CSS 文件中加载

```
@import url("tinyScreen.css") screen and (max-device-width: 400px);
```

3. 同一个 CSS 文件中

媒体操作：

语法结构及用法：
@media 设备名 only （选取条件） not （选取条件） and（设备选
取条件），设备二{sRules}

```
@media screen and (max-device-width: 400px) { .column {float: none;width: auto;} #sidebar
{ display: none'}}

如果屏幕宽度小于400像素，则column块取消浮动（float:none）、
宽度自动调节（width:auto），sidebar块不显示（display:none）
```

- 17.2 图片的自动缩放

  ```
  img { max-width: 100%;}

  对于大多数嵌入网页的视频也有效，所以可以写成：
  img, object { maxwidth:100%;}
  ```

---

## 18. IE8 兼容操作

18.1 IE8 既不支持 html5 也不支持 css3 @media

```
 <!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<scriptsrc="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></scrip t>
<![endif]-->
```

18.2 设置 IE 最高渲染模式

```
<meta http-equiv="X-UA-Compatible" content="IE=Edge，chrome=1">

这段代码后面加了一个chrome=1，如果用户的电脑里安装了 chrome，就可以让电脑里面的IE不管是哪个版本的都可以使用Webkit引擎及V8引擎进行排版及运算，如果没有安装，就显示IE最新的渲染模式
```

---

## 19. JavaScript 的基本类型

- 19.1 基本数据类型：

number、string、boolean、null、undefined

- 19.2 引用数据类型：

function、object、Array

- 19.3 undefined 和 null 区别：

undefined:表示变量声明单位初始化的值

null:表是用来保存对象，还没有真正使用保存对象的值，从逻辑角度来看，null 表示一个空对象指针

ECMA 标准中 object 属于复杂类型。null 值用 typeof 检测出来的结果是 object，而未初始化的定义值 typeof 检测为 undefined。事实上 undefined 值是派生于 null 值，ECMA 规定对两者进行相等性判断要返回 true。

- 19.4 原始数据类型

Undefined,Null,Boolean,String,Symbol,Number

Object 的类型:function、Array、Date、RegExp 等

typeOf 可以用来区分除 Null 类型以外的原始数据类型，对象的类型可以从普通对象中识别出函数

```
   typeof null // "object"
   typeof function() {} // "function"
   typeof {} // "object"
   使用全等运算符判断是否为null
```

```
    typeof Number(1) // "number"
    typeof String("1") // "string"
    参数转化为相应的原始数据类型,类似强制类型转换

    Array(1, 2, 3)// 而Array()等价于new Array(1, 2, 3)

    typeof new Number(1) // "object"
    typeof new String(1) // "object"

```

- 19.5 对象类型

instanceof 不能用于判断原始数据类型的数据,而可以用来判断对象类型

```
var date = new Date()
date instanceof Date // true
var number = new Number()
number instanceof Number // true
var string = new String()
string instanceof String // true

```

但 instanceof 的结果不一定可靠，该方法无法区分数字类型和数字对象类型，同理也无法判断字符串类型与字符串对象类型、布尔型和布尔对象类型且 ECMAScript7 规范中，可以通过自定义 Symbol.hasInstance 方法来覆盖默认行为，Symbol.toStringTag 属性来覆盖默认行为

```
Array.isArray(value)可以用来判断value是否是数组
```

- 19.6 创建对象

```
      //字面量对象，默认这个对象的原型指向object
     var o1 = {name: '01'};

     //通过new Object声明一个对象
     var o11 = new Object({name: '011'});

      //使用显式的构造函数创建对象
     var M = function(){this.name='o2'};
     var o2 = new M(); // o2的构造函数是M,o2这个普通函数，是M这个构造函数的实例
     o2.__proto__=== M.prototype

     //object.create()使用现有的对象来提供新创建的对象的__proto__。
     var o3 = Object.create(o1);

```

- 19.7 创建函数

```
    function sum1(num1,num2){
     return num1+num2;
    } //函数声明式
    var sum2 = function(num1,num2){
      return num1+num2;
    } //函数表达式
    var sum3 = new Function("num1","num2","return num1+num2"); //函数对象式
```

---

## 20. 用函数来模拟 Class

- 20.1 可以用有参构造函数来实现

```
function Pet(name,age,hobby){
  this.name=name;//this 作用域：当前对象
  this.age=age;
  this.hobby=hobby;
  this.eat=function(){
  alert("我叫"+this.name+",我喜欢"+this.hobby+",也是个吃货");
  }
}
var maidou =new Pet("麦兜",5,"睡觉");//实例化/创建对象
maidou.eat();//调用 eat 方法(函数)

```

- 20.2 工厂方式来创建（Object 关键字）

```
var wcDog =new Object();
wcDog.name="旺财";
wcDog.age=3;
wcDog.work=function(){
alert("我是"+wcDog.name+",汪汪汪......");
}
wcDog.work();
```

- 20.3 prototype 关键字，使用原型对象

```
function Dog(){}
Dog.prototype.name="旺财";
Dog.prototype.eat=function(){
  alert(this.name+"是个吃货");
}
var wangcai =new Dog();
wangcai.eat();
```

- 20.4 混合模式(原型和构造函数)

```
function Car(name,price){
  this.name=name;
  this.price=price;
}
Car.prototype.sell=function(){
alert("我是"+this.name+"，我现在卖"+this.price+"万元");
}
var camry =new Car("凯美瑞",27);
camry.sell();
```

- 20.5 动态原型

```
function Car(name,price){
  this.name=name;
  this.price=price;
  if(typeof Car.sell=="undefined"){
    Car.prototype.sell=function(){
    alert("我是"+this.name+"，我现在卖"+this.price+"万元");
    }
    Car.sell=true;
  }
}
var camry =new Car("凯美瑞",27);
camry.sell();
```

---

## 21. JavaScript 宿主对象和原生对象的区别

本地对象：Object、Function、Array、String、Boolean、Number、
Date、RegExp、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError

ECMA-262 只定义了两个内置对象，即 Global 和 Math。 根据定义，每个内置对象都是本地对象

- ECMA-262 把本地对象（native object）定义为“独立于宿主环境的 ECMAScript 实现 提
  供的对象” 。由此可以看出，本地对象就是 ECMA-262 定义的类（引用类型）

宿主对象：ECMAScript 中的“宿主”当然就是我们网页的运行环境，即“操作系统”和“浏览器”，

所有的 BOM 和 DOM 都是宿主对象。

- ECMAScript 官方未定义的对象都属于宿主对象，因为其未定义的对象大多数是自己通过 ECMAScript 程序创建的对象。

---

## 21. 常用的 JavaScript 内置对象，以及对应方法

- 常用对象： Arguments(函数参数)，Array，Boolean，Date，Function，Math，Number，Object（所有对象的超类）、RegExp、String

- 21.1 Arguments

Arguments[ ] 函数参数的数组，Arguments 一个函数的参数和其他属性，Arguments.callee 当前正在运行的函数，Arguments.length 传递给函数的参数的个数

- 21.2 Array

length 属性 返回数组长度

join(",")连接符链接并返回字符串

reverse()反转

delete 运算符，数组长度不变删除值

shift() ,pop() 分别为删除数字的第一个和最后一个元素，并返回删除的那个值，数组长度-1

unshift(a,b,c) , push(a,b,c) 分别为向数组前面和后面添加元素，长度改变

concat() 连接数组

slice(start,end) 返回数组选定的一部分。

splice(index,delNum,item1,.....,itemX) 向数组中删除元素（可以实现增删改操作），然后返回*被删除的项目*，**改变原数组**

forEach((item,index)=>{}) 遍历所有元素

every(checkFunction) 判断所有元素是否**都**符合条件,且剩余的元素不会再进行检测。

- 有一个不满足条件即返回 _false_，检测停止（不检测空数组，不改变原数组）

some(checkFunction) 判断所有元素是否**有**满足条件,且剩余的元素不会再进行检测。

- 存在一个满足条件即返回 _true_，检测停止 （不检测空数组，不改变原数组）

```
sort() 数组中的ASCII排序
     sort((a,b)={
  // 从小到大
      return a-b;
  // 从大到小
      return b-a;})
```

map((item,index,arr)=>{return //新数组的每一项}) 对元素重新组装，
```
map条件处理并返回未处理数组元素
map(x => {
    if (x == 4) {
        return x * 2;
    }
    return x;
})
```
**返回新数组**

filter(checkFunction) 过滤返回符合条件的元素的**新数组**

reduce(fun(ret,cur,curIndex,arr),init) 接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值
```
var numbers = [15.5, 2.3, 1.1, 4.7];
 四舍五入后计算数组元素的总和：
function getSum(total, num) {
    return total + Math.round(num);
}
function myFunction(item) {
  //定义初始值0
    return numbers.reduce(getSum, 0);
}
```
Array.from(input,map,context)

将伪数组对象或可遍历对象转换为真数组
```
  input: 你想要转换的类似数组对象和可遍历对象,

  map: 类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组,
      Array.from({ length: 2 }, () => 'jack')// ['jack', 'jack']
  context: 绑定map中用到的this
```
Array.of( ) 

新建数组--用来替代Array()或解决new Array(v1,v2,v3...)参数混乱的情况

只接受参数作为数组元素，单参数不会导致特殊数组

ES6修复了indexof无法找到NaN的bug([NaN].indexOf(NaN) === -1)
新增了copyWithin(), includes(), fill(),flat()等方法，可方便的用于字符串的查找，补全,转 换
等。

- 21.3 Function 函数构造器

**apply，call，bind 均为改变函数运行上下文，即改变函数内部 this 指向**

_bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用_

apply(this, [arg1, arg2]) 将函数作为一个对象的方法调用

```
1、thisobj是调用function的对象，函数体内thisobj为this，如果参数为null则使用全局对象
2、参数可封装为数组形式传入返回调用函数function的返回值
```

call(this, arg1, arg2) 将函数作为对象的方法调用

```
1、thisobj是调用function的对象，函数体内thisobj为this，如果参数为null则使用全局对象
2、返回调用函数function的返回值
```

bind(thisArg[, arg1[, arg2[, ...]]]) 将函数绑定到一个对象，返回一个新函数，通过可选的指定参数，作为指定对象的方法调用该方法

```
传参和call或apply类似
不会执行对应的函数，call或apply会自动执行对应的函数
返回对函数的引用,需要再使用()调用执行
```

arguments[] 传递给函数的参数

caller ==>() 调用当前函数

prototype 对象类的原型

ES6新增了双冒号运算符，用来取代以往的bind（），call（）,和apply（）

foo::bar;等同于bar.bind(foo);

foo::bar(...arguments)等同于bar.apply(foo, arguments);

- 21.4 Math 数学对象

PI 圆周率

abs() 取绝对值

ceil() 向上取整

floor() 向下取整

round() 四舍五入

pow(x,y) x 的 y 次幂

sqrt() 求平方根

max，min([...]) 取数组最值

- 21.5 Number

  .MAX_VALUE,MIN_VALUE,.NaN ,.NEGATIVE_INFINITY,.POSITIVE_INFINITY 取特殊值

  .toFixed( ) 采用定点计数法格式化数字，规定小数的位数不足补零

  .toPrecision( ) 格式化数字的有效位，1-21

  .valueOf( ) 返回原始数值

- 21.6 Object 基础对象 _含有所有 JavaScript 对象的特性的超类_

  .constructor 对象的构造函数

  .hasOwnProperty( ) 检查属性是否被继承

  .isPrototypeOf() 一个对象是否是另一个对象的原型

  .isPropertyIsEnumberable()是否可以被 for、in 循环看到属性

  .toLocalString() , .toString() 返回对象的本地字符串表示和 定义一个对象的字符串表示

- 21.6 RegExp 正则表达式对象

https://www.runoob.com/regexp/regexp-syntax.html

  .exec() 通用匹配模式

  .global 正则全局匹配 .ignoreCase 忽略大小写 .lastIndex 下次匹配起始位置

  .source 正则表达式文本

  .test() 检验字符串是否匹配正则模式

- 21.7 String 字符串对象

  .length 获得字符串长度

  .toLowerCase() ，.toUpperCase() 将字符串中的字母全部小写和大写

  .charAt(index) 返回指定下标位置的一个字符。如果没有找到，则返回空字符串

  .chatCodeAt() 同上 但返回的不是字符编码 而是字符子串即字符的 Unicode 编码

  .substr(indexStart，end) ，.substring(indexStart，num)在原始字符串，返回一个子字符串

  .split(字符串或正则表达式，返回数组长度) 字符串按规定字符转为数组

  .concat( ) 连接字符串

  .indexOf( ) 返回一个子字符串在原始字符串中的索引值(查找顺序从左往右查找)。如果没有找到，则返回-1 ES6中使用includes()替代 没查到返回false

  .match( ) 找到一个或多个正则表达式的匹配

  .replace( ) 替换一个与正则表达式匹配的子串

  .search( ) 检索与正则表达式相匹配的子串

  .slice( ) 同 Array.slice 抽取一个子串 如果是负数，则该参数规定的是从字符串的尾部开始算起的位置。

  新增，可方便的用于查找 startsWith(), endsWith(),等方法，补全 padStart(),padEnd(),repeat()字符串。

---

## 22. undefined 和 null

null 表示一个对象被定义了，值为“空值” ；undefined 表示不存在这个值

typeof undefined //"undefined" ；typeof null //"object"

undefined :是一个表示"无"的原始值或者说表示"缺少值"，就是此处应该有一个值，但还
没有定义。当尝试读取时会返回 undefined；null : 是一个对象(空对象, 没有任何属性和方法)；null 作为函数的参数，表示该函数的参数不是对象；

- 22.1 返回 undefined

1、访问声明，但是没有初始化的变量

2、访问不存在的属性

3、访问函数的参数没有被显式的传递值

4、访问任何被设置为 undefined 值的变量

5、没有定义 return 的函数隐式返回

6、函数 return 没有显式的返回任何内容

典型用法是：

```
1、变量被声明了，但没有赋值时，就等于undefined
2、调用函数时，应该提供的参数没有提供，该参数等于undefined
3、对象没有赋值的属性，该属性的值为undefined
4、函数没有返回值时，默认返回undefined
```

- 22.2 null

典型用法是：

```
4.1 作为函数的参数，表示该函数的参数不是对象
4.2 ** _作为对象原型链的终点_**
```

---

## 23. 区分对象和数组的方法

1. 通过ES6中的Array.isArray来识别
```
Array.isArray([]) //true
Array.isArray({}) //false
```
2. 通过instanceof来识别
```
[] instanceof Array //true
{} instanceof Array //false
```
3. 通过调用constructor来识别
```
{}.constructor //返回object
[].constructor //返回Array
```
4. 通过Object.prototype.toString.call方法来识别
```
Object.prototype.toString.call([]) //["object Array"]
Object.prototype.toString.call({}) //["object Object"]
```

---

## 23. 判断两对象相等的思路和方法

ps. ES6中 Object\. is(a,b)仅是判断了两对象引用地址是否一致，而无法比较内容是否相同

想要比较两个对象内容是否一致，思路是要遍历对象的所有键名和键值是否都一致：

  - 1、判断两个对象是否指向同一内存

  - 2、使用Object.getOwnPropertyNames获取对象所有键名数组

  - 3、判断两个对象的键名数组是否相等

  - 4、遍历键名，判断键值是否都相等

```
function isObjectValueEqual(a, b) {
// 判断两个对象是否指向同一内存，指向同一内存返回true
if (a === b) return true
// 获取两个对象键值数组
let aProps = Object.getOwnPropertyNames(a)
let bProps = Object.getOwnPropertyNames(b)
// 判断两个对象键值数组长度是否一致，不一致返回false
if (aProps.length !== bProps.length) return false
// 遍历对象的键值
for (let prop in a) {
// 判断a的键值，在b中是否存在，不存在，返回false
if (b.hasOwnProperty(prop)) {
// 判断a的键值是否为对象，是则递归，不是对象直接判断键值是否相等，不相等返回false
if (typeof a[prop] === 'object') {
if (!isObjectValueEqual(a[prop], b[prop])) return false
    } else if (a[prop] !== b[prop]) {
return false
    }
  } else {
return false
    }
}
return true
}

```

- ES2017 引入了跟Object.keys配套的Object.values和Object.entries，作为遍历一个对象的补充手段，供for...of循环使用。 
方法返回一个数组,成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

  ```
  const obj = { 100: 'a', 2: 'b', 7: 'c' };
  Object.values(obj)
  // ["b", "c", "a"]
  ```
ps. 属性名为数值的属性，是按照数值大小，从小到大遍历的

## 24. 类数组（伪数组）

1、具有length属性

2、按索引方式储存数据

3、不具备push pop等数组方法，但仍可遍历内容典型的是函数document.childnodes之类的，它们返回的nodeList对象都属于伪数组

- 转为数组的方法
1. Array.from()
2. [].slice.call(eleArr)或Array.prototype.slice.call(eleArr)


## 25. 遍历对象上属性的方法

1. Object.keys()

遍历自身可枚举，非继承属性,返回可枚举的属性的数组，顺序同for...in遍历时返回（但不包括原型链上的属性）

2. Object.getOwnPropertyNames()

遍历自身的所有属性(可枚举，不可枚举，非继承属性,但不包括Symbol值作为名称的属性)

3. for...in 

遍历可枚举的自身属性和继承属性
```
for(var k in fatherArr){
     //对象属性继承
     arr[k] = fatherArr[k];
  }
```

hasOwnProperty()方法判断对象是有某个属性(本身的属性，不是继承的属性)

4. 遍历所有的自身属性和继承属性
```
(function () {
var getAllPropertyNames = function (obj) {
var props = [];
do {
    props = props.concat(Object.getOwnPropertyNames(obj));
} while (obj = Object.getPrototypeOf(obj));
return props;
}
var propertys = getAllPropertyNames(window);
alert(propertys.length); //276
alert(propertys.join("\n")); //toString等
})()
```
5. Reflect.ownKeys()返回所有属性key
---
## 25. src与href的区别

- src（source）指向外部资源的位置，当解析到该元素时，会暂停其他资源的下载和处理，直到该资源加载、编译、执行完毕，请求src资源时会把其指向的资源下载并应用到文档当前标签所在位置。

- href （hypertext reference/超文本引用） 能建立当前元素（锚点）或当前文档（链接）之间的链接，可以并行下载资源并不会停止对当前文档的处理。


---


## 26. 为某一元素绑定多个事件

```
addEventListener("click",hello1,2？);
```

---

## 27. 实现比较两个对象的方法
因为等号比较的是他们的引用（内存地址），而不是基本类型 。

像数字和字符串这样的基本类型只需对比他们的值 

当一个对象赋值给另一个新对象时，使用等号进行对比，他们就会相等。因为他们的引用
（内存地址）是同一个。

- 只对普通对象、数组、函数、日期和基本类型的数据结构进行对比

```
function isDeepEqual(obj1, obj2, testPrototypes = false) 
//使用参数来控制是否对原型链进行比较
{
  if (obj1 === obj2) {
  return true
  }
  if (typeof obj1 === "function" && typeof obj2 === "function") {
  return obj1.toString() === obj2.toString()
  }
  if (obj1 instanceof Date && obj2 instanceof Date) {
  return obj1.getTime() === obj2.getTime()
  }
  if (
    Object.prototype.toString.call(obj1) !==
  Object.prototype.toString.call(obj2) ||
  typeof obj1 !== "object"
  ) {
  return false
  }
const prototypesAreEqual = testPrototypes ? 
isDeepEqual(
Object.getPrototypeOf(obj1),
Object.getPrototypeOf(obj2),
true)
: true
const obj1Props = Object.getOwnPropertyNames(obj1)
const obj2Props = Object.getOwnPropertyNames(obj2)
  return (
    obj1Props.length === obj2Props.length &&
  prototypesAreEqual &&
  obj1Props.every(prop => isDeepEqual(obj1[prop], obj2[prop]))
  )
}
```
## 28. JavaScript作用域、预解析、变量声明提升

- 1、 块级作用域 包含 函数作用域

- 2、 词法作用域 与 块级作用域、函数作用域之间没有任何交集， 他们从两个角度描述了作用域的规则。

  词法作用域描述的是，变量的查找规则，块级作用域和函数作用域描述的是，什么东西可以划分变量的作用域

- ES6 之前 JavaScript 采用的是函数作用域+词法作用域，ES6采用的是块级作用域+词法作用域

  **局部作用域：在函数的外面无法访问函数内的变量**


- 预解析：代码执行前的预编译期间会将变量声明与函数声明提升至其*对应作用域*的最顶端

    **当函数内部定义的一个变量与外部相同时，那么函数体内的这个变量就会被上升到最顶端**

1. 把变量的声明提升到当前作用域的最前面，只会提升声明，不会提升赋值

2. 把函数的声明提升到当前作用域的最前面，只会提升声明，不会提升调用

3. 先提升var，再提升function

    使用 var 关键字定义的变量，被称为变量声明

    函数声明Function foo() {}

    函数表达式var foo = function() {} 不存在函数提升

  **函数声明提升的特点是，在函数声明的前面，可以调用这个函数，函数提升的优先级大于变量提升的优先级，即函数提升在变量提升之上**

## 29. 作用域链

由子级作用域返回父级作用域中寻找变量，就叫做作用域链。

作用域链前端始终都是当前执行的代码所在环境的变量对象，如果环境是函数，则将其活动对象作为变量对象

延长作用域链：在作用域链的前端临时增加一个变量对象，该变量对象会在代码执行后被移除.执行这两个语句时，作用域链都会得到加强

 1. try - catch 语句的catch块；会创建一个新的变量对象，包含的是被抛出的错误对象的声明

 2. with 语句。with 语句会将指定的对象添加到作用域链中

---

## 29. JavaScript中变量储存方式及类型

1. 值类型和引用类型

2. 值类型存储的是值 ，赋值之后原变量的值不改变

3. 引用类型存储的是地址 ，赋值之后是把原变量的引用地址赋值给新变量 ，新变量改变 原来的会跟着改变

----
## 30. WebAPI DOM相关
BOM是Browser Object Model的缩写，即浏览器对象模型。
没有相关标准。最根本对象是window

DOM 是 Document Object Model（文档对象模型）的缩写，一种树形结构的数据结构,DOM最根本对象是document（实际上是window.document）

W3C DOM 标准被分为 3 个不同的部分

1. 核心 DOM - 针对任何结构化文档的标准模型
2. XML DOM - 针对 XML 文档的标准模型
3. HTML DOM - 针对 HTML 文档的标准模型

dom 操作的常用api 有

1. 获取dom节点
getElementById、getElementsByTagName、getElementsByClassName、

querySelector、querySelectorAll

2. property（js对象的property）

nodeName是p的property，即nodeName是p的属性

3. attribute

.getAttribute('data-name')、.setAttribute('data-name', 'imooc');

非自定义的属性(id/src/href/name/value等)，通过setAttribute修改其特性值可以
同步作用到property 上，而通过.property修改属性值有的(value)时候不会同步到attribute上，即不会反应到html

4. dom事件 DOM一级中没有事件

1、dom0 element.οnclick=function(){}

2、dom2 element.addEventListener(‘click’, function(){}, false) // 默认是false。false：冒泡阶段执行，true：捕获阶段产生。

3、dom3 element.addEventListener(‘keyup’, function(){}, false) // 事件类型增加了很多，鼠标事件、键盘事件

DOM事件模型分为两种：事件捕获和事件冒泡

事件捕获从外到内依次触发：根—目标的祖先素—目标的父元素—目标元素

事件冒泡和事件捕获截然相反。发生点击事件时，事件会从目标元素上开始触发，向外传播，一直到根元素停止。从内到外依次触发：目标元素—目标元素的父元素—父元素的父元素—根

阻止事件冒泡的几种方法

一：event.stopPropagation();  //阻止冒泡

二：return false;

三：event.preventDefault();  //阻止默认行为



---

## 31. JavaScript动画和CSS3动画

CSS3 动画优势：

1. 浏览器可以对动画进行优化。
```
浏览器使用与 requestAnimationFrame 类似的机制，requestAnimationFrame比起setTimeout，setInterval设置动画的优势主要是:1)requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成,并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率,一般来说,这个频率为每秒60帧。2)在隐藏或不可见的元素中requestAnimationFrame不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。
1.1.2)强制使用硬件加速 （通过 GPU 来提高动画性能）

```
2. 代码相对简单,性能调优方向固定

3. 对于帧速表现不好的低版本浏览器，CSS3可以做到自然降级，而JS则需要撰写
额外代码

- 缺点：运行过程控制较弱,无法附加事件绑定回调函数。CSS动画只能暂停,不能在动画
中寻找一个特定的时间点，不能在半路反转动画，不能变换时间尺度，不能在特定的位置
添加回调函数或是绑定回放事件,无进度报告。

JS动画 ：
1. JavaScript动画控制能力很强, 可以在动画播放过程中对动画进行控制：开始、暂停、
回放、终止、取消都是可以做到的。
2. 动画效果比css3动画丰富,有些动画效果，比如曲线运动,冲击闪烁,视差滚动效果，只
有JavaScript动画才能完成。
3. CSS3有兼容性问题，而JS大多时候没有兼容性问题。
- 缺点 ： JavaScript在浏览器的主线程中运行，而主线程中还有其它需要运行的JavaScript
脚本、样式计算、布局、绘制任务等,对其干扰导致线程可能出现阻塞，从而造成丢帧的情
况。
- 代码的复杂度高于CSS动画

```
总结：
  如果动画只是简单的状态切换，不需要中间过程控制，在这种情况下，css动画是优选方案。它可以让你将动画逻辑放在样式文件里面，而不会让你的页面充斥 Javascript 库。

  然而如果你在设计很复杂的富客户端界面或者在开发一个有着复杂UI状态的 APP。那么你应该使用js动画，这样你的动画可以保持高效，并且你的工作流也更可控。

  所以，在实现一些小的交互动效的时候，就多考虑考虑CSS动画。对于一些复杂控制的动画，使用javascript比较可靠。

```
---
## 32. 事件

给一个按钮自己增加一个事件，在其他地方触发，而不是用回调的方式触发
```
var ev = document.getElementById('ev');
var eve = new Event('custome'); // eve：事件对象
ev.addEventListener('custome', function(){
  console.log('custome');
});
ev.dispatchEvent(eve);
```
- 通用的事件监听函数

```
function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
  fn = selector;
  selector = null;
  }
elem.addEventListner(type, function(e) {
  var target;
  if (selector) {
    target = e.target;
    if (target.matches(selector)) {
    fn.call(target, e);
    }
  } else {
  fn(e);
  }
})
}
```
// 使用代理  代码简洁,减少浏览器内存占用;事件冒泡
```
var div1 = document.getElementById('div1');
bindEvent(div1, 'click', 'a', function(e) {
console.log(this.innerHTML);
});
```
// 不使用代理
```
var a = document.getElementById('a1');
bindEvent(div1, 'click', function(e) {
console.log(a.innerHTML);
})
---
```
- 事件委托

  当我们需要对很多元素添加事件的时候，可以通过将事件添加到它们的上级元素而将事件委托给上级元素来触发处理函数。

  事件代理用到了两个在JavaSciprt事件中常被忽略的特性：事件冒泡以及目标元素。


  ---
## 33.JS拖动原理
1. mousedown 鼠标按下事件
2. mousemove 鼠标移动事件
3. mouseup 鼠标抬起事件

- 点击dom的时候，记录当前鼠标的坐标值，也就是x、y值，以及被拖拽的dom的top、left值，

- 在鼠标按下的回调函数里添加鼠标移动的事件：
```
  document.addEventListener("mousemove", moving, false)和添加鼠标抬起的事件
  document.addEventListener("mouseup",function()
  { document.removeEventListener("mousemove", moving, false);}, false);
```
  这个抬起的事件是为了解除鼠标移动的监听，因为只有在鼠标按下才可以拖拽，抬起就停止不会移动了。
- 那么这个被拖拽的dom的top和left值就是：

    top=鼠标按下时记录的dom的top值+（移动中的y值 - 鼠标按下时的y值）

    left=鼠标按下时记录的dom的left值+（移动中的x值 - 鼠标按下时的x值）;
```
    window.onload = function() {
    var dom = document.getElementById("draggle");
    dom.addEventListener(
    'mousedown',
    function(event) {
        var x = event.clientx;
        var y = event.clientY;
        var marginLeft = parseInt(dom . offsetLeft);
        var marginTop = parseInt (dom. offsetTop); 
    function moving(e) {
        var movedx = e.clientx-x;
        var movedY = e.clientY-y;
        dom.sty1e.marginLeft = marginLeft + movedX + "px" ;
        dom.sty1e.marginTop = marginTop + movedY + "px" ;
      }
      document.addEventListener('mousemove', moving, false);
      document.addEventListener('mouseup', function(){
      document.removeEventListener('mousemove', moving, false);
      }, false);
    },
    false
    )
  };
```
---

## 34.浏览器渲染

0. 加载过程

    1、浏览器查找域名对应的IP地址(DNS 查询：浏览器缓存->系统缓存->路由器缓存->ISP DNS 缓存->根域名服务器)

    2、浏览器向 Web 服务器发送一个 HTTP 请求（TCP三次握手）

    3、服务器 301 重定向（从 HTTP://example.com 重定向到 HTTP://www.example.com）

    4、浏览器跟踪重定向地址，请求另一个带 www 的网址

    5、服务器处理请求（通过路由读取资源）

    6、服务器返回一个 HTTP 响应（报头中把 Content-type 设置为 'text/html'）

    7、浏览器进 DOM 树构建

    8、浏览器发送请求获取嵌在 HTML 中的资源（如图片、音频、视频、CSS、JS等）

    9、浏览器显示完成页面
    
    10、浏览器发送异步请求

1. 浏览器的渲染过程：

解析HTML构建 DOM(DOM树)，并行请求 css/image/js

CSS 文件下载完成，开始构建 CSSOM(CSS树)

CSSOM 构建结束后，和 DOM 一起生成 Render Tree(渲染树)

布局(Layout)：计算出每个节点在屏幕中的位置

显示(Painting)：通过显卡把页面画到屏幕上

2. DOM树 和 (render)渲染树 的区别

DOM树与CSS树的合并生成render树

DOM树与HTML标签一一对应，包括head和隐藏元素

渲染树不包括head和隐藏元素，大段文本的每一个行都是独立节点，每一个节点都有对应的css属性


---

## 35. 页面重绘和回流

回流必定触发重绘，而重绘不一定触发回流

回流是当**render tree 的一部分或全部的元素**因改变了自身的宽高，布局，显示或隐藏，或者元素内部的文字结构发生变化 导致需要重新构建页面的时候。

当**一个元素**自身的宽高，布局，及显示或隐藏没有改变，而只是改变了元素
的外观风格的时候，就会产生重绘。例如你改变了元素的background-color

- 最小化重绘repaint与回流reflow

需要要对元素进行复杂的操作时，可以先隐藏(display:"none")，操作完成后再显示

需要创建多个DOM节点时，使用DocumentFragment创建完后一次性的加入document

缓存Layout属性值，如：var left = elem.offsetLeft; 这样，多次使用 left 只产生一次回流

尽量避免用table布局（table元素一旦触发回流就会导致table里所有的其它元素回流）

避免使用css表达式(expression)，因为每次调用都会重新计算值（包括加载页面）


尽量使用 css 属性简写，如：用 border 代替 border-width, border-style, bordercolor批量修改元素样式：elem.className 和 elem.style.cssText 代替 elem.style.xxx

---

## 36. 内存泄漏

内存泄漏指任何对象当不再拥有或不需要使用的时候依然存在

- 导致内存泄漏：
  1. 垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收
  2. setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏
  3. 闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）

---
## 37. 原型 prototype

JavaScript的对象中都包含了一个” prototype”内部属性，这个属性所对应的就是该对象的原型，原型也是一个对象，通过原型可以实现对象的属性继承，

ECMA新标准中引入了标准对象原型访问器”Object.getPrototype(object)”

原型的主要作用就是为了实现继承与扩展对象

- 原型链： JavaScript对象属性的一种查找机制用来实现继承

**通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变**

---

## 38. this的情况

1. 以函数形式调用时，this永远都是window
2. 以方法的形式调用时，this是调用方法的对象
3. 以构造函数的形式调用时，this是新创建的那个对象
4. 使用call和apply调用时，this是指定的那个对象
5. 箭头函数：箭头函数的this看外层是否有函数 如果有，外层函数的this就是内部箭头函数的this如果没有，就是window
6. 特殊情况：通常意义上this指针指向为最后调用它的对象。这里需要注意的一点就是如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例


---

## 39. for...in 和for... of

1. 推荐在循环对象属性的时候使用for...in，在遍历数组、map、set、Arguments数据结构的时候的时候使用for...of

2. for...in循环出的是key，for...of循环出的是value， map结构可循环[key, value]支持break、continue、return 和 throw
```
for (const [key, value] of iterableMap)
```

3. for...of是ES6新引入的特性。修复了ES5引入的for...in的不足

4. for...of不能循环普通的对象，需要通过和Object.keys()搭配使用或添加length属性使用Array.from()类数组转化为数组实例
```
    （由object.keys(obj)先将要循环的普通对象key返回为一个数组）
    for(var key of Object.keys(obj))
    (搭配实例方法entries()，同时输出数组内容和索引)
    for (let [index, val] of arr.entries())
```
---
## 40. New操作符

1、创建一个空对象: 并且this变量引入该对象,同时还继承了函数的原型

2、设置原型链 空对象指向构造函数的原型对象

3、执行函数体 修改构造函数this指针指向空对象,并执行函数体

4、判断返回值 返回对象就用该对象,没有的话就创建一个对象


---
## 41. Javascript垃圾回收机制
- JS事件循环：

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称
为 Event Loop（事件循环）

JS的垃圾回收机制是为了以防内存泄漏

- 在IE中虽然JavaScript对象通过标记清除的方式进行垃圾回收，但BOM与DOM对象却是通过**引用计数**回收垃圾的，也就是说只要涉及BOM及DOM就会出现循环引用问题
- 标记清除（mark and sweep）

  这是JavaScript最常见的垃圾回收方式，当变量进入执行环境的时候，比如函数中声明一个变量，垃圾回收器将其标记为“进入环境”，

  当变量离开环境的时候（函数执行结束）将其标记为“离开环境”垃圾回收器会在运行的时候给存储在内存中的所有变量加上标记，

  然后去掉环境中的变量以及被环境中变量所引用的变量（闭包），在这些完成之后仍存在标记的就是要删除的变量了。

- 引用计数(reference counting)

  在低版本IE中经常会出现内存泄露，很多时候就是因为其采用引用计数方式进行垃圾回收。引用计数的策略是跟踪记录每个值被使用的次数，

  当声明了一个 变量并将一个引用类型赋值给该变量的时候这个值的引用次数就加1，如果该变量的值变成了另外一个，则这个值得引用次数减1，当这个值的引用次数变为0的时候，说明没有变量在使用，这个值没法被访问了，因此可以将其占用的空间回收。

---

## 42. class是构造函数的语法糖

```
typeof MathHandle //'function'  //class类型判断为function
MathHandle.prototype.constructor === MathHandle //constructor 方法是类的构造函数 
m.__proto__ === MathHandle.prototype

```
- class B extends A

0. extends是ES6引入的关键字，其本质仍然是构造函数+原型链的组合式继承。Class类可以通过extends实现继承。

1. super作为函数使用 ES6 要求，子类的构造函数（constructor）必须先执行一次 super 函数 ，代表了父类的构造函数，super() 内部的 this 指向的是子类

2.  super作为对象使用 指向父类原型对象 ，通过 super 调用父类的方法时，super 会绑定子类的 this。


- Class和ES5构造函数的不同点

1. 类的内部定义的所有方法，都是不可枚举的。
2. ES6的class类必须用new命令操作，而ES5的构造函数不用new也可以执行。
3. ES6的class类不存在变量提升，必须先定义class之后才能实例化，不像ES5中可以将构造函数写在实例化之后。
4. ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面。 ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。
---

## 43.  eval

- 把字符串参数解析成JS代码并运行，并返回执行的结果; 应该避免使用eval，不安全，非常耗性能

- eval的作用域在它所有的范围内容有效

- 由JSON字符串转换为JSON对象的时候可以用eval 

  var json="{name:'Mr.CAO',age:30}";
  
  var jsonObj=eval("("+json+")");

---

## 44. 进程 线程 任务队列

-  进程：
1. 程序执行时的一个实例
2. 每个进程都有独立的内存地址空间
3. 系统进行资源分配和调度的基本单位
4. 进程里的堆，是一个进程中最大的一块内存，被进程中的所有线程共享的，进
程 创建时分配，主要存放 new 创建的对象实例
5. 进程里的方法区，是用来存放进程中的代码片段的，是线程共享的
6. 在多线程 OS 中，进程不是一个可执行的实体，即一个进程至少创建一个线程
去执行代码

- 线程
1. 进程中的一个实体
2. 进程的一个执行路径
3. CPU 调度和分派的基本单位
4. 线程本身是不会独立存在
5. 当前线程 CPU 时间片用完后，会让出 CPU 等下次轮到自己时候在执行
6. 系统不会为线程分配内存，线程组之间只能共享所属进程的资源
7. 线程只拥有在运行中必不可少的资源(如程序计数器、栈)
8. 线程里的程序计数器就是为了记录该线程让出 CPU 时候的执行地址，待再次
分配 到时间片时候就可以从自己私有的计数器指定地址继续执行
9. 每个线程有自己的栈资源，用于存储该线程的局部变量和调用栈帧，其它线程
无权访问
- 一个程序至少一个进程，一个进程至少一个线程，进程中的多个线程是共享进
程的堆和方法区资源但是每个线程有自己的程序计数器，栈区域

- 任务队列（task queue）
1. 宏任务（macrotask）：在新标准中叫task

    1.1主要包括：script(整体代码)，setTimeout，setInterval，setImmediate，I/O,uirendering

2. 微任务（microtask）：在新标准中叫jobs

    2.1 主要包括：process.nextTick， Promise，MutationObserver（html5新特性）

3. 扩展：

    3.1 同步任务：在主线程上，排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务

    3.2 异步任务：不进入主线程，而进入“任务队列”的任务，只有“任务队列”通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行
4. setTimeout、Promise、Async/Await 的区别

    1. setTimeout的回调函数放到宏任务队列里，等到执行栈清空以后执行

    2. Promise.then里的回调函数会放到相应宏任务的微任务队列里，等宏任务里面的同步代码执行完再执行

    3. async函数表示函数里面可能会有异步方法，await后面跟一个表达式

    4. async方法执行时，遇到await会立即执行表达式，然后把表达式后面的代码放到微任务队列里，让出执行栈让同步代码先执行

```
const Promise = new Promise((resolve, reject) => {
console.log(2);
resolve();
console.log(333);
})
Promise.then(() => {
console.log(666);
})
console.log(888);

// 2,333,888,666

setTimeout(function () {
console.log(1)
}, 0);
new Promise(function executor(resolve) {
console.log(2);
for (var i = 0; i < 10000; i++) {
i == 9999 && resolve();
}
console.log(3);
}).then(function () {
console.log(4);
});
console.log(5);

//2,3,5,4,1
```
---
## 45. ES6的module、export、import

module、export、import是ES6用来统一前端模块化方案的设计思路和实现方案。整合规范了浏览器/服务端的模块化方法。

import引入的模块是静态加载（编译阶段加载）而不是动态加载（运行时加载）。

import引入export导出的接口值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

导入模块

通过import关键字

// 只导入一个
import {sum} from "./example.js"

// 导入多个
import {sum,multiply,time} from "./exportExample.js"

// 导入一整个模块
import * as example from "./exportExample.js"

导出模块

导出通过export关键字

//可以将export放在任何变量,函数或类声明的前面

export var firstName = 'Chen';

//也可以使用大括号指定所要输出的一组变量

//使用export default时，对应的import语句不需要使用大括号

export default bosh;
import crc from 'crc';

//不使用export default时，对应的import语句需要使用大括号

export bosh;
import {crc} from 'crc';

---
## 46. 数组和对象的解构赋值和拓展运算符号
```
对象：
let {apple, orange} = {apple: 'red appe', orange: 'yellow orange'};
=>
let [apple, orange] = ['red appe', 'yellow orange'];
let myFruits = {apple, orange}; 
// let myFruits = {apple: 'red appe', orange: 'yellow orange'};

let {apple, orange, ...otherFruits} = {apple: 'red apple', orange: 'yellow orange', grape:
'purple grape', peach: 'sweet peach'};
// otherFruits {grape: 'purple grape', peach: 'sweet peach'}
数组：
let [a,b,c] = [1,2,3]
无中间变量交换位置
[arr[i],arr[j]]=[arr[i],arr[j]]

```
---

## 48. 箭头函数和普通函数的区别

用了箭头函数，this就不是指向window，而是父级（指向是可变的）

不能够使用arguments对象

不能用作构造函数，这就是说不能够使用new命令，否则会抛出一个错误

不可以使用yield命令，因此箭头函数不能用作 Generator 函数

---

## 47. ES6对Object类型的升级

1. 对象属性变量式声明

2. 对象的解构赋值

3. 对象的拓展运算符

4. super 关键字

Class类里新增super关键字总是指向当前函数所在对象的原型对象。

5. Object.is(a,b)用来修复全等符“===” Nah返回false的bug

6. Object.assign(target, source1, source2);

合并的对象target只能合并source1、source2中的自身属性，并不会并 source1、 source2中的继承属性，也不会合并不可枚举的属性，且无法正确复制get和set 属性（会直接执行get/set函数，取return的值）。

7. getOwnPropertyDescriptor()方法，可以获取指定对象所有自身属性的描述对象。结合defineProperties()方法，可以完美复制对象，包括复制get和set属性。
 
8. ES6在Object原型上新增了getPrototypeOf()和setPrototypeOf()方法，用来获取或设置当前对象的prototype对象。而不是使用浏览器厂商私加的__proto__属性来实现

9. ES6在Object原型上还新增了Object.keys()，Object.values()，Object.entries()方法，用来获取对象的所有键、所有值和所有键值对数组。

---

## 48. Promise 

 - Promise 中 reject 和 catch 处理上有什么区别:

reject 是用来抛出异常，catch 是用来处理异常

reject 是 Promise 的方法，而 catch 是 Promise 实例的方法

reject后的东西，一定会进入then中的第二个回调，如果then中没有写第二个回调，则进入 catch

网络异常（比如断网），会直接进入catch而不会进入then的第二个回调

构造函数中的 resolve 或 reject 只有第一次执行有效,Promise 状态一旦改变则不能再变。

- 理解async await
async await 是用来解决异步的，async函数的实现，就是将Generator函数和自动执行器，包装在一个函数里,是Generator函数的语法糖

使用关键字async来表示，在函数内部使用 await 来表示异步

async函数返回一个 Promise 对象，可以使用then方法添加回调函数

当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句

async较Generator的优势
1、内置执行器
2、更好的语义
3、更广的适用性
4、返回值是 Promise


---

## 49. Ajax的实现流程

1、创建XMLHTTPRequest对象,也就是创建一个异步调用对象.

2、创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息.

3、设置响应HTTP请求状态变化的函数.

4、发送HTTP请求.

5、获取异步调用返回的数据.

6、使用JavaScript和DOM实现局部刷新.
```
var HTTPRequest;
function checkUsername() {
  //创建 XMLHTTPRequest 对象
  if(window.XMLHTTPRequest) {
    //在IE6以上的版本以及其他内核的浏览器(Mozilla)等
    HTTPRequest = new XMLHTTPRequest();
  }else if(window.ActiveXObject) {
    //在IE6以下的版本
    HTTPRequest = new ActiveXObject();
  }
  //创建HTTP请求
  HTTPRequest.open("POST", "Servlet1", true);
  //因为我使用的是post方式，所以需要设置消息头
  HTTPRequest.setRequestHeader("Content-type", "application/x-www-formurlencoded");
  //指定回调函数
  HTTPRequest.onreadystatechange = response22;
  //得到文本框的数据

  var name = document.getElementById("username").value;
  //发送HTTP请求，把要检测的用户名传递进去
  HTTPRequest.send("username=" + name);
}
//接收服务器响应数据
function response22() {
//判断请求状态码是否是4【数据接收完成】
  if(HTTPRequest.readyState==4) {
    //再判断状态码是否为200【200是成功的】
    if(HTTPRequest.status==200) {
      //得到服务端返回的文本数据
      var text = HTTPRequest.responseText;
      //把服务端返回的数据写在div上
      var div = document.getElementById("result");
      div.innerText = text;
      }
    }
}
```
## 50. 跨域及解决方式

指的是浏览器不能执行其他网站的脚本，它是由浏览器的同源策略造成的,是浏览器对
javascript施加的安全限制，防止他人恶意攻击网站

解决方式：

1. jsonP

  利用script标签的src属性中的链接可以访问跨域的js脚本这个特性，通过动态创建script标签的src属性获取js文件中的js脚本，该脚本的内容是一个函数调用，参数就是服务器返回的数据

为了处理这些返回的数据，需要事先在页面定义好回调函数，本质上使用的并不是Ajax技术，服务端不返回json格式的数据，而是返回调用某个函数的js代码，在src中进行了调用，这样就实现了跨域

2. CORS：跨域资源共享

原理：服务器设置Access-Control-Allow-OriginHTTP响应头之后，浏览器将会允许跨域请求

限制：浏览器需要支持HTML5，可以支持POST，PUT等方法兼容ie9以上
需要后台设置

Access-Control-Allow-Origin: * //允许所有域名访问，或者

Access-Control-Allow-Origin: HTTP://a.com //只允许所有域名访问

3. 反向代理

4. window+iframe









**_？？？_**.Vue.nextTick()

$refs相对document.getElementById的方法，会减少获取dom节点的消耗。

以下两个情况下需要用到 Vue.nextTick()

1. Vue 声明周期的 created() 钩子函数进行的 DOM 操作一定要放在 Vue.nextTick() 的回调函数中，因为 created() 执行的时候 DOM 实际上并未进行任何渲染

2. 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的 DOM 结构的时候，这个操作应该放进 Vue.nextTick() 的回调函数中

*数据改变*之后的操作跟改变之后的*DOM*有关，那么就应该使用 Vue.nextTick()

  
---

