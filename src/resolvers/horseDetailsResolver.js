import useDB from "@/composables/useDB"
import useMessageForNextPage from "@/composables/ui-state/useMessageForNextPage";

export default async function horseDetailsResolver(to, from, next )  {
    const { fetchHorse } = useDB() 
    const { setMessage } = useMessageForNextPage()  

    try {
       
        let res =  await fetchHorse(+to.params['id'])   

        if ( typeof res == 'object') {
            to.meta['horse'] = res
            next() 
        } else {
            setMessage(res, 'error')      
            next({ name: 'home'}) 
        }    
    }
    catch(err) {
        setMessage('Unable to perform this function at present', 'error')      
        next({ name: 'home'})         
    }

}