## 1.typeof 和 instanceof 的区别：

typeof 可以判断所有变量的类型，判断对象时只能返回 Object。instanceof 可以对不同的对象实例进行判断。

typeof 判断所有变量的类型，返回值有 number，boolean，string，function，object，undefined

---

## 2. 最近浏览的新技术等等

- 2.1 CSS 自定义属性 动态变量 替代预处理器https://segmentfault.com/a/1190000015948538
- 2.2 vite vue3.0 支持 TS 的按需编译工具--前端在开发环境下一种新的打包工具
  https://zhuanlan.zhihu.com/p/220603467

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

     //object.create()创建对象
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
function Dog(){
}
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

splice(index,delNum,item1,.....,itemX) 向/从数组中添加/删除元素，然后返回被删除的项目，**改变原数组**

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

map((item,index,arr)=>{return //新数组的每一项}) 对元素重新组装，**返回新数组**

filter(checkFunction) 过滤返回符合条件的元素的**新数组**

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

  .indexOf( ) 返回一个子字符串在原始字符串中的索引值(查找顺序从左往右查找)。如果没有找到，则返回-1

  .match( ) 找到一个或多个正则表达式的匹配

  .replace( ) 替换一个与正则表达式匹配的子串

  .search( ) 检索与正则表达式相匹配的子串

  .slice( ) 同 Array.slice 抽取一个子串 如果是负数，则该参数规定的是从字符串的尾部开始算起的位置。

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
4.2 作为对象原型链的终点
```

---

**_22_**.Vue.nextTick()

以下两个情况下需要用到 Vue.nextTick()

1. Vue 声明周期的 created() 钩子函数进行的 DOM 操作一定要放在 Vue.nextTick() 的回调函数中，因为 created() 执行的时候 DOM 实际上并未进行任何渲染

2. 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的 DOM 结构的时候，这个操作应该放进 Vue.nextTick() 的回调函数中

*数据改变*之后的操作跟改变之后的*DOM*有关，那么就应该使用 Vue.nextTick()

# P91
