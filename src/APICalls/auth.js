import {API} from '../backend'

export const Signup = user => {
    return fetch(`${API}/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const Login = user => {
    return fetch(`${API}/signin`,{
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getAuthUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
         method: "GET",
            headers: {
                Authorization:`Bearer ${token}`
            }
        })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
}

export const findUser = (userId) => {
    return fetch(`${API}/find/user/${userId}`,{
        method:"GET"
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        window.sessionStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}

export const signout = next => {
    if(typeof window !== "undefined" ){
        localStorage.removeItem("jwt")
        next();

        return fetch(`${API}/signout`, {
            method:"GET"
        })
        .then(response => console.log("SignOut Success"))
        .catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false;
    }
    if(window.sessionStorage.getItem("jwt")){
        return JSON.parse(window.sessionStorage.getItem("jwt"))
    }else{
        return false;
    }
}