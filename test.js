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
function uniqueByFilter(arr, key) {
	return arr.filter(
		(item, index, self) =>
			self.findIndex(
				obj =>
					//findindex返回成立条件的第一个索引
					obj[key] === item[key]
			) ===
			//  filter返回成立条件的数组
			index
	);
}
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
console.log("params", params);

//if return
if (1) {
	return;
}
if (true) {
	console.log("不会执行");
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

//  Vue组件上使用的key值发生变化会自动重新渲染该组件 ！ 结合store和computed使用十分方便

//“vuex.action 只能传递两个参数, 一个state是自动添加的,一个payload,是用户自己传到

//if语句的条件表达式，js会自动调用Boolean()将条件表达式转换为布尔值即： Boolean([])   //true

// eslint 某一文件  eslint --fix "C:\code\hello-world.js"

// 多重判断中使用Array.includes  fruit == 'apple' || fruit == 'strawberry'
const redFruits = ["apple", "strawberry", "cherry", "cranberries"];

if (redFruits.includes(fruit)) {
	console.log("red");
}
// 少嵌套，早返回 发现无效的条件时，及早return。

// Bolb下载文件
let blob = new Blob([res], {
	type: "application/vnd.ms-excel;charset=utf-8",
});
let url = window.URL.createObjectURL(blob);
let aLink = document.createElement("a");
aLink.style.display = "none";
aLink.href = url;
aLink.setAttribute("download", "");
document.body.appendChild(aLink);
aLink.click();
document.body.removeChild(aLink);
window.URL.revokeObjectURL(url);
// URLSearchParams对象，将查询字符串转为对象
Object.fromEntries(new URLSearchParams("foo=bar&baz=qux"));
// { foo: "bar", baz: "qux" }

// input type=file  选择文件类型
// accept="image/*"  ； accept="image/*,application/pdf"

document
	.querySelector("#sumsub-websdk-container>iframe") //获得iframe元素
	.contentWindow.querySelector("sumsub-logo"); // 允许跨域的元素内部需要.contentWindow 或（IE）  .contentDocument
// iframe子页面在控制下时   父页面： 使用postMessage发送需要修改的信息。子iframe： 监听onmessage 事件，修改自身的样式。

//import { mapState, mapActions, mapMutations } from 'vuex';  分别可用在computed和 method 中 是$store中state、commit、dispatch方法的缩略写法

//el-pagination total值为undefined时，total和pager均不显示甚至不报错 layout="slot" 插值模板

// if (!redeTransaction[fund]) {
//   redeTransaction[fund] = [];
// }
// redeTransaction[fund].push(item.total_amount);
// 这里是遍历是对象中还不存在的属性为undefined 所以首次先定义为数组 拿到push方法

// vue传参数：子传父 this.$emit('input',val) 在父级可直接v-model绑定获取

// ------------exportXls.js------------
// import { CLIENT_TYPE } from '@/config/baseConfig';

/**
 * npm install xlsx file-saver -S
npm install script-loader -S -D
 * @param {object} tableRef
 * @param {Array} tableData
 * @param {Function} customFormat
 * @param {object} option
 */
function formatJson(filterVal, jsonData, customFormat) {
	return jsonData.map(item =>
		filterVal.map(v => {
			// defaultFormat sample
			//   if (v === 'amount') {
			//     return item[v].toLocaleString();
			//   } else if (v === 'user_type') {
			//     console.log(CLIENT_TYPE);
			//     return CLIENT_TYPE[Number(item[v])];
			//   }
			if (customFormat) {
				return customFormat(item, v);
			} else {
				return item[v];
			}
		})
	);
}
export function export2xls(tableRef, tableData, customFormat, option) {
	import("@/components/export/Export2Excel").then(excel => {
		console.log("export2xls", tableRef.columns, tableData);
		const tHeader = [],
			filterVal = [];
		tableRef.columns.forEach(item => {
			tHeader.push(item.label);
			filterVal.push(item.property);
		});
		console.log("header filter", tHeader, filterVal);

		const data = formatJson(filterVal, tableData, customFormat);
		console.log("formatJson", data);
		excel.export_json_to_excel({
			header: tHeader,
			data,
			filename: option ? option.filename : "filter-investor-holdings-list", //非必填
			bookType: option ? option.bookType : "xlsx", //非必填
			autoWidth: true, //非必填
		});
	});
}
// -------in page.vue
function formatJson(dataItem, filterVal) {
	switch (filterVal) {
		case "user_type":
			console.log("callback", filterVal, dataItem);
			return CLIENT_TYPE[dataItem[filterVal]];
		case "amount":
			return dataItem[filterVal].toLocaleString();
		default:
			return dataItem[filterVal];
	}
}
export2xls(this.$refs.holdingTable, this.tableData, formatJson);
// ------------exportXls.js------------

// vue-cli3 npm指令 —mode后面添加test、production、xxx 等预留参数无效
// 在项目根目录添加文件.env.xxx 打包还需添加属性 NODE_ENV = 'production'，不同环境baseUrl:process.env.VUE_APP_BASE_URL

// 更高效的数组最大值使用apply的第二个参数传入数组
// function getMax2(arr){
//   return Math.max.apply(null,arr)
// }
// 还有拼接数组的apply方法 concat不改变arr1本身 返回新数组
// Array.prototype.push.apply(arr1,arr2)

//  object如果键名为数字 ，会递增排序键值对

// ES9引入了命名捕获组，允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。
// const re = /(\d{4})-(\d{2})-(\d{2})/;  ===> const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
// console.log(match.groups);          // → {year: "2019", month: "01", day: "01"}
// console.log(match.groups.year);     // → 2019

// el-form 的 validateField方法校验部分表单字段
this.$refs["form"].validateField(["region", "funder", "subbranchId"], errorMsg => {
	if (!errorMsg) {
		//执行校验成功的相关操作  会遍历每个字段的结果并执行回调函数
	}
});
// 改进方法
const { region, funder, subbranchId } = this.form;
if (region && funder && subbranchId) {
	//执行校验成功的相关操作
} else {
	this.$refs["form"].validateField(["region", "funder", "subbranchId"]);
}

// 汉明距离：两个整数之间的汉明距离是对应位置上数字不同的位数; 所以结果异或后1的位数

var hammingDistance1 = function (x, y) {
	let s = x ^ y,
		ret = 0;
	while (s != 0) {
		ret += s & 1; //最后一位 位与运算 统计1个数
		s >>= 1; //每一位向右移位
	}
	return ret;
};

var hammingDistance2 = function (x, y) {
	//Brian Kernighan 算法 ：x与x-1异或恰为x删去最后一位1的二进制结果 优化了上述方法的0位循环次数
	let s = x ^ y,
		ret = 0;
	while (s != 0) {
		s &= s - 1; //与s-1做位与运算
		ret++;
	}
	return ret;
};

// 自适应方案 rem单位以及vh，vw容器

// mounted() {
//   window.onresize = () => {
//     //绑定resize事件方法 -- 设置rem单位相对大小
//     const size = (window.innerWidth || 1920) / 1920;
//     let htmlDom = document.getElementsByTagName('html')[0];
//     htmlDom && (htmlDom.style.fontSize = `${size * 40}px`);
//   };
//   if (document.createEvent) {
//     let event = document.createEvent('HTMLEvents');
//     event.initEvent('resize', true, true); //手动触发resize事件
//     window.dispatchEvent(event);
//   } else if (document.createEventObject) {
//     window.fireEvent('onresize');
//   }
// }
// --------------------

// data(){return{}} data,watch,computed,method 要求写法一致

// eslint --fix "C:\code\hello-world.js"

// // 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };

// item&&item.id 检验undefined
// 遍历内遍历可采取自增序号减少复杂度

//  code run 終端亂碼問題
//   "code-runner.executorMapByFileExtension": {
// "code-runner.runInTerminal":true,}

//flutter和dart的null safety模式
// flutter run --no-sound-null-safety
//  dart --no-sound-null-safety run
// 在vscode  ； additional args ；  dart ，flutter run；--no-sound-null-safety
//

// 箭头函数默认没有大括号时不需写return 加了大括号要手动return 若无return如axios请求后则无res
// dialogVisible 必须在前 否则弹窗里面的refs无效

// 垂直分割线： 可使用span标签设置background width颜色实现，同行长短可设置background-origin背景图像相对于content-box来定位，然后设置padding
// 水平分割线 使用背景颜色与高度1px的div 并使用百分比宽度缩进

// Vue2 不能检测到对象属性的添加或删除。
// 由于 Vue 会在初始化实例时对属性遍历执行 getter/setter 转化过程，
// 所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。
// this.$set(this.contentOff, index, false);

// 使用activated:{}周期函数代替mounted:{}函数即可 路由跳转跳转时执行组件内钩子函数 ，之前方法使用dialog@opened回调触发子组件method

// el-dialog   :append-to-body 弹窗嵌套 防止被上一弹窗层遮罩蒙层

// 重置vue中data数据
// 方法一：element的resetfields
// this.$refs[formRef].resetfields()
// 方法二： vue的this.$options.data().form方法对form重置
// this.form = this.$options.data().form
// 方法三： vue的data重置
// this.$data = this.$options.data();

// // modules.js
// function add(x, y) {
//   return x * y;
// }
// export {add as default};
// // 等同于
// // export default add;

// // app.js
// import { default as foo } from 'modules';
// // 等同于
// // import foo from 'modules';

// 节流函数的问题：因为使用了闭包来保存临时变量不被改变，返回的执行函数所在内存地址均不同，在消除监听器上使用的回调函数时 无法生效（无法找到对应函数）

// 热更新时 vuex的store不会重置 这是开发环境和线上环境产生的不同，线上环境一般不会产生热更新情况

// 当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以 在 标签上添加 @submit.native.prevent。

// 如果直接输出error，等于error.message 状态码400的返回值在error=>{error.response}

// git cherry-pick命令的作用，就是将指定的提交（commit）应用于其他分支 \参数，不一定是提交的哈希值，分支名也是可以的，表示转移该分支的最新提交。

// flutter 键盘遮挡输入框：resizeToAvoidBottomInset: false,  在sccaffold里面添加该属性

// 接口返png文件转base64展示 接口设置{ responseType: 'arraybuffer' }
// QRImageUrl =
//           'data:image/png;base64,' +
//           btoa(
//             new Uint8Array(res).reduce(
//               (data, byte) => data + String.fromCharCode(byte),
//               ''
//             )
//           );

// gitERR: would clobber existing tag
// 原因通常是本地与远程仓库tag不一致
// 1.查看远程tags

//       git ls-remote -t
// 2.查看本地tags

//       git tag -l
// 3.删除本地与远程不一致的tag

//       git tag -d tag名字
// 4.重新拉取远程tag

//       git fetch origin --prune-tags
// 5.git pull 拉取代码

// 解决刷新后vuex丢失store的解决方法
// created() {
//     //在页面加载时读取sessionStorage里的状态信息
//     if (sessionStorage.getItem("store")) {
//       this.$store.replaceState(
//         Object.assign(
//           {},
//           this.$store.state,
//           JSON.parse(sessionStorage.getItem("store"))
//         )
//       );
//     }
//     //在页面刷新时将vuex里的信息保存到sessionStorage里
//     window.addEventListener("beforeunload", () => {
//       sessionStorage.setItem("store", JSON.stringify(this.$store.state));
//     });
// },

// 保留小数点（非四舍五入）~~按位非
const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);

