import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ListPage from '../views/horses/ListPage.vue';
import Details from '../views/horses/Details.vue'
import AddUpdate from '@/views/horses/AddUpdate.vue'
import About from '@/views/About.vue'

import horseDetailsResolver from '@/resolvers/horseDetailsResolver.js'
import addUpdateResolver from '@/resolvers/addUpdateResolver.js'

import useCurrentUser from '../composables/auth/useCurrentUser.js'
import useCheckAuthRoute from '@/composables/auth/useCheckAuthRoute.js'
import useMessageForNextPage from '@/composables/ui-state/useMessageForNextPage.js'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/list',
        name: 'horseList',
        component: ListPage,
        props: true,
        meta: {
            scrollTop: 0
        }                     
    },  
    {
        path: '/horses/:id',     
        name: 'details',
        component: Details,
        props: true,
        beforeEnter: horseDetailsResolver
    }, 
    {
        path: '/horses/add-update/:id',     
        name: 'add-update',
        component: AddUpdate,
        props: true,
        beforeEnter: addUpdateResolver,    
    },     
    {
        path: '/about',     
        name: 'about',
        component: About  
    },    
]

const { loggedIn } = useCurrentUser()

const { authorisedRoute } = useCheckAuthRoute()

const { setMessage } = useMessageForNextPage()

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes  
})

router.beforeEach(async (to, from) => {

    if ( to.name === 'home') {      
        return true;
    }    
  
    if (loggedIn.value) {   

        if (authorisedRoute(to.name)) 
            return true
     
            //logged in but does not have sufficient access level    
            setMessage('Sorry - access is not allowed', 'error')   
            return { name: from.name}
       
    }

    return { name: 'home' }

  })

export default router
