import { ref, reactive, computed } from 'vue'
import useDB from './useDB.js'

const globalDisplayLogin = ref(false)

export default function useAuth() {   

    const { login: loginAuth } = useDB();
  
   
    const displayLogin = computed(()=> globalDisplayLogin.value)  
   
    const setDisplayLogin   = () => globalDisplayLogin.value = true  
    const resetDisplayLogin = () => globalDisplayLogin.value = false


    const currentUser = computed ( () => {
        let user = JSON.parse(localStorage.getItem('user'))
    })

    const userName = computed( () => user.name)
    const token = computed( () => user.token) 
   

    const login = async (userCreds) => {
        console.log('in login function')  
        let loginResult = await loginAuth(userCreds)      
        localStorage.setItem("user", JSON.stringify({...loginResult}));
     
        return "success"
    }

    return { setDisplayLogin,
             resetDisplayLogin,
             displayLogin,  
             login,        
             currentUser,
             userName,
             token          
    }

}

