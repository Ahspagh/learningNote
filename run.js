// function RandomNumBoth(Min,Max){
//     var Range = Max - Min;
//     var Rand = Math.random();
//     var num = Min + Math.round(Rand * Range);
//     return num;
// }
// // console.log('random',RandomNumBoth(-600,300))
// // a:本金，A：加仓，b:交易周数：c：现净值，d：现收益率 ,r:随机周收益率
// // 加仓周期：两周

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