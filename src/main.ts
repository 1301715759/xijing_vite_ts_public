import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import router from './router'
import 'virtual:svg-icons-register';
// 解决 浏览器报错[Violation]Added non-passive event listener... 的浏览器警告
// 暂未 发现 哪个组件的 passive 事件问题
import 'default-passive-events'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')