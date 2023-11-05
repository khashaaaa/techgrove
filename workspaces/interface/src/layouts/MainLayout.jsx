import { Nav } from "../comps/Nav"
import { Foot } from "../comps/Foot"
import { Loader } from "../comps/Loader"
import { useContext } from "react"
import { LoaderContext } from "../context/LoaderContext"

export const MainLayout = ({ children }) => {

    const { isLoading } = useContext(LoaderContext)

    return isLoading ? <Loader /> : (
        <main>
            <Nav />
                {children}
            <Foot />
        </main>
    )
}