import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import layout from '@v/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: layout,
    children: [{
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
    }]
  },
  {
    path: '/xiao',
    name: 'Xiao',
    component: () => import(/* webpackChunkName: "xiao" */ '@v/xiao/index.vue')
  }
]

const routePathJoinHandler = function(routes:Array<RouteRecordRaw>,parentPath?:String):void{
  routes.forEach(route => {
    if(parentPath) {
      route.path = parentPath + route.path;
    }
    if(Array.isArray(route.children) && route.children.length){
      routePathJoinHandler(route.children, route.path);
    }
  })
}
routePathJoinHandler(routes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
