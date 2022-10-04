import useDB from "@/composables/useDB"

export default async function fetchOwnersResolver(to, from, next )  {
    const { fetchOwners } = useDB();
    to.meta['owners'] = await fetchOwners(to.params['id'])
    next() 
}