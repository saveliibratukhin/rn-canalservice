import { useContext } from "react"
import React from "react"

export const DeviceContext = React.createContext()

export const useDevice = () => {
    const context = useContext(DeviceContext)

    return context
}