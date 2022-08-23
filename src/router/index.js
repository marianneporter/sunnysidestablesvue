import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import ListPage from '../views/horseList/ListPage.vue';
import store from "../store/index.js"


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

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})



export default router
