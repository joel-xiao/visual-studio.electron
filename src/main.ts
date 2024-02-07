import { createApp } from 'vue';
import { invokeNative, setupNative } from '@/service.native';
// import 'amfe-flexible';// 用于设置rem基准值
import '@a/style/index.scss';
import '@a/style/font/iconfont.css';
import App from './App.vue';
// import '@/registerServiceWorker'
import router, { setupRouter } from '@/router/index';
import { setupStore } from '@/store/index';
import native from './plugins/native-ui';
import components from './components/index';
import directives from './directives/index';

const app = createApp(App).use(components).use(directives).use(native);
// router
setupRouter(app);
// store
setupStore(app);
// service.native
setupNative(app);

router.isReady().then(() => {
  app.mount('#app').$nextTick((): void => {
    invokeNative('close_splashscreen');
  });
});
