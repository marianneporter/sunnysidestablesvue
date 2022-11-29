<template> 
    <header>
        <div v-if="displayNav">
            <Nav />
        </div>   
    </header>

    <main>
        <router-view />
    </main>  

</template>

<script setup>
    import { computed, watchEffect  } from 'vue'  
    import { useRoute } from 'vue-router'
    import { createToaster } from '@meforma/vue-toaster';
    import useCurrentUser  from '@/composables/auth/useCurrentUser.js'
    import useMessageForNextPage from '@/composables/ui-state/useMessageForNextPage.js'
    import Nav from '@/components/Nav.vue'

    document.title = "Sunnyside Stables Vue Demo"

    const { setCurrentUserIfPresent } = useCurrentUser();

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

</style> 