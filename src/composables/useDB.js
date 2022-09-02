import { ref } from 'vue'

export default function useDB() {
    const baseURL = 'https://localhost:44398/api/' 
    const horses = ref([])
    const loading = ref(true);

    const fetchHorses = async () => {

            const response = await fetch(baseURL + `horses?pageIndex=0&pageSize=30`)                      
                              .catch(err => console.log(err))
            const data = await response.json()
            horses.value = data.horses;       
            loading.value=false
            return horses.value   

    }  
   
    
    const login = async (userCreds) => {
        
         const response = await fetch(` ${baseURL}auth/login`, 
                                      { method: 'POST',
                                               headers: {
                                                  'Content-Type': 'application/json',
                                               },
                                               body: JSON.stringify(userCreds) })                      
                         .catch(err => console.log(err))
         const data = await response.json()     
         return data
    }  

    return { horses, fetchHorses, loading, login}

}

