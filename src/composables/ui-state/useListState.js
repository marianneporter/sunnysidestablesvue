import { ref } from 'vue'

const horses = ref([])
const pageSize = ref(12)
const pageIndex = ref(0)
const listScrollPos = ref(0);
const searchTerm = ref('')

export default function useListState() { 

    const setScrollPos = () =>  {
        listScrollPos.value = window.scrollY      
    }
   
    const scrollToPos = () => {
        window.scrollTo(0, listScrollPos.value)      
        listScrollPos.value = 0
    } 

    const clearListState = () => {
        console.log('in clear list state')
        pageIndex.value = 0
        listScrollPos.value = 0
        horses.value = []
    }
    
    return {
        setScrollPos,
        scrollToPos,
        pageSize,
        pageIndex, 
        searchTerm,
        clearListState,
        horses
    }
}