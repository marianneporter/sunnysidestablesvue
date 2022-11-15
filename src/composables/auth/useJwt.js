export default function useJwt() {   

    const validateAndDecodeToken = (token) => {

        let jwtDecoded = decodeToken(token)

        if (jwtDecoded.exp > Math.floor(Date.now() / 1000)) {
            return jwtDecoded
        } else {
            return null
        }
    }

    const decodeToken = (token) => {
        let base64Url = token.split('.')[1]
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')      
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        let jwtDecoded = JSON.parse(jsonPayload);
        return jwtDecoded
    }

    return {
        validateAndDecodeToken,
        decodeToken
    }
}