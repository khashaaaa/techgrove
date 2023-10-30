import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IconArrowRight } from '@tabler/icons-react'
import { SocialAuth } from '../comps/SocialAuth'
import { AuthLayout } from '../layouts/AuthLayout'
import { Alert } from '../comps/Alert'
import { Loader } from '../comps/Loader'
import Cookies from 'js-cookie'
import { server_url } from '../../constant'

export const Register = () => {
	const access_token = Cookies.get('access_token')
	const navigate = useNavigate()

	const [mobile, setMobile] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)

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
		const val = e.target.value
		setEmail(val)
	}

	const registerUser = async () => {
		try {
			setLoading(true)
			const form = { mobile, email }
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(form)
			}

			const response = await fetch(server_url + 'customer', options)
			const data = await response.json()

			if (data.ok) {
				setTimeout(() => {setLoading(false), navigate('/login')}, 2000)
			} else {
				setMessage(data.message)
			}
			setTimeout(() => setMessage(), 2000)
		} catch (error) {
			console.error('Алдаа гарлаа: ', error)
		}
	}

	return (
		<AuthLayout>
			{
				loading ? <Loader /> : null
			}
			<Alert msg={message} proc={setMessage} />
			<p className="my-4 text-center">Шинэ хэрэглэгч бүртгүүлэх хэсэг</p>
			<Link
				to="/login"
				className="flex items-center justify-end text-xs text-white bg-blue-400 rounded-xl px-2"
			>
				<IconArrowRight /> эсвэл нэвтрэх
			</Link>
			<div className="grid grid-rows-4 gap-4 mt-8 w-80 text-sm">
				<input
					onChange={handleMobile}
					value={mobile}
					type="number"
					placeholder="Утасны дугаар"
					className="outline-none border-none bg-stone-200 px-4 py-2 rounded-xl focus:ring-4 focus:ring-emerald-200 delay-100"
				/>
				<input
					onChange={handleEmail}
					value={email}
					type="text"
					placeholder="Имэйл"
					className="outline-none border-none bg-stone-200 px-4 py-2 rounded-xl focus:ring-4 focus:ring-emerald-200 delay-100"
				/>
				<button
					onClick={registerUser}
					className="bg-emerald-600 text-white rounded-xl px-4 py-2 focus:ring-4 focus:ring-emerald-200 hover:bg-emerald-500 delay-100"
				>
					Болсон
				</button>
				<SocialAuth />
			</div>
		</AuthLayout>
	)
}
