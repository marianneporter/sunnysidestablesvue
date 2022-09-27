import { ref, computed } from 'vue'
import useCurrentUser from './useCurrentUser.js'

const horses = ref([])
const horse = ref({})
const horseCount = ref(0);
const loading = ref(true);   

export default function useDB() {

    const { currentUser } = useCurrentUser();
   
    const baseURL = 'https://localhost:44398/api/' 
   
    const getAuthHeaderValue = () => {
        return  `Bearer ${currentUser.token}`
    }   

    const fetchHorses = async (pageIndex=0, pageSize=12) => {
    
        const response = await fetch(`${baseURL}horses?pageIndex=${pageIndex}&pageSize=${pageSize}`,
                                      { method: 'GET',
                                               headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': getAuthHeaderValue()}} )                                                              
                            .catch(err => {
                                 console.log(err)                               
                            })

        const data = await response.json()   
        horses.value=horses.value.concat(data.horses)

        horseCount.value = data.count;       
        loading.value=false
        // return horses.value   

    }  

    const fetchHorse = async (id) => {
    
        const response = await fetch(`${baseURL}horses/${id}`,
                                      { method: 'GET',
                                               headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': getAuthHeaderValue()}} )                                                              
                            .catch(err => {
                                 console.log(err)                               
                            })

        const data = await response.json()   
        horse.value=data      
    //    return horse.value 
    }     
    
    const login = async (userCreds) => {
        
         const response = await fetch(` ${baseURL}auth/login`, 
                                      { method: 'POST',
                                               headers: {
                                                  'Content-Type'  : 'application/json'                                                                                              
                                               },
                                               body: JSON.stringify(userCreds) })                      
                         .catch(err => {  
                            console.log(err)
                            return 'Login cannot be completed at this time'
                         })

        if (response.status === 200) {
            let data = await response.json()
            return data
        }

        if (response.status === 401) {
            return 'Cannot find this email/password combination'
        }

        return 'Login cannot be completed at this time'       
      
    }   

    return { horses, horseCount, horse, fetchHorses, fetchHorse, loading, login}

}