// 多选框输入数组
// selected=null
// let toggleItem2selected= function (index){
//   if(this.selected===null)
//   this.selected=new Set()
//   this.selected=new Set(this.selected)
//   if(this.selected.has(index)){
//     this.selected.delete(index)
//   }else{
//     this.selected.add(index)
//   }
//   this.selected=[...this.selected]

// }

// git merge解决冲突后 如果使用vscode的提交按钮会先git pull 接着会触发rebase
// 首先git merge--abort中断merge 再git rebase --abort 中断rebase 冲突文件提交后直接git push

//業務場景 所有的輸入框不要中文簡繁
// 封裝使用的el-input組件限制輸入 中文 簡繁 標點
// 方法：
//  inheritAttrs: false的含义是不希望本组件的根元素继承父组件的attribute
//  v-bind="$attrs" 將父元素傳遞過來的包括未prop接受的屬性添加到子組件綁定的標簽上 類似v-on="$listeners"綁定事件
//  正則全局匹配不需要的類型replace為空
// 遇到問題：@input.native事件由輸入法輸入中文標點時出現錯誤觸發順序 首次輸入標點會執行兩次而且無法成功去除 下一個輸入字符會全局刪除不符合的類型
// 解決辦法：再添加一個@keyup.native事件來處理標點
// 尚有缺陷：由keyup處理的類型刪除會有閃現效果

