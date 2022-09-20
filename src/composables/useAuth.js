import { ref, reactive, computed } from 'vue'
import useDB from './useDB.js'
import useCurrentUser from './useCurrentUser.js'

const globalDisplayLogin = ref(false)

export default function useAuth() {   

    const { login: loginAuth } = useDB();  

    const { currentUser, setCurrentUser, clearCurrentUser } = useCurrentUser();
   
    const displayLogin = computed(()=> globalDisplayLogin.value)  
   
    const setDisplayLogin   = () => globalDisplayLogin.value = true  
    const resetDisplayLogin = () => globalDisplayLogin.value = false

    const setCurrentUserIfPresent = () => {
        let userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
        if (userFromLocalStorage) {
            if (tokenValid(userFromLocalStorage.token)) {
                setCurrentUser(userFromLocalStorage.token,
                               userFromLocalStorage.user  )
             } else {
                clearCurrentUser()
                localStorage.clear();               
            }
        }
    }

   
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
        
        console.log('in composable loginResult is ' + loginResult)

        if (typeof loginResult === 'object') {
            localStorage.setItem("user", JSON.stringify({...loginResult}));     
        
            setCurrentUser(loginResult.token, loginResult.user)   
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
      //      loggedIn, 
             setCurrentUserIfPresent        
    }
}