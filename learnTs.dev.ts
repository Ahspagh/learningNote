console.log("Hello Typescript！?");
// ts-node-dev --respawn --transpile-only app.ts
// respawn提供了监听重启功能 transpileOnly提供了更快的编译速度 （-T 无类型检查）

// 未开启strictNullChecks检查的情况下 string类型被认为包含了null和undefined类型
const arr1: string[] = [];
const arr2: Array<string> = [];
// 元組 限制數組長度和類型位置 以及可選成員對長度的影響
const arr4: [string, string, string] = ["1", "2", "3"];
const arr6: [name: string, age?: number, male?: boolean] = ["demoCode", , ,];
type tupleLength = typeof arr6.length; //3|1|2
interface IDescription {
	readonly name: string;
	age: number;
	male?: boolean;
	func?: Function;
	what?: Record<string, unknown>;
}
const obj2: IDescription = {
	name: "demoCode",
	age: 599,
	male: true,

	// 无需实现 func 也是合法的
};
// obj2.name = 123165;
obj2.func = () => {};

// 原型链的顶端是Object 和 Function ；Typescript中同样所有的原始类型和对象类型最终都指向Object

// Object、Boolean、Number、String、Symbol 在任何情况下都不应使用这些箱装类型 因为包含了一些超出预期的类型
// object (注意小写)代表所有非原始类型的类型 数组对象函数这些
// {} 字面量类型 内部无属性定义的空对象 类似Object 任何值非包括undefined和null的值关闭strictNullChecks时成立
//    但实际上无法对这个变量进行任何赋值操作

interface Res {
	// 字面量类型 是原始类型的子类型 通常和联合类型一起使用来表达一组字面量类型
	code: 10000 | 10001 | 50000;
	status: "success" | "failure";
	data: any;
	handler: () => {}; //函数类型 要用()
}
// 联合类型用来给对象实现互斥的属性 即有字段1就无字段2
interface Tmp {
	user:
		| {
				vip: true;
				expires: string;
		  }
		| {
				vip: false;
				promotion: string;
		  };
}

declare let tmp: Tmp;

// if (tmp.user.vip) {
// 	console.log(tmp.user.expires);
// }

// type和interface的取舍
//interface 用来描述对象、类的结构，而类型别名用来将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型。

// 对比JS中的constants文件 枚举类型可以将这些常量真正地约束在一个命名空间下  而不是对象字面量
enum PageUrl {
	Home_Page_Url = "url1",
	Setting_Page_Url = "url2",
	Share_Page_Url = "url3",
}
type getEnum = keyof typeof PageUrl;
const varEnum: getEnum = "Home_Page_Url";
const home = PageUrl.Setting_Page_Url;

// 在数字型枚举中，未赋值成员会开始从枚举值（其他枚举值）递增（首位成员为0）。 也可以使用延迟求值的枚举值
const returnNum = () => 100 + 499;
// 条件：没有使用延迟求值的枚举值必须放在使用常量枚举值成员之后。或者放在第一位 ,
enum items {
	// Baz,
	// Foo = returnNum(),
	// baz=599
	//
	Foo = returnNum(),
	bar = 599,
	baz,
}
// 枚举与对象的差异是 对象是单向映射，而枚举可以从枚举值映射成员(仅有值为数字的枚举成员) 枚举产物如下
// "use strict";
// var Items;
// (function (Items) {
//     Items[Items["Foo"] = 0] = "Foo";
//     Items[Items["Bar"] = 1] = "Bar";
//     Items[Items["Baz"] = 2] = "Baz";
// })(Items || (Items = {}));

// const enum Items 常量枚举同样只能通过枚举成员访问枚举值

// TypeScript 中的函数类型签名  (name:string )=>number  \  (name: string): number
const getNameLength: (name: string) => number = name => {
	return name.length;
};
// function (name) {
// 	return name.length;
// };
// 因为混合了函数类型声明和箭头函数可读性变差 所以通常适用类型别名将函数声明抽离
type FuncFoo = (name: string) => number;
const getNameLength2: FuncFoo = name => {
	return name.length;
};
// 同样可以使用interface描述这个函数的类型结构
interface FuncFooStruct {
	// 被称作Callable Interface
	(name: string): number;
}

// 在Typescript中 没有返回值的函数返回类型要  void 类型  即使实际返回的值是undefined
// 分为没有调用和调用了return 但没有返回值这两种情况，但后者强调了进行了返回操作但没有实际的值才更好使用 undefined 定义

