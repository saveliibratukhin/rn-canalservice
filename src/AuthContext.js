import { useContext } from "react"
import React from "react"

export const AuthContext = React.createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)

    return context
}