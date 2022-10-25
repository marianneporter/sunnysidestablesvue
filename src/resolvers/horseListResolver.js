import useDB from "@/composables/useDB"
import useListState from "@/composables/ui-state/useListState";

export default async function horseListResolver(to, from, next )  {
    const { fetchHorses, horseCount } = useDB();   
    const { horses } = useListState()

    if (horses.value.length===0) {
        await fetchHorses()  
    } 
    next() 
}