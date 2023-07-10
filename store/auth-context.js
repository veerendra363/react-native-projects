import { createContest, createContext, useState } from "react"

export const AuthContext = createContext({
  token: "",
  isAuthenticate: false,
  authenticate: () => {},
  logout: () => {},
})

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState()

    function authenticate(token) {
        setAuthToken(token)
    }

    function logout() {
        setAuthToken(null)
    }

    const value = {
        token: authToken,
        isAuthenticate: !!authToken,
        authenticate,
        logout
    }

    return <AuthContext.Provider value={value}>{ children}</AuthContext.Provider>
}

export default AuthContextProvider
