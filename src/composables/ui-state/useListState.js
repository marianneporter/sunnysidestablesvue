import { ref } from 'vue'
const pageSize = ref(12)
const pageIndex = ref(0)
const listScrollPos = ref(0);

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
        listScrollPos.value=0
    }

    return {
        setScrollPos,
        scrollToPos,
        pageSize,
        pageIndex, 
        clearListState
    }
}