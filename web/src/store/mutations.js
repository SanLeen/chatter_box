import * as types from './mutation-types'

const mutations = {
    [types.SET_USER_INFO](state, data) {
        state.userInfo.id = data.id;
        state.userInfo.avatar = data.avatar;
        state.userInfo.hostAddress = data.hostAddress;
        state.userInfo.hostName = data.hostName;
    },
    [types.SET_ONLINE_COUNT](state, data) {
        state.onlineCount = data
    },
    [types.PUSH_2_MSG_LIST](state, data) {
        state.msgList.push(data);
    },
    [types.SET_SERVER_CONNECTED](state, data) {
        state.serverConnected = data
    },
    [types.PUSH_BINARY_2_MSG](state, data) {
        let listLength = state.msgList.length;
        for (let i = listLength - 1; i >= 0; i--) {
            if (state.msgList[i].content === data.code) {
                state.msgList[i].binary = data.binary;
                state.msgList[i].loadDone = true;
                break;
            }
        }
    },
};
export default mutations
