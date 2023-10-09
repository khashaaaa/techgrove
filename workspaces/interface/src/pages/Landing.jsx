import { MainLayout } from '../layouts/MainLayout'
import { Selection } from '../comps/Selection'
import { Content } from '../comps/Content'

export const Landing = () => {

    return (
        <MainLayout>
            <Selection />
            <Content />
        </MainLayout>
    )
}