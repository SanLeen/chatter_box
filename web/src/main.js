import Vue from 'vue'
import App from './App.vue'
import SocketServer from "./util/SocketServer";
import store from './store'

Vue.config.productionTip = false;
Vue.prototype.$socketServer = new SocketServer();

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
