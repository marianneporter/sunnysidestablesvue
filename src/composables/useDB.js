import { ref, computed } from 'vue'
import useCurrentUser from '@/composables/useCurrentUser.js'
import useListState from '@/composables/ui-state/useListState.js'

const horse = ref({})
const horseCount = ref(0);
const loading = ref(true);   

export default function useDB() {



    const { currentUser } = useCurrentUser()

    const { clearListState, horses, searchTerm } = useListState()    
   
    const baseURL = 'https://localhost:44398/api/' 
   
    const getAuthHeaderValue = () => {
        return  `Bearer ${currentUser.token}`
    }   

    const fetchHorses = async (pageIndex=0, pageSize=12 ) => {

        let url = `${baseURL}horses?pageIndex=${pageIndex}&pageSize=${pageSize}`

        if (searchTerm.value !== '') {
            url = url += `&search=${searchTerm.value}`
        }
 
        console.log(url)
        const response = await fetch(url,
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
 
    }  

    const fetchOwners = async () => {
    
        const response = await fetch(`${baseURL}owners`,
                                      { method: 'GET',
                                               headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': getAuthHeaderValue()}} )                                                              
                            .catch(err => {                            
                                 console.log(err)                               
                            })


        return await response.json()      
 
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
    }    

    const addHorse = async (horseFormData) => {

        const response = await fetch(` ${baseURL}horses`, 
        { method: 'POST', 
                headers: { 'Authorization': getAuthHeaderValue() },     
                body: horseFormData })                      
            .catch(err => {  
                console.log(err)
                return
            })



        if (response.status === 201) {
            let data = await response.json()    
            horses.value=[] 
            console.log('clear list state in add horse fired')
            clearListState()
            return data
        }  

        return null
    }
 
    const updateHorse = async (horseFormData) => {
  
        let id = horseFormData.get('id')
        let name = horseFormData.get('name')

        const response = await fetch(`${baseURL}horses`, 
        { method: 'PATCH', 
                headers: { 'Authorization': getAuthHeaderValue() },     
                body: horseFormData })                      
            .catch(err => {  
                console.log(err)       
                return
            })
        
        if (response.status === 200) {
            let data = await response.json()             
            horses.value=[]             
            return data
        }  

        return null
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

    return { horseCount, horse,
             fetchHorses, fetchHorse, addHorse,
             updateHorse, fetchOwners,
             loading, login}

}