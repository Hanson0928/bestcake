import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routers= new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/components/home'], resolve),
      redirect:'/index',
      children:[
        {
          path:"index",
          name: 'index',
          meta:{
            keepAlive:true
          },
          //keepAlive true 禁止重复加载  false不禁止
          component: resolve => require(['@/components/main/index'], resolve)
        },
        {
          path:'goods',
          name:'goods',
          component:resolve => require(['@/components/main/goods'], resolve),
        },
        {
          path:'show',
          name:'show',
          component:resolve => require(['@/components/main/show'], resolve),
        },
        {
          path:'carts',
          name:'carts',
          component:resolve => require(['@/components/main/carts'], resolve)
        },
        {
          path:'user',
          name:'user',
          component:resolve => require(['@/components/main/user'], resolve),
        },
        {
          path:'login',
          name:'login',
          component:resolve => require(['@/components/main/login'], resolve)
        },
        {
          path:'register',
          name:'register',
          component:resolve => require(['@/components/main/register'], resolve)
        },
      ]
    },
    
  ]
})

// routers.beforeEach((to, from, next) => {
//   if (to.path == "/") {
//     if (location.search.indexOf("shouye") != -1) {
//       next({
//         path: '/shouye'
//       })
//     } else if (location.search.indexOf("goods") != -1) {
//       next({
//         path: '/goods'
//       })
//     } else if (location.search.indexOf("show") != -1) {
//       next({
//         path: '/show'
//       })
//     } else {
//       next()
//     }
//   } else {
//     next();
//   }
// })
export default routers
