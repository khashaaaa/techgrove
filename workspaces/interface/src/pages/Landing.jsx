import { MainLayout } from '../layouts/MainLayout'
import { Selection } from '../comps/Selection'
import { Content } from '../comps/Content'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export const Landing = () => {

    const access_token = Cookies.get('access_token')
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!access_token) {
            navigate('/login')
        }
    }, [])

    return (
        <MainLayout>
            <Selection load={setLoading} />
            <Content />
        </MainLayout>
    )
}