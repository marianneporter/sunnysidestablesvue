import { ref } from 'vue'
const listScrollPos = ref(0);

export default function useListState() { 

    const setScrollPos = () =>  {
        listScrollPos.value = window.scrollY      
    }
   
    const scrollToPos = () => {
        window.scrollTo(0, listScrollPos.value)      
        listScrollPos.value = 0
    } 

    return {
        setScrollPos,
        scrollToPos
    }
}