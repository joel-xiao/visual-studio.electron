import { createApp } from 'vue';
// import 'amfe-flexible';// 用于设置rem基准值
import '@a/style/index.scss';
import App from './App.vue';
// import '@/registerServiceWorker'
import router, { setupRouter } from '@/router';
import { setupStore } from '@/store';
import native from './plugins/native-ui';
import components from './plugins/components';

const app = createApp(App).use(components).use(native);
// router
setupRouter(app);
// store
setupStore(app);

router.isReady().then(() => {
  app.mount('#app').$nextTick(window.removeLoading);
});

console.log('fs', window.fs);
console.log('ipcRenderer', window.ipcRenderer);
