import { createContext, useState } from 'react'

export const LoaderContext = createContext()

export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)

    const show = () => {
        setIsLoading(true)
    }

    const hide = () => {
        setIsLoading(false)
    }

    return (
        <LoaderContext.Provider value={{ isLoading, show, hide }}>
            {children}
        </LoaderContext.Provider>
    )
}