// 可选参数和rest参数：
// 1.可选参数必须位于必选参数之后 因为不是JS不是名参是形参传递 2.可选参数添加默认值时不需要？:TYPE
// rest参数本质上还是数组 直接...rest:any[] 或者使用元组类型标注 ...rest:[number,boolean]

// 实现与入参关联的返回值类型 可以使用函数重载签名
//传入 bar 的值为 true 时，函数返回值为 string 类型。
//不传入 bar，或传入 bar 的值为 false 时，函数返回值为 number 类型。
function funcOverload(foo: number, bar: true): string;
function funcOverload(foo: number, bar?: false): number;
function funcOverload(foo: number, bar?: boolean): string | number {
	if (bar) {
		// 注意重载声明定义顺序和逻辑保持一致 这里先判断bar必选情况
		return String(foo);
	} else {
		return foo * 599;
	}
}
// 实际上，TypeScript 中的重载更像是伪重载，它只有一个具体实现，其重载体现在方法调用的签名上而非具体实现上。
// 而在如 C++ 等语言中，重载体现在多个名称一致但入参不同的函数实现上，这才是更广义上的函数重载。

async function asyncFunc(): Promise<void> {}

function* genFunc(): Iterable<void> {}

async function* asyncGenFunc(): AsyncIterable<void> {} //AsyncIterable要es2018+编译库支持

// 类  的方法同样可以进行函数那样的重载，它的主要结构只有 构造函数、属性、方法和访问符 （Accessor）通常不包括装饰器
// setter 方法不允许进行返回值的类型标注，你可以理解为 setter 的返回值并不会被消费，它是一个只关注过程的函数。

// 类的修饰符
// public：此类成员在类、类的实例、子类中都能被访问。
// private：此类成员仅能在类的内部被访问。
// protected：此类成员仅能在类与子类中被访问，你可以将类和类的实例当成两种概念，即一旦实例化完毕（出厂零件），那就和类（工厂）没关系了，即不允许再访问受保护的成员。

// 在ts中private和protect仅在编译时类型检查 编译后不受影响 new base()['privateVar']
class Foo {
	// 不需要在这里设置成员 参数会被直接作为类的成员（即实例的属性），免去后续的手动赋值
	constructor(public arg1: string, private arg2: boolean) {}
	// 静态成员不会被实例继承：es5实现是通过静态成员挂载到class函数体上 而实例成员挂载在原型上
	// 而原型对象上的实例成员会沿着原型链传递 也就是能够被继承
}
// 使用extent继承基类得到的派生类 可以使用override关键字确保覆盖基类也许不存在的方法

// 抽象类：描述了类中应当有哪些属性和方法等 一个抽象方法描述实际实现的结构 类似函数的入参和返回值类型

// 抽象类的成员也需要abstract关键字才被视为抽线留给成员 class使用implements实现一个抽象类
// 在 TypeScript 中无法声明静态的抽象成员。
abstract class AbsFoo {
	abstract absProp: string;
	abstract get absGetter(): string;
	abstract absMethod(name: string): string;
}
class FooAbsClass implements AbsFoo {
	absProp: string = "demo";

	get absGetter() {
		return this.absProp;
	}

	absMethod(name: string) {
		return name.toUpperCase();
	}
}
//同样可以使用Newable Interface来描述一个类的结构
// class someClass{}
// interface ClassInstruct{new():someClass}
// declare const newableFoo123 : ClassInstruct;
// const testClassInstruct=new newableFoo123()

// 栈 - 每日温度  当天距离下一个更高温度的天数

// T[70,76,72,71,74,77,75,72,71]
// 返回[1,4,2,1,1,0,0,0,0]
const getTempArr = (T: number[]): number[] => {
	//记录最高温度的索引 降序入栈 数据首日必入
	let stack = [0];
	let count = 1;
	let len = T.length;
	// 默认没有更高温天气的距离天数为0
	let arr: number[] = new Array(len).fill(0);
	for (let i = 1; i <= len; i++) {
		let tmp = T[i];
		//  当前温度与栈顶最高温度比较
		while (count && tmp > T[stack[count - 1]]) {
			//栈顶值小则出栈 （计算日期差并储存）
			let index = stack.pop() || 0;
			count--;
			arr[index] = i - index;
		}
		// 处理完毕 当前温度入栈（等待找到后续更大温度）
		stack.push(i);
		count++;
	}
	return arr;
};
// const T = [70, 76, 72, 71, 74, 77, 72, 72, 71];
// console.log(getTempArr(T));

