import { ref, computed } from 'vue'

const horses = ref([])
const pageSize = ref(12)
const pageIndex = ref(0)
const listScrollPos = ref(0);
const searchTerm = ref('');
const horseCount = ref(0);



export default function useListState() { 
   
    const setScrollPos = () =>  {
        listScrollPos.value = window.scrollY   
        console.log('in set scroll pos listScrollPos = ' + listScrollPos.value)   
    }
   
    const scrollToPos = () => {
        window.scrollTo(0, listScrollPos.value)     
        console.log('in in scrollToPos listScrollPos = ' + listScrollPos.value)  
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

    const horsesInCurrentList = () => horses.value.length
    

    const addDbHorsesToList = (dataFromDb) => {

        horseCount.value = dataFromDb.count;
        horses.value=horses.value.concat(dataFromDb.horses)
        console.log('*********in addDbHorsesToList')
        console.log('horseCount is ' + horseCount.value)
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
        horseCount      
    }
}