import useDB from "@/composables/database/useDB"
import useMessageForNextPage from "@/composables/ui-state/useMessageForNextPage";

export default async function addUpdateResolver(to, from, next )  {
    const { fetchOwners, fetchHorse } = useDB();
    const { setMessage } = useMessageForNextPage()

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