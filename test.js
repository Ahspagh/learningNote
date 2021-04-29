// git config--global http.proxy 'http://127.0.0.1:7890'
// git config--global https.proxy 'http://127.0.0.1:7890'
// git config--global--unset https.proxy
// 去重数组对象
const DATA = [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 2 }, { id: 3 }];
let res = [];
let obj = {};
let map = new Map();
DATA.forEach(e => {
  if (!map.has(e.id)) {
    //map.get(e.id)?true:undefined
    map.set(e.id, true);
    res.push(e);
  }
});
// DATA.forEach(e => {
// 	if (!obj[e.id]) {
// 		obj[e.id] = true;
// 		res.push(e)
// 	}
// })
console.log(res);

//返回数组中指定key值对象

const arr = [1, 2, 3, 4, 5, 6, 7];
const list = [
  { id: 1, timelineId: 1, showNo: 1, uid: 1 },
  { id: 2, timelineId: 1, showNo: 1, uid: 1 },
  { id: 9, timelineId: 1, showNo: 1, uid: 1 },
  { id: 4, timelineId: 1, showNo: 1, uid: 1 },
  { id: 5, timelineId: 1, showNo: 1, uid: 1 },
];

const params = list.filter(item => arr.indexOf(item.id) > -1);
console.log(params);

//if return
if (1) {
  return;
}
if (true) {
  console.log('不会执行');
}

// Finding the hash 查找git stash hash ，以用来恢复pop过的stash记录
// git fsck --no-reflog | select-string 'dangling commit' | foreach { $_.ToString().Split(" ")[2] }
// git stash apply #hash

// git checkout -b newBranch  新建并切换到该分支  可以先commit到该分支然后merge到远程
// git branch -D newBranch    //先切换到其他然后删除本地分支
//

// 父子组件在加载的时候，执行的先后顺序
// 父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted。

//git 其他开发分支合并到版本分支
// 1.在其他开发分支 add commit push到远程
//2. checkout到版本分支 merge 其他开发分支
//3. 若有冲突 解决后重新add 和commit 和push到版本分支
//4. 删除本地分支 git branch -d/D dev0.0.1
//5. 删除远程分支 ： git branch -r -d origin/dev0.0.1 并推送 git push origin ：dev0.0.1

// JS比较运算符可以返回类型转换后的布尔值， 全等还要判断类型

//computed计算属性在created生命周期未初始化，即data()中无法拿到，mounted()生命周期时可获取，store中state或getter的值可直接在data()中初始化

//“vuex.action 只能传递两个参数, 一个state是自动添加的,一个payload,是用户自己传到


if(true){
  console.log(1)
  if(true){
    return
  }
}else if()
