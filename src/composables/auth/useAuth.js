import { ref,  computed } from 'vue'
import useDB from '../useDB.js'
import useCurrentUser from './useCurrentUser.js'
import useJwt from '@/composables/auth/useJwt.js'

// tells home page if the login slider should be showing or not
const globalDisplayLogin = ref(false)

export default function useAuth() {   

    const { login: loginAuth } = useDB();  
    const { validateAndDecodeToken, decodeToken } = useJwt()

    const { currentUser, setCurrentUser, clearCurrentUser } = useCurrentUser();
   
    const displayLogin = computed(()=> globalDisplayLogin.value)  
   
    const setDisplayLogin   = () => globalDisplayLogin.value = true  
    const resetDisplayLogin = () => globalDisplayLogin.value = false

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

    const login = async (userCreds) => {
   
        let loginResult = await loginAuth(userCreds)   
       
        if (typeof loginResult === 'object') {
            localStorage.setItem("user", JSON.stringify({...loginResult}));     
            let decodedToken = decodeToken(loginResult.token)
            setCurrentUser(loginResult.token, decodedToken, loginResult.user)   
            return "success"
        }
        //login failed - login result is failure message
        return loginResult
    }

    const logout = () => {
        clearCurrentUser()
        localStorage.clear();       
    }

 

    return { setDisplayLogin,
             resetDisplayLogin,
             displayLogin,  
             login, 
             logout,  
             setCurrentUserIfPresent        
    }
}