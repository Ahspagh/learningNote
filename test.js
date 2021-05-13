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

//git 重命名追踪的文件或文件夹
// git mv -f oldfolder newfolder   -n显示重命名会发生的改变，不进行重命名操作
// git add -u newfolder (-u选项会更新已经追踪的文件和文件夹)
//git mv foldername tempname && git mv tempname folderName 大小写不敏感系统使用临时名

// git reset --soft HEAD^ 撤回上一次的commit
// --mixed
// 意思是：不删除工作空间改动代码，撤销commit，并且撤销git add . 操作
// --soft
// 不删除工作空间改动代码，撤销commit，不撤销git add .
// --hard
// 删除工作空间改动代码，撤销commit，撤销git add .
// HEAD^的意思是上一个版本，也可以写成HEAD~1
// commit注释写错了，只是想改一下注释，只需要：
// git commit --amend

// JS比较运算符可以返回类型转换后的布尔值， 全等还要判断类型

//computed计算属性在created生命周期未初始化，即data()中无法拿到，mounted()生命周期时可获取，store中state或getter的值可直接在data()中初始化

//“vuex.action 只能传递两个参数, 一个state是自动添加的,一个payload,是用户自己传到

//if语句的条件表达式，js会自动调用Boolean()将条件表达式转换为布尔值即： Boolean([])   //true

// eslint 某一文件  eslint --fix "C:\code\hello-world.js"

// 多重判断中使用Array.includes  fruit == 'apple' || fruit == 'strawberry'
const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

if (redFruits.includes(fruit)) {
  console.log('red');
}
// 少嵌套，早返回 发现无效的条件时，及早return。
// let params = {
//   expired_date: individualForm.expired_date,
//   issue_date: individualForm.issue_date,
//   passport: individualForm.passport,
// };
// Bolb下载文件
let blob = new Blob([res], {
  type: 'application/vnd.ms-excel;charset=utf-8',
});
let url = window.URL.createObjectURL(blob);
let aLink = document.createElement('a');
aLink.style.display = 'none';
aLink.href = url;
aLink.setAttribute('download', '');
document.body.appendChild(aLink);
aLink.click();
document.body.removeChild(aLink);
window.URL.revokeObjectURL(url);
// URLSearchParams对象，将查询字符串转为对象
Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'));
// { foo: "bar", baz: "qux" }

// input type=file  选择文件类型
// accept="image/*"  ； accept="image/*,application/pdf"

document
  .querySelector('#sumsub-websdk-container>iframe') //获得iframe元素
  .contentWindow.querySelector('sumsub-logo'); // 允许跨域的元素内部需要.contentWindow 或（IE）  .contentDocument
// iframe子页面在控制下时   父页面： 使用postMessage发送需要修改的信息。子iframe： 监听onmessage 事件，修改自身的样式。

//import { mapState, mapActions, mapMutations } from 'vuex';  分别可用在computed和 method 中 是$store中state、commit、dispatch方法的缩略写法
