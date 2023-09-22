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

// function simulateAPIRequest(data, delay = 1000) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve(data);
// 		}, Math.random() * delay);
// 	});
// }

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
// 	const iterable = [1, 2, 3, 4];
// 	let resArr: any[] = [];
// 	for (const item of iterable) {
// 		await new Promise(resolve => {
// 			simulateAPIRequest(`API response ${item}`).then(res => {
// 				resArr.push(res);
// 				resolve(res);
// 			});
// 		});
// 	}
// 	return resArr;
// }
// makeAPIRequestLoop()
// 	.then(result => {
// 		console.log("result", result);
// 	})
// 	.catch(err => {});
interface closePositionTable {
	symbol: string;
	side: "buy";
	exchange: string;
	offset: "CLOSE";
	tif: "GFD";
	type: "LIMIT";
	isSelected: boolean;
	complete: number; //traded
	position: number;
	price: string;
	priceType: string;
	id: number | string;
}
type closePositionTableType = keyof closePositionTable;
const objPositionKeys: closePositionTableType = "exchange";

// const array = [
// 	{ id: 1, name: "John" },
// 	{ id: 2, name: "Jane" },
// 	{ id: 2, name: "Jane" },
// 	{ id: 3, name: "Bob" },
// ];

// function findIndexWithSameProperty(array, property) {
// 	for (let i = 1; i < array.length; i++) {
// 		if (array[i][property] === array[i - 1][property]) {
// 			return i - 1 < 0 ? 0 : i - 1;
// 		}
// 	}
// 	return -1;
// }

// const index = findIndexWithSameProperty(array, "name");
// console.log(index);
const simulateAPIRequest = (data: string, delay = 1000): Promise<string> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(data);
		}, Math.random() * delay);
	});
};
// async function* asyncGenerator() {
// 	const iterable = [1, 2, 3, 4];
// 	for (let item of iterable) {
// 		yield simulateAPIRequest(`API response ${item}`);
// 	}
// }
// const syncReq = async () => {
// 	for await (const response of asyncGenerator()) {
// 		console.log(response);
// 	}
// };
// syncReq();
const wrapPromise = async () => {
	const reqDATA = [1, 2, 3, 4];
	for (let i = 0; i < reqDATA.length; i++) {
		await simulateAPIRequest(`API response ${reqDATA[i]}`).then(res => {
			console.log(res);
		});
	}
};

wrapPromise();
// const wrapPromise = ():Promise<string>[] => {
// 	const reqDATA = [1, 2, 3, 4];
// 	const reqArr = [];
// 	for (let i = 0; i < reqDATA.length; i++) {
// 		reqArr.push(simulateAPIRequest(`API response ${reqDATA[i]}`));
// 	}
// 	return reqArr;
// };
// const syncReq = (arr: Promise<string>[]) => {
// 	let link = Promise.resolve();
// 	const result = [];
// 	arr.forEach(item => {
//     link= link.then(()=>item).then(res=>{
//       result.push(res)
//     })
//   });
//   return link.then(()=>result)
// };
// syncReq(wrapPromise());
// const iterable = [1, 2, 3, 4];
// 	let resArr: any[] = [];
// 	for (const item of iterable) {
// 		await new Promise(resolve => {
// 			simulateAPIRequest(`API response ${item}`).then(res => {
// 				resArr.push(res);
// 				resolve(res);
// 			});
// 		});
// 	}
// 	return resArr;

enum ERRORS {
	INVALID_ORDER = -10000,
	INVALID_ORDER_SIDE = -10001,
	INVALID_ORDER_OFFSET = -10002,
	INVALID_ORDER_TYPE = -10003,
}

type ErrorValue = ERRORS;
const errCode: ErrorValue = -10000;

type EnumValues<T> = T[keyof T];

// 使用示例
enum Color {
	Red = "RED",
	Green = "GREEN",
	Blue = "BLUE",
}

type ColorValues = EnumValues<typeof Color>; // "RED" | "GREEN" | "BLUE"
let testEnum = "Green";
console.log(testEnum in Color);
