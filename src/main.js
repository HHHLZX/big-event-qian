import './assets/main.scss'

import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import locale from 'element-plus/dist/locale/zh-cn.js'
import 'element-plus/dist/index.css'
import router from '@/router'
import {createPinia} from "pinia"
//导入持久化插件
import {createPersistedState} from 'pinia-persistedstate-plugin'
import "echarts"
import ECharts from "vue-echarts";

import App from './App.vue'

const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState()
app.component('ECharts', ECharts)
app.use(pinia)
//pinia使用持久化插件
pinia.use(persist)
app.use(router)
app.use(ElementPlus, {locale})
app.use(ElementPlus);
app.mount('#app')
