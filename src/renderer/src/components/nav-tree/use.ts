
import Index from './index.vue';


export default {
    install (app:any):void {
        app.component('NavTree', Index);
    }
};