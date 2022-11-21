<template> 
    <header>
        <div v-if="displayNav">
            <Nav />
        </div>   
    </header>

    <main>
        <router-view v-slot="{ Component }">
            <transition name="route" mode="out-in">
                <component :is="Component"></component>
            </transition>
        </router-view>
    </main>  

</template>

<script setup>
    import { computed, watchEffect  } from 'vue'  
    import { useRoute } from 'vue-router'
    import { createToaster } from '@meforma/vue-toaster';
    import useAuth  from '@/composables/auth/useAuth.js'
    import useMessageForNextPage from '@/composables/ui-state/useMessageForNextPage.js'
    import Nav from '@/components/Nav.vue'

    document.title = "Sunnyside Stables Vue Demo"

    const { setCurrentUserIfPresent } = useAuth();

    const { statusMessage, clearStatusMessage } = useMessageForNextPage()  
    
     const toaster = createToaster({ position: 'top' });

    setCurrentUserIfPresent();

    const route = useRoute()
    const displayNav = computed(()=> route.fullPath !== '/') 

    // display status message if necessary
    watchEffect(() => {   
    
        if (statusMessage.content == null) {
            return
        }  
        toaster.show(statusMessage.content,
                    {type: statusMessage.type})                     
        clearStatusMessage()                           
    } )

</script>

<style lang="scss">

   @import "@/assets/scss/global.scss";

   /* route transition classes */
   .route-enter-from { opacity: 0; }
   .route-enter-active, .route-leave-active { transition: all 0.6s ease-in }
   .route-leave-to { opacity: 0; } 

</style> 