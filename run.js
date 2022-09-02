function RandomNumBoth(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); 
    return num;
}
// console.log('random',RandomNumBoth(-600,300))
// a:本金，A：加仓，b:交易周数：c：现净值，d：现收益率 ,r:随机周收益率
// 加仓周期：两周 

var OK=-3000 //回本阈值
var okNum=0,loopTest=9999
for (let index = 0; index < loopTest; index++) {
    const A=600,b=42 
    var a=22300,c=17000
    var d=(c-a)/a
   for(let i =1;i<b;i++ ){
    // console.log('现收益',(c-a)/a)
    var r=1+(RandomNumBoth(-330,440)/100/100)
    // console.log('当前周收益率',r)
    // console.log('当前周',i)

    if( i%2==0){
    //     // console.log('双周加仓',i)
        d=((c*r)+A)/c
        c=(c*r)+A
        a+=A
    }else{
        d=(c*r)/c
        c=(c*r)
    }
    // console.log('本金',a,'持有',c,'最后盈亏',c-a)
}
// console.log('本金',a,'持有',c,'最后盈亏',Math.round(c-a) )
if(c-a>OK) {okNum++} 
}
console.log("回本概率" ,(okNum/loopTest*100).toFixed(2)+'%')