// 私有构造函数 将只允许在类内部访问 产生一个不能实例化的类
// 如定义个utils方法的类 此时内部全部是静态成员 或者在一个类希望把实例化逻辑通过方法来实现，而不是通过 new 的形式时，也可以使用私有构造函数来达成目的。

// 面向对象的SOLID原则
// S，单一功能原则，一个类应该仅具有一种职责，这也意味着只存在一种原因使得需要修改类的代码。如对于一个数据实体的操作，其读操作和写操作也应当被视为两种不同的职责，并被分配到两个类中。更进一步，对实体的业务逻辑和对实体的入库逻辑也都应该被拆分开来。

// O，开放封闭原则，一个类应该是可扩展但不可修改的。
// L，里式替换原则，一个派生类可以在程序的任何一处对其基类进行替换。这也就意味着，子类完全继承了父类的一切，对父类进行了功能地扩展（而非收窄）。

// I，接口分离原则，类的实现方应当只需要实现自己需要的那部分接口。
// D，依赖倒置原则，这是实现开闭原则的基础，它的核心思想即是对功能的实现应该依赖于抽象层，即不同的逻辑通过实现不同的抽象类。还是登录的例子，我们的登录提供方法应该基于共同的登录抽象类实现（LoginHandler），最终调用方法也基于这个抽象类，而不是在一个高阶登录方法中去依赖多个低阶登录提供方。
// abstract class LoginHandler {
// 	abstract handler(): void;
// }

// class WeChatLoginHandler implements LoginHandler {
// 	handler() {}
// }

// class TaoBaoLoginHandler implements LoginHandler {
// 	handler() {}
// }

// class TikTokLoginHandler implements LoginHandler {
// 	handler() {}
// }
// class Login {
//   public static handlerMap: Record<LoginType, LoginHandler> = {
//     [LoginType.TaoBao]: new TaoBaoLoginHandler(),
//     [LoginType.TikTok]: new TikTokLoginHandler(),
//     [LoginType.WeChat]: new WeChatLoginHandler(),

//   }
//   public static handler(type: LoginType) {
//     Login.handlerMap[type].handler()
//   }
// }

// unknown类型和any类型有些类似 都属于TopType any类型的变量可以再次赋值为任意其他类型，但unknown只能赋值给any与unknown类型
// 区别是 unknown将来一定会得到一个确定的类型 而any无论何时都是任意类型
// 所以unknown可以结合类型断言来立即使用某一类型
let unknownVar: unknown = {};
(unknownVar as { foo: () => {} }).foo;
// void 类型就像 JavaScript 中的 null 一样代表“这里有类型，但是个空类型”。 而never甚至不包括空类型void 意思是不携带任何类型信息
// never被称为BottomType是最底层的类型，即同null undefined一样是所有非字面量类型的子类型，但只有never可以赋值给never
// 一个只负责抛出错误的函数：
function justThrow(): never {
	throw new Error();
}
// 在类型流的分析中，一旦一个返回值类型为 never 的函数被调用，那么下方的代码都会被视为无效的代码（即无法执行到）：
// 可以利用只有 never 类型能赋值给 never 类型这一点，来巧妙地分支处理检查：
declare const strOrNumOrBool: string | number | boolean;
if (typeof strOrNumOrBool === "string") {
	// 一定是字符串！
	strOrNumOrBool.charAt(1);
} else if (typeof strOrNumOrBool === "number") {
	strOrNumOrBool.toFixed();
} else if (typeof strOrNumOrBool === "boolean") {
	strOrNumOrBool === true;
} else {
	// const _exhaustiveCheck: never = strOrNumOrBool;
	// throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
	// 若忽然新增了func类型分支 但没有做func的处理 ；类型检查时将会把function类型赋值给never类型触发类型错误 而不是运行时才发现
}
// 不请自来的never通常是在启动strictNullChecks配置同时禁用了noImplicitAny配置时 在未标注类型的变量上出现

// 类型断言 as 或者 <>语法
// 双重断言用来过度两个较大差异的类型 先断言到通用的类any/unknown str as unknown as {handle:()=>{}}
// 用来标记前面一个声明一定非空 obj!.func().!prop (剔除null和undefined类型)
// 与可选链不同的是，非空断言的运行时仍然会保持调用链，因此在运行时可能会报错。而可选链则会在某一个部分收到 undefined 或 null 时直接短路掉，不会再发生后面的调用。
// 还有一种用法是代码提示 接口 IStruct中的字段不完全实现也不会报错
// const obj:IStruct={} 改为  const obj= <IStruct> {}
interface IStruct {
	foo: string;
	bar: {
		barPropA: string;
		barPropB: number;
		barMethod: () => void;
		baz: {
			handler: () => Promise<void>;
		};
	};
}
const obj = <IStruct>{
	bar: {
		baz: {},
	},
};

