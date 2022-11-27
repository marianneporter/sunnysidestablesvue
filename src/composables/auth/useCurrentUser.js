import { reactive, ref, computed, watch } from 'vue'
import useJwt from '@/composables/auth/useJwt.js'

let currentUser = reactive({    
    token: null,
    tokenObject: null,
    user: null      
})

let loggedIn = ref(false)

export default function useCurrentUser() {

    const { validateAndDecodeToken } = useJwt()
    
    const setCurrentUserIfPresent = () => {
        let userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
        if (userFromLocalStorage) {
            const validDecodedToken = validateAndDecodeToken(userFromLocalStorage.token)
            if (validDecodedToken) {
                setCurrentUser(userFromLocalStorage.token,
                               validDecodedToken,
                               userFromLocalStorage.user  )
             } else {
                clearCurrentUser()
                localStorage.clear();               
            }
        }
    }

    const setCurrentUser = (token, tokenObject, user) => {        
        currentUser.token = token
        currentUser.tokenObject = {...tokenObject}
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
        setCurrentUserIfPresent,  
        setCurrentUser,
        clearCurrentUser,
        userFirstName,
        loggedIn  
    }
}