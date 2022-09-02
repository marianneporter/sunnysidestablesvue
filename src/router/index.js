import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import ListPage from '../views/horseList/ListPage.vue';
import store from "../store/index.js"

import useAuth from '../composables/useAuth.js'

const routes = [
    {
        path: '/',
        name: 'landing',
        component: LandingPage,
    },
    {
        path: '/list',
        name: 'horseList',
        component: ListPage,
        props: true
    },  
]

const { loggedIn } = useAuth()

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from) => {
   
    if ( to.name === 'landing') {      
        return true;
    }    
  
    if (loggedIn) {   
        return true;
    }
 
    return { name: 'landing' }

  })

export default router