let requestId = 1;
console.log(requestId, requestId++, requestId, requestId++);

// function splitData(rawData: (number | string)[][]) {
// 	const categoryData = [];
// 	const values = [];
// 	for (var i = 0; i < rawData.length; i++) {
// 		categoryData.push(rawData[i].splice(0, 1)[0]);
// 		values.push(rawData[i]);
// 	}
// 	return {
// 		categoryData: categoryData,
// 		values: values,
// 	};
// }
// const data0 = splitData([
// 	["2013/1/24", 2320.26, 2320.26, 2287.3, 2362.94],
// 	["2013/1/25", 2300, 2291.3, 2288.26, 2308.38],
// 	["2013/1/28", 2295.35, 2346.5, 2295.35, 2346.92],
// 	["2013/1/29", 2347.22, 2358.98, 2337.35, 2363.8],
// 	["2013/1/30", 2360.75, 2382.48, 2347.89, 2383.76],
// 	["2013/1/31", 2383.43, 2385.42, 2371.23, 2391.82],
// 	["2013/2/1", 2377.41, 2419.02, 2369.57, 2421.15],
// 	["2013/2/4", 2425.92, 2428.15, 2417.58, 2440.38],
// 	["2013/2/5", 2411, 2433.13, 2403.3, 2437.42],
// 	["2013/2/6", 2432.68, 2434.48, 2427.7, 2441.73],
// 	["2013/2/7", 2430.69, 2418.53, 2394.22, 2433.89],
// 	["2013/2/8", 2416.62, 2432.4, 2414.4, 2443.03],
// 	["2013/2/18", 2441.91, 2421.56, 2415.43, 2444.8],
// 	["2013/2/19", 2420.26, 2382.91, 2373.53, 2427.07],
// ]);
// console.log(data0);
function testArgs(key: string, ...args: any[]) {
	console.log(key, ...args);
}
testArgs("gwaf", ["123", "ge"]);

type OriginalType<T> = {
	value: T;
};
// 去掉一层泛型
type ModifiedType<T> = {
	value: T extends OriginalType<infer U> ? U : never;
};
// 使用示例
type Original = OriginalType<string>;
// Original 结构为 { value: string }
type Modified = ModifiedType<Original>;
// Modified 结构为 { value: string }

export namespace Kline {
	export type ResKline = {
		interval: string;
		symbol: string;
		limit: number;
		order?: "asc" | "desc";
	};
}
export interface Result {
	code: string;
	msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
	data: T;
}
type originRes = ResultData<Kline.ResKline[]>;
let testData1: originRes;
// testData1.code
// testData1.data.push

type testGetPromise<T> = Promise<ResultData<T>>;
// 去掉一层泛型
type clearResultWrap = Omit<Promise<ResultData<Kline.ResKline[]>>, keyof ResultData<any>> &
	Kline.ResKline[];
type clear<T> = clearResultWrap;
// type clearResult<T> = clearResultWrap<T, Result>;
let testData2: testGetPromise<clearResultWrap>;

// 使用openAPI将Swagger生成的接口文档json自动生成TS代码
// https://blog.csdn.net/weixin_44241402/article/details/128964496
// lerna 实现monorepo项目 applicetions、packages、lerna.json 、package.json
// lerna add <package>[@version] [--dev]
// lerna add @monorepo/common --scope=@monorepo/electron --scope=@monorepo/web
// 相当于在application的electron和web项目均安装了额package/common的依赖
// 使用yarn workspaces帮助我们使用一条yarn命令安装或升级所有依赖 并可以使多个项目共享同一个node_modules
// 配置在根目录的package.json workspaces:["packages/*","applications/*"]
interface IFoo {
	name: string;
}
declare const obj1: {
	foo: IFoo;
};
// const { foo = {} as Partial<IFoo> } = obj1;
// 断言为可选类型
// <> 也是类型断言 可以作为代码提示的辅助工具,对于复杂接口的简单实现可以不完整实现其结构但保留提示
// 非空断言是类型断言的简写;
// foo.func!().prop!.toFixed();
// 即
// ((foo.func as () => ({
//   prop?: number;
// }))().prop as number).toFixed();

