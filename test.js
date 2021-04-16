// 去重数组对象
const DATA = [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 2 }, { id: 3 },]
let res = []
let obj = {}
DATA.forEach(e => {
	if (!obj[e.id]) {
		obj[e.id] = true;
		res.push(e)
	}
})
console.log(res)

//返回数组中制指定key值对象


const arr = [1, 2, 3, 4, 5, 6, 7]
const list = [
	{ id: 1, timelineId: 1, showNo: 1, uid: 1 },
	{ id: 2, timelineId: 1, showNo: 1, uid: 1 },
	{ id: 9, timelineId: 1, showNo: 1, uid: 1 },
	{ id: 4, timelineId: 1, showNo: 1, uid: 1 },
	{ id: 5, timelineId: 1, showNo: 1, uid: 1 }
]

const params = list.filter(item => arr.indexOf(item.id) > -1)
console.log(params)
