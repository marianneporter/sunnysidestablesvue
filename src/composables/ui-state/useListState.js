import { ref, computed } from 'vue'

const horses = ref([])
const pageSize = ref(6)
const pageIndex = ref(0)
const listScrollPos = ref(0)
const searchTerm = ref('')
const horseCount = ref(0)
const searchCount = ref(0)



export default function useListState() { 
   
    const setScrollPos = () =>  {
        listScrollPos.value = window.scrollY           
    }
   
    const scrollToPos = () => {
        window.scrollTo(0, listScrollPos.value)     
        listScrollPos.value = 0
    } 

    const clearListState = () => {
        pageIndex.value = 0
        listScrollPos.value = 0
        horses.value = []
    }

    const updateListState =  (updatedHorse) => {   
        const listIndex = horses.value.findIndex((h) => h.id === updatedHorse.id)        
        horses.value[listIndex] = updatedHorse         
    }

    const horsesInCurrentList = computed(() => horses.value.length)    

    const addDbHorsesToList = (dataFromDb) => {

        console.log('horses from db = ' + dataFromDb.horses)

        console.log('in addDBHorsesToList')
        console.log('current horse array before horses added ' + JSON.stringify(horses.value))

        horseCount.value = dataFromDb.countAll
        searchCount.value = dataFromDb.searchCount
        horses.value=horses.value.concat(dataFromDb.horses)   

        console.log('current horse array after horses added ' + JSON.stringify(horses.value))
         
    }
    
    return {
        setScrollPos,
        scrollToPos,
        pageSize,
        pageIndex, 
        searchTerm,
        clearListState,
        updateListState,
        addDbHorsesToList,
        horsesInCurrentList,
        horses,
        horseCount, 
        searchCount     
    }
}