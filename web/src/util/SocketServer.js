import Vue from 'vue'
import store from '../store'
import {
    PUSH_2_MSG_LIST,
    PUSH_BINARY_2_MSG,
    SET_ONLINE_COUNT,
    SET_SERVER_CONNECTED,
    SET_USER_INFO
} from "../store/mutation-types";
import MessageType from "./MessageType";
import MessageFlag from "./MessageFlag";
import MD5Util from "./MD5Util"

export default class SocketServer {
    webSocket;

    constructor() {
        this.initWebSocket();
    }

    /**
     * 初始化WebSocket服务
     */
    initWebSocket() {
        let protocol = 'ws://';
        if (location.protocol === "https:"){
            protocol = 'wss://';
        }
        const local = document.location.hostname + ':8080';
        const url = protocol + (Vue.config.debug ? local : document.location.host) + '/socketServer'
        this.webSocket = new WebSocket(url);
        this.webSocket.onopen = () => {
            store.commit(SET_SERVER_CONNECTED, true);
            console.log("✔WebSocket connected!");
        };
        this.webSocket.onclose = () => {
            store.commit(SET_SERVER_CONNECTED, false);
            console.log("❌WebSocket Reconnecting!");
            this.initWebSocket();
        };
        this.webSocket.onmessage = ev => {
            if (typeof ev.data == 'string') {
                SocketServer.handleTextMessage(JSON.parse(ev.data));
            } else {
                SocketServer.handleBinaryMessage(ev.data);
            }
        };
    }

    /**
     * 处理文字信息
     * @param obj 对象
     */
    static handleTextMessage(obj) {
        switch (obj.type) {
            case MessageType.USER_COUNT:
                store.commit(SET_ONLINE_COUNT, obj.message);
                break;
            case MessageType.SELF_INFO:
                store.commit(SET_USER_INFO, obj.message);
                break;
            case MessageType.MESSAGE:
            case MessageType.USER_ACTIVE:
            case MessageType.BINARY_NOTICE:
                let msgObj = {
                    id: obj.message.sender.id,
                    avatar: obj.message.sender.avatar,
                    hostAddress: obj.message.sender.hostAddress,
                    self: (obj.message.sender.id === store.state.userInfo.id),
                    time: obj.time
                };
                if (obj.type === MessageType.MESSAGE) {
                    msgObj.flag = MessageFlag.MESSAGE;
                    msgObj.content = obj.message.content;
                }
                if (obj.type === MessageType.USER_ACTIVE) {
                    msgObj.flag = MessageFlag.NOTIFICATION;
                    msgObj.content = `
                    ${obj.message.sender.avatar} ${obj.message.sender.hostAddress} ${(obj.message.content ? '已入伙' : '已叛逃')}
                    `;
                }
                if (obj.type === MessageType.BINARY_NOTICE) {
                    msgObj.flag = MessageFlag.BINARY_PIC;
                    msgObj.content = obj.message.content;
                    msgObj.loadDone = false;
                }
                store.commit(PUSH_2_MSG_LIST, msgObj);
                break;
        }
    }


    /**
     * 处理二进制信息
     * @param data 数据
     */
    static handleBinaryMessage(data) {
        let reader = new FileReader();
        reader.onload = event => {
            if (event.target.readyState === FileReader.DONE) {
                MD5Util.calculate(data, result => {
                    store.commit(PUSH_BINARY_2_MSG, {code: result, binary: event.target.result});
                });
            }
        };
        reader.readAsDataURL(data);
    }


    /**
     * 判断webSocket是否处于某个状态
     * @param code WebSocket状态码
     * @returns {boolean}
     */
    isState(code) {
        return (this.webSocket && this.webSocket.readyState === code);
    }
}
