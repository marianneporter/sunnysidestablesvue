import { ref } from 'vue'

export default function useDB() {
    const baseURL = 'https://localhost:44398/api/horses' 
    const horses = ref([])
    const loading = ref(true);

    async function fetchHorses() {
       
        horses.value = await fetch(baseURL)
                            .then(response => response.json()) 
                            .catch(err => console.log(err))
                            .then((data) => {
                                 horses.value = data.horses
                                 loading.value=false                              
                               
                            })
    }

    return { horses, fetchHorses, loading}

}