// 索引签名类型是声明 而索引类型查询和索引类型访问是读取
// 键值类型一致的类型结构
interface AllStringInterface {
	[key: string]: string;
}
type AllStringTypes = {
	[key: string]: string;
};
// 对于obj[prop]形式的访问会将数字索引转换为字符串索引访问即obj[456]和obj['456']效果一致 symbol键名同理
interface Foo0 {
	linbudu: 1;
	599: 2;
}
type fookeys = keyof Foo0 & {};

// never<字面量类型 ; 原始类型（string）<原始类型对应的箱装（String等）类型<Object类型
type result13 = unknown extends "asd" ? 1 : 2;
// 如果内部条件类型处理接收判断的是any 则直接返回条件类型结果组成的联合类型
// undefined null void 与string number object没有本质上区别 都属于切实存在有实际意义的字面量类型
// ps.关闭 --strictNullCheckes 的情况下，null 会被视为 string 等类型的子类型
type TypeChain = never extends "linbudu"
	? "linbudu" extends "linbudu" | "599"
		? "linbudu" | "599" extends string
			? string extends String
				? String extends Object
					? Object extends any
						? any extends unknown
							? unknown extends any
								? 8
								: 7
							: 6
						: 5
					: 4
				: 3
			: 2
		: 1
	: 0;
//type TypeChain = 8   type VerboseTypeChain=8即所有条件均成立
// 根据结构化类型系统和类型系统设定 得到的层级连
type VerboseTypeChain = never extends "linbudu"
	? "linbudu" extends "linbudu" | "budulin"
		? "linbudu" | "budulin" extends string
			? string extends {}
				? string extends String
					? String extends {}
						? {} extends object
							? object extends {}
								? {} extends Object
									? Object extends {}
										? object extends Object
											? Object extends object
												? Object extends any
													? Object extends unknown
														? any extends unknown
															? unknown extends any
																? 8
																: 7
															: 6
														: 5
													: 4
												: 3
											: 2
										: 1
									: 0
								: -1
							: -2
						: -3
					: -4
				: -5
			: -6
		: -7
	: -8;
type getFalseType1 = {} extends String ? 1 : 2;
type getFalseType2 = {} extends string ? 1 : 2;
type getTrueType1 = Function extends {} ? 1 : 2;
type getTrueType2 = Function extends object ? 1 : 2;
const getKeyValue = [
	{ x: 0, y: 0, w: 2, h: 19, i: "historyAnalysis" },
	{ x: 2, y: 0, w: 8, h: 19, i: "depthList" },
	{ x: 10, y: 0, w: 2, h: 19, i: "buySellOrder" },
	{ x: 2, y: 19, w: 8, h: 4, i: "transactionTabs" },
];
// console.log();

// 统一基础类型的字面量联合类型，可以被认做此基础类型的子类型 即 964|1 是number的子类型

type Func = (...args: any[]) => any;
type FunctionConditionType<T extends Func> = T extends (...args: any[]) => string
	? "A string return func!"
	: "A non-string return func!";
type NonStringResult2 = FunctionConditionType<() => number>;

// infer 关键字用于提取类型 仅在条件类型中使用，infer R 中R就表示待推断的类型
type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;

type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]

// 甚至可以用于提取不定长度Left的类型 调换并提取首尾两个
type SwapStartAndEnd<T extends any[]> = T extends [infer Start, ...any[], infer End]
	? [End, Start]
	: T;

// 提取对象的属性类型

type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R } ? R : never;
type PropTypeResult2 = PropType<{ name: string; age: number }, "name" | "age">; // string | number
// 翻转键名与键值
type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<infer K, infer V>
	? Record<V & string, K>
	: never;
// V & string 用来保证属性名为string类型
type ReverseKeyValueResult1 = ReverseKeyValue<{ key: "value" }>; // { "value": "key" }
// 不是用V&string 将类型“V”不满足约束“string | number | symbol”。 infer 推导，将导致类型信息丢失
// type ReverseKeyValueErr<T extends Record<string, string>> = T extends Record<infer K, infer V>
// 	? Record<V, K>
// 	: never;

//  映射对象键： keyof 可以与映射类型结合使用，以转换或操作对象键
let myobj = {
	name: "asd",
	age: 11,
};
type MappedObj<T> = {
	[K in keyof T]: T[K][];
	// 转换为数组值
};
//
type resMappedObj = MappedObj<typeof myobj>;

