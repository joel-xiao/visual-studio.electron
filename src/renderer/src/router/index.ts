import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import layout from '@v/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Home',
        component: layout,
        children: [ {
            path: '/dashboard',
            redirect: '/dashboard/main',
            name: 'dashboard',
            component: () => import(/* webpackChunkName: "dashboard" */ '@v/dashboard/index.vue'),
            children: [
                {
                    path: '/main',
                    name: 'main',
                    component: () => import(/* webpackChunkName: "dashboard" */ '@v/dashboard/my-main/index.vue'),
                }
            ]
        } ]
    }
];

const routePathJoinHandler = function (routes:Array<RouteRecordRaw>, parentPath?:string):void {
    routes.forEach(route => {
        if (parentPath) {
            route.path = parentPath + route.path;
        }

        if (Array.isArray(route.children) && route.children.length) {
            routePathJoinHandler(route.children, route.path);
        }
    });
};
routePathJoinHandler(routes);

// history: createWebHistory(process.env.BASE_URL),
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
