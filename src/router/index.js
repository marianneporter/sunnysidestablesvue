import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import ListPage from '../views/horses/ListPage.vue';
import Details from '../views/horses/Details.vue'
import store from "../store/index.js"

import useCurrentUser from '../composables/useCurrentUser.js'

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
    {
        path: '/horses/:id',     
        name: 'details',
        component: Details,
        props: true
    },  

]

const { loggedIn } = useCurrentUser()

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from) => {
   
    if ( to.name === 'landing') {      
        return true;
    }    
  
    if (loggedIn.value) {   
        return true;
    }
 
    return { name: 'landing' }

  })

export default router
