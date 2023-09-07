import { getToken } from '@/utils/auth'
import jsynchronized from "@/utils/jsynchronized";

const URL = process.env.VUE_APP_ACCOUNT_WS;

/**
 * @type {Client[]} - 客户端列表，每个客户端绑定一个组件，组件销毁时，客户端也销毁
 */
let clientList = [];
/**
 * @typedef {Object} SubscriptionInfo
 * @property {Array.<string>} channel1 - channel1订阅的key数组
 * @property {Array.<string>} channel2 - channel2订阅的key数组
 * @property {Array.<string>} ... - 其他渠道的订阅信息，以此类推
 */
/**
 * @type {SubscriptionInfo} subscriptions - 订阅信息对象
 */
let channelSubscribe = {};
/**
 * @type {WebSocket} - websocket js客户端实例
 */
let websocket = null;
let status = 0; // 0 未连接；1 连接中；2 已连接
let loginStatus = 0; // 0 未登录；1 已登录；-1 登录失败

/**
 * 创建并返回Client
 * @param vueComponent - 绑定的Vue组件实例
 * @returns {Client}
 */
export default function(vueComponent) {
  let client = new Client();
  clientList.push(client);
  if (vueComponent) {
    vueComponent.$once("hook:destroyed", () => {
      client.disconnect();
    });
  }
  return client;
}

/**
 * Client构造方法
 * @constructor
 */
function Client() {
  this.currentChannel = null;
  this.channelList = [];
  /**
   * 设置当前渠道，后续操作都会针对该渠道进行
   * @param channel
   * @returns {Client}
   */
  this.channel = function(channel) {
    this.currentChannel = this.channelList.find(item => item.channel === channel);
    if (!this.currentChannel) {
      this.currentChannel = {
        channel,
        subscribeSet: new Set(),
        listenerList: []
      }
      this.channelList.push(this.currentChannel)
    }
    return this;
  };
  /**
   * 订阅，第一次订阅会创建连接
   * @param subscribeList 订阅的资源列表
   * @returns {Client}
   */
  this.subscribe = function(subscribeList) {
    if (!this.currentChannel) {
      console.warn("未选择渠道");
      return this;
    }
    for (const subscribe of subscribeList) {
      this.currentChannel.subscribeSet.add(subscribe);
    }
    subscribe(this.currentChannel.channel, subscribeList);
    return this;
  };
  /**
   * 取消订阅
   * @param unsubscribeList 取消订阅的资源列表
   * @returns {Client}
   */
  this.unsubscribe = function(unsubscribeList) {
    if (!this.currentChannel) {
      console.warn("未选择渠道");
      return this;
    }
    for (const subscribe of unsubscribeList) {
      this.currentChannel.subscribeSet.delete(subscribe);
    }
    unsubscribe(this.currentChannel.channel, unsubscribeList);
    return this;
  };
  /**
   * 断开客户端，会取消订阅所有资源，并且当断开最后一个客户端时，10秒后会断开websocket连接
   */
  this.disconnect = function() {
    clientList.splice(clientList.indexOf(this), 1);
    for (const channel of this.channelList) {
      unsubscribe(channel.channel, Array.from(channel.subscribeSet));
    }
    if (clientList.length === 0) {
      // 如果没有client，则10秒后断开连接
      setTimeout(() => {
        if (clientList.length === 0) {
          websocket.close();
        }
      }, 10000);
    }
  }
  /**
   * 添加监听的事件
   * @param {Function} listener 监听事件
   */
  this.listen = function(listener) {
    if (!this.currentChannel) {
      console.warn("未选择渠道");
      return this;
    }
    if (typeof listener === "function") {
      this.currentChannel.listenerList.push(listener);
    } else {
      console.error("listener不是一个方法")
    }
    return this;
  }
}

function subscribe(channel, subscribeList) {
  if (status === 0) {
    connect();
  }
  if (subscribeList) {
    let subscribeSet = channelSubscribe[channel];
    if (!subscribeSet) {
      subscribeSet = new Set();
      channelSubscribe[channel] = subscribeSet;
    }
    for (const subscribe of subscribeList) {
      if (!subscribeSet.has(subscribe)) {
        subscribeSet.add(subscribe);
      }
    }
  }
  let sendObj = {
    channel: channel,
    subscribe: subscribeList
  };
  waitForLogin(() => {
    websocket.send(JSON.stringify(sendObj));
  });
}

function unsubscribe(channel, unsubscribeList) {
  if (status === 0) {
    console.warn("websocket未初始化");
    return;
  }
  const subscribeSet = channelSubscribe[channel];
  if (!subscribeSet) {
    console.warn("渠道未订阅");
    return
  }
  let existUnsubscribeList = [];
  for (const unsubscribe of unsubscribeList) {
    if (subscribeSet.has(unsubscribe)) {
      existUnsubscribeList.push(unsubscribe);
      subscribeSet.delete(unsubscribe);
    }
  }
  for (const client of clientList) {
    const clientChannel = client.channelList.find(item => item.channel === channel)
    if (clientChannel) {
      existUnsubscribeList = existUnsubscribeList.filter(unsubscribe => !clientChannel.subscribeSet.has(unsubscribe));
    }
  }
  if (existUnsubscribeList.length > 0) {
    let sendObj = {
      channel: channel,
      unsubscribe: existUnsubscribeList
    };
    waitForLogin(() => {
      websocket.send(JSON.stringify(sendObj));
    });
  }
}

function onMessage(message) {
  if (message === 'LOGIN_SUCCESS') {
    loginStatus = 1;
    return;
  }
  message = JSON.parse(message);
  if (message.errorCode) {
    if (message.errorMsg) {
      console.error("websocket错误：[" + message.errorCode + "] " + message.errorMsg);
    } else {
      console.error("websocket错误：[" + message.errorCode + "]")
    }
    if (message.errorCode === "USER_TOKEN_STATE_ERROR") {
      loginStatus = -1;
    }
  }
  if (message.data) {
    for (const client of clientList) {
      const channel = client.channelList.find(item => item.channel === message.channel);
      if (channel) {
        let data = {};
        if (channel.subscribeSet.has("ALL")) {
          data = message.data;
        } else {
          for (const subscribe of channel.subscribeSet) {
            if (message.data[subscribe]) {
              data[subscribe] = message.data[subscribe];
            }
          }
        }
        if (Object.keys(data).length > 0) {
          for (const listener of channel.listenerList) {
            jsynchronized(() => listener(data), "WS:" + message.channel);
          }
        }
      }
    }
  }
}

function connect() {
  status = 1;
  try {
    websocket = new WebSocket(URL);
  } catch (e) {
    websocket.close();
    setTimeout(() => {
      connect();
    }, 5000);
    return;
  }
  websocket.addEventListener('open', () => {
    websocket.send(JSON.stringify({'token': getToken()}));
    loginStatus = 0;
    status = 2;
  })
  websocket.addEventListener('message', event => {
    onMessage(event.data)
  });
  websocket.addEventListener('close', event => {
    status = 0;
    loginStatus = 0;
    websocket = null;
    if (event.code !== 1000) {
      reconnect();
    }
  })
}

function reconnect() {
  connect();
  waitForLogin(() => {
    for (const channel of Object.keys(channelSubscribe)) {
      subscribe(channel, Array.from(channelSubscribe[channel]));
    }
  });
}

function waitForLogin(func) {
  if (loginStatus === 1) {
    func();
  } else if (loginStatus === 0) {
    setTimeout(() => {
      waitForLogin(func);
    }, 200);
  }
}
