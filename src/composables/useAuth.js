import { ref, reactive, computed } from 'vue'
import useDB from './useDB.js'

const globalDisplayLogin = ref(false)

let currentUser = reactive({
    token: null,
    user: null      
})

export default function useAuth() {   

    const { login: loginAuth } = useDB();  
   
    const displayLogin = computed(()=> globalDisplayLogin.value)  
   
    const setDisplayLogin   = () => globalDisplayLogin.value = true  
    const resetDisplayLogin = () => globalDisplayLogin.value = false

    const setCurrentUserIfPresent = () => {
        let userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
        if (userFromLocalStorage) {
            if (tokenValid(userFromLocalStorage.token)) {
                currentUser.token = userFromLocalStorage.token
                currentUser.user = {...userFromLocalStorage.user}
             } else {
                currentUser.user = null;
                currentUser.token = null
                localStorage.clear();               
            }
        }
    }

    const loggedIn = computed( () => currentUser.token != null )

    const userFirstName = computed(() => currentUser.user.firstName ? currentUser.user.firstName  : '')
   
    const tokenValid = (token) => {
        let base64Url = token.split('.')[1]
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')      
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        let jwtDecoded = JSON.parse(jsonPayload);

        return jwtDecoded.exp > Math.floor(Date.now() / 1000)
    }

    const login = async (userCreds) => {
    
        let loginResult = await loginAuth(userCreds)      
        localStorage.setItem("user", JSON.stringify({...loginResult}));     
        currentUser = { ...loginResult }     
        return "success"
    }

    const logout = () => {
        currentUser.user = null;
        currentUser.token = null
        localStorage.clear();       
    }

    return { setDisplayLogin,
             resetDisplayLogin,
             displayLogin,  
             login, 
             logout,       
             currentUser,   
             userFirstName,          
             loggedIn, 
             setCurrentUserIfPresent  
      
    }
}