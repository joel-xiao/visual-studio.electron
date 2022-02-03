import { createApp } from 'vue'
import '@a/style/index.scss';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import native from './plugins/native-ui';
import components from './plugins/components';

createApp(App).use(components).use(native).use(store).use(router).mount('#app')
  .$nextTick(window.removeLoading)

console.log('fs', window.fs)
console.log('ipcRenderer', window.ipcRenderer)
