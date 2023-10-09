import { useState } from "react"
import { Link } from "react-router-dom"
import { SocialAuth } from "../comps/SocialAuth"
import { AuthLayout } from "../layouts/AuthLayout"
import { IconArrowRight } from "@tabler/icons-react"

export const Login = () => {

    const [mobile, setMobile] = useState('')

    const handleMobile = (e) => {
        const val = e.target.value

        if(val.length <= 8) {
            setMobile(val)
        }
    }

    return (
        <AuthLayout>
            <p className="my-4 text-center text-sm">Нэвтрэх хэсэг</p>
            <Link to="/register" className="flex items-center justify-end text-xs text-white bg-blue-400 rounded-xl px-2"><IconArrowRight /> эсвэл бүртгүүлэх</Link>
            <div className="grid grid-rows-4 gap-4 mt-8 w-80 text-sm">
                <input onChange={handleMobile} value={mobile} type="number" placeholder="Утасны дугаар" className="outline-none border-none bg-stone-200 px-4 py-2 rounded-xl focus:ring-4 focus:ring-emerald-200 delay-100" />
                <input type="text" placeholder="Имэйл" className="outline-none border-none bg-stone-200 px-4 py-2 rounded-xl focus:ring-4 focus:ring-emerald-200 delay-100" />
                <button className="bg-emerald-600 text-white rounded-xl px-4 py-2 focus:ring-4 focus:ring-emerald-200 hover:bg-emerald-500 delay-100">Болсон</button>
                <SocialAuth />
            </div>
        </AuthLayout>
    )
}