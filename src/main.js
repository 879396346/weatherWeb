import Vue from "vue";
import App from "./App.vue";
import router from './router'
import store from './store'
import {loading,borderBox13,digitalFlop,capsuleChart,borderBox8} from '@jiaminghi/data-view'
import { Radio,Button,RadioGroup } from 'element-ui'
import Echart from './components/echart/index.vue'
import Weather from './components/weather/index.vue'
import ItemWrap from './components/item-wrap/item-wrap.vue'
import Message from './components/message/message.vue'
import Reacquire from './components/reacquire/reacquire.vue'
import Messages from './components/message/message'
import "vue-easytable/libs/theme-default/index.css";
import  '@/assets/css/public.scss'
import "@/assets/css/index.scss"
import WebSocketPlugin from './utils/websocket';
import { Loading } from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

import * as filters from '@/directives/filters'

require('./mock/mock')//是否使用mock
Vue.config.productionTip = false;
Vue.prototype.$axios = axios
// 自定义组件
Vue.component("Echart",Echart)
Vue.component("ItemWrap",ItemWrap)
Vue.component("Message",Message)
Vue.component("Reacquire",Reacquire)
Vue.component("Weather",Weather)
Vue.prototype.$Message =  Messages
// element组件
Vue.use(Radio);
Vue.use(Button);
Vue.use(RadioGroup)

// datav组件
Vue.use(loading)
Vue.use(borderBox13)
Vue.use(borderBox8)
Vue.use(digitalFlop)
Vue.use(capsuleChart)
Vue.use(WebSocketPlugin, {
  // 可以在这里传递WebSocket插件需要的选项
});
Vue.use(Loading.directive);
Vue.use(ElementUI);
// 全局数据过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
new Vue({
  router,
  store,
  render: h => h(App),
  // websocket: {
  //   onMessage(event) {
  //     // 处理消息
  //   },
  //   onOpen(event) {
  //     // WebSocket连接打开时的处理
  //   },
  //   onClose(event) {
  //     // WebSocket连接关闭时的处理
  //   },
  //   onError(event) {
  //     // 出现错误时的处理
  //   }
  // },
}).$mount("#app");
