import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SocialAuth } from "../comps/SocialAuth"
import { AuthLayout } from "../layouts/AuthLayout"
import { IconArrowRight } from "@tabler/icons-react"
import { Alert } from "../comps/Alert"
import Cookies from 'js-cookie'

export const Login = () => {

    const access_token = Cookies.get('access_token')
    const navigate = useNavigate()

    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (access_token) {
            navigate('/')
        }
    }, [])

    const handleMobile = (e) => {
        const val = e.target.value

        if (val.length <= 8) {
            setMobile(val)
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const loginUser = async () => {
        try {
            const form = {
                mobile,
                email
            }

            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            }

            const raw = await fetch('http://localhost:8080/customer/login', options)
            const resp = await raw.json()

            if (resp.ok) {
                Cookies.set('access_token', resp.access_token)
                Cookies.set('customer', JSON.stringify(resp.customer))
                console.log(resp.customer)
                setMessage(resp.message)
                setTimeout(() => navigate('/'), 2000)
            } else {
                setMessage(resp.message)
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <AuthLayout>
            <Alert msg={message} proc={setMessage} />
            <p className="my-4 text-center">Нэвтрэх хэсэг</p>
            <Link to="/register" className="flex items-center justify-end text-xs text-white bg-blue-400 rounded-xl px-2"><IconArrowRight /> эсвэл бүртгүүлэх</Link>
            <div className="grid grid-rows-4 gap-4 mt-8 w-80 text-sm">
                <input onChange={handleMobile} value={mobile} type="number" placeholder="Утасны дугаар" className="outline-none border-none bg-stone-200 px-4 py-2 rounded-xl focus:ring-4 focus:ring-emerald-200 delay-100" />
                <input onChange={handleEmail} value={email} type="text" placeholder="Имэйл" className="outline-none border-none bg-stone-200 px-4 py-2 rounded-xl focus:ring-4 focus:ring-emerald-200 delay-100" />
                <button onClick={loginUser} className="bg-emerald-600 text-white rounded-xl px-4 py-2 focus:ring-4 focus:ring-emerald-200 hover:bg-emerald-500 delay-100">Нэвтрэх</button>
                <SocialAuth />
            </div>
        </AuthLayout>
    )
}
