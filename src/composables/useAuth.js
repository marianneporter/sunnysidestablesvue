import { ref, computed } from 'vue'

const globalDisplayLogin = ref(false)

export default function useAuth() {
    const baseURL = 'https://localhost:44398/api/horses' 
  
    const loginInfo = ref({})
    const displayLogin = computed(()=> globalDisplayLogin.value)  
   
    const setDisplayLogin   = () => globalDisplayLogin.value = true  
    const resetDisplayLogin = () => globalDisplayLogin.value = false

    const currentUserName = ref('')
    const currentUserToken = ref('')

    const login = async () => {
        console.log('in login function')
        let loginResult = await Promise.resolve({userName: 'Tibbles', token: 'ABC123'})      
        currentUserName.value  = loginResult.userName
        currentUserToken.value = loginResult.token       
        return "success"
    }

    return { setDisplayLogin,
             resetDisplayLogin,
             displayLogin,  
             login,        
             loginInfo,
             currentUserName,
             currentUserToken
    }

}

