export const api = "https://react-bike-rental-be.herokuapp.com/api"
// const api = "http://localhost:8000/api"
export const user_api = `${api}/users`
export const rental_api = `${api}/rentals`
export const bike_api = `${api}/bikes`
export const getBearerToken = ()=>{
    const token = localStorage.getItem('authorization')
    if(token)
        return "Bearer " +token
    return
}
export const setBearerToken = (token)=>{
    return localStorage.setItem('authorization',token)
}
export const removeBearerToken = (token)=>{
    return localStorage.removeItem('authorization')
}


