import { ref, computed } from 'vue'
import useCurrentUser from './useCurrentUser.js'

export default function useDB() {

    const { currentUser } = useCurrentUser();
   
    const baseURL = 'https://localhost:44398/api/' 
    const horses = ref([])
    const loading = ref(true);   
  
    const getAuthHeaderValue = () => {
        return  `Bearer ${currentUser.token}`
    }   

    const fetchHorses = async () => {
        console.log('in fetchHorses')
        console.log('in fetchHorses token is ' + currentUser.token)
        const response = await fetch(baseURL + `horses?pageIndex=0&pageSize=30`,
                                      { method: 'GET',
                                               headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': getAuthHeaderValue()}} )                                                              
                            .catch(err => {
                                 console.log(err)                               
                            })

        const data = await response.json()
        horses.value = data.horses;       
        loading.value=false
        return horses.value   

    }  
   
    
    const login = async (userCreds) => {
        
         const response = await fetch(` ${baseURL}auth/login`, 
                                      { method: 'POST',
                                               headers: {
                                                  'Content-Type'  : 'application/json'                                                                                              
                                               },
                                               body: JSON.stringify(userCreds) })                      
                         .catch(err => {
                            console.log('in catch')
                            console.log(err)
                            return 'Login cannot be completed at this time'

                         })

         const data = await response.json()     
         console.log('data from login in useDB ' + JSON.stringify(data))
         console.log('data.status = ' + data.status)

         if (data.status === 200) {
             return data
         } else if (data.status === 401) {
             return 'Cannot find this email/password combination'
         }
         return 'Login cannot be completed at this time'
    }   

    return { horses, fetchHorses, loading, login}

}

