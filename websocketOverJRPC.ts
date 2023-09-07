// JSON-RPC over Websocket implementation
import PubSub from "./pubSub";
import { ERRORS, ORDER_STATE } from "@/enums/wsTrader";
import TimeElapsed from "../timeCost";
type JSONRPCPromise<T> = Promise<trader.JsonRPCRes<T>>;
const JSONRPC_TIMEOUT_MS = 1000;
export class JSONRPC {
  private requestId = 1;
  private resolvePending: Map<number | string, Function> = new Map();
  private rejectPending: Map<number | string, Function> = new Map();

  private retryCount: number = 5;
  private ready: boolean = false;
  private pubSub = new PubSub();

  private connectingCall: Map<number, string> = new Map();
  authParams: trader.authParams;
  url: string;
  ws: WebSocket | null = null;
  onNotification?: (frame: trader.allResponse) => void;
  openedHandler?: () => void;
  closedHandler?: () => void;
  constructor(
    url: string,
    authParams: trader.authParams,

    openedHandler?: () => void,
    closedHandler?: () => void,
    onNotification?: (frame: trader.allResponse) => void
  ) {
    this.url = url;
    this.authParams = authParams;
    this.onNotification = onNotification;
    // this.ws = new WebSocket(url);
    this.openedHandler = openedHandler;
    this.closedHandler = closedHandler;
    // setTimeout(() => {
    this.connect();
    // }, JSONRPC_TIMEOUT_MS * 3);
  }
  protected connect() {
    //重连时判断
    if (this.ws?.readyState != WebSocket.OPEN) {
      this.ws = new WebSocket(this.url);
    }
    this.ws.onopen = () => {
      console.log("ws:onopen", this.url);
      // config登录废弃
      // this.call("config", this.authParams).catch(({ error }) => {
      //   console.log("configERROR", error);
      //   if ([ERRORS.INVALID_AUTH, ERRORS.INVALID_SESSION, ERRORS.INVALID_SESSION_ID, ERRORS.NETWORK_ERROR].includes(error.code)) {
      //     console.log("Wait^ , Your Auth config is INVALID!?");

      //     this.ready = false;
      //     // this.reConnect();
      //   }
      // });
      this.call("login", this.authParams).catch(({ error }) => {
        console.log("loginError", error);
        if ([ERRORS.INVALID_AUTH, ERRORS.INVALID_SESSION, ERRORS.INVALID_SESSION_ID, ERRORS.NETWORK_ERROR].includes(error.code)) {
          console.log("Wait^ , Your Auth config is INVALID!?");

          this.ready = false;
          // this.reConnect();
        }
      });
      this.openedHandler && this.openedHandler();
    };
    this.ws.onclose = () => {
      this.ready = false;
      this.closedHandler && this.closedHandler();
      // this.reConnect();
    };
    this.ws.onerror = (e: Event) => {
      this.ready = false;
      this.reConnect();
      console.log("ws:onerror", e, this.ws);
    };

    const messageHandler = (data: any) => {
      const frame = JSON.parse(data);
      // 这里可以用id1 专门发送一次登录订阅 (待定)
      if (frame?.id == 1 && frame?.result == 0) {
        // 这个demo的情况是config成功后返回的信息源  通过publish交给订阅方处理数据
        // 目前已失效 因为在这个函数执行前首次含id的响应信息保留在.then处理  - - - rpc.call().then
        // console.log("config成功后返回的执行发布 你订阅了么");
        this.pubSub.publish("AuthSuccess", "okokok DATA:before request Auth", "elseResponse");
      }
      if (Reflect.has(frame, "id")&&!Reflect.has(frame,'proxy')) {
        if (frame.method === "order") {
          this.orderFrameResolve(frame);
        }

        if (Reflect.has(frame, "error")) {
          this.rejectPendingF(frame.id, frame);
          return;
        }
        // console.log("recvIdRes", frame);
        this.resolvePendingF(frame.id, frame);
        // order请求会返回多次不确定次数状态的变化 也有id
        // 带有对应id的请求和返回在then内处理 （下单 取消 调仓）
        // 未知个数的id响应对应未知个数的.then 所以这里直接返回 仅处理id消息响应的.then的首次回调 下面的onmessage数据发布不会重复执行
        return;
      } else {
        if (frame?.push == "ready") {
          const readyData: trader.readyData = frame.data;
          this.onReady(readyData);
          return;
        }
        // this.onNotification(frame);
      }
      this.onmessage(frame);
    };

    let msgCount = 0;
    let totalTimeCost = 0;
    let lastLogTime = -1;
    this.ws.onmessage = ({ data }) => {
      msgCount++;
      const startTime = Date.now();
      try {
        messageHandler(data);
      } finally {
        const endTime = Date.now();
        const timeCost = endTime - startTime;
        totalTimeCost += timeCost;
        if (lastLogTime < 0 || endTime - lastLogTime >= 30000) {
          console.log("[ws] received %s messages, timeCost(ms): %s, totalTimeCost(ms): %s", msgCount, timeCost, totalTimeCost);
          lastLogTime = endTime;
        }
        if (timeCost > 10) {
          console.log("[ws] heavy message, cost(ms): %s, message: %s", timeCost, data);
        }
      }
    };
  }
  close(code = 1000, msg = "close-connect") {
    this.ws!.close(code, msg);
  }
  protected getRequestId() {
    const id = this.requestId % 0x7ffffff;
    this.requestId++;
    return id;
  }
  protected resolvePendingF(id: number | string, frame: trader.allResponse) {
    const resolve = this.resolvePending.get(id);
    resolve && resolve(frame);
    this.resolvePending.delete(id);
    this.rejectPending.delete(id);
  }
  protected rejectPendingF(id: number | string, frame: trader.allResponse) {
    const reject = this.rejectPending.get(id);
    reject && reject(frame);
    this.resolvePending.delete(id);
    this.rejectPending.delete(id);
  }
  isReady() {
    console.log("ws.isready()", this.ready);
    return this.ready;
  }
  call<T>(method: string, params: any, proxy?: boolean): JSONRPCPromise<T> {
    const initId = this.getRequestId(),
      request = { id: initId, method, params, proxy };

    if (this.ws!.readyState == WebSocket.OPEN) {
      // console.log("sent", request);
      this.ws!.send(JSON.stringify(request));
    } else {
      this.connectingCall.set(initId, JSON.stringify(request));
      return new Promise((resolve, reject) => {
        // next返回的id序列号可能会重复发送config前的几个，promise的响应函数会被之后connectingCall的同id覆盖
        this.resolvePending.set(initId + "before", (frame: JSONRPCPromise<T>) => resolve(frame));
        this.rejectPending.set(initId + "before", (frame: JSONRPCPromise<T>) => reject(frame));
      });
    }

    return new Promise((resolve, reject) => {
      this.resolvePending.set(initId, (frame: JSONRPCPromise<T>) => resolve(frame));
      this.rejectPending.set(initId, (frame: JSONRPCPromise<T>) => reject(frame));
    });
  }