// 递归处理提取嵌套深度的类型
type getPromiseValue<T> = T extends Promise<infer V> ? getPromiseValue<V> : T;
type PromiseValueResult3 = getPromiseValue<Promise<Promise<boolean>>>; // boolean

// 是否通过泛型参数传入,对联合类型存在影响
type Condition<T> = T extends 1 | 2 | 3 ? T : never;
// 1 | 2 | 3
type Res1 = Condition<1 | 2 | 3 | 4 | 5>;
// never
type Res2 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never;
type Naked<T> = T extends boolean ? "Y" : "N";
type WrapNaked<T> = [T] extends [boolean] ? "Y" : "N";
// 泛型参数是否被数组包裹 ，对联合类型存在影响
type Res3 = Naked<number | boolean>; //N|y
type Res4 = WrapNaked<number | boolean>; // N
// 分布式类型系统：作用条件：类型参数需要是个联合类型，需要使用泛型参数方式传入，且条件类型中的泛型参数不能被包裹
// 产生的特性：将联合类型拆开并对每个分支进行条件类型判断，最后合并结果
//Naked<number | boolean>相当于 (number extends boolean ? "Y" : "N") | (boolean extends boolean ? "Y" : "N")
// 通过包裹裸类型参数，禁用分布式特性
export type NoDistribute<T> = T & {};
type wrapped<T> = NoDistribute<T> extends boolean ? "Y" : "N";
type Res5 = wrapped<number | boolean>; //N
// 例如联合类型的兼容性判断，将条件与参数都包裹起来实现严格遵守了类型层级的联合类型判断
type CompareUnion<T, U> = [T] extends [U] ? true : false;
type CompareRes1 = CompareUnion<1 | 2, 1 | 2 | 3>; // true
type CompareRes2 = CompareUnion<1 | 2, 1>; // false
// 类型层级： 当条件类型的判断参数为any 则会直接返回两个结果的联合类型，而无论作为判断参数还是泛型参数都是这样效果，作为判断条件正常
type isNever<T> = T extends never ? true : false;

type isneverRes1 = isNever<never>; //never  当通过泛型传入never则直接返回never
type isneverRes2 = CompareUnion<never, never>; //true  严格遵守
type isneverRes3 = never extends never ? true : false; //true

//善用分布式类型系统的特性，可以用来轻易进行集合间（联合类型）的运算，比如交集
type Intersection<A, B> = A extends B ? A : never;
type intersectionRes = Intersection<1 | 2 | 3, 2 | 3 | 4>; //3 | 2
// keyof IObject得到一个对象属性名的联合类型，则可以对这样两个对象属性名进行集合运算

// 判断any  利用any“身化万千”的特性
type isAny<T> = 0 extends 1 & T ? true : false;
// ：0 extends 1一定不成立  ，1&T 意味着同时符合字面量类型与另一类型 ，
// 对于1这样的字面量类型，只有传入其本身、对应的原始类型、包含其本身的联合类型，才能得到一个有意义的值，并且这个值一定只可能是它本身
// 这个1&T 交叉类型的计算结果一般是最精确的那个类型，而0 extends 1 无论如何也不成立 则只有1&any了

type isUnknown<T> = isNever<T> extends false
	? T extends unknown
		? unknown extends T
			? isAny<T> extends false
				? true
				: false
			: false
		: false
	: false;
// 对于 T extends unknown 和 unknown extends T，只有any和unknown符合
type IsUnknown<T> = unknown extends T ? (isAny<T> extends true ? false : true) : false;

type testISunknown = IsUnknown<any>;

// 工具类型与类型编程并不完全等价 ， 类型编程的复杂度通常体现在函数的重载与泛型约束方面
// 工具类型的分类：
// 属性修饰工具类型：属性 元素的必选可选、只读可写
// 结构工具类型： 对既有类型的剪裁拼接转换，例如联合类型结构转换为交叉类型结构
// 模式匹配工具： infer 对一个既有特定位置类型的提取，比如函数类型签名中的返回值类型
// 模板字符串工具类型：比如一个对象中的所有属性名转换为大驼峰形式
// 访问性修饰工具
type Partial<T> = {
	[P in keyof T]?: T[P];
};
type Required<T> = {
	[P in keyof T]-?: T[P];
};
// 可认为是一对工具类型 功能相反 ？ 标记为可选 ，-？相当于在原本属性上如果有？这个标记则移除
// 同样在Partial中也可以改？为+？来显式表示添加可选标记 PS.可选标记*不*等于修改此属性类型为 原类型 | undefined
// 类似还有声明never类型则无法再为这个属性赋值
type ReadOnly<T> = {
	+readonly [P in keyof T]: T[P];
};
type Mutable<T> = {
	-readonly [P in keyof T]: T[P];
};
// 属性修饰的复杂场景：嵌套在里面的对象类型 或者 部分属性（基于传入键名、基于属性类型）
// 结构工具类型分为结构声明和结构处理
type Record<K extends keyof any, T> = {
	// extends keyof any 用于标明：传入的K可以是单个或联合类型 T是属性的类型
	[P in K]: T;
	// 其中，Record<string, unknown> 和 Record<string, any> 是日常使用较多的形式，通常使用这两者来代替 object 。
};

