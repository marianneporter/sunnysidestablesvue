import useDB from "@/composables/useDB"

export default async function fetchHorseResolver(to, from, next )  {
    const { fetchHorse } = useDB();
    await fetchHorse(to.params['id'])
    next() 
}