  protected reConnect() {
    if (this.retryCount && this.ws && this.ws.readyState != WebSocket.OPEN) {
      console.log(
        `Connecting not ready! Please wait ${JSONRPC_TIMEOUT_MS}ms 
        Is trying reconnect ${5 - --this.retryCount} ${5 - this.retryCount == 1 ? "time" : "times"}……`
      );
      setTimeout(() => {
        // this.ws = new WebSocket(this.url);
        this.connect();
      }, JSONRPC_TIMEOUT_MS);
    }
  }
  protected onReady(data: trader.readyData) {
    // 应该在onready后处理其他的call请求 否则会出现session is not ready code-1报错
    // Done :实际没有影响 因为order和amend请求实际远比config请求靠后 类似登录后才有其他操作 但可优化ready逻辑
    console.log("onReady", data.next);
    this.requestId = data.next;
    this.ready = data.ready;
    this.pubSub.publish("AuthSuccess", "okok - This Auth config is success!", "elseResponse");
    // 这里处理未完成链接前的请求
    console.log("configOK-thenCall", this.connectingCall);

    this.connectingCall.forEach((v, k) => {
      // const params = { ...JSON.parse(v), id: this.getRequestId() };
      const { method, params } = JSON.parse(v);
      // console.log("connectingCall", v);
      this.call(method, params)
        .then(res => {
          // this.connectingCall.set(k, res);
          this.resolvePendingF(k + "before", res);
        })
        .catch(err => {
          this.rejectPendingF(k + "before", err);
        });
      // this.ws.send(JSON.stringify(params));
      this.connectingCall.delete(k);
    });
  }
  public subscribe(topic: string, fn: (data: any) => void) {
    this.pubSub.subscribe(topic, fn);
  }
  public unSubscribe(topic: string, fn?: (data: any) => void) {
    this.pubSub.unSubscribe(topic, fn);
  }
  protected onmessage(frame: trader.allResponse) {
    if (Reflect.has(frame, "error")) {
      console.log("ws-error", frame.error.message);
      return;
    }
    // 数据流类型处理
    if (Reflect.has(frame, "push")) {
      const pushFrame = frame as trader.pushFrame;
      const pushFrameData = pushFrame.data;
      switch (pushFrame.push) {
        case "position":
          // 持仓推送
          this.pubSub.publish("push/position", pushFrameData);
          break;
        case "trade":
          // 逐笔成交回报
          this.pubSub.publish("push/trade", pushFrameData);
          break;
        default:
          this.pubSub.publish("push/else", pushFrameData);
          break;
      }
      return;
    }
    if (Reflect.has(frame, "proxy")) {
      if(frame.method === "update"){
        // 含有proxy，method为Update的数据流协议
        const streamFrame = frame as etfPricer.proxyUpdate;
        this.pubSub.publish("update/proxy", streamFrame);
      }
      if(frame.stream==="bbo"){
        // 含有proxy，method为Update的数据流协议
        const streamFrame = frame as etfPricer.proxyUpdate;
        this.pubSub.publish("bbo/proxy", streamFrame);
      }
      return;
    }
    if (Reflect.has(frame, "stream")) {
      const streamFrame = frame as trader.streamFrame;
      const streamData = streamFrame.data;
      const streamTopic = streamData.symbol + "@" + streamFrame.stream;
      // 这里发布的订阅字段分为 rb2309@depth 订阅depth深度行情 \ rb2305@kline:XX 订阅相应间隔k线行情 \ rb@index:XX 订阅相应指数K线行情
      this.pubSub.publish(streamTopic, { streamData, product: streamFrame.product, stream: streamFrame.stream });
      // 深度行情的发布的订阅与websocket服务端订阅时略有不同 服务端订阅只需symbol 如订阅rb2305 返回的stream只是depth
      return;
    }
    
  }
  protected orderFrameResolve(frame: trader.JsonRPCRes<trader.orderResult>) {
    // 下单结果的处理流程: 下单请求后通过.then获得请求id；订阅`order/${id}` 接收到订单state完成或错误等结束状态取消订阅 && Reflect.has(frame.result, "traded")
    // 特殊处理：then后订阅id 然后接受订阅信息的情况
    if (frame?.id && frame?.result != 0 && !Reflect.has(frame, "error")) {
      // 这里result!=0就相当于判断method为order了
      let timeElapsed = new TimeElapsed();
      this.pubSub.publish("method/order", frame); //无差别发布order响应
      console.log("publish method/order cost: %s", timeElapsed.elapsed());
      const orderResult = frame.result;
      timeElapsed = new TimeElapsed();
      this.pubSub.publish(`order/${frame.id}`, frame);
      console.log("publish order/{orderId} cost: %s", timeElapsed.elapsed());
      if ([ORDER_STATE.CANCELED, ORDER_STATE.EXPIRED, ORDER_STATE.FILLED, ORDER_STATE.REJECTED].includes(orderResult.state)) {
        setTimeout(() => {
          console.log(`取消订阅order/${frame.id}`);

          this.pubSub.unSubscribe("order/${frame.id}");
        }, 1000);
      }
      // 收到最后发布消息后取消订阅
    }
  }
}
let cache: JSONRPC;
type getInstanceParams = (
  wsServer?: string,
  wsConfigParams?: trader.authParams,

  onopen?: () => void,
  onclose?: () => void,
  onNotification?: (frame: trader.allResponse) => void
) => JSONRPC;
const getInstance: getInstanceParams = (wsServer, wsConfigParams, onopen, onclose, onNotification) => {
  // 单例模式 确保仅有一个ws链接的实例
  // if (cache) return cache;
  if (cache && cache.url === wsServer && JSON.stringify(cache.authParams) === JSON.stringify(wsConfigParams)) {
    console.log("readCache ws");
    return cache;
  }
  if (wsServer && wsConfigParams) {
    console.log("wsServer && wsConfigParams");
    cache && cache.ws!.close();
    return (cache = new JSONRPC(wsServer, wsConfigParams, onopen, onclose, onNotification));
  } else {
    console.log("empty params get wsInstance");

    return cache;
  }
};
export default getInstance;
