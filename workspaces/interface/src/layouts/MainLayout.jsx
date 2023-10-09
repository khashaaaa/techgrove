import { Nav } from "../comps/Nav"
import { Foot } from "../comps/Foot"

export const MainLayout = ({ children }) => {

    return (
        <main>
            <Nav />
                {children}
            <Foot />
        </main>
    )
}