import useDB from "@/composables/useDB"

export default async function horseDetailsResolver(to, from, next )  {
    const { fetchHorse } = useDB();
    await fetchHorse(to.params['id'])
    next() 
}