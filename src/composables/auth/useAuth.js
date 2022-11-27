import { ref,  computed } from 'vue'
import useDB from '../database/useDB.js'
import useCurrentUser from './useCurrentUser.js'
import useJwt from '@/composables/auth/useJwt.js'

// tells home page if the login slider should be showing or not
const globalDisplayLogin = ref(false)

export default function useAuth() {   

    const { login: loginAuth } = useDB();  
    const { decodeToken } = useJwt()

    const { setCurrentUser, clearCurrentUser } = useCurrentUser();
   
    const displayLogin = computed(()=> globalDisplayLogin.value)  
   
    const setDisplayLogin   = () => globalDisplayLogin.value = true  
    const resetDisplayLogin = () => globalDisplayLogin.value = false

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
             logout  
                  
    }
}