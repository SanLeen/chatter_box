import Vue from 'vue'
import App from './App.vue'
import SocketServer from "./util/SocketServer";
import store from './store'

//关闭vue-dev-tool
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = isDebug_mode;

Vue.config.productionTip = false;
Vue.prototype.$socketServer = new SocketServer();

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
