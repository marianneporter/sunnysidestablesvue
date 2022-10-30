import useDB from "@/composables/useDB"

export default async function horseDetailsResolver(to, from, next )  {
    const { fetchHorse } = useDB();   
    to.meta['horse'] = await fetchHorse(+to.params['id'])   
    next() 
}