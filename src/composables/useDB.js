import { ref } from 'vue'

export default function useDB() {
    const baseURL = 'https://localhost:44398/api/horses' 
    const horses = ref([])
    const loading = ref(true);

    const fetchHorses = async () => {

            const response = await fetch(baseURL + `?pageIndex=0&pageSize=30`)                      
                              .catch(err => console.log(err))
            const data = await response.json()
            horses.value = data.horses;       
            loading.value=false
            return horses.value
      
    }  
   
    return { horses, fetchHorses, loading}

}

