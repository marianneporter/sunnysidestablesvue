<template> 
    <header>
        <div v-if="displayNav">
            <Nav />
        </div>   
    </header>

    <main>
         <router-view ></router-view>
    </main>  

</template>

<script setup>
    import { computed  } from 'vue'  
    import { useRoute } from 'vue-router'
    import Nav from './components/Nav.vue'
    import useAuth  from '@/composables/useAuth.js'

    const { setCurrentUserIfPresent } = useAuth();

    setCurrentUserIfPresent();

    const route = useRoute()
    const displayNav = computed(()=> route.fullPath !== '/') 

   



</script>

<style lang="scss">

   @import "@/assets/global.scss";

</style>
