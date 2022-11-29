import useDB from "@/composables/database/useDB"
import fetchHorseResolver from "@/resolvers/horseDetailsResolver";

export default async function addUpdateResolver(to, from, next )  {
    const { fetchOwners, fetchHorse } = useDB();

    try {
    
        to.meta['owners'] = await fetchOwners()
   
        if (+to.params['id'] !== 0) {
            to.meta['horse'] = await fetchHorse(to.params['id'])
        } 
    
    }
    catch(err) {
        setMessage('Unable to perform this function at present', 'error')      
        next({ name: 'home'})            
    }

    next() 
}