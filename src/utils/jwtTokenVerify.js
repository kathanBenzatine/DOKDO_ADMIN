import { jwtDecode } from 'jwt-decode'

export const jwtTokenVerify = (user) => {
    const decodedToken = jwtDecode(user?.token)
    const expirationTime = decodedToken?.exp
    const currentTime = Math.floor(Date.now() / 1000)
    if (expirationTime < currentTime) {
        return true
    } else {
        return false
    }
}
