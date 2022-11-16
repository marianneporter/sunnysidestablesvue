import useCurrentUser from '@/composables/auth/useCurrentUser.js'
import useListState from '@/composables/ui-state/useListState.js'

export default function useDB() {

    const { currentUser } = useCurrentUser()

    const { clearListState,           
            searchTerm,
            updateListState,
            pageIndex,
            pageSize  } = useListState()    
   
    const baseURL = process.env.VUE_APP_API_BASE_URL 
    
    const getAuthHeaderValue = () => {
        return  `Bearer ${currentUser.token}`
    }   

    const fetchHorses = async () => {

        let url = `${baseURL}horses?pageIndex=${pageIndex.value}&pageSize=${pageSize.value}`

        if (searchTerm.value !== '') {
            url = url += `&search=${searchTerm.value}`
        } 
 
        const response = await fetch(url,
                                      { method: 'GET',
                                               headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': getAuthHeaderValue()}} )                                                              
                            .catch(err => {
                            
                                 console.log(err)                               
                            })        
        
        return response.json()           
          
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
      
        return await response.json()        
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
            let updatedHorse =  await fetchHorse(id)  
            updateListState(updatedHorse)     
            return data
        }  

        return null
    }

    
    const login = async (userCreds) => {
        
         const response = await fetch(`${baseURL}auth/login`, 
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

    return { 
             fetchHorses, fetchHorse, addHorse,
             updateHorse, fetchOwners,
             login}

}