// 目标源不限制
const targetOrigin = "*";
window.frames[0].window.postMessage(data, targetOrigin);
// 接收消息
window.addEventListener("message", e => {
	console.log(e.data);
});
const bc = new BroadcastChannel("同源通信");
// 收到来自页面的消息后，在 iframe 间进行广播
window.addEventListener("message", e => {
	bc.postMessage(e.data);
});
// 浏览器渲染流程 loader 处理所有HTTP请求以及网络资源缓存
// parser模块 负责解析html css js
// layout模块 排版 包括渲染树创建和计算布局
// paint模块 讲 render树映射成可视图形

// 浏览器缓存
// 页面缓存 内存缓存 磁盘缓存

// 离屏渲染 通过webworker在异步线程完成动态计算页面布局、解析压缩图片返回的blobUrl
// 以阻塞主线程的方式提供绘制所需要的数据 被称为离屏渲染

// 路由模式：history 和 hash
//    原理：history hash对象属性和对象方法 pushState() replaceState()方法
//hash 出發hashchange事件
// CSS3 文字
// 换行 word-break：normal 浏览器默认换行规则
// keep-all 只在半角空格或者连字符换行 break-all 单词内换行
//  word-wrap: break-word 允许长单词或者URL地址内部进行换行  否则只在允许的断字点换行
// 省略号： text-overflow：'ellipsis'  clip 剪裁
// 禁止換行超出隱藏多餘省略號：overflow:hidden;white-space:nowrap;  text-overflow:ellipsis;
// 多行省略号仅webkit浏览器 （高度=行高*行数（webkit-line-clamp））
// text-overflow: ellipsis;
//     display: -webkit-box;
//     -webkit-line-clamp: 2;
//     -webkit-box-orient: vertical;

// loadingCSS3样式
// .loading{
//   width:120px;
//   height:120px;
//   background:fff;
//   border-radius:50%;
//   border-top-color:#3498db;
//   animation:spin 2s cubic-bezier(0.1,0.7,1,0.1) infinite;

// }
// @keyframe spin{
//   0% { transform:route(0deg) }
//   100% { transfrom:route(360deg) }
// }

// Animation 动画:
// // animation-
// //  name,duration,time-function,delay, iteration-count, direction
// //  fill-mode play-state
// animation-play-state:running,paused;
