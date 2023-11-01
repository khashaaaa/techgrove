import { useContext } from "react"
import { LoaderContext } from "../context/LoaderContext"
import { Loader } from "../comps/Loader"

export const AuthLayout = ({ children }) => {

    const { isLoading } = useContext(LoaderContext)

    return isLoading ? <Loader /> : (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            {children}
        </div>
    )
}