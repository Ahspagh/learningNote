console.log("Hello Typescript！");
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
