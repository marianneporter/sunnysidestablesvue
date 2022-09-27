import useDB from "@/composables/useDB"

export default async function fetchHorsesResolver(to, from, next )  {
    const { fetchHorses, horseCount, horses } = useDB();
  
    if (horses.value.length===0) {
        await fetchHorses()  
    } 
    next() 
}