type Dictionary<T> = {
	[index: string]: T;
};
type NumbericDictionary<T> = {
	[index: number]: T;
};
// 结构处理工具类型 Pick 和 Omit
type Pick<T, K extends keyof T> = {
	// T是要进行结构处理 一般是对象的原类型，K是被约束为T类型的键名联合类型
	// 泛型约束是立即填充推导 所以传入T后会立刻得到K的约束条件，也就是输入K时会获得代码提示
	[P in K]: T[P];
};
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// Pick时保留传入的这些键名类型，而Omit是移除这些传入的键
// Exclude<A, B> 的结果就是联合类型 A 中不存在于 B 中的部分：
//  T 的键名联合类型中剔除了 K 的部分，将其作为 Pick 的键名，就实现了剔除一部分类型的效果。
// pick会约束第二个参数的联合类型来自对象属性 而omit并不这样要求；如下情况声明约束反而不符合预期
type Omit1<T, K> = Pick<T, Exclude<keyof T, K>>;
// 这个是严格的omit
declare function combineSpread<T1, T2>(obj: T1, otherObj: T2, rest: Omit1<T1, keyof T2>): void;
type Point3d = { x: number; y: number; z: number };
declare const p1: Point3d;
// combineSpread(p1, { x: 10 }, { z: 123 }); //这里能检测出少了y

// 集合概念补充：
// 差集：对于A\B两个集合而言，A相对B的差集意味着A中独有而B中不存在的组成集合，或者说A中剔除了B有的元素后还剩下的 存在相对概念
// 补集：是差集的特殊情况，此时集合B为集合A的子集，这种情况下A相对B的差集+B=完整的A
type Extract<T, U> = T extends U ? T : never; //交集
type Exclude<T, U> = T extends U ? never : T; //差集
// 这里也就是条件类型的分布式特性，当TU 都是联合类型时，T的成员会被拿出来依次进行 extends U？T1:T2计算 然后合并成一个联合类型
type SetA = 1 | 2 | 3 | 5;
type SetB = 0 | 1 | 2 | 4;
type AExcludeB = Exclude<SetA, SetB>; // 3 | 5
type BExcludeA = Exclude<SetB, SetA>; // 0 | 4

export type Concurrence<A, B> = A | B; //并集
export type Intersection1<A, B> = A extends B ? A : never; //交集
export type Difference<A, B> = A extends B ? never : A; //差集
export type Complement<A, B extends A> = Difference<A, B>; //补集基于差集实现，我们只需要约束集合 B 为集合 A 的子集即可。

type NoNullable<T> = T extends null | undefined ? never : T; //4.8版本更新为 type NonNullable<T> = T & {}
type _NoNullable<T> = Difference<T, null | undefined>; //集合 T 相对于 null | undefined 的差集

// 模式匹配工具：条件类型与infer关键字
// 首先是对函数类型签名的模式匹配：根据infer位置不同，可以获得不同位置的类型，在函数则是参数类型和返回值类型
type FunctionType = (...args: any) => any;
type parameters<T extends FunctionType> = T extends (...arg: infer P) => any ? P : never;
type ReturnType<T extends FunctionType> = T extends (...arg: any) => infer R ? R : never;
// 匹配第一个参数
type FirstParameter<T extends FunctionType> = T extends (arg: infer P, ...args: any) => any
	? P
	: never;

type ClassType = abstract new (...args: any) => any; //CLASS的通用类型签名是声明了可实例化（new）与可抽象（abstract）
// 或使用接口声明
export interface ClassTYpe<TInstanceType = any> {
	new (...args: any[]): TInstanceType;
}
// infer在参数位置 那就是构造函数的参数部分
type ConstrutorParameters<T extends ClassType> = T extends abstract new (...args: infer P) => any
	? P
	: never;
