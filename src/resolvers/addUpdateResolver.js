import useDB from "@/composables/useDB"
import fetchHorseResolver from "@/resolvers/horseDetailsResolver";

export default async function addUpdateResolver(to, from, next )  {
    const { fetchOwners, fetchHorse } = useDB();
    to.meta['owners'] = await fetchOwners()
   
    if (+to.params['id'] !== 0) {
        await fetchHorse(to.params['id'])
    } 
    next() 
}