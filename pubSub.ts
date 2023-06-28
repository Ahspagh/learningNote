// 事件中心
export default class PubSub {
	private list: Record<string, ((data: unknown) => void)[]>;

	constructor() {
		this.list = {};
	}

	public subscribe(key: string, fn: (data: unknown) => void): void {
		// 订阅
		// 可重复订阅同一键值执行不同回调
		if (!this.list[key]) {
			this.list[key] = [];
		}
		this.list[key].push(fn);
	}

	public publish(key: string, ...arg: any[]): void {
		// 发布
		try {
			for (const fn of this.list[key]) {
				fn.call(this, ...arg);
			}
		} catch (error) {
			console.log(error);
		}
	}

	public unSubscribe(key: string, fn?: () => void): boolean {
		// 取消订阅
		const fnList = this.list[key];
		if (!fnList) return false;

		if (!fn) {
			// 不传入指定取消的订阅方法，则清空所有key下的订阅
			fnList && (fnList.length = 0);
		} else {
			fnList.forEach((item, index) => {
				if (item === fn) {
					fnList.splice(index, 1);
				}
			});
		}
		return true;
	}
}
