import useCurrentUser from '@/composables/auth/useCurrentUser'

let authorisedRolesForRoute = new Map([
    ['landing', ['All']],
    ['horseList', ['All']],
    ['details',   ['All']],
    ['add-update', ['Manager', 'Admin']]
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