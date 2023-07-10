import axios from "axios"

const API_KEY = "AIzaSyAcaIFyte3_zvU1pxPHsIv8cTiwUGE0F_4"

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
  const postData = { email, password, returnSecureToken: true }
    const response = await axios.post(url, postData)
    const token = response.data.idToken
    return token
}

export function createUser(email, password) {
    const token =  authenticate("signUp", email, password)
    return token
}

export function login(email, password) {
    const token = authenticate("signInWithPassword", email, password)
    return token
}
