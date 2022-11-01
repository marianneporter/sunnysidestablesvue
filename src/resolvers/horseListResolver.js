import useDB from "@/composables/useDB"
import useListState from "@/composables/ui-state/useListState";

export default async function horseListResolver(to, from, next )  {
    const { fetchHorses} = useDB();   
    const { horsesInCurrentList } = useListState()    

    if (horsesInCurrentList() === 0) {
   
        await fetchHorses()  
    } 

    next() 
}