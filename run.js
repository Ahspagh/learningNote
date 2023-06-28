// function RandomNumBoth(Min,Max){
//     var Range = Max - Min;
//     var Rand = Math.random();
//     var num = Min + Math.round(Rand * Range);
//     return num;
// }
// // console.log('random',RandomNumBoth(-600,300))
// // a:本金，A：加仓，b:交易周数：c：现净值，d：现收益率 ,r:随机周收益率
// // 加仓周期：两周

import { object } from 'folktale/core';

// var OK=-3000 //回本阈值
// var okNum=0,loopTest=9999
// for (let index = 0; index < loopTest; index++) {
//     const A=600,b=42
//     var a=22300,c=17000
//     var d=(c-a)/a
//    for(let i =1;i<b;i++ ){
//     // console.log('现收益',(c-a)/a)
//     var r=1+(RandomNumBoth(-330,440)/100/100)
//     // console.log('当前周收益率',r)
//     // console.log('当前周',i)

//     if( i%2==0){
//     //     // console.log('双周加仓',i)
//         d=((c*r)+A)/c
//         c=(c*r)+A
//         a+=A
//     }else{
//         d=(c*r)/c
//         c=(c*r)
//     }
//     // console.log('本金',a,'持有',c,'最后盈亏',c-a)
// }
// // console.log('本金',a,'持有',c,'最后盈亏',Math.round(c-a) )
// if(c-a>OK) {okNum++}
// }
// console.log("回本概率" ,(okNum/loopTest*100).toFixed(2)+'%')

// 第二组
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  new Promise(function (resolve) {
    console.log('promise1');
    resolve();
  }).then(function () {
    console.log('promise2');
  });
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
  console.log('promise3');
  resolve();
}).then(function () {
  console.log('promise4');
});
console.log('script end');

function cacheDecorator(func, hash) {
  let cache = new Map();
  return function () {
    let key = hash(arguments);
    if (cache.has(key)) {
      return cache.get(key);
    }
    let result = func.call(this, ...arguments);
    cache.set(key, result);
    return result;
  };
}
function hash() {
  return args[0] + ',' + args[1];
}

function hash() {
  alert([].join.call(arguments));
}
function spy(func) {
  wrapper.calls = [];
  function wrapper(...args) {
    wrapper.calls.push(args);
    return func.apply(this, args);
  }
  return wrapper;
}
function delay(f, ms) {
  return function () {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

let f1000=delay(alert,1000)
f1000('test')
function debounce(func,ms){
  let timeout
  return function (){
    clearTimeout(timeout)
    timeout=setTimeout(() => {
      func.apply(this,arguments)
    }, ms);
  }
}

function throttle(f,ms){
  let isThrottled= false,
  savedArgs,
  savedThis;
  function wrapper(){
    if (Throttled){
      savedArgs=arguments;
      savedThis=this;
      return
    }
    isThrottled=true
    f.apply(this.arguments)
    setTimeout(() => {
      isThrottled=false
      if(savedArgs){
        wrapper.apply(savedThis,savedArgs)
        savedArgs=savedThis=null
      }
    }, ms);
  }
    return wrapper
  
  }
}

// 无上下文仅绑定参数 partial函数 相当于func.bind(null,...argsbound)
function partial (func,...argsBound){
  return function (...args){
    return func.call(this,...argsBound,...args)
  }
}

// 对象属性标志位：writable可写; enumerable可枚举 ; configurable可配置性
// 对于不可配置的属性 可以讲writeable改为false 从而防止被修改 但无法反向

let clone= Object.defineProperties({},Object.getOwnPropertyDescriptors(objOrigin)) 
// for in 会忽略symbol和不可枚举属性，但getOwnPropertyDescriptors可以返回所有属性描述符

let obj={
  get propName(){
    // 当读取obj.propName时getter起作用
  },
  set propName(){
    // 当执行obj.propName=value时setter起作用
  }
}

function User(name,birthday){
  this.name=name;
  this.birthday=birthday
  Object.defineProperty(this,'age',{
    get(){
      let todayYear=new Date().getFullYear();
      return todayYear-this.birthday.getFullYear()
    }
  })
}
let John= new User('John',new Date(1992,6,1))
console.log(John.age,John.birthday)
// __proto__ 是 [[Prototype]] 的因历史原因而留下来的 getter/setter 
//建议使用Object.getProtoTypeOf/Object.setPrototypeOf来取代__proto__去get/set原型
// F.prototype属性仅在new F时使用 为新对象的[[prototype]]赋值
function Rabbit(name){
  // Rabbit.prototype={constructor:Rabbit}
  this.name=name
}
let rabbit=new Rabbit() //继承自{constructor：Rabbit}
rabbit.constructor===Rabbit //true
let rabbit2=new Rabbit('white rabbit')
// 如果将整个默认的prototype替换掉 其中就不会有constructor，
// 因此为了确保继承正确的constructor 应该直接添加或删除属性到默认的prototype而不是整个替换
function Rabbit(){}
Rabbit.prototype={jump:true}
let rabbit=new Rabbit()
rabbit.constructor!==Rabbit

// new后的实例constructor构造器一般可以等同于原型对象F,用于构建新的实例对象new user.constructor('Pete');
// 若有人更改了F的prototype 上面将失效
// 将defer装饰器添加到函数
function f(a,b){
  console.log(a+b)
}
Function.prototype.defer=function(ms){
  let f=this
  return function(...args){
    setTimeout(() => {
      f.apply(this,args)
    }, ms);
  }
}
f.defer(1000)(1,2) //1000ms后显示3
let user={
  // 
  name:"John",
  sayHi(){
    console.log(this.name)
  }
}
user.sayHi=user.sayHi.defer(1000)
// this会被传递给原始方法的user

// 將輸入的對象中存在的數組轉爲key為從0開始的對象
function convertArrayToObj(obj) {
  // 如果输入不是一个对象或者为空，则直接返回输入
  if (typeof obj !== 'object' || !obj) {
    return obj;
  }

  // 如果是一个数组，则将其转换为从0开始的键值对象
  if (Array.isArray(obj)) {
    const newObj = {};
    obj.forEach((val, i) => {
      newObj[i] = convertArrayToObj(val);
    });
    return newObj;
  }

  // 如果是一个对象，则递归调用convertArrayToObj()函数
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[key] = convertArrayToObj(obj[key]);
  });
  return newObj;
}

// reduce实现数据按key值分组
const arr = [
  { classId: "1", name: "张三", age: 16 },
  { classId: "1", name: "李四", age: 15 },
  { classId: "2", name: "王五", age: 16 },
  { classId: "3", name: "赵六", age: 15 },
  { classId: "2", name: "孔七", age: 16 }
]; 

groupArrayByKey(arr, "classId"); 

function groupArrayByKey(arr = [], key) {
  return arr.reduce((t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t), {})
}