import store from '../store'
import {PUSH_2_MSG_LIST, SET_ONLINE_COUNT, SET_SERVER_CONNECTED, SET_USER_INFO} from "../store/mutation-types";
import MessageType from "./MessageType";
import MessageFlag from "./MessageFlag";

export default class SocketServer {
    webSocket;

    constructor() {
        this.initWebSocket();
    }

    /**
     * 初始化WebSocket服务
     */
    initWebSocket() {
        this.webSocket = new WebSocket(`ws://${document.location.host}/socketServer`);

        this.webSocket.onopen = () => {
            store.commit(SET_SERVER_CONNECTED, true);
            console.log("✔WebSocket connected!");
        };
        this.webSocket.onclose = () => {
            store.commit(SET_SERVER_CONNECTED, false);
            console.log("❌WebSocket Reconnecting");
            this.initWebSocket();
        };
        this.webSocket.onmessage = ev => {
            let obj = JSON.parse(ev.data);
            switch (obj.type) {
                case MessageType.USER_COUNT:
                    store.commit(SET_ONLINE_COUNT, obj.message);
                    break;
                case MessageType.SELF_INFO:
                    store.commit(SET_USER_INFO, obj.message);
                    break;
                case MessageType.MESSAGE:
                case MessageType.USER_ACTIVE:
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
                        msgObj.content = `${obj.message.sender.avatar}${(obj.message.content ? '已入伙' : '已叛逃')}`;
                    }
                    store.commit(PUSH_2_MSG_LIST, msgObj);
                    break;
            }
        };
    }
}
