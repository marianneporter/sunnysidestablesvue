import { reactive, ref, computed, watch } from 'vue'

let currentUser = reactive({    
    token: null,
    user: null      
})

let loggedIn = ref(false)


export default function useCurrentUser() {

    const setCurrentUser = (token, user) => {        
        currentUser.token = token
        currentUser.user = {...user}
    }

    const clearCurrentUser = () => {
        currentUser.token = null
        currentUser.user = null
    }

    
    watch(currentUser, (currentStatus, oldStatus) => {
        currentUser.token ? loggedIn.value = true : loggedIn.value = false
    })

    const userFirstName = computed(() => currentUser.user ? currentUser.user.firstName  : '')

    return {
        currentUser,
        setCurrentUser,
        clearCurrentUser,
        userFirstName,
        loggedIn
    }
}