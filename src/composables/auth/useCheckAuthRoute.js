import useCurrentUser from '@/composables/auth/useCurrentUser'

let authorisedRolesForRoute = new Map([
    ['home', ['All']],
    ['horseList', ['All']],
    ['horse-details',   ['All']],
    ['horse-add-update', ['Manager', 'Admin']],
    ['about', ['All']]
]);


export default function useCheckAuthRoute() {

    const { currentUser } = useCurrentUser();

    const authorisedRoute = (route) => {        

        const authorisedRoles = authorisedRolesForRoute.get(route)

        if (authorisedRoles.includes('All')) {
            return true
        }

        const rolesForUser = currentUser.tokenObject.role 

        if (typeof rolesForUser === 'string') {
            return authorisedRoles.includes(rolesForUser)
        }
        else {
            return authorisedRoles.some(r => rolesForUser.includes(r));
        }        
    }   

    return {
        authorisedRoute
    }
}