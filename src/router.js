import {createRouter,createWebHistory} from 'vue-router'

import Dcheros from './pages/Dcheros.vue'
import calendar from './pages/calendar.vue'
import HelloWorld from './pages/HelloWorld.vue'
import Markdown from './pages/Markdown.vue'
import slider from './pages/slider.vue'

const routes = [
    { path:"/", component: HelloWorld},
    { path:"/calendar", component: calendar},
    { path:"/dc-heros", component: Dcheros},
    { path:"/markdown", component: Markdown},
    { path:"/slider", component: slider},

]
const router = createRouter({
    

    history: createWebHistory(),

  

    routes, // short for `routes: routes`
  })


export default router;