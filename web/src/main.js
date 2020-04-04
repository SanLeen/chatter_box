import Vue from 'vue'
import App from './App.vue'
import SocketServer from "./util/SocketServer";
import Filter from "./configs/filter";
import store from './store'

//关闭vue-dev-tool
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = isDebug_mode;

Vue.prototype.$socketServer = new SocketServer();

new Vue({
    store,
    render: h => h(App),
    created() {
        new Filter().initialize((key, handle) => Vue.filter(key, handle));
    },
}).$mount('#app');
