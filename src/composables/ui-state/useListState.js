import { ref, computed } from 'vue'


const horses = ref([])
const pageSize = ref(6)
const pageIndex = ref(0)
const listScrollPos = ref(0)
const searchTerm = ref('')
const horseCount = ref(0)
const searchCount = ref(0)
const savedListState = ref({
    horses: [],
    listScrollPos: 0,
    pageIndex: 0,
    horseCount: 0,
    searchCount: 0
})

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

    const addDbHorsesToList = (dataFromDb) => {        
        horseCount.value = dataFromDb.countAll
        searchCount.value = dataFromDb.searchCount
        horses.value=horses.value.concat(dataFromDb.horses)        
    }

    const searchMode = computed(() => searchCount.value !== horseCount.value )
    
    return {
        setScrollPos,
        scrollToPos,
        pageSize,
        pageIndex, 
        searchTerm,
        clearListState,
        updateListState,
        addDbHorsesToList,
        horses,
        horseCount, 
        searchCount,
        searchMode     
    }
}