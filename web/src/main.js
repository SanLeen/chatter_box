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
// 挂载SocketServer
Vue.prototype.$socketServer = new SocketServer();
// 引用photo-preview
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

new Vue({
    store,
    render: h => h(App),
    created() {
        new Filter().initialize((key, handle) => Vue.filter(key, handle));
    },
}).$mount('#app');