// 返回值部分 就是class的实例类型
type instanceType<T extends ClassType> = T extends abstract new (...args: any) => infer R
	? R
	: never;
// infer约束
// 提取数组第一个成员加上对提取字符串的条件类型
type FirstArrayItemType<T extends any[]> = T extends [first: infer P, ...arg: any[]]
	? P extends string
		? P
		: never
	: never;
// 上面只是对泛型进行声明约束，4.7版本之后就支持了infer约束来对特定类型地提取，则改写上面
type FirstArrayItemType1<T extends any[]> = T extends [infer P extends string, ...any[]]
	? P
	: never;
// 在连续嵌套的情况下 infer+约束可以很好的解决先infer提取再筛选带来的影响可读性问题

// function checkObject(obj: any): boolean {
// 	// 检查对象是否为 null
// 	if (obj === null) {
// 		return true;
// 	}

// 	// 检查对象是否为数字 0
// 	if (typeof obj === "number" && Object.values(obj).every(value => value === 0)) {
// 		return true;
// 	}

// 	// 检查对象是否为对象类型
// 	if (typeof obj === "object") {
// 		// 递归检查对象的每个属性
// 		for (const key in obj) {
// 			if (obj.hasOwnProperty(key)) {
// 				// 递归调用 checkObject 函数检查属性的值
// 				if (checkObject(obj[key]) === true) {
// 					return true;
// 				}
// 			}
// 		}
// 	}

// 	// 如果没有满足条件的情况，则返回 false
// 	return false;
// }
// function allZeroHasNull(obj: any): Boolean {
// 	// return Object.values(obj).every(value => value === 0) || Object.values(obj).some(value => value === null);
// 	// 检查所有值是否都为零
// 	const allZero = Object.values(obj).every(
// 		value => value === 0 || (typeof value === "object" && allZeroHasNull(value))
// 	);
// 	// 检查是否存在任何值为null的情况
// 	const hasNull = Object.values(obj).some(
// 		value => value === null || (typeof value === "object" && allZeroHasNull(value))
// 	);
// 	// 如果所有值都为零或存在任何值为null，则返回true，否则返回false
// 	return allZero || hasNull;
// }
// let testObj = {
// 	today: {
// 		total: 0,
// 		frozen: 0,
// 	},
// 	yst: {
// 		total: 1,
// 		frozen: 0,
// 	},
// };
// console.log(allZeroHasNull(testObj));
console.log(typeof "short");

function simulateAPIRequest(data, delay) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(data);
		}, delay);
	});
}

// async function makeAPIRequest() {
//   try {
//     console.log("Making API request...");
//     const response = await simulateAPIRequest("API response", 2000);
//     console.log("API response:", response);
//   } catch (error) {
//     console.error("API request failed:", error);
//   }
// }

// makeAPIRequest();
// async function makeAPIRequestLoop() {
// 	const iterable = [1, 2, 3,4];
// 	let resArr: any[] = [];
// 	for (const item of iterable) {
// 		await new Promise(resolve => {
// 			simulateAPIRequest(`API response ${item * Math.random()}`, Math.random() * 1000 * item).then(
// 				res => {
// 					resArr.push(res);
// 					resolve(res);
// 				}
// 			);
// 		});
// 	}
// 	return resArr;
// }
// makeAPIRequestLoop()
// 	.then(result => {
// 		console.log("result", result);
// 	})
// 	.catch(err => {});
// interface closePositionTable {
// 	symbol: string;
// 	side: "buy";
// 	exchange: string;
// 	offset: "CLOSE";
// 	tif: "GFD";
// 	type: "LIMIT";
// 	isSelected: boolean;
// 	complete: number; //traded
// 	position: number;
// 	price: string;
// 	priceType: string;
// 	id: number | string;
// }
// type closePositionTableType = keyof closePositionTable;
// const objPositionKeys: closePositionTableType = "exchange";

const array = [
	{ id: 1, name: "John" },
	{ id: 2, name: "Jane" },
	{ id: 2, name: "Jane" },
	{ id: 3, name: "Bob" },
];

function findIndexWithSameProperty(array, property) {
	for (let i = 1; i < array.length; i++) {
		if (array[i][property] === array[i - 1][property]) {
			return i - 1 < 0 ? 0 : i - 1;
		}
	}
	return -1;
}

const index = findIndexWithSameProperty(array, "name");
console.log(index);
